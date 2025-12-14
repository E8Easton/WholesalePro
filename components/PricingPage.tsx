
import React from 'react';

// Comparison Data
const comparisons = [
  { name: "PropStream", price: "$97/mo", features: ["Data Only", "No AI Analysis", "Manual Skip Tracing"], sub: "Just lists" },
  { name: "Privy", price: "$149/mo", features: ["Limited Markets", "Basic Comps", "No Calculator"], sub: "Basic insights" },
  { name: "BatchLeads", price: "$297/mo", features: ["Expensive Skips", "Hard to Learn", "No Legal Docs"], sub: "High overhead" },
  { name: "WholesalePro AI", price: "$20/mo", features: ["All-in-One AI System", "10k+ Buyers Included", "Auto-Calculators"], sub: "Automated Wealth", highlight: true }
];

// What You Get Data
const whatYouGet = [
  { item: "Private Discord Access", value: "$497", icon: "👾", desc: "Exclusive community of 2,350+ active wholesalers networking daily." },
  { item: "Weekly Coaching Calls", value: "$297", icon: "🎤", desc: "Live Q&A and deal reviews every week with Easton directly." },
  { item: "Deal Analysis Templates", value: "$97", icon: "📊", desc: "The exact spreadsheets used to underwrite 7-figure deals." },
  { item: "Cold Calling Scripts", value: "$147", icon: "📞", desc: "50+ proven scripts for every seller objection and scenario." },
  { item: "6 Premium AI Calculators", value: "$1,497", icon: "🧮", desc: "ROI, Cash Flow, SubTo, Seller Finance, and Novation calculators." },
  { item: "Smart Mode AI Analyzer", value: "$997", icon: "🤖", desc: "Auto-fill property data and generate offer letters in seconds." },
  { item: "10,000+ Buyer Database", value: "$2,997", icon: "💰", desc: "Verified cash buyers with buy boxes in every major US market." },
  { item: "Legal Library", value: "$497", icon: "⚖️", desc: "Iron-clad, attorney-reviewed contracts for all creative deal types." },
];

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div className="border-b border-white/10 bg-white/5 rounded-xl mb-4 overflow-hidden">
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none hover:bg-white/5 transition-colors"
            >
                <span className="text-lg font-bold text-white">{question}</span>
                <span className={`text-2xl transition-transform duration-300 text-amber-400 font-light ${isOpen ? 'rotate-45' : ''}`}>+</span>
            </button>
            <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-6 text-slate-400 leading-relaxed text-sm border-t border-white/5 pt-4">
                    {answer}
                </div>
            </div>
        </div>
    );
};

