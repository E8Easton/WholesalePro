
import React, { useState } from 'react';
import { ScriptTemplate } from '../types';

export const scripts: ScriptTemplate[] = [
    {
        id: 'seller_finance_basic',
        title: "Basic Seller Finance Email",
        category: "Seller Finance",
        tips: "Use when property has been on market 90+ days.",
        content: `Good Afternoon,\n\nI'm reaching out to present an offer for your listing on [INSERT PROPERTY ADDRESS]. I noticed that this property had been sitting on the market for 90+ days. I know that your client isn't looking to do any seller financing, but after sitting on the market for this long maybe I can entice them with an offer over their asking price.\n\n- Buy Price: [INSERT OFFER PRICE]\n- Down Payment: [INSERT DOWN PAYMENT]\n- Monthly Payment: [INSERT MONTHLY PAYMENT]\n- Term Length: 5 years. On the 5th year I sell and pay out your client everything else I owe.\n\nYour commission is paid up front and if we were to miss 2 consecutive payments, the property will be deeded back to the previous owner.\n\nRegards,`
    },
    {
        id: 'checkmate_pitch',
        title: "The Checkmate Pitch",
        category: "Seller Finance",
        tips: "Use when the numbers don't work for a loan or cash offer.",
        content: `Good Evening,\n\nThank you for taking the time to speak with me today about your listing on [INSERT PROPERTY ADDRESS]. I'm interested in making an offer as close to your asking price as I possibly can. I initially intended to offer [INSERT ASKING PRICE] for this, however if I get a mortgage on the property at that price, I'm paying significantly more per month while renting the property for market rates. After management fees, I'm losing a lot per month.\n\nI'd have to get this at [INSERT LOW CASH PRICE] if I'm going to cashflow at least $500/month. If that is too low, I'll also offer you [INSERT HIGHER PRICE] on a short term set of payments. I'd do [INSERT HIGHER PRICE], [INSERT DOWN PAYMENT] as a down payment, [INSERT MONTHLY PAYMENT]/month for 72 months. After the 72nd month I'll owe the balance which I can get to your client via a sale or refinance.\n\nI'd love to be closer to asking price with my first offer, but there's just no way to cashflow with today's interest rate. Let me know what your thoughts are on these offers.`
    },
    {
        id: 'trojan_horse',
        title: "The Trojan Horse (Trust)",
        category: "Trusts",
        tips: "Use when seller owes close to asking price (Low Equity).",
        content: `Good Afternoon,\n\nThank you for taking the time to speak with me today about your listing on [INSERT PROPERTY ADDRESS]. I'm a 1031 buyer with capital gains to defer. I have 2 weeks to land on my next purchase.\n\nOffer 1: Cash Offer\nBuy Price: [INSERT CASH PRICE]\nEMD: $2,000 non refundable\n\nNote: After checking public record, I see your client purchased the property recently. It seems my offer may result in them bringing cash to the closing table. I love the house and still want to do the deal even if this is the case. If so, here's what I propose:\n\nThere's upwards of 5 different ways you can take over a seller's loan position. You may remember wrap-around mortgages, loan assumptions, or even trust acquisition agreements. Here's what I'd offer in the event they'd have to bring money to the closing table: I'll pay your commission in full, and put $7,500 cash in your client's pocket to take over their position in the loan.\n\nPlease let me know what your client's thoughts are.`
    },
    {
        id: 'trust_structure',
        title: "Trust Structure Explanation",
        category: "Trusts",
        tips: "Use to explain Garn St Germain / Due on Sale protection.",
        content: `Good Evening,\n\nThe subject to method that we had discussed on the phone provides your client with profit but it puts them at risk. The due on sale clause could be called if you were to sell your property subject to the existing mortgage. There's an easy work around: we just put the property in a trust and purchase the trust off of the seller.\n\nThe trust goes on title and contains the property and its mortgage. We'd be looking to pay [INSERT ENTRY FEE] to take over your client's position in their mortgage.\n\nYour commission would come out of the [INSERT ENTRY FEE] that we pay at the close of escrow. We still view this as a good option profit wise for them given their mortgage balance. In essence we're offering your client a higher profit figure than they would make from a conventional sale but without the risk of subject to deals and the due on sale clause.`
    },
    {
        id: 'multi_family_hybrid',
        title: "Hybrid Multi-Family",
        category: "Multi-Family",
        tips: "Use for 1-3 unit multi-family properties.",
        content: `Good Evening,\n\nThank you for taking the time to speak with me today. On the phone I mentioned that your client owes [INSERT MORTGAGE BALANCE] on their mortgage. At their asking price, after paying a 5% listing commission, they walk away with very little.\n\nHere's an alternative offer:\n- Buy Price: [INSERT HIGHER PRICE]\n- Down Payment: [INSERT DOWN PAYMENT]\n- Term Length: 5 years\n- Monthly Payments: [INSERT MONTHLY PAYMENT]\n\nHere's how the price is broken down. [INSERT MORTGAGE BALANCE] of this figure is owed on the mortgage that I would take over. The loan doesn't have to be assumable, there's 4+ ways to legally take over a mortgage. [INSERT DOWN PAYMENT] is a down payment and I make payments on the remaining balance. My payments are [INSERT MONTHLY PAYMENT] for 60 months and the payout would be the balance on the 60th month.`
    },
    {
        id: 'low_equity_script',
        title: "Low Equity Phone Script",
        category: "Low Equity",
        tips: "Use when calling agents about low equity deals.",
        content: `- Hey I’m calling about [ADDRESS]. I was going to make an offer on this not far below asking price at [MORTGAGE BALANCE] but then I noticed they owe just about what I’m offering.\n- I’m guessing [MORTGAGE BALANCE] or even $10k above this wouldn’t even be possible to accept huh?\n- Huh okay. Well, I have a unique solution on this if other offers are coming in around what they owe. What if I paid your commission and put 4% of asking in your client’s pocket? I’ll even cover title fees.\n- I’m not sure if I would be a good option though, Initially I was going to offer pretty close to asking but that looks like an even worse option!\n- (Agent asks how): Oh yea I’d just use line 203 on the HUD statement. The 203 line on all HUD statements nation wide allows up to take over a seller’s mortgage. Similar to an assumption.`
    }
];

