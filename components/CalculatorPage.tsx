
import React, { useState, useEffect } from 'react';

// Helper for PMT calculation
const pmt = (rate: number, nper: number, pv: number) => {
  if (rate === 0) return nper === 0 ? 0 : -(pv / nper);
  const pvif = Math.pow(1 + rate, nper);
  return -((rate * pv * pvif) / (pvif - 1));
};

interface OvenState {
  strategy: 'SellerFinance' | 'SubTo' | 'Cash';
  
  // 1. Deal Basics
  purchasePrice: number;
  marketRent: number;
  rehabCost: number;
  assignmentFee: number;
  closingCostsPercent: number; // Default 2%
  agentCommissionPercent: number; // Default 0%

  // 2. The Oven (Expenses)
  vacancyRate: number; // 5%
  maintenanceRate: number; // 10%
  managementRate: number; // 10%
  propertyTaxYearly: number;
  insuranceYearly: number;
  hoaMonthly: number;
  otherMonthly: number;

  // 3. Seller Finance Specifics
  sfDownPayment: number;
  sfInterestRate: number;
  sfAmortizationYears: number;
  sfBalloonYears: number;
  sfInterestOnly: boolean;

  // 4. SubTo Specifics
  subtoLoanBalance: number;
  subtoMonthlyPI: number; // Principal & Interest
  subtoInterestRate: number;
  subtoArrears: number; // Catch up payments
  subtoDownPayment: number; // Cash to Seller
}

const initialState: OvenState = {
    strategy: 'SellerFinance',
    purchasePrice: 0, marketRent: 0, rehabCost: 0, assignmentFee: 0, closingCostsPercent: 0, agentCommissionPercent: 0,
    vacancyRate: 0, maintenanceRate: 0, managementRate: 0, propertyTaxYearly: 0, insuranceYearly: 0, hoaMonthly: 0, otherMonthly: 0,
    sfDownPayment: 0, sfInterestRate: 0, sfAmortizationYears: 0, sfBalloonYears: 0, sfInterestOnly: false,
    subtoLoanBalance: 0, subtoMonthlyPI: 0, subtoInterestRate: 0, subtoArrears: 0, subtoDownPayment: 0
};

const InputGroup = ({ label, value, onChange, type = "number", prefix = "", suffix = "", step="any" }: any) => (
    <div className="mb-3">
        <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1 tracking-wider">{label}</label>
        <div className="relative">
            {prefix && <span className="absolute left-3 top-2.5 text-slate-500 text-sm font-bold">{prefix}</span>}
            <input 
                type={type} 
                step={step}
                className={`w-full bg-slate-950 border border-slate-800 rounded-lg py-2 text-white font-mono text-sm focus:border-emerald-500 outline-none transition-colors ${prefix ? 'pl-7' : 'pl-3'} ${suffix ? 'pr-8' : 'pr-3'}`}
                value={value === 0 ? '' : value} 
                onChange={(e) => onChange(type === 'number' ? (e.target.value === '' ? 0 : Number(e.target.value)) : e.target.value)}
                placeholder="0"
            />
            {suffix && <span className="absolute right-3 top-2.5 text-slate-500 text-xs font-bold">{suffix}</span>}
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
                <span className="text-xs text-slate-400 font-bold uppercase">Total</span>
                <span className="text-sm font-black text-white">${Math.round(total).toLocaleString()}</span>
            </div>
        </div>
    );
};

