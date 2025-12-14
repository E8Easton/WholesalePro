// Supabase client removed for standalone deployment.
// This file is kept as a placeholder to prevent import errors during transition.
export const supabase = {
  auth: {
    getSession: async () => ({ data: { session: null } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: async () => ({ error: null }),
    signInWithOAuth: async () => ({ error: null }),
    signUp: async () => ({ error: null }),
    signOut: async () => {},
  }
};