
import React, { useState, useEffect } from 'react';

// Live Social Proof Component
const LiveAlert = () => {
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState({ name: '', action: '', profit: '' });

    const alerts = [
        { name: "Alex M.", action: "just analyzed a deal in", profit: "Phoenix, AZ" },
        { name: "Sarah J.", action: "locked up a contract for", profit: "$12,500 Profit" },
        { name: "Marcus T.", action: "found a cash buyer in", profit: "Atlanta, GA" },
        { name: "New Member", action: "joined the Inner Circle", profit: "from Texas" },
        { name: "David P.", action: "generated a SubTo offer", profit: "$280k Value" },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
            setData(randomAlert);
            setVisible(true);
            setTimeout(() => setVisible(false), 5000); // Hide after 5s
        }, 8000 + Math.random() * 5000); // Random interval

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`fixed bottom-6 left-6 z-50 transition-all duration-700 transform ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 p-4 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.3)] flex items-center gap-4 max-w-xs group cursor-default hover:scale-105 transition-transform">
                <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center relative z-10">
                        <span className="text-xl">🚀</span>
                    </div>
                    <div className="absolute inset-0 bg-cyan-500 rounded-full animate-ping opacity-50"></div>
                </div>
                <div>
                    <p className="text-xs text-slate-400"><span className="font-bold text-white">{data.name}</span> {data.action}</p>
                    <p className="text-cyan-400 font-bold text-sm">{data.profit}</p>
                </div>
            </div>
        </div>
    );
};

export const FeaturesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 pb-12 px-6 relative overflow-hidden font-sans selection:bg-cyan-500/30">
      <LiveAlert />

      {/* Advanced Cyber Grid Background */}
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e91a_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e91a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HERO HEADER */}
        <div className="text-center mb-32 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold uppercase tracking-[0.2em] mb-10 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:border-cyan-400/50 transition-colors cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            System Online • v3.0 Alpha
          </div>
          
          <h1 className="text-7xl md:text-9xl font-display font-black mb-8 tracking-tighter leading-[0.9] text-white drop-shadow-2xl">
            THE <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-500 to-slate-800 text-stroke-white">UNFAIR</span> <br/>
            <span className="relative inline-block">
                <span className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 blur-2xl opacity-50"></span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">ADVANTAGE</span>
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed mb-12">
            We digitized the brain of a 7-figure wholesaler and turned it into a <span className="text-white font-bold border-b border-cyan-500/50">military-grade</span> operating system. 
            Speed isn't just a feature—it's the only currency that matters.
          </p>
          
          <div className="flex justify-center gap-6">
               <button onClick={() => document.getElementById('pricing')?.scrollIntoView()} className="group relative px-10 py-4 bg-white text-black font-black text-lg rounded-full overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-transform hover:scale-105">
                   <div className="absolute inset-0 bg-gradient-to-r from-cyan-200 to-blue-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                   <span className="relative flex items-center gap-2">Initialize System <span className="text-xl">→</span></span>
               </button>
          </div>
        </div>

        {/* MODULAR BENTO GRID - CYBER STYLE */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 mb-32">
            
            {/* FEATURE 1: THE OFFER OVEN (REACTOR CORE) */}
            <div className="md:col-span-8 bg-[#0a0f1e] border border-cyan-500/20 rounded-[2.5rem] p-10 relative overflow-hidden group hover:border-cyan-500/50 transition-all duration-500 shadow-2xl">
                {/* Reactor Background Animation */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[80px] group-hover:bg-cyan-500/10 transition-colors duration-700"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-5"></div>
                
                <div className="relative z-10 flex flex-col lg:flex-row gap-10 items-center h-full">
                    <div className="flex-1 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-cyan-500/30 bg-cyan-950/30 text-cyan-400 text-[10px] font-mono font-bold tracking-widest">
                            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></span>
                            CORE ENGINE
                        </div>
                        <h3 className="text-4xl font-display font-black text-white">The "Offer Oven" <br/><span className="text-cyan-400">Reactor</span></h3>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Our proprietary engine runs <span className="text-white font-bold">4 parallel simulations</span> on every address. It calculates the exact Entry Fee for SubTo and benchmarks it against Cash offers instantly.
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-slate-900 border border-white/5 group-hover:border-cyan-500/30 transition-colors">
                                <div className="text-cyan-400 text-xl font-black mb-1">0.4s</div>
                                <div className="text-xs text-slate-500 uppercase font-bold">Latency</div>
                            </div>
                            <div className="p-4 rounded-2xl bg-slate-900 border border-white/5 group-hover:border-cyan-500/30 transition-colors">
                                <div className="text-cyan-400 text-xl font-black mb-1">99.8%</div>
                                <div className="text-xs text-slate-500 uppercase font-bold">Accuracy</div>
                            </div>
                        </div>
                    </div>

                    {/* Animated Reactor Visual */}
                    <div className="w-64 h-64 relative flex items-center justify-center">
                        <div className="absolute inset-0 border-2 border-dashed border-cyan-500/20 rounded-full animate-spin-slow"></div>
                        <div className="absolute inset-4 border border-cyan-500/30 rounded-full animate-reverse-spin"></div>
                        <div className="absolute inset-12 bg-cyan-500/10 rounded-full backdrop-blur-sm border border-cyan-400/20 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                            <div className="text-center">
                                <div className="text-3xl font-black text-white">$142k</div>
                                <div className="text-[10px] text-cyan-400 font-mono tracking-widest">PROFIT EST</div>
                            </div>
                        </div>
                        {/* Orbiting particles */}
                        <div className="absolute top-0 left-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee] animate-orbit"></div>
                    </div>
                </div>
            </div>

            {/* FEATURE 2: DISPO HUD (TACTICAL) */}
            <div className="md:col-span-4 bg-[#0a0f1e] border border-purple-500/20 rounded-[2.5rem] p-8 relative overflow-hidden group hover:border-purple-500/50 transition-all duration-500 shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                        <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-2xl mb-6 border border-purple-500/30">
                            📊
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Tactical CRM</h3>
                        <p className="text-slate-400 text-sm">
                            Visual Kanban board. Drag & drop deals from <span className="text-purple-400 font-bold">Lead</span> to <span className="text-emerald-400 font-bold">Paid</span>.
                        </p>
                    </div>

                    {/* Mini HUD UI */}
                    <div className="mt-8 space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-slate-900/80 rounded-xl border border-purple-500/20 transform group-hover:translate-x-2 transition-transform">
                            <div className="w-2 h-8 bg-purple-500 rounded-full"></div>
                            <div>
                                <div className="text-xs font-bold text-white">1248 Oak St</div>
                                <div className="text-[10px] text-purple-400">NEGOTIATING • $15k FEE</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-slate-900/80 rounded-xl border border-emerald-500/20 transform group-hover:translate-x-4 transition-transform delay-75">
                            <div className="w-2 h-8 bg-emerald-500 rounded-full"></div>
                            <div>
                                <div className="text-xs font-bold text-white">880 Pine Ave</div>
                                <div className="text-[10px] text-emerald-400">SOLD • $22k WIRE SENT</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FEATURE 3: BUYER NETWORK (NEURAL) */}
            <div className="md:col-span-4 bg-[#0a0f1e] border border-amber-500/20 rounded-[2.5rem] p-8 relative overflow-hidden group hover:border-amber-500/50 transition-all duration-500 shadow-2xl">
                 <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-amber-500/10 to-transparent"></div>
                 
                 <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-2xl mb-6 border border-amber-500/30">
                        🤝
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Buyer Neural Net</h3>
                    <p className="text-slate-400 text-sm mb-6">
                        Instantly match your contract with <span className="text-amber-400 font-bold">10,000+ verified buyers</span> based on their specific buy box criteria.
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {['Hedge Funds', 'Fix & Flippers', 'Landlords'].map((tag, i) => (
                            <span key={i} className="px-3 py-1 rounded-full bg-amber-950/50 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-wide">
                                {tag}
                            </span>
                        ))}
                    </div>
                 </div>
            </div>

            {/* FEATURE 4: MARKET RADAR (SCANNER) */}
            <div className="md:col-span-8 bg-[#0a0f1e] border border-blue-500/20 rounded-[2.5rem] p-10 relative overflow-hidden group hover:border-blue-500/50 transition-all duration-500 shadow-2xl flex flex-col md:flex-row-reverse items-center gap-10">
                 {/* Scanner Visual */}
                 <div className="w-full md:w-1/2 h-48 bg-slate-900 rounded-2xl border border-blue-500/20 relative overflow-hidden shadow-inner">
                     <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(59,130,246,0.1)_25%,rgba(59,130,246,0.1)_26%,transparent_27%,transparent_74%,rgba(59,130,246,0.1)_75%,rgba(59,130,246,0.1)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(59,130,246,0.1)_25%,rgba(59,130,246,0.1)_26%,transparent_27%,transparent_74%,rgba(59,130,246,0.1)_75%,rgba(59,130,246,0.1)_76%,transparent_77%,transparent)] bg-[size:30px_30px]"></div>
                     
                     {/* Radar Sweep */}
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent w-full h-full animate-[scan_2s_ease-in-out_infinite] -translate-x-full"></div>
                     
                     {/* Blips */}
                     <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                     <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-blue-400 rounded-full animate-ping delay-500"></div>
                     <div className="absolute bottom-4 left-1/2 w-2 h-2 bg-blue-400 rounded-full animate-ping delay-1000"></div>
                     
                     <div className="absolute bottom-2 left-2 text-[10px] font-mono text-blue-500">SCANNING MLS DATA...</div>
                 </div>

                 <div className="w-full md:w-1/2">
                    <h3 className="text-3xl font-bold text-white mb-4">Live Market Radar</h3>
                    <p className="text-slate-400 mb-6 text-lg">
                        We pull live MLS and County Recorder data to give you the most accurate comps. Our AI automatically <span className="text-blue-400 font-bold border-b border-blue-500/50">filters outliers</span> so you don't overpay.
                    </p>
                    <button className="flex items-center gap-2 text-blue-400 font-bold hover:text-white transition-colors group/btn">
                        View Data Sources <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                    </button>
                 </div>
            </div>

        </div>

        {/* COMPARISON MATRIX - FUTURISTIC */}
        <div className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-transparent rounded-[3rem] -z-10"></div>
            <div className="text-center mb-16">
                 <h2 className="text-4xl md:text-5xl font-display font-black mb-4">System <span className="text-cyan-400">Superiority</span></h2>
                 <p className="text-slate-400">Obsolete methods vs. The New Era</p>
            </div>
            
            <div className="max-w-5xl mx-auto grid gap-4">
                {[
                    { feature: "Deal Analysis Time", old: "45 Minutes", new: "4 Seconds", score: 98 },
                    { feature: "Exit Strategies", old: "1 (Cash Only)", new: "4 (Cash, SubTo, Creative, Novation)", score: 100 },
                    { feature: "Comp Accuracy", old: "Manual Guesswork", new: "MLS-Grade AI Precision", score: 95 },
                    { feature: "Monthly Cost", old: "$500+ (Stack)", new: "$20 (All-in-One)", score: 99 }
                ].map((row, i) => (
                    <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-[#0a0f1e] border border-white/5 p-6 rounded-2xl hover:border-cyan-500/30 transition-all group">
                        <div className="md:col-span-3 font-bold text-white text-lg">{row.feature}</div>
                        
                        <div className="md:col-span-3 text-slate-500 text-sm font-mono flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500/20"></span> {row.old}
                        </div>
                        
                        <div className="md:col-span-4 text-cyan-400 text-lg font-black font-mono flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.05)] bg-cyan-950/20 px-4 py-2 rounded-lg border border-cyan-500/20">
                            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span> {row.new}
                        </div>
                        
                        <div className="md:col-span-2 flex justify-end">
                             <div className="w-16 h-16 relative flex items-center justify-center flex-shrink-0">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
                                    <circle cx="32" cy="32" r="28" stroke="#1e293b" strokeWidth="4" fill="transparent" />
                                    <circle cx="32" cy="32" r="28" stroke="#06b6d4" strokeWidth="4" fill="transparent" strokeDasharray={175} strokeDashoffset={175 - (175 * row.score) / 100} className="transition-all duration-1000" strokeLinecap="round" />
                                </svg>
                                <span className="absolute text-sm font-bold text-white">{row.score}</span>
                             </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* HOLOGRAPHIC CTA BANNER */}
        <div id="pricing" className="mt-32 relative group rounded-[3rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
            <div className="absolute inset-[2px] bg-[#020617] rounded-[3rem] z-0"></div>
            
            <div className="relative z-10 p-16 text-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                
                <h2 className="text-5xl md:text-7xl font-display font-black text-white mb-6 tracking-tight">Initialize Your <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Wealth Sequence</span></h2>
                <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                    The system is ready. The data is live. The only thing missing is you. <br/>
                    Lock in the early-adopter rate before it expires.
                </p>
                <button 
                    onClick={() => document.getElementById('pricing')?.scrollIntoView()} // Placeholder link
                    className="inline-flex items-center px-12 py-6 bg-white text-black font-black text-2xl rounded-2xl hover:scale-105 transition-transform shadow-[0_0_50px_rgba(255,255,255,0.3)]"
                >
                    <span className="mr-3">⚡</span> GET ACCESS - $20/mo
                </button>
            </div>
        </div>

      </div>
      
      <style>{`
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(80px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
        }
        @keyframes scan {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        .animate-orbit {
          animation: orbit 4s linear infinite;
        }
        .animate-spin-slow {
            animation: spin 8s linear infinite;
        }
        .animate-reverse-spin {
            animation: spin 6s linear infinite reverse;
        }
      `}</style>
    </div>
  );
};
