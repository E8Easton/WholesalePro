
import React, { useState, useEffect, useRef } from 'react';

interface LandingPageProps {
  onSearch: (address: string) => void;
  onNavigate: (view: 'features' | 'howitworks' | 'pricing') => void;
  isMember?: boolean;
}

const RevealOnScroll = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                ref.current?.classList.add('active');
            }
        }, { threshold: 0.1 });

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
};

const BankLogo = ({ name, color }: { name: string, color: string }) => (
    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-white/20 shadow-lg ${color}`}>
        {name}
    </div>
);

// SVG Icons
const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
);

const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 3.8 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
    </svg>
);

const YouTubeIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M23.5 6.19a3 3 0 0 0-2.12-2.11C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.58A3 3 0 0 0 .5 6.19C0 8.06 0 12 0 12s0 3.94.5 5.81a3 3 0 0 0 2.12 2.11C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.58a3 3 0 0 0 2.12-2.11c.5-1.87.5-5.81.5-5.81s0-3.94-.5-5.81zM9.54 15.57V8.43L15.82 12l-6.28 3.57z"/>
    </svg>
);

export const LandingPage: React.FC<LandingPageProps> = ({ onSearch, onNavigate, isMember = false }) => {
  const [input, setInput] = useState('');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeToolkitCard, setActiveToolkitCard] = useState(0);
  
  const testimonials = [
      { name: "Jason K.", role: "New Wholesaler", text: "I closed my first deal in 14 days using the SubTo scripts. The AI math gave me confidence to pitch the seller." },
      { name: "Sarah M.", role: "Full-time Investor", text: "The Dispo Manager alone is worth $500/mo. Finding buyers used to take me weeks, now it's instant." },
      { name: "David P.", role: "Flipper", text: "Smart Mode saved me hours of research. It pulled the mortgage balance perfectly." },
      { name: "Emily R.", role: "Real Estate Agent", text: "This tool helps me convert expired listings into creative finance deals. Total game changer." }
  ];

  const toolkitCards = [
      { strategy: "Subject To", profit: "+$42,500", color: "text-emerald-400", bg: "from-emerald-500/20 to-teal-500/20", bars: [100, 75, 50] },
      { strategy: "Wholesale", profit: "+$12,000", color: "text-blue-400", bg: "from-blue-500/20 to-indigo-500/20", bars: [60, 40, 30] },
      { strategy: "Novation", profit: "+$28,500", color: "text-pink-400", bg: "from-pink-500/20 to-rose-500/20", bars: [85, 60, 45] },
      { strategy: "Seller Finance", profit: "+$350/mo", color: "text-purple-400", bg: "from-purple-500/20 to-violet-500/20", bars: [90, 80, 70] },
  ];

  const successStories = [
      { name: "Michael R.", profit: "+$12,500", type: "Wholesale", time: "2 Days" },
      { name: "Jessica T.", profit: "+$45,000", type: "Subject To", time: "3 Weeks" },
      { name: "David L.", profit: "+$8,200", type: "Novation", time: "14 Days" },
      { name: "Amanda B.", profit: "+$22,150", type: "Seller Finance", time: "1 Week" },
  ];

  useEffect(() => {
      const interval = setInterval(() => {
          setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      
      const cardInterval = setInterval(() => {
          setActiveToolkitCard((prev) => (prev + 1) % toolkitCards.length);
      }, 3000);

      return () => {
          clearInterval(interval);
          clearInterval(cardInterval);
      };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) onSearch(input);
  };

  const handleWhopRedirect = () => {
      window.open('https://whop.com/new-era-wholesale/', '_blank');
  };

  // --- MEMBER VIEW (Simplified Search) ---
  if (isMember) {
      return (
        <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden font-sans flex flex-col items-center justify-center -mt-20">
             <div className="px-6 max-w-5xl mx-auto text-center relative z-10 w-full">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
                 
                 <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-1 mb-8 animate-fade-in-up">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">System Operational</span>
                 </div>

                 <h1 className="text-5xl md:text-7xl font-display font-black mb-6 text-white animate-fade-in-up">
                     Welcome Back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Wholesaler</span>
                 </h1>
                 
                 <p className="text-xl text-slate-400 mb-12 animate-fade-in-up delay-100">
                     Enter an address to run the <span className="text-white font-bold">Offer Oven™</span> protocols.
                 </p>

                 <div className="flex flex-col items-center justify-center gap-6 mb-16 animate-fade-in-up delay-200">
                     <form onSubmit={handleSubmit} className="relative max-w-2xl w-full group">
                         <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
                         <div className="relative flex bg-[#020617] rounded-2xl border border-white/10 p-2 shadow-2xl">
                            <input 
                                type="text" 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Enter property address..." 
                                className="w-full bg-transparent text-white px-6 py-4 focus:outline-none placeholder-slate-600 font-medium text-lg"
                                autoFocus
                            />
                            <button type="submit" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-lg rounded-xl transition-transform hover:scale-105 whitespace-nowrap shadow-lg flex items-center">
                                <span className="mr-2">🚀</span> Run Analysis
                            </button>
                         </div>
                     </form>
                 </div>
             </div>
        </div>
      );
  }

  // --- PUBLIC MARKETING VIEW ---
  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden font-sans selection:bg-pink-500/30">
      
      {/* 1. HERO SECTION */}
      <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto text-center relative z-10">
         <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
         
         <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-pink-500/10 border border-pink-500/30 rounded-full px-6 py-2.5 mb-10 backdrop-blur-md hover:border-pink-500/50 transition-colors cursor-default shadow-[0_0_20px_rgba(236,72,153,0.15)] animate-fade-in-up">
            <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400 uppercase tracking-widest">✨ VIP Deal Analysis Platform</span>
         </div>

         <h1 className="text-6xl md:text-9xl font-display font-black tracking-tighter mb-8 leading-[1.0] text-white drop-shadow-2xl animate-fade-in-up" style={{animationDelay: '0.1s'}}>
             Master the Art of <br/>
             <span className="gradient-text">Wholesale Deals</span>
         </h1>

         <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto mb-16 leading-relaxed font-light animate-fade-in-up" style={{animationDelay: '0.2s'}}>
             Get <strong className="text-white font-bold">instant deal analysis</strong> with our AI-powered tools. Access <strong className="text-white font-bold">10,000+ verified cash buyers</strong>, premium calculators, and everything you need to <strong className="text-white font-bold">close deals faster</strong>.
         </p>

         <div className="flex flex-col items-center justify-center gap-6 mb-16 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
             <form onSubmit={handleSubmit} className="relative max-w-2xl w-full group">
                 <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500 animate-gradient-x"></div>
                 <div className="relative flex bg-[#020617] rounded-2xl border border-white/10 p-2 shadow-2xl">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter property address..." 
                        className="w-full bg-transparent text-white px-6 py-4 focus:outline-none placeholder-slate-600 font-medium text-lg"
                    />
                    <button type="submit" className="px-8 py-4 gradient-bg text-white font-black text-lg rounded-xl transition-transform hover:scale-105 whitespace-nowrap shadow-lg flex items-center">
                        <span className="mr-2">🚀</span> Analyze
                    </button>
                 </div>
             </form>
         </div>
      </div>

      {/* 2. MOVING TICKER BELT */}
      <div className="w-full bg-gradient-to-r from-blue-900 to-pink-900 py-4 overflow-hidden border-y border-white/10 relative z-20 transform -rotate-1 shadow-2xl">
          <div className="flex animate-marquee whitespace-nowrap">
              {[...Array(10)].map((_, i) => (
                  <div key={i} className="flex items-center mx-8">
                      <span className="text-xl font-black text-white uppercase tracking-widest italic mx-4">Automate Wealth</span>
                      <span className="text-pink-400">★</span>
                      <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 uppercase tracking-widest italic mx-4">Close Faster</span>
                      <span className="text-blue-400">★</span>
                      <span className="text-xl font-black text-white uppercase tracking-widest italic mx-4">Live Free</span>
                      <span className="text-pink-400">★</span>
                  </div>
              ))}
          </div>
      </div>

      {/* 2.5. NEW HIGH-IMPACT STATS & PRICING SECTION */}
      <div className="bg-slate-950 border-y border-white/10 py-16 relative overflow-hidden">
           {/* Background effects */}
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
           <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none"></div>

           <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-6 text-center relative z-10">
               <div className="p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                   <div className="text-4xl md:text-5xl font-black text-emerald-400 mb-2">$450M+</div>
                   <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Deal Profit Found</div>
               </div>
               <div className="p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                   <div className="text-4xl md:text-5xl font-black text-blue-400 mb-2">0.4s</div>
                   <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Instant Results</div>
               </div>
               <div className="p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                   <div className="text-4xl md:text-5xl font-black text-purple-400 mb-2">100%</div>
                   <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">AI Powered</div>
               </div>
               <div className="p-8 bg-gradient-to-br from-pink-600 to-purple-600 rounded-3xl shadow-[0_0_30px_rgba(236,72,153,0.4)] transform scale-105 border border-white/20 flex flex-col justify-center relative overflow-hidden group">
                   <div className="absolute inset-0 bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                   <div className="text-xs font-bold text-white/80 line-through mb-1">Normally $297/mo</div>
                   <div className="text-5xl font-black text-white mb-4">$20<span className="text-lg align-top font-bold text-pink-200">/mo</span></div>
                   <button onClick={handleWhopRedirect} className="w-full py-3 bg-white text-black font-black uppercase text-xs rounded-xl hover:bg-slate-200 transition-colors shadow-lg">
                       Get Software Now
                   </button>
               </div>
           </div>
       </div>

      {/* 3. WHAT YOU GET SECTION - UPGRADED */}
      <RevealOnScroll className="py-24 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
              <h2 className="text-5xl font-display font-black mb-6">What You <span className="gradient-text">Get</span></h2>
              <p className="text-slate-400 text-lg">The unfair advantage for modern wholesalers.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                  { title: "AI Underwriting", desc: "Analyze cash, subto, and seller finance deals in seconds.", icon: "🤖", color: "text-blue-400", bg: "bg-blue-500/10", border: "hover:border-blue-500/50", glow: "hover:shadow-blue-500/20" },
                  { title: "10k+ Cash Buyers", desc: "Direct access to verified institutional and local buyers.", icon: "💰", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "hover:border-emerald-500/50", glow: "hover:shadow-emerald-500/20" },
                  { title: "Legal Library", desc: "Iron-clad contracts for every creative finance strategy.", icon: "⚖️", color: "text-purple-400", bg: "bg-purple-500/10", border: "hover:border-purple-500/50", glow: "hover:shadow-purple-500/20" },
              ].map((item, i) => (
                  <div key={i} className={`relative bg-slate-900/50 p-8 rounded-3xl border border-white/5 transition-all duration-300 hover:-translate-y-2 group overflow-hidden ${item.border} hover:shadow-2xl ${item.glow}`}>
                      <div className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                      <div className={`w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner border border-white/5`}>
                          {item.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors">{item.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{item.desc}</p>
                  </div>
              ))}
          </div>
          <div className="text-center">
             <button onClick={() => onNavigate('pricing')} className="px-10 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full text-white font-bold transition-all hover:scale-105 hover:border-pink-500/30">
                 View Full Feature List ↓
             </button>
          </div>
      </RevealOnScroll>

      {/* 4. TRUSTED BY INVESTORS (GOLD EDITION) - REVAMPED & RESPONSIVE */}
      <div className="py-32 bg-black relative overflow-hidden border-y border-white/5">
          {/* Sleek Gold Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-black to-black opacity-50"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>

          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
              <p className="text-sm font-bold text-amber-500 uppercase tracking-[0.3em] mb-12 shadow-amber-500/50">Featured In</p>
              <h2 className="text-5xl md:text-6xl font-display font-black text-white mb-20 drop-shadow-2xl">
                  As Seen In <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500">Leading Publications</span>
              </h2>
              
              <div className="flex flex-wrap justify-center gap-6 mb-20 px-4">
                  {[
                      { name: 'Forbes', style: 'font-serif tracking-tighter' },
                      { name: 'Entrepreneur', style: 'font-sans tracking-tight' },
                      { name: 'Inc.', style: 'font-serif italic font-black text-5xl' },
                      { name: 'BiggerPockets', style: 'font-display font-black tracking-tight' },
                      { name: 'National Real Estate Investor', style: 'font-sans font-light uppercase tracking-widest text-lg' }
                  ].map((pub, i) => (
                       <div key={i} className="flex-1 min-w-[200px] max-w-[320px] h-32 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl flex items-center justify-center group hover:border-amber-500/50 transition-all duration-300 cursor-default relative overflow-hidden hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] px-4">
                           <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                           <span className={`text-2xl md:text-3xl font-bold text-white group-hover:text-amber-200 transition-colors text-center ${pub.style}`}>
                               {pub.name}
                           </span>
                       </div>
                  ))}
              </div>

              <div className="inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-amber-950/40 to-black rounded-full border border-amber-500/30 backdrop-blur-md shadow-2xl hover:scale-105 transition-transform">
                  <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-black font-black text-sm shadow-[0_0_10px_#fbbf24]">✓</div>
                  <span className="text-base font-bold text-amber-100 uppercase tracking-widest">
                      Verified & Trusted by <strong className="text-amber-400 text-xl ml-1">2,350+</strong> Wholesalers
                  </span>
              </div>
          </div>
      </div>

      {/* 5. EVERYTHING YOU NEED + BIGGEST CTA */}
      <RevealOnScroll className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-[#020617]"></div>
          <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
              <div className="inline-block px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase mb-6">
                  The Complete Ecosystem
              </div>
              <h2 className="text-5xl md:text-7xl font-display font-black text-white mb-8">Everything You Need To <br/> <span className="text-emerald-400">Close More Deals</span></h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 text-left">
                  {['Live Comps', 'Skip Tracing', 'Mail Sequences', 'SubTo Calculator', 'Novation Scripts', 'Dispo Manager', 'CRM Pipeline', 'Weekly Coaching'].map((feat, i) => (
                      <div key={i} className="flex items-center p-4 bg-white/5 rounded-xl border border-white/5">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 mr-3 shadow-[0_0_10px_#10b981]"></div>
                          <span className="font-bold text-white text-sm">{feat}</span>
                      </div>
                  ))}
              </div>

              {/* BIGGEST CTA FUTURISTIC UPDATE - FIXED HOVER */}
              <button 
                onClick={handleWhopRedirect}
                className="group relative inline-flex items-center justify-center px-12 py-8 text-2xl font-black text-white transition-all duration-200 bg-slate-900 rounded-3xl focus:outline-none hover:scale-105 hover:shadow-[0_0_80px_rgba(6,182,212,0.5)] border border-cyan-500/30 overflow-hidden w-full md:w-auto"
              >
                  <span className="absolute inset-0 w-full h-full transition-all duration-700 ease-out -translate-x-full bg-gradient-to-r from-cyan-500 to-blue-600 group-hover:translate-x-0 ease"></span>
                  <span className="relative flex flex-col items-center">
                      <span className="flex items-center gap-3">
                        <span className="text-3xl">🚀</span> 
                        GET INSTANT ACCESS NOW
                      </span>
                      <span className="text-sm font-medium opacity-90 mt-2">
                        <span className="line-through text-slate-400 mr-2">$297</span> 
                        <span className="text-cyan-300 font-bold text-lg glow">$20/mo</span>
                         <span className="text-slate-300 ml-1">(Limited Time)</span>
                      </span>
                  </span>
              </button>
          </div>
      </RevealOnScroll>

      {/* 6. AI POWERED TOOLKIT - UPDATED WITH FLIPPING CARDS */}
      <RevealOnScroll className="py-24 bg-[#0f172a] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
              <div className="md:w-1/2">
                  <h2 className="text-4xl font-display font-black mb-6">AI-Powered <span className="text-purple-400">Toolkit</span></h2>
                  <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                      Our "Offer Oven" technology doesn't just run numbers. It simulates 4 different exit strategies (Cash, Creative, Novation, SubTo) instantly to find the highest profit potential for every lead.
                  </p>
                  <ul className="space-y-4">
                      <li className="flex items-center text-white font-bold"><span className="text-purple-400 mr-3">✓</span> Instant ARV Calculation</li>
                      <li className="flex items-center text-white font-bold"><span className="text-purple-400 mr-3">✓</span> Repair Cost Estimator</li>
                      <li className="flex items-center text-white font-bold"><span className="text-purple-400 mr-3">✓</span> Buy Box Probability Score</li>
                  </ul>
              </div>
              
              {/* FLIPPING CARDS RIGHT SIDE */}
              <div className="md:w-1/2 relative h-[400px] w-full flex items-center justify-center">
                  <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-[100px]"></div>
                  
                  {toolkitCards.map((card, idx) => (
                    <div 
                        key={idx}
                        className={`absolute w-full max-w-md bg-black/90 p-8 rounded-3xl border border-white/10 shadow-2xl transition-all duration-700 ease-in-out transform
                            ${idx === activeToolkitCard 
                                ? 'opacity-100 scale-100 rotate-0 z-20 translate-y-0' 
                                : 'opacity-0 scale-90 rotate-6 z-10 translate-y-10'}`}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${card.bg} opacity-20 rounded-3xl`}></div>
                        <div className="relative z-10">
                            <div className="flex justify-between items-end mb-6 border-b border-white/10 pb-6">
                                <div>
                                    <div className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Strategy Identified</div>
                                    <div className="text-3xl font-black text-white">{card.strategy}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Proj. Profit</div>
                                    <div className={`text-4xl font-black ${card.color}`}>{card.profit}</div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between text-xs text-slate-400 uppercase font-bold">
                                    <span>Acceptance Probability</span>
                                    <span>{card.bars[0]}%</span>
                                </div>
                                <div className="h-3 bg-slate-800 rounded-full w-full overflow-hidden">
                                    <div className={`h-full rounded-full transition-all duration-1000 ${card.color.replace('text-', 'bg-')}`} style={{width: `${card.bars[0]}%`}}></div>
                                </div>
                                
                                <div className="flex justify-between text-xs text-slate-400 uppercase font-bold mt-2">
                                    <span>Market Demand</span>
                                    <span>{card.bars[1]}%</span>
                                </div>
                                <div className="h-3 bg-slate-800 rounded-full w-full overflow-hidden">
                                    <div className={`h-full rounded-full opacity-70 transition-all duration-1000 ${card.color.replace('text-', 'bg-')}`} style={{width: `${card.bars[1]}%`}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                  ))}
              </div>
          </div>
      </RevealOnScroll>

      {/* 7. COMMUNITY SAYS (AUTO-CYCLING) */}
      <RevealOnScroll className="py-24 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-display font-bold mb-16">What Our <span className="gradient-text">Community</span> Says</h2>
          
          <div className="relative h-64">
              {testimonials.map((t, i) => (
                  <div 
                    key={i} 
                    className={`absolute inset-0 transition-all duration-700 transform ${i === activeTestimonial ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                  >
                      <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-md p-10 rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(79,70,229,0.15)]">
                        <div className="text-6xl text-blue-500/20 absolute top-4 left-6 font-serif">"</div>
                        <p className="text-2xl text-slate-200 mb-8 italic font-light relative z-10 leading-relaxed">
                            {t.text}
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 flex items-center justify-center font-bold text-white text-lg shadow-lg">
                                {t.name[0]}
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-white text-lg">{t.name}</div>
                                <div className="text-sm text-pink-400 font-bold uppercase tracking-wide">{t.role}</div>
                            </div>
                        </div>
                      </div>
                  </div>
              ))}
          </div>
          
          <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`w-3 h-3 rounded-full transition-all ${i === activeTestimonial ? 'bg-white scale-125' : 'bg-slate-700'}`}
                  />
              ))}
          </div>
      </RevealOnScroll>

      {/* 8. REAL MEMBERS, REAL DEALS */}
      <div className="py-24 bg-slate-900/30 border-y border-white/5 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-display font-bold text-white mb-4">Real Members, <span className="gradient-text">Real Wire Transfers</span></h2>
                <p className="text-slate-400 text-lg">Results don't lie.</p>
              </div>
              
              <div className="grid md:grid-cols-4 gap-6">
                  {[
                      { name: "Devon R.", bank: "BOA", amount: "$452,607", color: "bg-red-600 border-red-500 shadow-red-500/20" },
                      { name: "Marcus T.", bank: "Wells", amount: "$18,500", color: "bg-yellow-600 border-yellow-500 shadow-yellow-500/20" },
                      { name: "Brandon H.", bank: "Chase", amount: "$13,700", color: "bg-blue-600 border-blue-500 shadow-blue-500/20" },
                      { name: "Angela R.", bank: "Citi", amount: "$19,200", color: "bg-cyan-600 border-cyan-500 shadow-cyan-500/20" },
                  ].map((item, i) => (
                      <div key={i} className="bg-[#020617] p-6 rounded-3xl border border-white/10 hover:border-white/30 transition-all hover:-translate-y-2 shadow-xl flex flex-col items-center text-center group">
                          <div className="mb-4 transform group-hover:scale-110 transition-transform">
                              <BankLogo name={item.bank} color={item.color} />
                          </div>
                          <h3 className="font-bold text-white text-lg mb-1">{item.name}</h3>
                          <div className="text-3xl font-display font-black text-white mb-2">{item.amount}</div>
                          <div className="text-[10px] text-emerald-400 uppercase font-bold bg-emerald-500/10 px-2 py-1 rounded">Assignment Fee</div>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* 9. WEEKLY ALERTS (UNIFIED BOX) */}
      <RevealOnScroll className="py-32">
          <div className="max-w-4xl mx-auto px-6">
              <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 p-[2px] rounded-3xl shadow-[0_0_100px_rgba(236,72,153,0.3)] animate-gradient-x">
                  <div className="bg-[#0f172a] rounded-[22px] p-12 text-center relative overflow-hidden group">
                      
                      {/* Vibrant Background Blurs */}
                      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-[100px] animate-pulse"></div>
                      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '1s'}}></div>
                      
                      <div className="relative z-10">
                          <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-8 shadow-2xl shadow-purple-500/40 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                             🔔
                          </div>
                          <h2 className="text-5xl font-display font-black text-white mb-6">Get Off-Market Drops</h2>
                          <p className="text-slate-300 mb-10 max-w-lg mx-auto text-lg">Join 15,000+ investors receiving our curated deal flow, market insights, and buyer lists every Monday.</p>
                          
                          <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
                              <input 
                                type="email" 
                                placeholder="Enter your best email..." 
                                className="flex-1 bg-white/5 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-slate-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none text-lg transition-all backdrop-blur-sm" 
                              />
                              <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-black rounded-xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(236,72,153,0.4)] whitespace-nowrap text-lg">
                                  JOIN THE LIST
                              </button>
                          </div>
                          <p className="mt-6 text-sm text-slate-500 font-medium">Join 2,000+ others • No spam • Unsubscribe anytime</p>
                      </div>
                  </div>
              </div>
          </div>
      </RevealOnScroll>

      {/* 10. ABOUT ME (EASTON ZASTROW) - REDESIGNED */}
      <div className="py-32 bg-black border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-16">
                  <h2 className="text-6xl md:text-8xl font-display font-black text-white mb-4 uppercase tracking-tighter">I'M E8 Easton</h2>
                  <div className="inline-block px-6 py-2 bg-pink-600 text-white font-black uppercase tracking-[0.2em] rounded-full transform -skew-x-12 mb-6">
                      Owner of New Era Wholesale
                  </div>
                  <h3 className="text-2xl md:text-3xl font-light text-slate-300 tracking-wide font-display">
                      Follow my journey or follow along to <span className="text-white font-bold border-b-2 border-pink-500">scale your wholesaling business</span>.
                  </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                  {/* Photo Box */}
                  <div className="group relative border border-white/20 bg-slate-900/50 p-3 rounded-[32px] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                      <img src="easton.jpg" className="w-full h-[500px] object-cover rounded-[24px] group-hover:scale-105 transition-transform duration-700" alt="Easton" />
                      <div className="absolute bottom-8 left-8 z-20">
                          <div className="text-white font-bold text-xl">The Architect</div>
                      </div>
                  </div>
                   {/* Supercar Box */}
                  <div className="group relative border border-white/20 bg-slate-900/50 p-3 rounded-[32px] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                      <img src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" className="w-full h-[500px] object-cover rounded-[24px] group-hover:scale-105 transition-transform duration-700" alt="Supercar" />
                      <div className="absolute bottom-8 left-8 z-20">
                           <div className="text-white font-bold text-xl">The Lifestyle</div>
                      </div>
                  </div>
              </div>

              {/* Socials Box - Enhanced Pink/Purple Theme */}
              <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-[32px] blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative w-full bg-slate-900/80 border border-white/10 rounded-[24px] p-6 md:p-10 backdrop-blur-md">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <a href="https://www.tiktok.com/@easton.e8" target="_blank" rel="noreferrer" className="bg-slate-950 border border-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center gap-4 hover:scale-105 transition-all group/icon hover:bg-gradient-to-br hover:from-slate-800 hover:to-cyan-900/40">
                              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
                                  <TikTokIcon />
                              </div>
                              <div className="text-center">
                                  <div className="font-black text-white text-xl">TikTok</div>
                                  <div className="text-xs text-slate-400">@easton.e8</div>
                              </div>
                          </a>
                           <a href="https://www.instagram.com/e8.easton/" target="_blank" rel="noreferrer" className="bg-slate-950 border border-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center gap-4 hover:scale-105 transition-all group/icon hover:bg-gradient-to-br hover:from-slate-800 hover:to-pink-900/40">
                              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-pink-500/20">
                                  <InstagramIcon />
                              </div>
                              <div className="text-center">
                                  <div className="font-black text-white text-xl">Instagram</div>
                                  <div className="text-xs text-slate-400">@e8.easton</div>
                              </div>
                          </a>
                           <a href="https://www.youtube.com/@e8.easton" target="_blank" rel="noreferrer" className="bg-slate-950 border border-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center gap-4 hover:scale-105 transition-all group/icon hover:bg-gradient-to-br hover:from-slate-800 hover:to-red-900/40">
                              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-red-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-red-500/20">
                                  <YouTubeIcon />
                              </div>
                              <div className="text-center">
                                  <div className="font-black text-white text-xl">YouTube</div>
                                  <div className="text-xs text-slate-400">@e8.easton</div>
                              </div>
                          </a>
                      </div>
                      
                      <div className="mt-8 flex justify-center">
                          <button onClick={handleWhopRedirect} className="px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2">
                             Join My Premium Community <span className="text-xl">→</span>
                          </button>
                      </div>
                  </div>
              </div>

          </div>
      </div>

      {/* 11. INSIDE PREMIUM COMMUNITY - REVAMPED */}
      <div className="py-24 bg-[#020617] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
          
          <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
              <div className="inline-block px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase mb-6 shadow-[0_0_20px_rgba(79,70,229,0.2)]">
                  New Era University Discord
              </div>
              <h2 className="text-5xl md:text-7xl font-display font-black text-white mb-8">Level Up <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Together</span></h2>
              <p className="text-xl text-slate-400 mb-16 max-w-3xl mx-auto">
                  Join a fast-growing community of 2,000+ wholesalers. We don't just chat; we analyze deals live, share county lists, and close transactions together.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
                   {[
                       { title: 'Weekly Q&As', icon: '🎤', desc: 'Live voice calls with Easton' },
                       { title: 'Deal Reviews', icon: '📝', desc: 'Get your numbers checked' },
                       { title: 'Accountability', icon: '🤝', desc: 'Daily check-ins & goals' },
                       { title: 'Exclusive Lists', icon: '📜', desc: 'Off-market leads drops' }
                   ].map((feat, i) => (
                       <div key={i} className="p-8 bg-slate-900/50 rounded-3xl border border-indigo-500/20 hover:border-indigo-500/50 hover:bg-slate-800 transition-all hover:-translate-y-2 group shadow-xl">
                           <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{feat.icon}</div>
                           <h3 className="font-bold text-white text-xl mb-2">{feat.title}</h3>
                           <p className="text-slate-400 text-sm">{feat.desc}</p>
                       </div>
                   ))}
              </div>

              <div className="flex flex-col items-center">
                  <button 
                    onClick={handleWhopRedirect}
                    className="px-12 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-2xl rounded-2xl shadow-[0_0_50px_rgba(79,70,229,0.5)] transition-all hover:scale-105 hover:shadow-[0_0_80px_rgba(79,70,229,0.7)]"
                  >
                      Join New Era Today
                  </button>
                  <p className="mt-6 text-sm font-bold text-indigo-300 bg-indigo-900/30 px-4 py-2 rounded-full border border-indigo-500/30 animate-pulse">
                      🎄 HOLIDAY SALE: $20/month (Lock in forever!) • Cancel anytime • Instant access to Discord & all premium tools
                  </p>
              </div>
          </div>
      </div>

      {/* 11.5 NEW SUCCESS STORIES SECTION */}
      <div className="py-24 bg-gradient-to-b from-slate-900 to-black relative border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-4xl font-display font-black text-center mb-16">Success <span className="text-emerald-400">Stories</span></h2>
              <div className="grid md:grid-cols-4 gap-6">
                  {successStories.map((story, i) => (
                      <div key={i} className="bg-[#0f172a] p-6 rounded-2xl border border-white/10 hover:border-emerald-500/50 transition-all hover:-translate-y-1">
                          <div className="flex justify-between items-start mb-4">
                              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white">{story.name[0]}</div>
                              <div className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded font-bold">{story.type}</div>
                          </div>
                          <div className="text-2xl font-black text-white mb-1">{story.profit}</div>
                          <div className="text-xs text-slate-500 mb-4">Profit Generated</div>
                          <div className="text-sm text-slate-300">"Closed in just <span className="text-white font-bold">{story.time}</span> using the automated scripts."</div>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* 12. FINAL FOOTER CTA - REVAMPED */}
      <div className="py-24 bg-gradient-to-t from-black to-slate-900 border-t border-white/5 text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
           <div className="max-w-4xl mx-auto px-6 relative z-10">
               <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6 leading-tight">
                   Ready to Automate Your Wealth?
               </h2>
               <p className="text-xl text-slate-400 mb-10">
                   Join our VIP community and start analyzing deals like a pro.
               </p>
               <button 
                 onClick={handleWhopRedirect}
                 className="px-16 py-6 bg-white text-black font-black text-2xl rounded-full hover:bg-cyan-50 transition-all hover:scale-105 shadow-[0_0_50px_rgba(255,255,255,0.3)] mb-8"
                >
                   Get Started Now
               </button>
               <p className="text-slate-600 text-xs">&copy; 2025 New Era PRO / WholesalePro AI. All rights reserved.</p>
           </div>
      </div>

    </div>
  );
};
