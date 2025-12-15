
import { createClient } from '@supabase/supabase-js';

// Access environment variables securely
// Note: In a real deployment, ensure these are set in your .env file
// We provide fallback values to prevent the app from crashing if variables are missing.
// Authentication requests will fail if these are not valid, but the app will load.
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'placeholder-key';

if (supabaseUrl === 'https://placeholder.supabase.co') {
  console.warn('Supabase credentials missing! Set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY to enable authentication.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
