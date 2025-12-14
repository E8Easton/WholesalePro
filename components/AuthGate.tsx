
import React from 'react';

interface AuthGateProps {
  onLogin: () => void;
  lockedAddress?: string;
}

export const AuthGate: React.FC<AuthGateProps> = ({ onLogin, lockedAddress }) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[#020617]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f59e0b1a_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="relative z-10 max-w-lg w-full bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 text-center shadow-2xl animate-in fade-in zoom-in duration-500">
        
        <div className="w-20 h-20 bg-slate-950 rounded-2xl border border-white/10 flex items-center justify-center mx-auto mb-8 shadow-lg relative group">
          <div className="absolute inset-0 bg-amber-500/20 rounded-2xl blur-lg group-hover:bg-amber-500/40 transition-all"></div>
          <span className="text-4xl relative z-10">🔒</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-display font-black text-white mb-4">
          Member Access <span className="text-amber-500">Locked</span>
        </h2>
        
        {lockedAddress ? (
            <div className="bg-amber-900/20 border border-amber-500/30 rounded-xl p-4 mb-8">
                <p className="text-xs text-amber-400 uppercase font-bold tracking-widest mb-1">Target Property</p>
                <p className="text-white font-bold truncate">{lockedAddress}</p>
            </div>
        ) : (
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              The Deal Analyzer and CRM are exclusive to <strong className="text-white">New Era Inner Circle</strong> members.
            </p>
        )}

        <button 
          onClick={onLogin}
          className="w-full py-4 bg-[#FF6243] hover:bg-[#ff4f2c] text-white font-black text-xl rounded-xl shadow-[0_0_30px_rgba(255,98,67,0.3)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3"
        >
          {lockedAddress ? 'Login to Analyze' : 'Enter Dashboard'}
        </button>

        <p className="mt-6 text-sm text-slate-500">
          Not a member yet? <button onClick={onLogin} className="text-amber-500 hover:text-amber-400 font-bold underline">Create Demo Account</button>
        </p>

        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-4 text-xs text-slate-600">
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Secure Auth</span>
          <span>•</span>
          <span>Instant Access</span>
        </div>
      </div>
    </div>
  );
};
