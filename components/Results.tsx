import React, { useRef } from 'react';
import { DealState, StrategyResult } from '../types';

interface ResultsProps {
  state: DealState;
  onReset: () => void;
}

const StrategyCard = ({ strategy, recommended }: { strategy: StrategyResult; recommended: boolean }) => (
  <div className={`relative bg-slate-800 rounded-xl p-6 border ${recommended ? 'border-emerald-500 shadow-lg shadow-emerald-900/20' : 'border-slate-700'} flex flex-col h-full`}>
    {recommended && (
      <div className="absolute -top-3 right-4 bg-emerald-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
        Best Option
      </div>
    )}
    <h3 className="text-xl font-bold text-white mb-2">{strategy.strategyName}</h3>
    <div className="mb-4">
      <span className="text-sm text-slate-400 uppercase tracking-wider">Offer Price</span>
      <div className="text-3xl font-bold text-emerald-400">${strategy.offerPrice.toLocaleString()}</div>
    </div>
    
    <div className="space-y-3 mb-6 flex-grow">
      <div className="flex justify-between text-sm">
        <span className="text-slate-400">Entry Fee</span>
        <span className="text-white font-mono">${strategy.entryFee.toLocaleString()}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-slate-400">Monthly Cashflow</span>
        <span className={`font-mono ${strategy.monthlyCashFlow >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
          ${strategy.monthlyCashFlow.toLocaleString()}
        </span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-slate-400">Proj. Net Profit</span>
        <span className="text-emerald-400 font-mono font-bold">+${strategy.netProfit.toLocaleString()}</span>
      </div>
    </div>

    <div className="mt-4 pt-4 border-t border-slate-700">
        <p className="text-xs text-slate-400 mb-2">{strategy.description}</p>
        <div className="flex flex-wrap gap-2">
            {strategy.pros.slice(0,2).map((pro, i) => (
                <span key={i} className="text-[10px] bg-emerald-900/30 text-emerald-300 px-2 py-1 rounded border border-emerald-900/50">{pro}</span>
            ))}
        </div>
    </div>
  </div>
);

export const Results: React.FC<ResultsProps> = ({ state, onReset }) => {
  const { calculatedOffers, aiAnalysis, aiRating, isLoadingAI } = state;
  const analysisData = aiAnalysis ? JSON.parse(aiAnalysis) : null;
  const bottomRef = useRef<HTMLDivElement>(null);

  if (!calculatedOffers) return null;

  return (
    <div className="max-w-6xl mx-auto pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">Deal Dashboard</h2>
          <p className="text-slate-400 mt-1">{state.property.address}</p>
        </div>
        <button onClick={onReset} className="mt-4 md:mt-0 px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
          Start New Deal
        </button>
      </div>

      {/* AI Rating Badge */}
      <div className="mb-10 bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-2xl border border-slate-700 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-shrink-0 relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-700" />
                <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" 
                    strokeDasharray={351.86} 
                    strokeDashoffset={351.86 - (351.86 * (analysisData?.rating || 0)) / 100}
                    className="text-emerald-500 transition-all duration-1000 ease-out" 
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">{isLoadingAI ? '...' : analysisData?.rating || 0}</span>
                <span className="text-xs text-slate-400 uppercase">Score</span>
            </div>
        </div>
        <div className="flex-grow">
            <h3 className="text-xl font-bold text-white mb-2">AI Deal Analysis</h3>
            {isLoadingAI ? (
                 <div className="flex items-center space-x-2 text-emerald-400 animate-pulse">
                    <span>Analyzing market data and calculating optimal strategies...</span>
                 </div>
            ) : (
                <div className="prose prose-invert prose-sm max-w-none">
                    <p className="text-slate-300 italic">{analysisData?.bestStrategy ? `Recommended Strategy: ${analysisData.bestStrategy}` : ''}</p>
                    {/* Render simple markdown breakdown safely */}
                    <div className="mt-4 text-slate-400 whitespace-pre-wrap font-light">
                        {analysisData?.breakdown?.replace(/#/g, '') || "Analysis unavailable."}
                    </div>
                </div>
            )}
        </div>
      </div>

      {/* Strategies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StrategyCard strategy={calculatedOffers.cash} recommended={analysisData?.bestStrategy?.toLowerCase().includes('cash')} />
        <StrategyCard strategy={calculatedOffers.subTo} recommended={analysisData?.bestStrategy?.toLowerCase().includes('sub')} />
        <StrategyCard strategy={calculatedOffers.sellerFinance} recommended={analysisData?.bestStrategy?.toLowerCase().includes('finance')} />
        <StrategyCard strategy={calculatedOffers.novation} recommended={analysisData?.bestStrategy?.toLowerCase().includes('novation')} />
      </div>

      {/* Email Generator */}
      {!isLoadingAI && analysisData?.emailDraft && (
        <div className="bg-slate-900 rounded-xl p-8 border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                Generated Offer Letter
            </h3>
            <div className="bg-slate-950 p-6 rounded-lg border border-slate-800 font-mono text-sm text-slate-300 whitespace-pre-wrap">
                {analysisData.emailDraft}
            </div>
            <div className="mt-4 flex justify-end">
                <button 
                    onClick={() => navigator.clipboard.writeText(analysisData.emailDraft)}
                    className="text-sm bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors border border-slate-600"
                >
                    Copy to Clipboard
                </button>
            </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
};