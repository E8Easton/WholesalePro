import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ message: 'Webhook disabled in standalone mode' }, { status: 200 });
}