export const CalculatorPage: React.FC = () => {
  const [state, setState] = useState<OvenState>(initialState);

  const [results, setResults] = useState({
      entryFee: 0,
      entryFeePercent: 0,
      monthlyCashFlow: 0,
      cashOnCash: 0,
      totalOpEx: 0,
      monthlyDebtService: 0
  });

  const update = (field: keyof OvenState, value: any) => {
      setState(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
      if(window.confirm("Are you sure you want to reset all calculator fields?")) {
          // Explicitly reset ALL fields to 0, but keep the current strategy
          setState({
              strategy: state.strategy,
              purchasePrice: 0, marketRent: 0, rehabCost: 0, assignmentFee: 0, closingCostsPercent: 0, agentCommissionPercent: 0,
              vacancyRate: 0, maintenanceRate: 0, managementRate: 0, propertyTaxYearly: 0, insuranceYearly: 0, hoaMonthly: 0, otherMonthly: 0,
              sfDownPayment: 0, sfInterestRate: 0, sfAmortizationYears: 0, sfBalloonYears: 0, sfInterestOnly: false,
              subtoLoanBalance: 0, subtoMonthlyPI: 0, subtoInterestRate: 0, subtoArrears: 0, subtoDownPayment: 0
          });
      }
  };

  // Metric Color Logic (Red/Orange/Green)
  const getMetricColor = (type: 'cashflow' | 'entry' | 'coc', value: number) => {
      if (type === 'cashflow') {
          if (value >= 500) return 'text-emerald-400';
          if (value >= 200) return 'text-orange-400';
          return 'text-red-400';
      }
      if (type === 'entry') {
          // Lower is better for entry fee percent
          if (value <= 10) return 'text-emerald-400';
          if (value <= 20) return 'text-orange-400';
          return 'text-red-400';
      }
      if (type === 'coc') {
          if (value >= 15) return 'text-emerald-400';
          if (value >= 8) return 'text-orange-400';
          return 'text-red-400';
      }
      return 'text-white';
  };

  useEffect(() => {
      // 1. Operating Expenses (The Oven)
      const monthlyRent = state.marketRent;
      const vacancy = monthlyRent * (state.vacancyRate / 100);
      const maintenance = monthlyRent * (state.maintenanceRate / 100);
      const management = monthlyRent * (state.managementRate / 100);
      const taxes = state.propertyTaxYearly / 12;
      const insurance = state.insuranceYearly / 12;
      
      const totalOpEx = vacancy + maintenance + management + taxes + insurance + state.hoaMonthly + state.otherMonthly;

      // 2. Debt Service
      let debtService = 0;
      let downPaymentTotal = 0;
      let arrears = 0;

      if (state.strategy === 'SellerFinance') {
          downPaymentTotal = state.sfDownPayment;
          const loanAmount = state.purchasePrice - state.sfDownPayment;
          
          if (loanAmount > 0) {
              if (state.sfInterestOnly) {
                  debtService = (loanAmount * (state.sfInterestRate / 100)) / 12;
              } else {
                  const rate = (state.sfInterestRate / 100) / 12;
                  const nper = state.sfAmortizationYears * 12;
                  debtService = Math.abs(pmt(rate, nper, loanAmount));
              }
          }
      } else if (state.strategy === 'SubTo') {
          downPaymentTotal = state.subtoDownPayment;
          debtService = state.subtoMonthlyPI;
          arrears = state.subtoArrears;
      } else if (state.strategy === 'Cash') {
          downPaymentTotal = state.purchasePrice; 
          debtService = 0;
      }

      // 3. Entry Fee
      const closingCosts = state.purchasePrice * (state.closingCostsPercent / 100);
      const entryFee = downPaymentTotal + state.rehabCost + state.assignmentFee + closingCosts + arrears;
      
      const entryFeePercent = state.purchasePrice > 0 ? (entryFee / state.purchasePrice) * 100 : 0;

      // 4. Returns
      const monthlyCashFlow = monthlyRent - totalOpEx - debtService;
      const annualCashFlow = monthlyCashFlow * 12;
      const cashOnCash = entryFee > 0 ? (annualCashFlow / entryFee) * 100 : 0;

      setResults({
          entryFee,
          entryFeePercent,
          monthlyCashFlow,
          cashOnCash,
          totalOpEx,
          monthlyDebtService: debtService
      });

  }, [state]);

  const pieData = [
      { label: 'Debt', value: results.monthlyDebtService, color: '#f59e0b' }, // Amber
      { label: 'OpEx', value: results.totalOpEx, color: '#ef4444' }, // Red
      { label: 'Profit', value: Math.max(0, results.monthlyCashFlow), color: '#10b981' } // Emerald
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 pb-32">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-4xl font-display font-black text-white">Creative Offer <span className="text-amber-500">Oven</span></h1>
            
            <div className="flex gap-4 items-center mt-4 md:mt-0">
                <button 
                    onClick={handleReset}
                    className="px-4 py-2 bg-red-900/30 hover:bg-red-900/50 border border-red-500/30 text-red-400 rounded-lg text-xs font-bold uppercase transition-colors"
                >
                    Reset
                </button>
                <div className="flex bg-slate-900 p-1 rounded-lg border border-white/10">
                    {['SellerFinance', 'SubTo', 'Cash'].map(s => (
                        <button 
                            key={s}
                            onClick={() => update('strategy', s as any)}
                            className={`px-4 py-2 rounded-md text-xs font-bold uppercase transition-all ${state.strategy === s ? 'bg-amber-500 text-black shadow-lg' : 'text-slate-500 hover:text-white'}`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* --- LEFT COLUMN: INPUTS --- */}
            <div className="lg:col-span-8 space-y-6">
                
                {/* 1. DEAL BASICS */}
                <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center"><span className="text-amber-500 mr-2">1</span> Deal Basics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <InputGroup label="Purchase Price" value={state.purchasePrice} onChange={(v:number) => update('purchasePrice', v)} prefix="$" />
                        <InputGroup label="Market Rent" value={state.marketRent} onChange={(v:number) => update('marketRent', v)} prefix="$" />
                        <InputGroup label="Rehab Budget" value={state.rehabCost} onChange={(v:number) => update('rehabCost', v)} prefix="$" />
                        <InputGroup label="Assignment Fee" value={state.assignmentFee} onChange={(v:number) => update('assignmentFee', v)} prefix="$" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                        <InputGroup label="Closing Costs" value={state.closingCostsPercent} onChange={(v:number) => update('closingCostsPercent', v)} suffix="%" />
                        <InputGroup label="Agent Comm." value={state.agentCommissionPercent} onChange={(v:number) => update('agentCommissionPercent', v)} suffix="%" />
                    </div>
                </div>

                {/* 2. FINANCING (DYNAMIC) */}
                <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full pointer-events-none"></div>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center"><span className="text-blue-500 mr-2">2</span> Financing: <span className="ml-2 uppercase text-xs bg-white/5 px-2 py-1 rounded text-slate-300">{state.strategy}</span></h3>
                    
                    {state.strategy === 'SellerFinance' && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <InputGroup label="Down Payment" value={state.sfDownPayment} onChange={(v:number) => update('sfDownPayment', v)} prefix="$" />
                            <InputGroup label="Interest Rate" value={state.sfInterestRate} onChange={(v:number) => update('sfInterestRate', v)} suffix="%" />
                            <InputGroup label="Amortization" value={state.sfAmortizationYears} onChange={(v:number) => update('sfAmortizationYears', v)} suffix="Yrs" />
                            <InputGroup label="Balloon" value={state.sfBalloonYears} onChange={(v:number) => update('sfBalloonYears', v)} suffix="Yrs" />
                            <div className="flex items-center h-full pt-4">
                                <label className="flex items-center cursor-pointer">
                                    <input type="checkbox" checked={state.sfInterestOnly} onChange={(e) => update('sfInterestOnly', e.target.checked)} className="w-5 h-5 rounded border-slate-700 bg-slate-950 text-blue-500 focus:ring-0" />
                                    <span className="ml-2 text-sm text-slate-400 font-bold">Interest Only?</span>
                                </label>
                            </div>
                        </div>
                    )}

                    {state.strategy === 'SubTo' && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <InputGroup label="Exist. Loan Bal" value={state.subtoLoanBalance} onChange={(v:number) => update('subtoLoanBalance', v)} prefix="$" />
                            <InputGroup label="Mo. P&I Pmt" value={state.subtoMonthlyPI} onChange={(v:number) => update('subtoMonthlyPI', v)} prefix="$" />
                            <InputGroup label="Exist. Int Rate" value={state.subtoInterestRate} onChange={(v:number) => update('subtoInterestRate', v)} suffix="%" />
                            <InputGroup label="Arrears (Back Pay)" value={state.subtoArrears} onChange={(v:number) => update('subtoArrears', v)} prefix="$" />
                            <InputGroup label="Cash to Seller" value={state.subtoDownPayment} onChange={(v:number) => update('subtoDownPayment', v)} prefix="$" />
                        </div>
                    )}

                    {state.strategy === 'Cash' && (
                        <div className="text-slate-500 text-sm italic">
                            Cash deals require 100% of purchase price + closing costs upfront. No financing inputs needed.
                        </div>
                    )}
                </div>

                {/* 3. THE OVEN (EXPENSES) */}
                <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center"><span className="text-red-500 mr-2">3</span> The Oven (Expenses)</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <InputGroup label="Vacancy" value={state.vacancyRate} onChange={(v:number) => update('vacancyRate', v)} suffix="%" />
                        <InputGroup label="Maintenance" value={state.maintenanceRate} onChange={(v:number) => update('maintenanceRate', v)} suffix="%" />
                        <InputGroup label="Management" value={state.managementRate} onChange={(v:number) => update('managementRate', v)} suffix="%" />
                    </div>
                    <div className="h-px bg-white/5 my-4"></div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <InputGroup label="Taxes (Yearly)" value={state.propertyTaxYearly} onChange={(v:number) => update('propertyTaxYearly', v)} prefix="$" />
                        <InputGroup label="Insurance (Yr)" value={state.insuranceYearly} onChange={(v:number) => update('insuranceYearly', v)} prefix="$" />
                        <InputGroup label="HOA (Monthly)" value={state.hoaMonthly} onChange={(v:number) => update('hoaMonthly', v)} prefix="$" />
                        <InputGroup label="Other (Monthly)" value={state.otherMonthly} onChange={(v:number) => update('otherMonthly', v)} prefix="$" />
                    </div>
                </div>

            </div>

            {/* --- RIGHT COLUMN: RESULTS DASHBOARD --- */}
            <div className="lg:col-span-4 space-y-6">
                
                {/* Visual Breakdown (Pie Chart) */}
                <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 flex flex-col items-center">
                    <h4 className="text-sm font-bold text-slate-400 mb-6 uppercase tracking-wider w-full text-left">Cash Flow Breakdown</h4>
                    <SimplePieChart data={pieData} />
                    <div className="flex justify-center gap-4 mt-6 text-xs">
                        {pieData.map((d, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{backgroundColor: d.color}}></div>
                                <span className="text-slate-300 font-bold">{d.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scorecards with Color Logic */}
                <div className="space-y-4">
                    {/* CASH FLOW CARD */}
                    <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 relative">
                        <div className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">Monthly Cash Flow</div>
                        <div className={`text-4xl font-black mb-2 ${getMetricColor('cashflow', results.monthlyCashFlow)}`}>
                            ${results.monthlyCashFlow.toLocaleString()}
                        </div>
                        <div className="text-xs text-slate-500">
                            Rent (${state.marketRent}) - Exp (${Math.round(results.totalOpEx)}) - Debt (${Math.round(results.monthlyDebtService)})
                        </div>
                    </div>

                    {/* ENTRY FEE CARD */}
                    <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 relative">
                        <div className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">Total Entry Fee</div>
                        <div className={`text-4xl font-black mb-2 ${getMetricColor('entry', results.entryFeePercent)}`}>
                            ${results.entryFee.toLocaleString()}
                        </div>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border bg-slate-950/50 border-white/10 ${getMetricColor('entry', results.entryFeePercent)}`}>
                            <span>{results.entryFeePercent.toFixed(2)}% of Price</span>
                        </div>
                    </div>

                    {/* COC RETURN CARD */}
                    <div className="bg-gradient-to-br from-slate-900 to-black border border-white/10 rounded-2xl p-6 relative">
                        <div className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">Cash on Cash Return</div>
                        <div className={`text-5xl font-black mb-2 ${getMetricColor('coc', results.cashOnCash)}`}>
                            {results.cashOnCash.toFixed(1)}%
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
  );
};
