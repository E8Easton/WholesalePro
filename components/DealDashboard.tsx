import React, { useState, useEffect } from 'react';
import { PropertyData, MortgageData, OfferCalculations, Comp, CRMLead } from '../types';
import { generateAIComps, summarizePropertyDescription, generateOfferScript } from '../services/geminiService';
import { scripts } from './ScriptsPage'; // Import templates

interface DealDashboardProps {
  property: PropertyData;
  mortgageData: MortgageData;
  onUpdateProperty: (updates: Partial<PropertyData>) => void;
  onUpdateMortgage: (updates: Partial<MortgageData>) => void;
  onAddToCRM: (lead: Partial<CRMLead>) => void;
  onReset: () => void;
}

// Helper for PMT calculation
const pmt = (rate: number, nper: number, pv: number) => {
  if (rate === 0) return nper === 0 ? 0 : -(pv / nper);
  const pvif = Math.pow(1 + rate, nper);
  return -((rate * pv * pvif) / (pvif - 1));
};

// Tooltip Component for Red Dots or Info Icons
const InfoDot = ({ text }: { text: string }) => (
    <div className="group relative inline-block ml-1 z-50">
        <div className="w-4 h-4 rounded-full bg-slate-700 text-slate-300 hover:bg-emerald-500 hover:text-white text-[10px] font-bold flex items-center justify-center cursor-help transition-colors">?</div>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-slate-900 border border-white/20 text-white text-xs p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl z-[100]">
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900"></div>
        </div>
    </div>
);

// Simple SVG Pie Chart
const SimplePieChart = ({ data }: { data: { label: string, value: number, color: string }[] }) => {
    const total = data.reduce((acc, item) => acc + item.value, 0);
    let currentAngle = 0;

    if (total <= 0) return (
        <div className="w-32 h-32 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs text-slate-500">
            No Data
        </div>
    );

    return (
        <div className="relative w-48 h-48">
            <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                {data.map((item, i) => {
                    const sliceAngle = (item.value / total) * 360;
                    if (sliceAngle === 0) return null;
                    const x1 = 50 + 50 * Math.cos(Math.PI * currentAngle / 180);
                    const y1 = 50 + 50 * Math.sin(Math.PI * currentAngle / 180);
                    const x2 = 50 + 50 * Math.cos(Math.PI * (currentAngle + sliceAngle) / 180);
                    const y2 = 50 + 50 * Math.sin(Math.PI * (currentAngle + sliceAngle) / 180);
                    
                    const pathData = sliceAngle >= 360 
                        ? `M 50 50 m -50 0 a 50 50 0 1 0 100 0 a 50 50 0 1 0 -100 0`
                        : `M 50 50 L ${x1} ${y1} A 50 50 0 ${sliceAngle > 180 ? 1 : 0} 1 ${x2} ${y2} Z`;

                    const path = <path key={i} d={pathData} fill={item.color} stroke="#0f172a" strokeWidth="2" />;
                    currentAngle += sliceAngle;
                    return path;
                })}
                <circle cx="50" cy="50" r="30" fill="#0f172a" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-xs text-slate-400 font-bold uppercase">Cashflow</span>
                <span className="text-sm font-black text-white">${Math.round(total).toLocaleString()}</span>
            </div>
        </div>
    );
};

// Input Group with Tooltip
const InputGroup = ({ label, tooltip, value, onChange, type = "number", prefix = "", suffix = "" }: any) => (
    <div>
        <label className="text-[10px] text-slate-400 uppercase font-bold mb-1 flex items-center gap-1">
            {label}
            {tooltip && <InfoDot text={tooltip} />}
        </label>
        <div className="relative">
             {prefix && <span className="absolute left-3 top-2.5 text-slate-500 text-sm font-bold">{prefix}</span>}
            <input 
                type={type} 
                className={`w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white text-sm focus:border-emerald-500 outline-none transition-colors ${prefix ? 'pl-6' : ''} ${suffix ? 'pr-8' : ''}`}
                value={value} 
                onChange={e => onChange(type === 'number' ? Number(e.target.value) : e.target.value)} 
                placeholder="0"
            />
            {suffix && <span className="absolute right-3 top-2.5 text-slate-500 text-xs font-bold">{suffix}</span>}
        </div>
    </div>
);

// Manual Comp Row Component
const ManualCompRow: React.FC<{ index: number, comp: Comp, onChange: (c: Comp) => void, onDelete: () => void }> = ({ index, comp, onChange, onDelete }) => (
    <div className="grid grid-cols-12 gap-2 mb-2 items-center">
        <div className="col-span-4">
            <input 
                className="w-full bg-black/20 border border-white/10 rounded p-2 text-xs text-white" 
                placeholder="Address"
                value={comp.address}
                onChange={e => onChange({...comp, address: e.target.value})}
            />
        </div>
        <div className="col-span-3">
             <input 
                type="number"
                className="w-full bg-black/20 border border-white/10 rounded p-2 text-xs text-white" 
                placeholder="Price"
                value={comp.salePrice || ''}
                onChange={e => onChange({...comp, salePrice: Number(e.target.value)})}
            />
        </div>
        <div className="col-span-2">
             <input 
                type="number"
                className="w-full bg-black/20 border border-white/10 rounded p-2 text-xs text-white" 
                placeholder="Sqft"
                value={comp.sqft || ''}
                onChange={e => onChange({...comp, sqft: Number(e.target.value)})}
            />
        </div>
        <div className="col-span-2">
             <input 
                className="w-full bg-black/20 border border-white/10 rounded p-2 text-xs text-white" 
                placeholder="Date"
                value={comp.dateSold}
                onChange={e => onChange({...comp, dateSold: e.target.value})}
            />
        </div>
        <div className="col-span-1 text-center">
            <button onClick={onDelete} className="text-red-400 hover:text-red-200">×</button>
        </div>
    </div>
);

