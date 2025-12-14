import React, { ChangeEvent } from 'react';
import { DealState } from '../types';

interface WizardProps {
  state: DealState;
  updateState: (updates: Partial<DealState>) => void;
  updateNested: (category: keyof DealState, field: string, value: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  calculate: () => void;
}

const InputField = ({ label, value, onChange, type = "text", placeholder = "" }: any) => (
  <div className="mb-4">
    <label className="block text-slate-400 text-sm font-semibold mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors placeholder-slate-600"
    />
  </div>
);

const Toggle = ({ label, checked, onChange }: any) => (
  <div className="flex items-center justify-between mb-4 p-4 bg-slate-800 rounded-lg border border-slate-700">
    <span className="text-slate-300 font-medium">{label}</span>
    <button
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 rounded-full p-1 transition-colors ${checked ? 'bg-emerald-500' : 'bg-slate-600'}`}
    >
      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${checked ? 'translate-x-6' : ''}`} />
    </button>
  </div>
);

export const Wizard: React.FC<WizardProps> = ({ state, updateNested, nextStep, prevStep, calculate }) => {
  const { step, property, mortgage, seller } = state;

  const handlePropChange = (e: ChangeEvent<HTMLInputElement>, field: string) => 
    updateNested('property', field, field === 'address' ? e.target.value : Number(e.target.value));

  const handleMortChange = (e: ChangeEvent<HTMLInputElement>, field: string) => 
    updateNested('mortgage', field, Number(e.target.value));

  const handleSellerChange = (e: ChangeEvent<HTMLInputElement>, field: string) => 
    updateNested('seller', field, (field === 'reason' || field === 'timeline') ? e.target.value : Number(e.target.value));

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="flex mb-8 space-x-2">
        {[1, 2, 3].map(i => (
          <div key={i} className={`h-2 flex-1 rounded-full ${i <= step ? 'bg-emerald-500' : 'bg-slate-700'}`} />
        ))}
      </div>

      <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl">
        
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold text-white mb-6">Property Details</h2>
            <InputField label="Property Address" value={property.address} onChange={(e: any) => handlePropChange(e, 'address')} placeholder="123 Main St" />
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Beds" type="number" value={property.beds || ''} onChange={(e: any) => handlePropChange(e, 'beds')} />
              <InputField label="Baths" type="number" value={property.baths || ''} onChange={(e: any) => handlePropChange(e, 'baths')} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Square Ft" type="number" value={property.sqft || ''} onChange={(e: any) => handlePropChange(e, 'sqft')} />
              <InputField label="Market Rent Estimate ($)" type="number" value={property.marketRent || ''} onChange={(e: any) => handlePropChange(e, 'marketRent')} />
            </div>
            <InputField label="After Repair Value (ARV)" type="number" value={property.arv || ''} onChange={(e: any) => handlePropChange(e, 'arv')} placeholder="$" />
            <InputField label="Est. Repairs Needed ($)" type="number" value={property.repairs || ''} onChange={(e: any) => handlePropChange(e, 'repairs')} placeholder="$" />
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold text-white mb-6">Financial Status</h2>
            <Toggle 
              label="Is there an existing mortgage?" 
              checked={mortgage.hasMortgage} 
              onChange={(val: boolean) => updateNested('mortgage', 'hasMortgage', val)} 
            />
            
            {mortgage.hasMortgage && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Mortgage Balance ($)" type="number" value={mortgage.balance || ''} onChange={(e: any) => handleMortChange(e, 'balance')} />
                  <InputField label="Interest Rate (%)" type="number" value={mortgage.interestRate || ''} onChange={(e: any) => handleMortChange(e, 'interestRate')} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Monthly Payment (PITI)" type="number" value={mortgage.monthlyPayment || ''} onChange={(e: any) => handleMortChange(e, 'monthlyPayment')} />
                  <InputField label="Arrears (Missed Payments)" type="number" value={mortgage.arrears || ''} onChange={(e: any) => handleMortChange(e, 'arrears')} />
                </div>
              </>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold text-white mb-6">Seller Situation</h2>
            <InputField label="Reason for Selling" value={seller.reason} onChange={(e: any) => handleSellerChange(e, 'reason')} placeholder="e.g. Divorce, Job Transfer, Pre-foreclosure" />
            <InputField label="Timeline" value={seller.timeline} onChange={(e: any) => handleSellerChange(e, 'timeline')} placeholder="e.g. ASAP" />
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Seller Asking Price ($)" type="number" value={seller.askingPrice || ''} onChange={(e: any) => handleSellerChange(e, 'askingPrice')} />
              <InputField label="Cash Needed in Pocket ($)" type="number" value={seller.cashToSellerDesired || ''} onChange={(e: any) => handleSellerChange(e, 'cashToSellerDesired')} />
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8 pt-6 border-t border-slate-800">
          {step > 1 ? (
            <button onClick={prevStep} className="px-6 py-2 text-slate-400 hover:text-white font-medium transition-colors">
              Back
            </button>
          ) : <div></div>}
          
          {step < 3 ? (
            <button onClick={nextStep} className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold transition-all transform hover:translate-x-1">
              Next Step
            </button>
          ) : (
            <button onClick={calculate} className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white rounded-lg font-bold shadow-lg shadow-emerald-500/20 transition-all transform hover:-translate-y-1">
              Calculate Offers 🚀
            </button>
          )}
        </div>

      </div>
    </div>
  );
};