export const PricingPage: React.FC = () => {
  const handlePurchase = () => {
      window.open("https://whop.com/new-era-wholesale/", "_blank");
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-12 pb-12 px-4 md:px-6 font-sans">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* 1. HERO PRICING STACK CARD */}
        <div className="mb-24 flex justify-center">
            <div className="relative w-full max-w-md bg-black border-2 border-amber-500 rounded-[3rem] p-8 md:p-12 shadow-[0_0_60px_rgba(245,158,11,0.3)] overflow-hidden group hover:scale-[1.01] transition-transform duration-300">
                
                {/* Badge */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-black uppercase tracking-widest text-xs py-2 px-6 rounded-b-xl shadow-lg z-20 flex items-center gap-2">
                    <span>👑</span> Most Popular
                </div>

                {/* Glow Effect */}
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(251,191,36,0.1)_0%,transparent_70%)] animate-pulse-slow pointer-events-none"></div>

                <div className="relative z-10 text-center">
                    <h2 className="text-3xl font-display font-bold text-white mb-2">New Era <br/> <span className="text-amber-400">Premium</span></h2>
                    
                    <div className="my-8">
                        <span className="text-8xl font-black text-amber-300 text-shadow-lg tracking-tighter">$20</span>
                        <span className="text-slate-400 font-medium text-xl block mt-2">/month</span>
                    </div>

                    <div className="bg-amber-900/20 border border-amber-500/30 rounded-xl p-4 mb-8 text-left relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                        <h4 className="font-bold text-amber-400 text-sm uppercase mb-1 flex items-center gap-2">
                            <span className="animate-pulse">🔒</span> Lock in $20 Forever
                        </h4>
                        <p className="text-xs text-amber-100/80 leading-relaxed">
                            Price never increases. Join now and keep this price for life, even when we raise it to $297/mo.
                        </p>
                    </div>

                    <p className="text-white font-bold mb-6 text-lg">Everything you need to <br/> wholesale like a pro:</p>

                    <ul className="space-y-4 text-left mb-10">
                        {[
                            '17 AI-Powered Premium Tools',
                            '10,000+ Verified Cash Buyers',
                            '70+ Institutional Buyers & Hedge Funds',
                            'VIP Discord Community (2,350+ members)',
                            'Weekly Live Q&A with Easton',
                            'Contracts, Scripts & Templates'
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                                <span className="text-amber-400 font-bold text-lg leading-none">✓</span>
                                {item}
                            </li>
                        ))}
                    </ul>

                    <button 
                        onClick={handlePurchase}
                        className="w-full py-5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-black font-black text-xl rounded-2xl shadow-[0_0_30px_rgba(251,191,36,0.4)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                    >
                        <span>👑</span> Join Premium for $20
                    </button>
                    
                    <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-green-400 bg-green-900/20 py-2 px-4 rounded-full border border-green-500/20 w-fit mx-auto">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Instant Access • Cancel Anytime • Secure
                    </div>
                </div>
            </div>
        </div>

        {/* 2. COMPARISON TABLE - PAIN POINT EMPHASIS */}
        <div className="py-20 border-t border-white/5 bg-gradient-to-b from-slate-900/50 to-black relative">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
             
             <h2 className="text-3xl md:text-5xl font-display font-black mb-6">Stop <span className="text-red-500 line-through decoration-white">Overpaying</span> For <br/> Tools That Do Less.</h2>
             <p className="text-slate-400 mb-16 max-w-2xl mx-auto">You could pay $500+/mo for separate subscriptions, or get everything in one place for $20.</p>

             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto px-4">
                 {comparisons.map((item, i) => (
                     <div key={i} className={`p-8 rounded-3xl border flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 group
                        ${item.highlight 
                            ? 'bg-gradient-to-b from-slate-900 to-black border-emerald-500 shadow-[0_0_50px_-10px_rgba(16,185,129,0.3)] scale-105 z-10' 
                            : 'bg-[#0f172a] border-white/5 opacity-80 hover:opacity-100 hover:border-white/20'}`
                     }>
                         {item.highlight && <div className="absolute top-0 inset-x-0 h-1 bg-emerald-500 shadow-[0_0_20px_#10b981]"></div>}
                         
                         <div className={`text-xl font-bold mb-4 ${item.highlight ? 'text-white' : 'text-slate-500'}`}>{item.name}</div>
                         
                         <div className={`text-4xl font-black mb-2 ${item.highlight ? 'text-emerald-400' : 'text-slate-300'}`}>{item.price}</div>
                         
                         <div className="w-full h-px bg-white/5 my-6"></div>

                         <div className="space-y-3 mb-8 w-full">
                             {item.features.map((feat, idx) => (
                                 <div key={idx} className={`text-xs font-bold uppercase tracking-widest ${item.highlight ? 'text-emerald-400' : 'text-slate-500'}`}>
                                     {item.highlight ? '✓ ' : '• '} {feat}
                                 </div>
                             ))}
                         </div>

                         {item.highlight ? (
                             <button onClick={handlePurchase} className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all text-sm">
                                 Start Saving Now
                             </button>
                         ) : (
                             <div className="text-xs text-red-400 font-mono bg-red-900/10 px-3 py-1 rounded border border-red-900/20">❌ Too Expensive</div>
                         )}
                     </div>
                 ))}
             </div>
             
             {/* CTA after Comparison */}
             <div className="mt-16 flex justify-center">
                 <button onClick={handlePurchase} className="group relative flex items-center justify-center px-12 py-6 text-xl font-black text-black transition-all duration-300 bg-emerald-500 border-2 border-emerald-400 rounded-3xl focus:outline-none hover:scale-105 hover:shadow-[0_0_60px_rgba(16,185,129,0.6)] overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <span className="relative z-10 flex flex-col md:flex-row items-center gap-3">
                        <span className="tracking-tight">Switch to WholesalePro & Save</span>
                        <span className="bg-black/80 text-white px-4 py-1 rounded-xl text-2xl shadow-lg border border-white/20 transform rotate-[-2deg] group-hover:rotate-0 transition-transform">
                            $480/mo
                        </span>
                    </span>
                    <span className="relative z-10 ml-4 text-black text-3xl group-hover:translate-x-2 transition-transform">→</span>
                 </button>
             </div>
        </div>

        {/* 3. EVERYTHING YOU GET (CARD GRID) */}
        <div className="py-24 max-w-6xl mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-display font-black mb-6 text-center">
                Everything Included In <br/> <span className="text-amber-400">The Stack</span>
            </h2>
            <p className="text-slate-400 mb-16 max-w-2xl mx-auto text-lg">We didn't just build a course. We built an operating system. Here is the full breakdown of your $20 membership.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {whatYouGet.map((row, i) => (
                    <div key={i} className="bg-gradient-to-br from-slate-900 to-[#050b14] border border-white/5 rounded-3xl p-6 hover:border-amber-500/30 hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="text-4xl mb-4 bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner border border-white/5">{row.icon}</div>
                        <h3 className="font-bold text-white text-lg mb-2">{row.item}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed mb-4 min-h-[60px]">{row.desc}</p>
                        <div className="inline-block bg-emerald-900/20 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold px-3 py-1 rounded">
                            Value: {row.value}
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={handlePurchase} className="px-16 py-6 bg-white text-black font-black text-2xl rounded-full hover:bg-slate-200 transition-all hover:scale-105 shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                Get All 8 Bonuses Now 🚀
            </button>
        </div>

        {/* 4. TOTAL VALUE CALCULATION */}
        <div className="py-12 max-w-3xl mx-auto px-4">
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-1 rounded-3xl shadow-2xl animate-gradient-x">
                <div className="bg-[#020617] rounded-[22px] p-8 md:p-12 relative overflow-hidden">
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-left">
                            <div className="text-slate-400 font-bold uppercase tracking-wider text-sm mb-2">Total Value</div>
                            <div className="text-3xl md:text-4xl font-black text-slate-200 line-through decoration-red-500 decoration-4">$12,723/yr</div>
                        </div>
                        <div className="hidden md:block text-4xl text-slate-600">→</div>
                        <div className="text-right">
                            <div className="text-emerald-400 font-bold uppercase tracking-wider text-sm mb-2 flex items-center justify-end gap-2">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> Your Price
                            </div>
                            <div className="text-6xl md:text-7xl font-black text-white">$20<span className="text-2xl text-slate-500">/mo</span></div>
                        </div>
                    </div>
                    
                    <div className="mt-10 pt-10 border-t border-white/10 text-center">
                        <p className="text-slate-400 mb-6 italic">"This is literally cheaper than my Netflix subscription." — David K., Member</p>
                        <button onClick={handlePurchase} className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xl rounded-xl shadow-lg shadow-emerald-500/20 transition-all transform hover:-translate-y-1">
                            Claim This Offer Before It Expires
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* 5. WHO BUILT THIS - CYBER OVERHAUL */}
        <div className="py-24 border-t border-white/10 bg-[#020617] relative overflow-hidden">
            {/* Cyber Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f59e0b1a_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-amber-500/30 bg-amber-950/30 text-amber-400 text-[10px] font-mono font-bold tracking-widest mb-4">
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                        ARCHITECT_PROFILE
                    </div>
                    <h2 className="text-5xl font-display font-black text-white mb-4">E8 Easton Built This</h2>
                    <p className="text-xl text-amber-500 font-bold tracking-widest uppercase">MEET EASTON</p>
                </div>

                <div className="flex flex-col md:flex-row gap-12 items-center bg-slate-900/40 border border-white/10 p-8 rounded-[3rem] backdrop-blur-sm relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-[3rem] pointer-events-none"></div>
                    
                    {/* Image / Stats Side */}
                    <div className="w-full md:w-1/3 space-y-6 relative">
                         {/* Tech Corners */}
                        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-amber-500 rounded-tl-xl"></div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-amber-500 rounded-br-xl"></div>
                        
                        <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 relative group shadow-2xl">
                            <img src="easton.jpg" alt="Easton" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-6">
                                <div className="text-3xl font-black text-white">$750k+</div>
                                <div className="text-xs text-amber-400 uppercase font-bold">Closed Deals (2 Years)</div>
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="w-full md:w-2/3 text-left">
                        <h3 className="text-3xl font-bold text-white mb-6">From $0 to <span className="text-amber-400">Empire</span> without a license.</h3>
                        
                        <div className="prose prose-invert prose-lg text-slate-300 leading-relaxed mb-8 font-light">
                            <p className="mb-4">
                                I started wholesaling with <strong className="text-white">zero capital</strong>, no fancy courses, and definitely no tech background. Just me, a laptop, and an obsession with finding a better way.
                            </p>
                            <p>
                                Most gurus charge <strong className="text-red-400">$5,000</strong> for outdated courses that tell you to drive for dollars. I hated that. So I built the system I wish I had when I started.
                            </p>
                        </div>

                        <div className="bg-black/40 border-l-4 border-amber-500 p-6 rounded-r-xl mb-10 shadow-lg relative">
                            <div className="absolute -top-3 -left-1 text-4xl text-amber-500">"</div>
                            <h4 className="text-amber-500 font-bold text-xs uppercase mb-2 tracking-widest pl-2">The Mission</h4>
                            <p className="text-lg font-medium text-white italic pl-2">
                                To give independent wholesalers the same AI firepower as hedge funds, for less than the cost of lunch.
                            </p>
                        </div>

                        <button onClick={handlePurchase} className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-black rounded-xl transition-all flex items-center gap-3 group shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                            <span>Join New Era Inner Circle</span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* 6. FAQ SECTION */}
        <div className="py-24 max-w-3xl mx-auto text-left px-4">
            <h2 className="text-4xl font-display font-bold text-center mb-12">Frequently Asked <span className="text-amber-400">Questions</span></h2>
            
            <FAQItem 
                question="Is the software beginner friendly?" 
                answer="Absolutely. We built WholesalePro AI specifically for people who have never closed a deal before. The interface is simple: Input an address, click a button, get an offer. We also include a full 'Wholesaling 101' training module inside to get you up to speed."
            />
            <FAQItem 
                question="What makes the community different?" 
                answer="Most communities are dead ghost towns. Ours is a 24/7 war room. Members are posting deals, sharing contracts, and partnering up daily. Plus, Easton is active in the chat answering questions personally."
            />
            <FAQItem 
                question="Are there any hidden fees or upsells?" 
                answer="No. The $20/month covers everything shown on this page. We don't charge extra for the buyer list, the contracts, or the AI tokens. It's truly an all-in-one price."
            />
        </div>

        {/* 7. FINAL STICKY CTA */}
        <div className="sticky bottom-6 z-50 max-w-md mx-auto px-4">
             <div className="bg-[#0f172a] border border-amber-500 rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-4 ring-4 ring-black/50">
                 <div>
                     <div className="text-[10px] text-amber-400 uppercase font-bold tracking-wider animate-pulse">LIMITED OFFER</div>
                     <div className="text-white font-bold text-lg">$20/mo <span className="text-xs font-normal text-slate-500">Lock it in</span></div>
                 </div>
                 <button onClick={handlePurchase} className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-black font-black px-6 py-3 rounded-xl shadow-lg transition-all hover:scale-105 text-sm uppercase tracking-wide">
                     Get Access Now
                 </button>
             </div>
        </div>

      </div>
    </div>
  );
};