export const DealDashboard: React.FC<DealDashboardProps> = ({ property, mortgageData, onUpdateProperty, onUpdateMortgage, onAddToCRM, onReset }) => {
  const [step, setStep] = useState<'strategy' | 'core' | 'analysis' | 'expenses' | 'results'>('strategy');
  const [strategy, setStrategy] = useState<'Cash' | 'SubTo' | 'Creative' | null>(null);
  const [comps, setComps] = useState<Comp[]>([]);
  const [loadingComps, setLoadingComps] = useState(false);
  const [manualComps, setManualComps] = useState<Comp[]>([]);
  const [calculatedOffer, setCalculatedOffer] = useState<OfferCalculations | null>(null);
  const [descriptionSummary, setDescriptionSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [generatedScript, setGeneratedScript] = useState('');
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [scriptType, setScriptType] = useState<'email' | 'text'>('email');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [imgSeed, setImgSeed] = useState(Date.now()); 
  const [bypassWarning, setBypassWarning] = useState(false);
  
  // UI States
  const [scriptTextSize, setScriptTextSize] = useState(14);

  // Address Validation
  const isValidAddress = (addr: string) => {
      if (!addr) return false;
      const trimmed = addr.trim();
      return trimmed.length > 5 && /\d/.test(trimmed) && /[a-zA-Z]/.test(trimmed);
  };

  // New Calculator State (The Oven)
  const initialOvenState = {
      sfDownPayment: 0,
      sfInterestRate: 0,
      sfAmortization: 30,
      sfBalloon: 5,
      sfInterestOnly: false,
      assignmentFee: 10000,
      closingCostsPercent: 2,
      otherMonthly: 0,
      vacancyRate: 5,
      maintenanceRate: 10,
      managementRate: 10,
  };
  const [oven, setOven] = useState(initialOvenState);

  // Real-time calculation state for the Oven display
  const [ovenStats, setOvenStats] = useState({
      monthlyPITI: 0,
      totalExpenses: 0,
      cashFlow: 0,
      entryFee: 0,
      cashOnCash: 0
  });

  // --- Real-time Calculator Effect ---
  useEffect(() => {
      if (step !== 'expenses') return;

      const monthlyRent = property.marketRent || 0;
      
      // Expenses
      const taxes = (property.taxAnnual || 0) / 12;
      const insurance = (property.insuranceAnnual || 0) / 12;
      const hoa = property.hoaMonthly || 0;
      const other = oven.otherMonthly || 0;
      
      // Variable Expenses
      const vacancy = monthlyRent * (oven.vacancyRate / 100);
      const maintenance = monthlyRent * (oven.maintenanceRate / 100);
      const management = monthlyRent * (oven.managementRate / 100);
      
      const operatingExpenses = taxes + insurance + hoa + other + vacancy + maintenance + management;

      let debtService = 0;
      let entryFee = 0;

      if (strategy === 'Creative') {
          // Seller Finance Logic
          const loanAmount = (property.price || 0) - oven.sfDownPayment;
          if (loanAmount > 0) {
              if (oven.sfInterestOnly) {
                  debtService = (loanAmount * (oven.sfInterestRate / 100)) / 12;
              } else {
                  const rate = (oven.sfInterestRate / 100) / 12;
                  const nper = oven.sfAmortization * 12;
                  debtService = Math.abs(pmt(rate, nper, loanAmount));
              }
          }
          entryFee = oven.sfDownPayment + (property.repairs || 0) + oven.assignmentFee + ((property.price || 0) * (oven.closingCostsPercent / 100));
      
      } else if (strategy === 'SubTo') {
          // SubTo Logic
          debtService = mortgageData.monthlyPayment || 0;
          entryFee = oven.sfDownPayment + (mortgageData.arrears || 0) + (property.repairs || 0) + oven.assignmentFee + ((property.price || 0) * (oven.closingCostsPercent / 100));
      } else {
          // Cash
          debtService = 0;
          entryFee = (property.price || 0) + (property.repairs || 0) + oven.assignmentFee + ((property.price || 0) * (oven.closingCostsPercent / 100));
      }

      const cashFlow = monthlyRent - operatingExpenses - debtService;
      const annualCashFlow = cashFlow * 12;
      const cashOnCash = entryFee > 0 ? (annualCashFlow / entryFee) * 100 : 0;

      setOvenStats({
          monthlyPITI: debtService,
          totalExpenses: operatingExpenses,
          cashFlow,
          entryFee,
          cashOnCash
      });

  }, [step, strategy, property, mortgageData, oven]);

  // Validation Check Render
  if (!bypassWarning && !isValidAddress(property.address)) {
      return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-in fade-in zoom-in duration-300">
              <div className="w-24 h-24 bg-amber-900/20 border border-amber-500/30 rounded-full flex items-center justify-center mb-6 animate-pulse">
                  <span className="text-5xl">⚠️</span>
              </div>
              <h2 className="text-3xl font-display font-black text-white mb-4">Address Format Warning</h2>
              <p className="text-slate-400 mb-2 max-w-lg text-lg">
                  "<span className="text-white font-bold">{property.address}</span>" doesn't look like a standard property address.
              </p>
              <p className="text-slate-500 mb-8 max-w-md text-sm leading-relaxed">
                  Our systems work best with a full address (e.g. "123 Main St"). Proceeding with an incomplete address may result in failed data fetching or inaccurate comps.
              </p>
              
              <div className="flex flex-col md:flex-row gap-4">
                  <button 
                      onClick={onReset}
                      className="px-8 py-3 bg-white hover:bg-slate-200 text-black font-black text-lg rounded-full transition-all flex items-center gap-2 justify-center shadow-lg"
                  >
                      <span>←</span> Go Back
                  </button>
                  <button 
                      onClick={() => setBypassWarning(true)}
                      className="px-8 py-3 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/50 text-amber-400 font-bold rounded-xl transition-all flex items-center gap-2 justify-center shadow-lg hover:shadow-amber-500/20"
                  >
                      Proceed with Caution <span>→</span>
                  </button>
              </div>
          </div>
      );
  }


  // --- Step 0: Strategy Selection ---
  const selectStrategy = (strat: 'Cash' | 'SubTo' | 'Creative') => {
      setStrategy(strat);
      if (strat === 'SubTo') onUpdateMortgage({ hasMortgage: true });
      if (strat === 'Creative') onUpdateMortgage({ hasMortgage: false });
      setStep('core');
      window.scrollTo(0, 0);
  };

  const handleAnalyze = () => {
      const offer: OfferCalculations = {
          offerPrice: property.price || 0,
          downPayment: oven.sfDownPayment,
          monthlyPayment: ovenStats.monthlyPITI,
          cashFlow: ovenStats.cashFlow,
          cashOnCash: ovenStats.cashOnCash,
          assignmentFee: oven.assignmentFee,
          entryFee: ovenStats.entryFee,
          entryFeePercent: (ovenStats.entryFee / (property.price || 1)) * 100,
          netProfit: ovenStats.cashFlow * 12 * 5, 
          piti: ovenStats.monthlyPITI,
          amortization: oven.sfAmortization,
          closingCosts: (property.price || 0) * (oven.closingCostsPercent / 100),
          agentCommission: 0,
          totalExpenses: ovenStats.totalExpenses
      };
      setCalculatedOffer(offer);
      setStep('results');
  };

  const handleResetExpenses = () => {
      if(window.confirm("Reset expense calculations?")) {
          setOven(initialOvenState);
          onUpdateProperty({ taxAnnual: 0, insuranceAnnual: 0, hoaMonthly: 0 });
          onUpdateMortgage({ monthlyPayment: 0, arrears: 0, balance: 0 }); 
      }
  };

  const fetchAIComps = async () => {
    setLoadingComps(true);
    const results = await generateAIComps(property.address, property.type);
    setComps(results);
    setLoadingComps(false);
  };

  const handleSummarize = async () => {
      if (!property.description) return;
      setIsSummarizing(true);
      const summary = await summarizePropertyDescription(property.description);
      setDescriptionSummary(summary);
      setIsSummarizing(false);
  };

  const handleGenerateScript = async () => {
      if (!calculatedOffer) return;
      setIsGeneratingScript(true);
      let finalScript = "";
      const template = scripts.find(s => s.id === selectedTemplate);
      if (template) {
          finalScript = template.content
            .replace(/\[INSERT AGENT NAME\]/g, property.realtorName || "Agent")
            .replace(/\[INSERT PROPERTY ADDRESS\]/g, property.address)
            .replace(/\[INSERT OFFER PRICE\]/g, `$${calculatedOffer.offerPrice.toLocaleString()}`)
            .replace(/\[INSERT DOWN PAYMENT\]/g, `$${calculatedOffer.downPayment.toLocaleString()}`)
            .replace(/\[INSERT MONTHLY PAYMENT\]/g, `$${Math.round(calculatedOffer.monthlyPayment).toLocaleString()}`);
      } else {
          const promptType = scriptType === 'text' ? 'text message (SMS)' : 'email';
          finalScript = await generateOfferScript(calculatedOffer, strategy || 'Creative', property.address + ` (${promptType})`, property.realtorName);
      }
      setGeneratedScript(finalScript);
      setIsGeneratingScript(false);
  };

  const proceedFromCore = () => {
      if (strategy === 'Cash') {
          setStep('analysis');
      } else {
          setStep('expenses');
      }
      window.scrollTo(0,0);
  };

  const getMetricColor = (val: number, type: 'cf'|'coc'|'entry') => {
      if (type === 'cf') return val > 500 ? 'text-emerald-400' : val > 200 ? 'text-orange-400' : 'text-red-400';
      if (type === 'coc') return val > 15 ? 'text-emerald-400' : val > 8 ? 'text-orange-400' : 'text-red-400';
      return 'text-white';
  };

  // --- Renderers ---

  // 1. STRATEGY SELECTOR
  if (step === 'strategy') {
      return (
          <div className="max-w-6xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="text-center mb-16">
                  <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6">Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Weapon</span></h1>
                  <p className="text-slate-400 text-xl max-w-2xl mx-auto">Select the exit strategy that fits the seller's situation best.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                      { 
                          id: 'Cash', 
                          icon: '💰', 
                          title: 'Cash Offer', 
                          desc: 'Quick close for distressed properties with high equity.', 
                          color: 'amber',
                          gradient: 'from-amber-600 to-orange-600',
                          pros: ["⚡ Fastest Closing Speed", "🔥 Seller Loves Certainty", "🛠️ Simple Math"],
                          bestFor: "Hoarders, Foreclosure, Major Rehabs"
                      },
                      { 
                          id: 'SubTo', 
                          icon: '🏦', 
                          title: 'Subject To', 
                          desc: 'Take over existing low-rate mortgages payments.', 
                          color: 'blue',
                          gradient: 'from-blue-600 to-cyan-600',
                          pros: ["📉 Minimal Down Payment", "🔒 Keep Low Interest Rate", "📈 High Cash-on-Cash"],
                          bestFor: "Low Equity, Behind on Payments, Divorce"
                      },
                      { 
                          id: 'Creative', 
                          icon: '🤝', 
                          title: 'Seller Finance', 
                          desc: 'Seller becomes the bank. Flexible terms on free & clear homes.', 
                          color: 'purple',
                          gradient: 'from-purple-600 to-pink-600',
                          pros: ["💸 No Bank Needed", "📝 Flexible Monthly Terms", "🚀 Principal Only Options"],
                          bestFor: "Free & Clear, Tired Landlords, Burnout"
                      },
                  ].map((s) => (
                      <button 
                          key={s.id}
                          onClick={() => selectStrategy(s.id as any)}
                          className="group relative flex flex-col h-full bg-slate-900 border border-white/5 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                      >
                          {/* Top Gradient Bar */}
                          <div className={`h-2 w-full bg-gradient-to-r ${s.gradient}`}></div>
                          
                          <div className="p-8 flex flex-col h-full relative z-10">
                              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                  <span className="text-6xl filter drop-shadow-lg">{s.icon}</span>
                              </div>
                              
                              <h3 className="text-3xl font-bold text-white mb-3 font-display tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
                                  {s.title}
                              </h3>
                              
                              <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8 border-b border-white/5 pb-6">
                                  {s.desc}
                              </p>

                              <div className="space-y-3 mb-8 flex-grow">
                                  {s.pros.map((p, i) => (
                                      <div key={i} className="flex items-center gap-3 text-left">
                                          <div className={`w-1.5 h-1.5 rounded-full bg-${s.color}-500 shadow-[0_0_8px_currentColor] text-${s.color}-500`}></div>
                                          <span className="text-slate-300 text-sm font-bold">{p}</span>
                                      </div>
                                  ))}
                              </div>

                              <div className={`mt-auto pt-4 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-${s.color}-400 group-hover:text-white transition-colors`}>
                                  <span>{s.bestFor}</span>
                                  <span className="text-xl">→</span>
                              </div>
                          </div>

                          {/* Hover Glow Background */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                      </button>
                  ))}
              </div>
          </div>
      );
  }

  // 2. CORE DATA
  if (step === 'core') {
      return (
          <div className="max-w-7xl mx-auto py-8 px-4 animate-in fade-in duration-500">
              <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-display font-black text-white flex items-center gap-4">
                      <button 
                        onClick={() => setStep('strategy')} 
                        className="px-8 py-3 bg-white hover:bg-slate-200 text-black rounded-full font-black text-lg flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-105"
                      >
                          <span>←</span> CHANGE STRATEGY
                      </button>
                      <span className="text-slate-600">|</span>
                      1. Core Property Data
                  </h2>
                  <div className="flex gap-4">
                     <button onClick={onReset} className="text-slate-400 hover:text-white">Cancel</button>
                  </div>
              </div>

              {/* AI Image Generation Section - Single View */}
              <div className="relative w-full h-[500px] rounded-3xl overflow-hidden mb-8 group bg-slate-900 border border-white/10 shadow-2xl">
                  {/* Using Unsplash source with seed to simulate AI generation per user request logic */}
                  <img 
                    src={`https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=80&seed=${imgSeed}`} 
                    className="w-full h-full object-cover opacity-80" 
                    alt="AI Visual" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  
                  {/* Regenerate Button */}
                  <button 
                    onClick={() => setImgSeed(Date.now())}
                    className="absolute top-6 right-6 px-4 py-2 bg-black/60 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold text-white hover:bg-black/80 transition-all flex items-center gap-2"
                  >
                      <span>🔄</span> Regenerate House Vision
                  </button>
                  
                  <div className="absolute bottom-0 left-0 w-full p-8">
                      <div className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-300 text-[10px] font-bold uppercase rounded-full mb-2 border border-cyan-500/30">
                          AI Visualization
                      </div>
                      <h1 className="text-4xl font-bold text-white">{property.address}</h1>
                      <p className="text-lg text-slate-300">{property.city}, {property.state} {property.zip}</p>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Left: Critical Numbers */}
                  <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/10">
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                          <span className="text-amber-500">⚡</span> Critical Inputs
                      </h3>
                      
                      <div className="space-y-6">
                          <div>
                              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block flex items-center">
                                  ARV (After Repair Value) <InfoDot text="Estimated value of the property after all renovations are completed." />
                              </label>
                              <input 
                                type="number" 
                                value={property.arv || ''} 
                                onChange={e => onUpdateProperty({ arv: Number(e.target.value) })}
                                className="w-full bg-black/40 border border-white/20 rounded-xl p-4 text-2xl font-black text-white focus:border-amber-500 outline-none transition-colors placeholder-slate-700"
                                placeholder="0.00"
                              />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-6">
                              <div>
                                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block flex items-center">
                                      Est. Repairs <InfoDot text="Total cost of materials and labor to bring property to retail condition." />
                                  </label>
                                  <input 
                                    type="number" 
                                    value={property.repairs || ''} 
                                    onChange={e => onUpdateProperty({ repairs: Number(e.target.value) })}
                                    className="w-full bg-black/40 border border-white/20 rounded-xl p-3 text-lg font-bold text-white focus:border-amber-500 outline-none"
                                    placeholder="0"
                                  />
                              </div>
                              <div>
                                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block flex items-center">
                                      Market Rent <InfoDot text="Projected monthly rental income for this property." />
                                  </label>
                                  <input 
                                    type="number" 
                                    value={property.marketRent || ''} 
                                    onChange={e => onUpdateProperty({ marketRent: Number(e.target.value) })}
                                    className="w-full bg-black/40 border border-white/20 rounded-xl p-3 text-lg font-bold text-white focus:border-amber-500 outline-none"
                                    placeholder="0"
                                  />
                              </div>
                          </div>
                          
                          <div className="p-4 bg-white/5 rounded-xl flex justify-between items-center">
                              <span className="text-sm text-slate-400">Zillow Est. Value:</span>
                              <span className="text-lg font-bold text-slate-200">${property.price?.toLocaleString()}</span>
                          </div>
                      </div>
                  </div>

                  {/* Right: Description & Agent */}
                  <div className="space-y-6">
                      <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/10 h-fit">
                          <div className="flex justify-between items-center mb-2">
                              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Property Description</label>
                              <button onClick={handleSummarize} className="text-xs bg-cyan-600 hover:bg-cyan-500 text-white px-2 py-1 rounded transition-colors flex items-center gap-1">
                                  {isSummarizing ? 'Thinking...' : '✨ AI Summarize'}
                              </button>
                          </div>
                          {descriptionSummary && (
                              <div className="mb-4 p-3 bg-cyan-900/20 border border-cyan-500/30 rounded-lg text-sm text-cyan-200">
                                  <strong>AI Summary:</strong> {descriptionSummary}
                              </div>
                          )}
                          <textarea 
                            value={property.description} 
                            readOnly
                            className="w-full bg-transparent text-sm text-slate-300 leading-relaxed resize-none h-32 focus:outline-none"
                          />
                      </div>

                      <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/10">
                          <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider border-b border-white/5 pb-2">Agent / Contact Info</h4>
                          <div className="grid grid-cols-1 gap-4">
                              <input 
                                placeholder="Input Realtor Name" 
                                className="bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-blue-500 outline-none placeholder-slate-600" 
                                value={property.realtorName || ''} 
                                onChange={e => onUpdateProperty({realtorName: e.target.value})} 
                              />
                              <div className="grid grid-cols-2 gap-4">
                                  <input 
                                    placeholder="Input Phone" 
                                    className="bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-blue-500 outline-none placeholder-slate-600" 
                                    value={property.realtorPhone || ''} 
                                    onChange={e => onUpdateProperty({realtorPhone: e.target.value})} 
                                  />
                                  <input 
                                    placeholder="Input Email" 
                                    className="bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-blue-500 outline-none placeholder-slate-600" 
                                    value={property.realtorEmail || ''} 
                                    onChange={e => onUpdateProperty({realtorEmail: e.target.value})} 
                                  />
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="flex justify-end pt-6 border-t border-white/10">
                  <button onClick={proceedFromCore} className="px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-105">
                      Next: {strategy === 'Cash' ? 'Market Analysis' : 'Financials'} →
                  </button>
              </div>
          </div>
      );
  }

  if (step === 'analysis') { return ( <div className="max-w-7xl mx-auto py-8 px-4 animate-in fade-in slide-in-from-right-8 duration-500"> <div className="flex justify-between items-center mb-8"> <h2 className="text-3xl font-display font-black text-white">2. Market Analysis (Cash Mode)</h2> <button onClick={() => setStep('core')} className="px-8 py-3 bg-white hover:bg-slate-200 text-black rounded-full font-black text-lg flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-105"><span>←</span> Back</button> </div> <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"> <div className="bg-slate-900/50 p-8 rounded-3xl border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.1)]"> <div className="flex justify-between items-center mb-6"> <h3 className="text-xl font-bold text-white">AI Auto-Comps</h3> <button onClick={fetchAIComps} disabled={loadingComps} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg shadow-lg"> {loadingComps ? 'Scanning...' : 'Run Zillow Scrape'} </button> </div> {comps.length > 0 ? ( <div className="space-y-4"> {comps.map((c, i) => ( <div key={i} className="bg-black/20 p-4 rounded-xl border border-white/5 flex justify-between items-center"> <div> <div className="font-bold text-white text-lg">${c.salePrice.toLocaleString()}</div> <div className="text-xs text-slate-400">{c.address}</div> </div> <div className="text-right"> <div className="text-cyan-400 font-bold">{c.similarity}% Match</div> <div className="text-xs text-slate-500">{c.distancedMiles}mi away</div> </div> </div> ))} <div className="mt-4 p-4 bg-cyan-900/20 border border-cyan-500/30 rounded-xl text-center"> <div className="text-xs text-cyan-300 uppercase font-bold mb-1">Suggested ARV</div> <div className="text-2xl font-black text-white"> ${Math.round(comps.reduce((a, b) => a + b.salePrice, 0) / comps.length).toLocaleString()} </div> </div> </div> ) : ( <div className="text-center py-12 text-slate-500 border-2 border-dashed border-white/10 rounded-xl"> Click "Run Zillow Scrape" to pull live comps. </div> )} </div> <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/10"> <h3 className="text-xl font-bold text-white mb-6">Manual Comps Entry</h3> <div className="mb-4"> <div className="grid grid-cols-12 gap-2 text-[10px] uppercase font-bold text-slate-500 mb-2"> <div className="col-span-4">Address</div> <div className="col-span-3">Price</div> <div className="col-span-2">Sqft</div> <div className="col-span-2">Date</div> <div className="col-span-1"></div> </div> {manualComps.map((c, i) => ( <ManualCompRow key={i} index={i} comp={c} onChange={(updated) => setManualComps(prev => { const n = [...prev]; n[i] = updated; return n; })} onDelete={() => setManualComps(prev => prev.filter((_, idx) => idx !== i))} /> ))} <button onClick={() => setManualComps(prev => [...prev, { address: '', salePrice: 0, sqft: 0, dateSold: '', similarity: 0, distancedMiles: 0 }])} className="w-full py-3 border border-dashed border-white/20 rounded-xl text-slate-400 hover:text-white hover:border-white/40 text-xs font-bold uppercase tracking-wider" > + Add Comp Row </button> </div> </div> </div> <div className="flex justify-end pt-8 mt-8 border-t border-white/10"> <button onClick={() => { setStep('expenses'); window.scrollTo(0,0); }} className="px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"> Next: Financials → </button> </div> </div> ); }

  if (step === 'expenses') {
      const pieData = [
          { label: 'Debt', value: ovenStats.monthlyPITI, color: '#f59e0b' },
          { label: 'OpEx', value: ovenStats.totalExpenses, color: '#ef4444' },
          { label: 'Profit', value: Math.max(0, ovenStats.cashFlow), color: '#10b981' }
      ];

      return (
          <div className="max-w-7xl mx-auto py-8 px-4 animate-in fade-in slide-in-from-right-8 duration-500">
               <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-display font-black text-white">3. {strategy} Offer Oven</h2>
                  <div className="flex gap-4">
                      <button onClick={handleResetExpenses} className="px-4 py-2 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 text-xs font-bold uppercase">Reset</button>
                      <button 
                        onClick={() => { if(strategy === 'Cash') setStep('analysis'); else setStep('core'); }} 
                        className="px-8 py-3 bg-white hover:bg-slate-200 text-black rounded-full font-black text-lg flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-105"
                      >
                          <span>←</span> Back
                      </button>
                  </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                  <div className="lg:col-span-2 space-y-6">
                      <div className="bg-slate-900/80 border border-white/10 p-6 rounded-3xl">
                          <h3 className="text-lg font-bold text-white mb-4 flex items-center"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>Deal Structure</h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              <InputGroup label="Purchase Price" tooltip="The total price you are offering to buy the property for." value={property.price || ''} onChange={(v:number) => onUpdateProperty({ price: v })} />
                              <InputGroup label="Assignment Fee" tooltip="Your desired profit fee for finding and contracting the deal." value={oven.assignmentFee} onChange={(v:number) => setOven({...oven, assignmentFee: v})} />
                              <InputGroup label="Closing Costs %" tooltip="Estimated percentage of purchase price for title/closing fees (Std: 1-3%)." value={oven.closingCostsPercent} onChange={(v:number) => setOven({...oven, closingCostsPercent: v})} />
                          </div>
                          <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-4">
                              {strategy === 'Creative' && (<> <InputGroup label="Down Payment" tooltip="Cash paid to the seller upfront at closing." value={oven.sfDownPayment} onChange={(v:number) => setOven({...oven, sfDownPayment: v})} /> <InputGroup label="Interest Rate %" tooltip="The annual interest rate agreed upon with the seller." value={oven.sfInterestRate} onChange={(v:number) => setOven({...oven, sfInterestRate: v})} /> <InputGroup label="Amortization (Yrs)" tooltip="The time period used to calculate monthly payments (Standard is 30)." value={oven.sfAmortization} onChange={(v:number) => setOven({...oven, sfAmortization: v})} /> <InputGroup label="Balloon (Yrs)" tooltip="When the full remaining balance must be paid off to the seller." value={oven.sfBalloon} onChange={(v:number) => setOven({...oven, sfBalloon: v})} /> </>)}
                              {strategy === 'SubTo' && (<> <InputGroup label="Cash to Seller" tooltip="Cash paid to seller for their equity above the loan balance." value={oven.sfDownPayment} onChange={(v:number) => setOven({...oven, sfDownPayment: v})} /> <InputGroup label="Loan Balance" tooltip="The current remaining balance on the seller's mortgage." value={mortgageData.balance || ''} onChange={(v:number) => onUpdateMortgage({ balance: v })} /> <InputGroup label="Monthly PITI" tooltip="The seller's current monthly payment (Principal, Interest, Taxes, Insurance)." value={mortgageData.monthlyPayment || ''} onChange={(v:number) => onUpdateMortgage({ monthlyPayment: v })} /> <InputGroup label="Arrears" tooltip="Total amount of missed payments + fees needed to bring loan current." value={mortgageData.arrears || ''} onChange={(v:number) => onUpdateMortgage({ arrears: v })} /> </>)}
                              {strategy === 'Cash' && (<> <InputGroup label="Rehab Cost" tooltip="Total estimated budget for repairs and renovations." value={property.repairs || ''} onChange={(v:number) => onUpdateProperty({ repairs: v })} /> <div className="col-span-3 flex items-center text-xs text-slate-500 italic pl-2"> Cash offers calculated as (ARV * 0.70) - Rehab - Assignment. </div> </>)}
                          </div>
                      </div>
                      <div className="bg-slate-900/80 border border-white/10 p-6 rounded-3xl">
                          <h3 className="text-lg font-bold text-white mb-4 flex items-center"><span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>Core Expenses</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <InputGroup label="Taxes (Yearly)" tooltip="Annual property tax bill." value={property.taxAnnual || ''} onChange={(v:number) => onUpdateProperty({ taxAnnual: v })} />
                              <InputGroup label="Insurance (Yr)" tooltip="Annual hazard insurance premium." value={property.insuranceAnnual || ''} onChange={(v:number) => onUpdateProperty({ insuranceAnnual: v })} />
                              <InputGroup label="HOA (Monthly)" tooltip="Monthly Homeowners Association fees." value={property.hoaMonthly || ''} onChange={(v:number) => onUpdateProperty({ hoaMonthly: v })} />
                              <InputGroup label="Other (Monthly)" tooltip="Any other recurring monthly costs (utilities, landscaping, etc)." value={oven.otherMonthly} onChange={(v:number) => setOven({...oven, otherMonthly: v})} />
                          </div>
                      </div>
                      <div className="bg-slate-950/50 border border-white/5 p-6 rounded-3xl">
                          <h3 className="text-sm font-bold text-slate-400 mb-4 flex items-center uppercase tracking-wider">Variable Ratios (Defaults)</h3>
                          <div className="grid grid-cols-3 gap-4">
                              <InputGroup label="Vacancy %" tooltip="Est. percentage of time unit is unoccupied (Std: 5%)." value={oven.vacancyRate} onChange={(v:number) => setOven({...oven, vacancyRate: v})} />
                              <InputGroup label="Maintenance %" tooltip="Est. budget for repairs/upkeep (Std: 5-10%)." value={oven.maintenanceRate} onChange={(v:number) => setOven({...oven, maintenanceRate: v})} />
                              <InputGroup label="Management %" tooltip="Property management fee (Std: 10%)." value={oven.managementRate} onChange={(v:number) => setOven({...oven, managementRate: v})} />
                          </div>
                      </div>
                  </div>
                  <div className="lg:col-span-1">
                      <div className="sticky top-24 space-y-4">
                          <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col items-center">
                              <SimplePieChart data={pieData} />
                              <div className="w-full mt-6 space-y-4">
                                  <div className="flex justify-between items-center"><div className="text-xs text-slate-400 uppercase font-bold">Monthly Cash Flow</div><div className={`text-2xl font-black ${getMetricColor(ovenStats.cashFlow, 'cf')}`}>${Math.round(ovenStats.cashFlow).toLocaleString()}</div></div>
                                  <div className="flex justify-between items-center"><div className="text-xs text-slate-400 uppercase font-bold">Total Entry Fee</div><div className={`text-xl font-bold text-white`}>${Math.round(ovenStats.entryFee).toLocaleString()}</div></div>
                                  <div className="flex justify-between items-center"><div className="text-xs text-slate-400 uppercase font-bold">Cash on Cash</div><div className={`text-xl font-bold ${getMetricColor(ovenStats.cashOnCash, 'coc')}`}>{ovenStats.cashOnCash.toFixed(1)}%</div></div>
                              </div>
                          </div>
                          <button onClick={handleAnalyze} className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-lg rounded-2xl shadow-lg transition-all hover:scale-105">Finalize Offer 🚀</button>
                      </div>
                  </div>
              </div>
          </div>
      );
  }

  // ... (Results step follows same pattern if needed, but primarily updated Back buttons above)
  
  if (step === 'results' && calculatedOffer) {
      const resultPieData = [{ label: 'Debt', value: calculatedOffer.piti, color: '#f59e0b' }, { label: 'OpEx', value: calculatedOffer.totalExpenses, color: '#ef4444' }, { label: 'Profit', value: Math.max(0, calculatedOffer.cashFlow), color: '#10b981' }];
      return (
          <div className="max-w-6xl mx-auto py-12 px-4 animate-in zoom-in duration-500">
               <div className="text-center mb-12">
                   <div className="inline-block px-4 py-1 rounded-full bg-white/10 text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">{strategy} Strategy</div>
                   <h2 className="text-5xl md:text-7xl font-black text-white mb-2">${calculatedOffer.offerPrice.toLocaleString()}</h2>
                   <p className="text-xl text-slate-400">Maximum Allowable Offer (MAO)</p>
               </div>
               {/* ... (rest of Results view same as before) ... */}
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                   {/* ... Charts ... */}
                   <div className="bg-slate-900/80 p-8 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
                       <SimplePieChart data={resultPieData} />
                       <div className="flex-1 space-y-6 w-full">
                           <h3 className="text-xl font-bold text-white mb-2">Deal Potential</h3>
                           <div>
                               <div className="flex justify-between text-xs text-slate-400 font-bold uppercase mb-1"><span>Cash on Cash Return</span><span className={getMetricColor(calculatedOffer.cashOnCash, 'coc')}>{calculatedOffer.cashOnCash.toFixed(1)}%</span></div>
                               <div className="w-full bg-slate-800 rounded-full h-2"><div className={`h-full rounded-full ${calculatedOffer.cashOnCash > 20 ? 'bg-emerald-500' : 'bg-orange-500'}`} style={{width: `${Math.min(calculatedOffer.cashOnCash, 100)}%`}}></div></div>
                           </div>
                           <div>
                               <div className="flex justify-between text-xs text-slate-400 font-bold uppercase mb-1"><span>Entry Fee Effort</span><span className={getMetricColor(calculatedOffer.entryFeePercent, 'entry')}>{calculatedOffer.entryFeePercent.toFixed(1)}%</span></div>
                               <div className="w-full bg-slate-800 rounded-full h-2"><div className={`h-full rounded-full ${calculatedOffer.entryFeePercent < 15 ? 'bg-emerald-500' : 'bg-red-500'}`} style={{width: `${Math.min(calculatedOffer.entryFeePercent, 100)}%`}}></div></div>
                           </div>
                           <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                               <div><div className="text-xs text-slate-500 uppercase">Monthly Cashflow</div><div className={`text-2xl font-black ${getMetricColor(calculatedOffer.cashFlow, 'cf')}`}>${Math.round(calculatedOffer.cashFlow).toLocaleString()}</div></div>
                               <div><div className="text-xs text-slate-500 uppercase">Entry Fee</div><div className="text-2xl font-black text-white">${Math.round(calculatedOffer.entryFee).toLocaleString()}</div></div>
                           </div>
                       </div>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/10 flex flex-col justify-center items-center text-center"><div className="text-xs text-slate-500 uppercase font-bold mb-2">5 Year Net Profit</div><div className="text-3xl font-black text-emerald-400">${Math.round(calculatedOffer.netProfit).toLocaleString()}</div><div className="text-[10px] text-slate-500 mt-1">Cashflow + Principal Paydown</div></div>
                       <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/10 flex flex-col justify-center items-center text-center"><div className="text-xs text-slate-500 uppercase font-bold mb-2">Total Expenses</div><div className="text-3xl font-black text-red-400">${Math.round(calculatedOffer.totalExpenses).toLocaleString()}</div><div className="text-[10px] text-slate-500 mt-1">Monthly OpEx</div></div>
                       <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/10 flex flex-col justify-center items-center text-center"><div className="text-xs text-slate-500 uppercase font-bold mb-2">Debt Service</div><div className="text-3xl font-black text-orange-400">${Math.round(calculatedOffer.piti).toLocaleString()}</div><div className="text-[10px] text-slate-500 mt-1">Monthly P&I</div></div>
                       <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/10 flex flex-col justify-center items-center text-center"><div className="text-xs text-slate-500 uppercase font-bold mb-2">Est. Closing Costs</div><div className="text-3xl font-black text-slate-200">${Math.round(calculatedOffer.closingCosts).toLocaleString()}</div><div className="text-[10px] text-slate-500 mt-1">Based on {oven.closingCostsPercent}%</div></div>
                   </div>
               </div>
               
               {/* Script Section ... */}
               <div className="bg-white/5 p-8 rounded-3xl border border-white/10 mb-12">
                   <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                       <div className="flex items-center gap-4"><h3 className="text-xl font-bold text-white flex items-center gap-2"><span className="text-2xl">📝</span> Offer Script</h3><select value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)} className="bg-black/40 text-white border border-white/10 rounded-lg p-2 text-sm outline-none focus:border-emerald-500"><option value="">-- AI Auto-Generate --</option>{scripts.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}</select></div>
                       <div className="flex bg-black/40 p-1 rounded-lg"><button onClick={() => setScriptType('email')} className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${scriptType === 'email' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}>Email</button><button onClick={() => setScriptType('text')} className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${scriptType === 'text' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}>Text Message</button></div>
                       <div className="flex items-center gap-2">
                           <button onClick={() => setScriptTextSize(s => Math.max(10, s - 2))} className="w-8 h-8 rounded-full bg-white/10 text-white text-xs hover:bg-white/20 transition-colors">A-</button>
                           <button onClick={() => setScriptTextSize(s => Math.min(32, s + 2))} className="w-8 h-8 rounded-full bg-white/10 text-white text-sm hover:bg-white/20 transition-colors">A+</button>
                       </div>
                       <button 
                        onClick={handleGenerateScript} 
                        disabled={isGeneratingScript} 
                        className="relative px-6 py-2 rounded-xl font-bold text-sm text-white overflow-hidden group border border-white/20 hover:border-emerald-400/50 transition-all"
                       >
                           <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 animate-gradient-x opacity-80 group-hover:opacity-100 transition-opacity"></span>
                           <span className="relative flex items-center gap-2 drop-shadow-md">
                               {isGeneratingScript ? 'Generating...' : '✨ Generate Script'}
                           </span>
                       </button>
                   </div>
                   <textarea 
                    readOnly 
                    className="w-full h-48 bg-black/30 border border-white/10 rounded-xl p-4 text-slate-300 font-sans focus:outline-none mb-4 resize-none transition-all leading-relaxed" 
                    style={{ fontSize: `${scriptTextSize}px` }}
                    value={generatedScript || `Select a template or click Generate to create a custom offer script for ${property.address}.`} 
                   />
                   <div className="flex justify-end gap-3"><button onClick={() => navigator.clipboard.writeText(generatedScript)} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-lg">Copy Script</button>{scriptType === 'email' ? (<button onClick={() => window.open(`mailto:?subject=Offer for ${property.address}&body=${encodeURIComponent(generatedScript)}`)} className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors">Open Email App</button>) : (<button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors opacity-50 cursor-not-allowed" title="Copy to phone">Send to Phone</button>)}</div>
               </div>
               
               <div className="flex justify-center gap-4">
                   <button onClick={() => { onAddToCRM({ purchasePrice: calculatedOffer.offerPrice, monthlyPayment: calculatedOffer.monthlyPayment, downPayment: calculatedOffer.downPayment, cashFlow: calculatedOffer.cashFlow, offerType: strategy as any }); }} className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all">Save to CRM</button>
                   <button onClick={() => setStep('strategy')} className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all">Start New Analysis</button>
               </div>
          </div>
      );
  }

  return null;
};