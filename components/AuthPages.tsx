
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface AuthProps {
  onNavigate: (view: 'login' | 'signup' | 'landing') => void;
}

export const LoginPage: React.FC<AuthProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleWhopLogin = async () => {
    setLoading(true);
    // Note: This requires 'whop' provider enabled in Supabase, or use 'oidc'
    // For now, we simulate the standard OAuth call
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google', // Placeholder for Whop (needs custom provider config in Supabase)
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4 relative overflow-hidden">
      {/* Background FX */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

      <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl relative z-10 animate-in fade-in zoom-in duration-500">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-pink-600 rounded-2xl flex items-center justify-center text-3xl font-black text-white mx-auto mb-4 shadow-lg">W</div>
          <h2 className="text-3xl font-display font-black text-white mb-2">Welcome Back</h2>
          <p className="text-slate-400 text-sm">Enter your credentials to access the terminal.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {/* Whop Button */}
        <button 
          onClick={handleWhopLogin}
          disabled={loading}
          className="w-full py-4 bg-[#FF6243] hover:bg-[#ff4f2c] text-white font-black text-lg rounded-xl shadow-[0_0_30px_rgba(255,98,67,0.2)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 mb-6"
        >
          {loading ? 'Connecting...' : 'Login with Whop'}
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#0f172a] px-2 text-slate-500">Or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input 
              type="email" 
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 outline-none transition-colors"
              required
            />
          </div>
          <div>
            <input 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 outline-none transition-colors"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-white hover:bg-slate-200 text-black font-bold rounded-xl transition-colors"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Don't have an account?{' '}
          <button onClick={() => onNavigate('signup')} className="text-blue-400 hover:text-blue-300 font-bold transition-colors">
            Sign up
          </button>
        </p>
        
        <button onClick={() => onNavigate('landing')} className="w-full mt-4 text-xs text-slate-600 hover:text-slate-400 transition-colors">
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export const SignupPage: React.FC<AuthProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      alert("Check your email for the confirmation link!");
      onNavigate('login');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-black to-black"></div>
      
      <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display font-black text-white mb-2">Initialize Account</h2>
          <p className="text-slate-400 text-sm">Join the network of top 1% wholesalers.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-1 block">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-1 block">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none transition-colors"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black rounded-xl shadow-lg shadow-emerald-500/20 transition-all transform hover:scale-105"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <button onClick={() => onNavigate('login')} className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};
