
import React, { useState } from 'react';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-white/5">
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
            >
                <span className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{question}</span>
                <span className={`text-2xl transition-transform duration-300 ${isOpen ? 'rotate-45 text-cyan-400' : 'text-slate-500'}`}>+</span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
                <p className="text-slate-400 leading-relaxed">{answer}</p>
            </div>
        </div>
    );
};

export const HowItWorksPage: React.FC = () => {
  const handlePurchase = () => {
      // Direct to app access since it's a demo
     window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 pb-12 px-6 overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HERO */}
        <div className="text-center mb-24">
           <h1 className="text-6xl md:text-8xl font-display font-black mb-6 tracking-tight">
            From Lead to Contract <br/>
            <span className="gradient-text">In Minutes</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">Stop wasting hours on spreadsheets. Our automated pipeline does the heavy lifting so you can focus on closing.</p>
        </div>

        {/* TIMELINE */}
        <div className="relative mb-32">
            {/* Glowing Central Timeline Line */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 -translate-x-1/2 hidden md:block opacity-30"></div>
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 -translate-x-1/2 hidden md:block blur-md opacity-50"></div>

            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center gap-16 mb-24 relative group">
                <div className="md:w-1/2 flex justify-end">
                    <div className="bg-slate-900/50 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 shadow-2xl relative z-10 max-w-lg w-full group-hover:-translate-x-2">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <div className="relative">
                            <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300 origin-left">🔍</div>
                            <h3 className="text-3xl font-bold mb-3 text-white">1. Input Property</h3>
                            <p className="text-slate-400 text-lg leading-relaxed">Enter the address. Our system instantly pulls public record data, tax info, and estimates to build a complete property profile.</p>
                        </div>
                    </div>
                </div>
                
                {/* Center Node */}
                <div className="absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-4 border-[#020617] bg-blue-500 flex items-center justify-center font-black text-xl text-white z-20 hidden md:flex shadow-[0_0_20px_rgba(59,130,246,0.6)]">
                    1
                    <div className="absolute inset-0 rounded-full border border-white/50 animate-ping"></div>
                </div>

                <div className="md:w-1/2 pl-12 hidden md:flex items-center">
                    <div className="text-8xl font-black text-white/5 select-none">DATA</div>
                </div>
            </div>

             {/* Step 2 */}
             <div className="flex flex-col md:flex-row items-center gap-16 mb-24 relative group">
                <div className="md:w-1/2 pr-12 hidden md:flex justify-end items-center">
                    <div className="text-8xl font-black text-white/5 select-none">AI</div>
                </div>
                
                 {/* Center Node */}
                <div className="absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-4 border-[#020617] bg-purple-500 flex items-center justify-center font-black text-xl text-white z-20 hidden md:flex shadow-[0_0_20px_rgba(168,85,247,0.6)]">
                    2
                    <div className="absolute inset-0 rounded-full border border-white/50 animate-ping delay-75"></div>
                </div>

                <div className="md:w-1/2 flex justify-start">
                    <div className="bg-slate-900/50 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 shadow-2xl relative z-10 max-w-lg w-full group-hover:translate-x-2">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <div className="relative">
                            <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300 origin-left">🧠</div>
                            <h3 className="text-3xl font-bold mb-3 text-white">2. Analyze & Calculate</h3>
                            <p className="text-slate-400 text-lg leading-relaxed">The AI compares the property against Cash, SubTo, and Seller Finance models. It checks entry fee requirements and calculates your projected ROI.</p>
                        </div>
                    </div>
                </div>
            </div>

             {/* Step 3 */}
             <div className="flex flex-col md:flex-row items-center gap-16 mb-24 relative group">
                <div className="md:w-1/2 flex justify-end">
                    <div className="bg-slate-900/50 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-pink-500/50 transition-all duration-300 shadow-2xl relative z-10 max-w-lg w-full group-hover:-translate-x-2">
                        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <div className="relative">
                            <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300 origin-left">💬</div>
                            <h3 className="text-3xl font-bold mb-3 text-white">3. Make the Offer</h3>
                            <p className="text-slate-400 text-lg leading-relaxed">Use the AI-generated scripts and email drafts to present the offer to the seller or agent. We provide the logic to back up your numbers.</p>
                        </div>
                    </div>
                </div>

                 {/* Center Node */}
                <div className="absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-4 border-[#020617] bg-pink-500 flex items-center justify-center font-black text-xl text-white z-20 hidden md:flex shadow-[0_0_20px_rgba(236,72,153,0.6)]">
                    3
                    <div className="absolute inset-0 rounded-full border border-white/50 animate-ping delay-150"></div>
                </div>
                
                <div className="md:w-1/2 pl-12 hidden md:flex items-center">
                    <div className="text-8xl font-black text-white/5 select-none">DEAL</div>
                </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col md:flex-row items-center gap-16 relative group">
                <div className="md:w-1/2 pr-12 hidden md:flex justify-end items-center">
                    <div className="text-8xl font-black text-white/5 select-none">CASH</div>
                </div>

                 {/* Center Node */}
                <div className="absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-4 border-[#020617] bg-emerald-500 flex items-center justify-center font-black text-xl text-white z-20 hidden md:flex shadow-[0_0_20px_rgba(16,185,129,0.6)]">
                    4
                    <div className="absolute inset-0 rounded-full border border-white/50 animate-ping delay-200"></div>
                </div>

                <div className="md:w-1/2 flex justify-start">
                    <div className="bg-slate-900/50 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-emerald-500/50 transition-all duration-300 shadow-2xl relative z-10 max-w-lg w-full group-hover:translate-x-2">
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <div className="relative">
                            <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300 origin-left">🚀</div>
                            <h3 className="text-3xl font-bold mb-3 text-white">4. Dispo & Close</h3>
                            <p className="text-slate-400 text-lg leading-relaxed">Push the deal to your Dispo pipeline. Track buyer interest, manage earnest money, and close the deal to get paid.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* RESULTS METRICS - REDESIGNED */}
        <div className="py-24 border-t border-white/10">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16">Results You Can <span className="text-emerald-400">Expect</span></h2>
            
            <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                    <div>
                        <h3 className="text-3xl font-bold text-white mb-6">Performance <span className="text-emerald-400">Unleashed</span></h3>
                        <p className="text-slate-400 text-lg leading-relaxed mb-8">
                            We benchmarked WholesalePro AI against traditional manual underwriting. The difference isn't just speed—it's profitability.
                        </p>
                        
                        <div className="space-y-6">
                            <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-slate-400">Analysis Speed</span>
                                    <span className="text-emerald-400 font-bold">10x Faster</span>
                                </div>
                                <div className="h-3 bg-slate-800 rounded-full overflow-hidden flex">
                                    <div className="w-[5%] bg-slate-600 h-full"></div> {/* Manual */}
                                    <div className="w-[95%] bg-emerald-500 h-full shadow-[0_0_10px_#10b981] relative">
                                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                    </div>
                                </div>
                                <div className="flex justify-between text-[10px] text-slate-600 mt-1">
                                    <span>Manual (45m)</span>
                                    <span>AI (4s)</span>
                                </div>
                            </div>
                            
                            <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-slate-400">Offer Acceptance Rate</span>
                                    <span className="text-emerald-400 font-bold">95% Increase</span>
                                </div>
                                <div className="h-3 bg-slate-800 rounded-full overflow-hidden relative">
                                    <div className="absolute left-0 top-0 bottom-0 bg-slate-600 w-[20%]"></div>
                                    <div className="absolute left-[20%] top-0 bottom-0 bg-emerald-500 w-[75%] shadow-[0_0_10px_#10b981]"></div>
                                </div>
                                <div className="flex justify-between text-[10px] text-slate-600 mt-1">
                                    <span>Cash Only</span>
                                    <span>Creative Offers</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-950/80 border border-white/10 rounded-2xl p-6 shadow-2xl relative">
                        {/* Fake Dashboard UI */}
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                            <div className="text-xs font-mono text-emerald-500">LIVE METRICS_</div>
                            <div className="flex gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            </div>
                        </div>

                        <div className="text-center py-4">
                            <div className="text-sm text-slate-500 uppercase tracking-widest mb-2">Avg Assignment Fee</div>
                            <div className="text-6xl font-black text-white tracking-tighter mb-2">$22,150</div>
                            <div className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/30">
                                ▲ 34% vs Market Avg
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-3 gap-2 text-center">
                            <div className="p-2 bg-white/5 rounded">
                                <div className="text-xs text-slate-500">Deals/Mo</div>
                                <div className="font-bold text-white">3.2</div>
                            </div>
                            <div className="p-2 bg-white/5 rounded">
                                <div className="text-xs text-slate-500">Hrs Saved</div>
                                <div className="font-bold text-white">120+</div>
                            </div>
                            <div className="p-2 bg-white/5 rounded">
                                <div className="text-xs text-slate-500">Buyers</div>
                                <div className="font-bold text-white">10k+</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* STRATEGY DEEP DIVE */}
        <div className="py-24 border-t border-white/10">
            <div className="text-center mb-16">
                 <h2 className="text-4xl font-display font-bold mb-4">Master The <span className="text-purple-400">Trifecta</span></h2>
                 <p className="text-slate-400">Most wholesalers only know one trick. You'll master all three.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
                {/* Strategy 1 */}
                <div className="bg-[#0f172a] p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-all">
                    <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-black select-none pointer-events-none">1</div>
                    <div className="text-4xl mb-6">🏦</div>
                    <h3 className="text-2xl font-bold text-white mb-4">Subject To (SubTo)</h3>
                    <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                        Buying a property subject to the existing mortgage. You take over the payments, the deed transfers to you, but the loan stays in the seller's name.
                    </p>
                    <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-500/20">
                        <span className="text-blue-400 font-bold text-xs uppercase">Best When:</span>
                        <p className="text-white text-sm mt-1">Low Equity, Low Interest Rate</p>
                    </div>
                </div>

                {/* Strategy 2 */}
                <div className="bg-[#0f172a] p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-purple-500/30 transition-all">
                    <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-black select-none pointer-events-none">2</div>
                    <div className="text-4xl mb-6">🤝</div>
                    <h3 className="text-2xl font-bold text-white mb-4">Seller Finance</h3>
                    <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                        The seller acts as the bank. You make monthly payments directly to them. Great for free-and-clear properties where the seller wants income.
                    </p>
                    <div className="bg-purple-900/20 p-4 rounded-xl border border-purple-500/20">
                        <span className="text-purple-400 font-bold text-xs uppercase">Best When:</span>
                        <p className="text-white text-sm mt-1">No Mortgage, High Equity</p>
                    </div>
                </div>

                {/* Strategy 3 */}
                <div className="bg-[#0f172a] p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-pink-500/30 transition-all">
                    <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-black select-none pointer-events-none">3</div>
                    <div className="text-4xl mb-6">✨</div>
                    <h3 className="text-2xl font-bold text-white mb-4">Novation</h3>
                    <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                        Partnering with the seller to renovate and sell the property on the retail market (MLS) for maximum profit, splitting the upside.
                    </p>
                    <div className="bg-pink-900/20 p-4 rounded-xl border border-pink-500/20">
                        <span className="text-pink-400 font-bold text-xs uppercase">Best When:</span>
                        <p className="text-white text-sm mt-1">Good Area, Needs Cosmetic Work</p>
                    </div>
                </div>
            </div>
        </div>

        {/* THE AUTOMATION ENGINE - FUTURISTIC OVERHAUL */}
        <div className="py-24">
             <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16">The Automation <span className="text-purple-400">Engine</span></h2>
             
             <div className="relative max-w-5xl mx-auto">
                 {/* Central Core */}
                 <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-600/20 rounded-full blur-[50px] animate-pulse"></div>
                 <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-black border border-purple-500 rounded-full flex items-center justify-center z-20 shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                     <span className="text-4xl animate-pulse">🧠</span>
                 </div>

                 {/* Connecting Lines (CSS Gradients) */}
                 <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/50 to-transparent -translate-x-1/2 hidden md:block"></div>
                 <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent -translate-y-1/2 hidden md:block"></div>

                 <div className="grid md:grid-cols-2 gap-12 md:gap-24 relative z-10">
                     {/* Node 1 */}
                     <div className="bg-[#0f172a] p-6 rounded-2xl border border-purple-500/30 shadow-lg relative group hover:scale-105 transition-transform">
                         <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#020617] border border-purple-500 rounded-full z-30 hidden md:block group-hover:bg-purple-500 transition-colors"></div>
                         <div className="flex items-start gap-4">
                             <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-2xl border border-blue-500/30">🤖</div>
                             <div>
                                 <h3 className="font-bold text-white text-lg mb-1">AI Smart-Fetch</h3>
                                 <p className="text-xs text-slate-400">Scrapes county records & skip traces owners in &lt;300ms.</p>
                             </div>
                         </div>
                     </div>

                     {/* Node 2 */}
                     <div className="bg-[#0f172a] p-6 rounded-2xl border border-purple-500/30 shadow-lg relative group hover:scale-105 transition-transform">
                         <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#020617] border border-purple-500 rounded-full z-30 hidden md:block group-hover:bg-purple-500 transition-colors"></div>
                         <div className="flex items-start gap-4">
                             <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center text-2xl border border-cyan-500/30">⚡</div>
                             <div>
                                 <h3 className="font-bold text-white text-lg mb-1">Instant Comps</h3>
                                 <p className="text-xs text-slate-400">Filters outliers & non-arm's length sales automatically.</p>
                             </div>
                         </div>
                     </div>

                     {/* Node 3 */}
                     <div className="bg-[#0f172a] p-6 rounded-2xl border border-purple-500/30 shadow-lg relative group hover:scale-105 transition-transform">
                         <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#020617] border border-purple-500 rounded-full z-30 hidden md:block group-hover:bg-purple-500 transition-colors"></div>
                         <div className="flex items-start gap-4">
                             <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center text-2xl border border-pink-500/30">📑</div>
                             <div>
                                 <h3 className="font-bold text-white text-lg mb-1">Auto-Contracts</h3>
                                 <p className="text-xs text-slate-400">Generates state-specific PSAs pre-filled with deal data.</p>
                             </div>
                         </div>
                     </div>

                     {/* Node 4 */}
                     <div className="bg-[#0f172a] p-6 rounded-2xl border border-purple-500/30 shadow-lg relative group hover:scale-105 transition-transform">
                         <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#020617] border border-purple-500 rounded-full z-30 hidden md:block group-hover:bg-purple-500 transition-colors"></div>
                         <div className="flex items-start gap-4">
                             <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center text-2xl border border-emerald-500/30">💰</div>
                             <div>
                                 <h3 className="font-bold text-white text-lg mb-1">Buyer Matching</h3>
                                 <p className="text-xs text-slate-400">Tags deal against 10k+ buy boxes instantly.</p>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
        </div>

        {/* NEW SECTION: FAQ */}
        <div className="py-24 border-t border-white/10 max-w-3xl mx-auto">
             <h2 className="text-4xl font-display font-bold text-center mb-12">Frequently Asked <span className="gradient-text">Questions</span></h2>
             
             <div className="space-y-2">
                 <FAQItem 
                    question="Do I need a real estate license?" 
                    answer="No. Wholesaling is the business of selling the rights to a contract, not selling the house itself. Our training covers the legal nuances." 
                 />
                 <FAQItem 
                    question="How accurate are the Arv/Repair estimates?" 
                    answer="We pull data from live MLS feeds and adjust repair costs based on local labor rates (Low/Med/High). It's roughly 95% accurate for initial underwriting." 
                 />
                 <FAQItem 
                    question="Can I cancel anytime?" 
                    answer="Yes. There are no contracts. You can cancel your $20/mo subscription instantly from your dashboard settings." 
                 />
                 <FAQItem 
                    question="Does this work for commercial real estate?" 
                    answer="Currently, our AI is optimized for Single Family (1-4 units) and small Multi-Family properties. Commercial modules are coming in Q4." 
                 />
             </div>
        </div>

        {/* FINAL CTA */}
        <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative bg-gradient-to-br from-slate-900 to-black p-12 rounded-3xl border border-amber-500/30 text-center overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-5xl font-display font-black text-white mb-6">Ready to Close Your First Deal?</h2>
                    <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">Join the new standard of wholesaling. Access the tools, the data, and the community today.</p>
                    
                     <button 
                        onClick={handlePurchase} 
                        className="group relative inline-flex items-center justify-center px-12 py-6 text-xl font-black text-white transition-all duration-200 bg-slate-950 border border-amber-500 rounded-2xl focus:outline-none hover:scale-105 hover:shadow-[0_0_60px_rgba(245,158,11,0.5)] overflow-hidden"
                     >
                        <div 
                            className="absolute inset-0 opacity-20 animate-stripe-flow"
                            style={{
                                backgroundImage: 'repeating-linear-gradient(45deg, #f59e0b, #f59e0b 20px, #ea580c 20px, #ea580c 40px)',
                                backgroundSize: '56.57px 56.57px'
                            }}
                        ></div>
                        <span className="relative flex items-center gap-3 z-10">
                            <span className="text-3xl">🚀</span>
                            <span>GET INSTANT ACCESS NOW</span>
                        </span>
                    </button>
                    <p className="mt-4 text-xs text-slate-500">Limited time offer: Lock in $20/mo pricing.</p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};
