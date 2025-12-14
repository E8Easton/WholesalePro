
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Initialize Supabase Admin Client (Bypasses RLS)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const headers = req.headers;
    const signature = headers.get('whop-signature');
    const webhookSecret = process.env.WHOP_WEBHOOK_SECRET;

    // 1. Verify Signature
    if (!webhookSecret || !signature) {
      return NextResponse.json({ error: 'Missing secret or signature' }, { status: 401 });
    }

    const computedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(rawBody)
      .digest('hex');

    if (computedSignature !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    const { action, data } = payload;

    console.log(`Received Whop event: ${action}`);

    // 2. Handle Events
    switch (action) {
      case 'purchase.created':
        await handlePurchaseCreated(data);
        break;
      
      case 'purchase.updated':
      case 'membership.went_active':
        await handlePurchaseUpdated(data, 'active');
        break;

      case 'purchase.cancelled':
      case 'membership.went_cancelled':
      case 'membership.went_expired':
        await handlePurchaseUpdated(data, 'cancelled');
        break;

      default:
        console.log(`Unhandled event type: ${action}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error: any) {
    console.error('Webhook error:', error.message);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}

// --- Helper Functions ---

async function handlePurchaseCreated(data: any) {
  const { email, id: purchaseId, user_id: whopUserId } = data;
  
  if (!email) {
    console.error('No email provided in purchase data');
    return;
  }

  // 1. Check if user exists in Supabase Auth
  const { data: { users }, error: searchError } = await supabaseAdmin.auth.admin.listUsers();
  let user = users.find((u) => u.email === email);

  // 2. Create User if not exists
  if (!user) {
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: email,
      email_confirm: true, // Auto-confirm since they paid via Whop
      user_metadata: {
        whop_customer_id: whopUserId,
        subscription_status: 'active',
      },
    });

    if (createError) throw createError;
    user = newUser.user;
  } else {
    // Update existing user metadata
    await supabaseAdmin.auth.admin.updateUserById(user.id, {
      user_metadata: {
        ...user.user_metadata,
        whop_customer_id: whopUserId,
        subscription_status: 'active',
      },
    });
  }

  // 3. Upsert into database table
  if (user) {
    const { error: dbError } = await supabaseAdmin
      .from('user_subscriptions')
      .upsert({
        user_id: user.id,
        whop_purchase_id: purchaseId,
        status: 'active',
        updated_at: new Date().toISOString(),
      }, { onConflict: 'whop_purchase_id' });

    if (dbError) throw dbError;
  }
}

async function handlePurchaseUpdated(data: any, status: string) {
  const { id: purchaseId } = data;

  // Find the subscription record
  const { data: sub } = await supabaseAdmin
    .from('user_subscriptions')
    .select('user_id')
    .eq('whop_purchase_id', purchaseId)
    .single();

  if (sub && sub.user_id) {
    // 1. Update DB Table
    await supabaseAdmin
      .from('user_subscriptions')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('whop_purchase_id', purchaseId);

    // 2. Update Auth Metadata (for easy frontend access)
    await supabaseAdmin.auth.admin.updateUserById(sub.user_id, {
      user_metadata: { subscription_status: status }
    });
  } else {
    console.warn(`Subscription ${purchaseId} not found during update.`);
  }
}