export const ScriptsPage: React.FC = () => {
    const [filter, setFilter] = useState('All');
    
    const categories = ['All', 'Seller Finance', 'Subject To', 'Trusts', 'Low Equity', 'Multi-Family'];
    const filteredScripts = filter === 'All' ? scripts : scripts.filter(s => s.category === filter);

    return (
        <div className="max-w-7xl mx-auto p-8 pb-32">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-display font-black text-white mb-4">Scripts & <span className="text-cyan-400">Templates</span></h1>
                <p className="text-slate-400">Battle-tested templates to lock up deals. Copy, paste, close.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-12">
                {categories.map(cat => (
                    <button 
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${filter === cat ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                {filteredScripts.map(script => (
                    <div key={script.id} className="bg-slate-900 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-colors group">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="inline-block px-2 py-1 rounded text-[10px] uppercase font-bold bg-white/5 text-slate-400 mb-2 border border-white/5">
                                    {script.category}
                                </div>
                                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{script.title}</h3>
                            </div>
                            <button 
                                onClick={() => navigator.clipboard.writeText(script.content)}
                                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                                title="Copy to Clipboard"
                            >
                                📋
                            </button>
                        </div>
                        
                        <div className="bg-black/30 rounded-xl p-4 mb-4 font-mono text-xs text-slate-300 whitespace-pre-wrap h-64 overflow-y-auto border border-white/5">
                            {script.content}
                        </div>

                        <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold bg-emerald-900/10 p-2 rounded border border-emerald-900/30">
                            <span>💡 Pro Tip:</span>
                            <span className="font-normal text-emerald-200">{script.tips}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mentorship Upsell Section */}
            <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-indigo-500/20 rounded-3xl p-10 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]"></div>
                
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-indigo-500/30">
                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
                        Taking New Students
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6">Need Help Closing? <br/>Get <span className="text-indigo-400">1-on-1 Mentorship</span></h2>
                    
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Scripts are great, but guidance is better. Get direct access to Easton and the core team. We'll review your deals, roleplay these scripts with you, and help you negotiate difficult sellers.
                    </p>
                    
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 bg-white text-black font-black text-lg rounded-xl hover:bg-slate-200 transition-all hover:scale-105 shadow-xl">
                            Apply For 1-on-1
                        </button>
                        <button className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold text-lg rounded-xl hover:bg-white/5 transition-all">
                            Book a Strategy Call
                        </button>
                    </div>
                    
                    <p className="text-xs text-slate-500 mt-6 font-medium">Spots are extremely limited.</p>
                </div>
            </div>
        </div>
    );
};
