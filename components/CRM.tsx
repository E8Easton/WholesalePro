import React, { useState } from 'react';
import { CRMLead, CRMDispo } from '../types';

interface CRMProps {
  leads: CRMLead[];
  dispoList: CRMDispo[];
  updateLead: (id: string, updates: Partial<CRMLead>) => void;
  updateDispo: (id: string, updates: Partial<CRMDispo>) => void;
  pushToDispo: (lead: CRMLead) => void;
  deleteLead: (id: string) => void;
  deleteDispo: (id: string) => void;
  onSendToCalculator: (lead: CRMLead) => void;
}

const offerColors: Record<string, string> = {
  Cash: 'border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]',
  Creative: 'border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]',
  SubTo: 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]',
  Novation: 'border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.5)]',
};

const DetailModal = ({ 
    item, 
    type, 
    onClose, 
    onUpdate, 
    onDelete, 
    onPushToDispo, 
    onSendToCalc,
    allowPushToDispo = true
}: { 
    item: CRMLead | CRMDispo, 
    type: 'lead' | 'dispo',
    onClose: () => void,
    onUpdate: (id: string, data: any) => void,
    onDelete: (id: string) => void,
    onPushToDispo?: (lead: CRMLead) => void,
    onSendToCalc?: (lead: CRMLead) => void,
    allowPushToDispo?: boolean
}) => {
    if (!item) return null;
    const isLead = type === 'lead';
    // Cast to correct type for TS check
    const lead = item as CRMLead;
    const dispo = item as CRMDispo;

    // Determine offer glow class based on current type (default to slate if not found)
    const currentOfferType = isLead ? lead.offerType : 'Cash';
    const glowClass = offerColors[currentOfferType] || 'border-white/10';

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className={`bg-slate-900 border w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 transition-all ${glowClass}`}>
                
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-950">
                    <div className="flex-1 mr-4">
                        <div className="flex items-center gap-3 mb-1">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${isLead ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                                {isLead ? 'Lead Pipeline' : 'Dispo Pipeline'}
                            </span>
                            <span className="text-slate-500 text-xs uppercase font-mono">{item.id}</span>
                        </div>
                        <input 
                            value={item.address}
                            onChange={(e) => onUpdate(item.id, { address: e.target.value })}
                            className="text-2xl font-bold text-white bg-transparent border-none focus:outline-none focus:ring-0 w-full p-0"
                        />
                    </div>
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                        ✕
                    </button>
                </div>

                {/* Content - Scrollable */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    
                    {/* Status Bar */}
                    <div className="flex flex-wrap items-center gap-4 mb-8 bg-slate-800/50 p-4 rounded-xl border border-white/5">
                        <div className="flex-1">
                            <label className="text-xs text-slate-500 uppercase font-bold block mb-1">Lifecycle Stage</label>
                            <select 
                                value={item.status} 
                                onChange={(e) => onUpdate(item.id, { status: e.target.value })}
                                className="bg-slate-900 border border-white/10 text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-blue-500 w-full"
                            >
                                {isLead 
                                    ? ['Not Contacted', 'Contacted', 'Offer Made', 'Negotiating', 'Contract Signed', 'Closed', 'Dead'].map(s => <option key={s} value={s} className="text-black bg-white">{s}</option>)
                                    : ['Marketing', 'Negotiating', 'Assigned', 'Closed'].map(s => <option key={s} value={s} className="text-black bg-white">{s}</option>)
                                }
                            </select>
                        </div>
                        
                        {isLead && (
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => onSendToCalc && onSendToCalc(lead)}
                                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold rounded-lg transition-colors"
                                >
                                    Re-Analyze
                                </button>
                                {allowPushToDispo && (
                                    <button 
                                        onClick={() => { onPushToDispo && onPushToDispo(lead); onClose(); }}
                                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-emerald-500/20"
                                    >
                                        Push to Dispo →
                                    </button>
                                )}
                            </div>
                        )}
                        <button 
                            onClick={() => { if(confirm('Delete this record?')) { onDelete(item.id); onClose(); } }}
                            className="px-4 py-2 border border-red-500/30 text-red-400 hover:bg-red-950 text-xs font-bold rounded-lg transition-colors"
                        >
                            Delete
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* LEFT COLUMN */}
                        <div className="space-y-6">
                            {/* Financials */}
                            <div className="bg-slate-800/30 p-6 rounded-2xl border border-white/5">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <span className="text-emerald-500">💰</span> Financials
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-xs text-slate-500 uppercase font-bold mb-1">Purchase Price</div>
                                        <input 
                                            type="number"
                                            value={item.purchasePrice}
                                            onChange={(e) => onUpdate(item.id, { purchasePrice: Number(e.target.value) })}
                                            className="bg-black/20 border border-white/10 rounded px-3 py-2 text-white w-full text-lg font-mono focus:border-emerald-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 uppercase font-bold mb-1">EMD</div>
                                        <input 
                                            type="number"
                                            value={item.emd}
                                            onChange={(e) => onUpdate(item.id, { emd: Number(e.target.value) })}
                                            className="bg-black/20 border border-white/10 rounded px-3 py-2 text-white w-full text-lg font-mono focus:border-emerald-500 outline-none"
                                        />
                                    </div>
                                    {isLead ? (
                                        <>
                                            <div className="col-span-2">
                                                <div className="text-xs text-slate-500 uppercase font-bold mb-1">Offer Type</div>
                                                <select 
                                                    value={lead.offerType} 
                                                    onChange={(e) => onUpdate(lead.id, { offerType: e.target.value })}
                                                    className={`bg-black/20 border rounded px-3 py-2 text-white w-full focus:outline-none transition-all ${glowClass}`}
                                                >
                                                    <option value="Cash" className="text-black bg-white">Cash</option>
                                                    <option value="Creative" className="text-black bg-white">Creative</option>
                                                    <option value="SubTo" className="text-black bg-white">SubTo</option>
                                                    <option value="Novation" className="text-black bg-white">Novation</option>
                                                </select>
                                            </div>
                                            <div>
                                                <div className="text-xs text-slate-500 uppercase font-bold mb-1">Assignment Fee</div>
                                                <input 
                                                    type="number"
                                                    value={lead.assignmentFee}
                                                    onChange={(e) => onUpdate(lead.id, { assignmentFee: Number(e.target.value) })}
                                                    className="bg-black/20 border border-emerald-500/30 rounded px-3 py-2 text-emerald-400 font-bold w-full text-lg font-mono"
                                                />
                                            </div>
                                            <div className="col-span-2 grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-white/5">
                                                <div>
                                                    <div className="text-[10px] text-slate-500 uppercase mb-1">Down Pmt</div>
                                                    <input 
                                                        type="number"
                                                        value={lead.downPayment}
                                                        onChange={(e) => onUpdate(lead.id, { downPayment: Number(e.target.value) })}
                                                        className="bg-black/20 border border-white/10 rounded px-2 py-1 text-white w-full text-sm font-mono"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="text-[10px] text-slate-500 uppercase mb-1">Mo. Pmt</div>
                                                    <input 
                                                        type="number"
                                                        value={lead.monthlyPayment}
                                                        onChange={(e) => onUpdate(lead.id, { monthlyPayment: Number(e.target.value) })}
                                                        className="bg-black/20 border border-white/10 rounded px-2 py-1 text-white w-full text-sm font-mono"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="text-[10px] text-slate-500 uppercase mb-1">Cashflow</div>
                                                    <input 
                                                        type="number"
                                                        value={lead.cashFlow}
                                                        onChange={(e) => onUpdate(lead.id, { cashFlow: Number(e.target.value) })}
                                                        className="bg-black/20 border border-white/10 rounded px-2 py-1 text-emerald-400 w-full text-sm font-mono"
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                <div className="text-xs text-slate-500 uppercase font-bold mb-1">Assigned Price</div>
                                                <input 
                                                    type="number"
                                                    value={dispo.assignedPrice}
                                                    onChange={(e) => onUpdate(dispo.id, { assignedPrice: Number(e.target.value), netProfit: Number(e.target.value) - dispo.purchasePrice })}
                                                    className="bg-black/20 border border-white/10 rounded px-3 py-2 text-white w-full text-lg font-mono focus:border-blue-500 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <div className="text-xs text-slate-500 uppercase font-bold mb-1">Net Profit</div>
                                                <div className="text-xl font-mono text-emerald-400 font-bold p-2">${dispo.netProfit.toLocaleString()}</div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* People */}
                            <div className="bg-slate-800/30 p-6 rounded-2xl border border-white/5">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <span className="text-blue-500">👥</span> Contacts
                                </h3>
                                {isLead ? (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs text-slate-500 uppercase font-bold mb-1 block">Seller Name</label>
                                            <input 
                                                value={lead.sellerName}
                                                onChange={(e) => onUpdate(lead.id, { sellerName: e.target.value })}
                                                className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-white focus:border-blue-500 outline-none transition-colors"
                                                placeholder="Enter Seller Name"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs text-slate-500 uppercase font-bold mb-1 block">Realtor Name</label>
                                                <input 
                                                    value={lead.realtorName}
                                                    onChange={(e) => onUpdate(lead.id, { realtorName: e.target.value })}
                                                    className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-white focus:border-blue-500 outline-none transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-slate-500 uppercase font-bold mb-1 block">Realtor Phone</label>
                                                <input 
                                                    value={lead.realtorNumber}
                                                    onChange={(e) => onUpdate(lead.id, { realtorNumber: e.target.value })}
                                                    className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-white focus:border-blue-500 outline-none transition-colors"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs text-slate-500 uppercase font-bold mb-1 block">Realtor Email</label>
                                            <input 
                                                value={lead.realtorEmail}
                                                onChange={(e) => onUpdate(lead.id, { realtorEmail: e.target.value })}
                                                className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-white focus:border-blue-500 outline-none transition-colors"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs text-slate-500 uppercase font-bold mb-1 block">Buyer Name</label>
                                            <input 
                                                value={dispo.buyerName}
                                                onChange={(e) => onUpdate(dispo.id, { buyerName: e.target.value })}
                                                className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-white focus:border-blue-500 outline-none transition-colors"
                                                placeholder="Enter Buyer Name"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs text-slate-500 uppercase font-bold mb-1 block">Buyer Phone</label>
                                                <input 
                                                    value={dispo.buyerPhone}
                                                    onChange={(e) => onUpdate(dispo.id, { buyerPhone: e.target.value })}
                                                    className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-white focus:border-blue-500 outline-none transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-slate-500 uppercase font-bold mb-1 block">Buyer Email</label>
                                                <input 
                                                    value={dispo.buyerEmail}
                                                    onChange={(e) => onUpdate(dispo.id, { buyerEmail: e.target.value })}
                                                    className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-white focus:border-blue-500 outline-none transition-colors"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="space-y-6">
                            {/* Notes */}
                            <div className="bg-slate-800/30 p-6 rounded-2xl border border-white/5 h-full flex flex-col">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <span className="text-amber-500">📝</span> Notes & Contract Details
                                </h3>
                                
                                {isLead && (
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="text-xs text-slate-500 uppercase font-bold mb-1 block">COE Date</label>
                                            <input value={lead.coePeriod} onChange={e => onUpdate(lead.id, {coePeriod: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-white text-sm" />
                                        </div>
                                        <div>
                                            <label className="text-xs text-slate-500 uppercase font-bold mb-1 block">Inspection</label>
                                            <input value={lead.inspectionPeriod} onChange={e => onUpdate(lead.id, {inspectionPeriod: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-white text-sm" />
                                        </div>
                                    </div>
                                )}

                                <div className="flex-1">
                                    <label className="text-xs text-slate-500 uppercase font-bold mb-2 block">General Notes</label>
                                    <textarea 
                                        value={isLead ? lead.notes : dispo.notes} 
                                        onChange={(e) => onUpdate(item.id, { notes: e.target.value })}
                                        className="w-full h-full min-h-[200px] bg-slate-900/50 border border-white/10 rounded-xl p-4 text-sm text-slate-300 resize-none focus:outline-none focus:border-white/20"
                                        placeholder="Add notes about property condition, negotiation details, lockbox codes, etc..."
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

const PipelineStats = ({ leads }: { leads: CRMLead[] }) => {
    const total = leads.length || 1;
    const contacted = leads.filter(l => l.contacted).length;
    const offers = leads.filter(l => l.status === 'Offer Made').length;
    const closed = leads.filter(l => l.status === 'Closed' || l.status === 'Contract Signed').length;

    const contactedPct = (contacted / total) * 100;
    const offerPct = (offers / total) * 100;
    const closedPct = (closed / total) * 100;

    return (
        <div className="mt-16 bg-slate-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
            <h3 className="text-2xl font-display font-bold text-white mb-8 flex items-center gap-3">
                <span className="text-3xl">📈</span> Workforce Analytics
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Metric 1 */}
                <div className="bg-black/20 rounded-2xl p-6 border border-white/5">
                    <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Outreach Efficiency</div>
                    <div className="flex items-end gap-2 mb-4">
                        <span className="text-4xl font-black text-white">{contacted}</span>
                        <span className="text-sm text-slate-500 font-bold mb-1">/ {total} leads</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div className="bg-blue-500 h-full transition-all duration-1000" style={{ width: `${contactedPct}%` }}></div>
                    </div>
                </div>

                {/* Metric 2 */}
                <div className="bg-black/20 rounded-2xl p-6 border border-white/5">
                    <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Offer Velocity</div>
                    <div className="flex items-end gap-2 mb-4">
                        <span className="text-4xl font-black text-white">{offers}</span>
                        <span className="text-sm text-slate-500 font-bold mb-1">active offers</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div className="bg-purple-500 h-full transition-all duration-1000" style={{ width: `${offerPct}%` }}></div>
                    </div>
                </div>

                {/* Metric 3 */}
                <div className="bg-black/20 rounded-2xl p-6 border border-white/5">
                    <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Closing Ratio</div>
                    <div className="flex items-end gap-2 mb-4">
                        <span className="text-4xl font-black text-white">{closed}</span>
                        <span className="text-sm text-slate-500 font-bold mb-1">contracts</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div className="bg-emerald-500 h-full transition-all duration-1000" style={{ width: `${closedPct}%` }}></div>
                    </div>
                </div>

                {/* Metric 4 */}
                <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-6 border border-white/10 shadow-lg relative overflow-hidden group">
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="text-white/80 text-xs font-bold uppercase tracking-wider mb-2">Proj. Revenue</div>
                    <div className="text-4xl font-black text-white mb-2">
                        ${leads.reduce((acc, l) => acc + (l.status === 'Contract Signed' || l.status === 'Closed' ? l.assignmentFee : 0), 0).toLocaleString()}
                    </div>
                    <div className="text-[10px] bg-black/20 inline-block px-2 py-1 rounded text-white/90">Based on Assignment Fees</div>
                </div>
            </div>
        </div>
    );
};

// Kanban Board Component
const KanbanBoard = ({ leads, onUpdateStatus, onLeadClick }: { leads: CRMLead[], onUpdateStatus: (id: string, status: string) => void, onLeadClick: (lead: CRMLead) => void }) => {
    // Defines columns, colors, and border styles for each status
    const columns = [
        { id: 'Not Contacted', color: 'slate', border: 'border-slate-500/30', bg: 'bg-slate-900/40', glow: 'shadow-none' },
        { id: 'Contacted', color: 'blue', border: 'border-blue-500/30', bg: 'bg-blue-900/10', glow: 'shadow-[0_0_15px_rgba(59,130,246,0.1)]' },
        { id: 'Offer Made', color: 'purple', border: 'border-purple-500/30', bg: 'bg-purple-900/10', glow: 'shadow-[0_0_15px_rgba(168,85,247,0.1)]' },
        { id: 'Negotiating', color: 'orange', border: 'border-orange-500/30', bg: 'bg-orange-900/10', glow: 'shadow-[0_0_15px_rgba(249,115,22,0.1)]' },
        { id: 'Contract Signed', color: 'emerald', border: 'border-emerald-500/30', bg: 'bg-emerald-900/10', glow: 'shadow-[0_0_15px_rgba(16,185,129,0.1)]' },
        { id: 'Closed', color: 'yellow', border: 'border-yellow-500/30', bg: 'bg-yellow-900/10', glow: 'shadow-[0_0_15px_rgba(234,179,8,0.1)]' },
        { id: 'Dead', color: 'red', border: 'border-red-500/30', bg: 'bg-red-900/10', glow: 'shadow-none' },
    ];
    
    const handleDragStart = (e: React.DragEvent, id: string) => {
        e.dataTransfer.setData("leadId", id);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent, status: string) => {
        const leadId = e.dataTransfer.getData("leadId");
        if(leadId) onUpdateStatus(leadId, status);
    };

    return (
        <div className="flex overflow-x-auto gap-4 pb-8 min-h-[600px] snap-x">
            {columns.map(col => (
                <div 
                    key={col.id} 
                    className={`min-w-[280px] rounded-xl border flex flex-col snap-center transition-all ${col.bg} ${col.border} ${col.glow}`}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, col.id)}
                >
                    <div className={`p-4 border-b ${col.border} font-bold uppercase text-xs tracking-wider sticky top-0 backdrop-blur-md z-10 rounded-t-xl text-${col.color}-400 flex justify-between items-center`}>
                        {col.id} 
                        <span className={`px-2 py-0.5 rounded text-[10px] bg-${col.color}-500/20 text-white`}>
                            {leads.filter(l => l.status === col.id).length}
                        </span>
                    </div>
                    <div className="p-3 space-y-3 flex-1">
                        {leads.filter(l => l.status === col.id).map(lead => (
                            <div 
                                key={lead.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, lead.id)}
                                onClick={() => onLeadClick(lead)}
                                className={`bg-slate-900/80 p-4 rounded-lg border border-white/5 hover:border-${col.color}-500/50 cursor-grab active:cursor-grabbing shadow-lg hover:shadow-xl transition-all group relative overflow-hidden`}
                            >
                                <div className={`absolute top-0 left-0 w-1 h-full bg-${col.color}-500 opacity-50`}></div>
                                <div className="font-bold text-white text-sm mb-1 truncate pl-2">{lead.address}</div>
                                <div className="flex justify-between items-center text-xs pl-2">
                                    <span className="text-slate-400">${lead.purchasePrice.toLocaleString()}</span>
                                    <span className={`font-mono font-bold ${lead.offerType === 'Cash' ? 'text-amber-500' : 'text-blue-400'}`}>{lead.offerType}</span>
                                </div>
                                <div className="mt-2 pt-2 border-t border-white/5 flex justify-between items-center pl-2">
                                    <span className="text-[10px] text-slate-500">{lead.realtorName || 'No Agent'}</span>
                                    {lead.contacted && <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_5px_#10b981]" title="Contacted"></span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export const CRM: React.FC<CRMProps> = ({ leads, dispoList, updateLead, updateDispo, pushToDispo, deleteLead, deleteDispo, onSendToCalculator }) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'dispo'>('leads');
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  
  // Use ID to track selected item so we can fetch the latest version from the list (for real-time editing)
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'lead' | 'dispo' | null>(null);
  
  // Derive the active item from the live list to ensure updates reflect immediately
  const activeItem = selectedId && selectedType 
    ? (selectedType === 'lead' ? leads.find(l => l.id === selectedId) : dispoList.find(d => d.id === selectedId)) || null
    : null;

  // Bulk Selection State
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const totalProperties = leads.length + dispoList.length;
  const waitingForDispo = leads.filter(l => l.status === 'Contract Signed').length;
  const inDispo = dispoList.length;

  const handleRowClick = (item: CRMLead | CRMDispo, type: 'lead' | 'dispo') => {
    setSelectedId(item.id);
    setSelectedType(type);
  };

  const handleCloseModal = () => {
      setSelectedId(null);
      setSelectedType(null);
  };

  const toggleSelectAll = () => {
      if (selectedIds.size > 0) {
          setSelectedIds(new Set());
      } else {
          const allIds = activeTab === 'leads' ? leads.map(l => l.id) : dispoList.map(d => d.id);
          setSelectedIds(new Set(allIds));
      }
  };

  const toggleSelectOne = (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      const newSet = new Set(selectedIds);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      setSelectedIds(newSet);
  };

  const handleBulkDelete = () => {
      if (confirm(`Delete ${selectedIds.size} selected items?`)) {
          selectedIds.forEach(id => {
              if (activeTab === 'leads') deleteLead(id);
              else deleteDispo(id);
          });
          setSelectedIds(new Set());
      }
  };

  const handleBulkPush = () => {
      if (activeTab !== 'leads') return;
      if (confirm(`Push ${selectedIds.size} leads to Dispo pipeline?`)) {
          selectedIds.forEach(id => {
              const lead = leads.find(l => l.id === id);
              if (lead) pushToDispo(lead);
          });
          setSelectedIds(new Set());
          setActiveTab('dispo');
      }
  };

  return (
    <div className="p-6 max-w-[99%] mx-auto pb-24 relative">
      
      {/* Detail Modal */}
      {activeItem && selectedType && (
          <DetailModal 
            item={activeItem} 
            type={selectedType} 
            onClose={handleCloseModal}
            onUpdate={selectedType === 'lead' ? updateLead : updateDispo}
            onDelete={selectedType === 'lead' ? deleteLead : deleteDispo}
            onPushToDispo={pushToDispo}
            onSendToCalc={onSendToCalculator}
            allowPushToDispo={viewMode === 'table'} // Only allow pushing from List view as requested for "different" popup behavior
          />
      )}

      {/* Bulk Actions Floating Bar */}
      {selectedIds.size > 0 && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 bg-slate-900 border border-white/20 p-2 pl-6 rounded-full shadow-2xl animate-in slide-in-from-bottom-4 duration-200">
              <span className="text-sm font-bold text-white">{selectedIds.size} Selected</span>
              <div className="h-6 w-px bg-white/20"></div>
              {activeTab === 'leads' && (
                  <button onClick={handleBulkPush} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-full transition-colors">
                      Push to Dispo
                  </button>
              )}
              <button onClick={handleBulkDelete} className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-full transition-colors">
                  Delete
              </button>
              <button onClick={() => setSelectedIds(new Set())} className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-slate-400">
                  ✕
              </button>
          </div>
      )}
      
      {/* Redesigned Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="relative group bg-slate-900/60 p-6 rounded-3xl border border-white/5 overflow-hidden backdrop-blur-md">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-violet-500 rounded-l-3xl"></div>
          <div className="flex items-center relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-violet-500/10 text-violet-400 flex items-center justify-center mr-5 text-3xl border border-violet-500/20 shadow-[0_0_20px_rgba(139,92,246,0.15)]">🏠</div>
            <div>
              <div className="text-4xl font-display font-black text-white">{totalProperties}</div>
              <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Active Leads</div>
            </div>
          </div>
        </div>

        <div className="relative group bg-slate-900/60 p-6 rounded-3xl border border-white/5 overflow-hidden backdrop-blur-md">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-3xl"></div>
          <div className="flex items-center relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mr-5 text-3xl border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]">⏳</div>
            <div>
              <div className="text-4xl font-display font-black text-white">{waitingForDispo}</div>
              <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Under Contract</div>
            </div>
          </div>
        </div>

        <div className="relative group bg-slate-900/60 p-6 rounded-3xl border border-white/5 overflow-hidden backdrop-blur-md">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 rounded-l-3xl"></div>
          <div className="flex items-center relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mr-5 text-3xl border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.15)]">🚀</div>
            <div>
              <div className="text-4xl font-display font-black text-white">{inDispo}</div>
              <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Dispo Pipeline</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & View Switcher */}
      <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-1 bg-slate-900/50 p-1 rounded-xl border border-white/10">
            <button 
              onClick={() => { setActiveTab('leads'); setSelectedIds(new Set()); }}
              className={`px-6 py-2 font-bold rounded-lg transition-all ${activeTab === 'leads' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
            >
              Lead Pipeline
            </button>
            
            {/* HIDE DISPO BUTTON IN BOARD MODE */}
            {viewMode === 'table' && (
                <button 
                  onClick={() => { setActiveTab('dispo'); setSelectedIds(new Set()); }}
                  className={`px-6 py-2 font-bold rounded-lg transition-all ${activeTab === 'dispo' ? 'bg-emerald-600/20 text-emerald-400 shadow-lg border border-emerald-500/30' : 'text-slate-500 hover:text-white'}`}
                >
                  Dispo Pipeline
                </button>
            )}
          </div>

          {activeTab === 'leads' && (
              <div className="flex space-x-1 bg-slate-900/50 p-1 rounded-xl border border-white/10">
                  <button 
                    onClick={() => setViewMode('table')}
                    className={`px-4 py-2 font-bold rounded-lg transition-all flex items-center gap-2 ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white'}`}
                  >
                      <span>📋</span> List
                  </button>
                  <button 
                    onClick={() => setViewMode('kanban')}
                    className={`px-4 py-2 font-bold rounded-lg transition-all flex items-center gap-2 ${viewMode === 'kanban' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white'}`}
                  >
                      <span>📊</span> Board
                  </button>
              </div>
          )}
      </div>

      {/* Content Area */}
      {activeTab === 'leads' && viewMode === 'kanban' ? (
          <KanbanBoard 
            leads={leads} 
            onUpdateStatus={(id, status) => updateLead(id, { status: status as any })}
            onLeadClick={(lead) => handleRowClick(lead, 'lead')}
          />
      ) : (
          <div className="bg-slate-900/40 rounded-3xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-md">
            <div className="overflow-x-auto min-h-[400px]">
              {activeTab === 'leads' ? (
                <table className="w-max text-xs text-left text-slate-300">
                  <thead className="text-[10px] text-slate-400 uppercase bg-slate-950/80 sticky top-0 backdrop-blur-md z-10 font-bold tracking-wider">
                    <tr>
                      <th className="px-4 py-3 border-r border-white/5 text-center w-10">
                          <input type="checkbox" onChange={toggleSelectAll} checked={leads.length > 0 && selectedIds.size === leads.length} className="rounded border-slate-700 bg-slate-900 checked:bg-emerald-500" />
                      </th>
                      <th className="px-4 py-3 border-r border-white/5 min-w-[200px]">Address</th>
                      <th className="px-4 py-3 border-r border-white/5 min-w-[150px]">Realtor Info</th>
                      <th className="px-4 py-3 border-r border-white/5">Offer Type</th>
                      <th className="px-4 py-3 border-r border-white/5">Purch Price</th>
                      <th className="px-4 py-3 border-r border-white/5">Monthly</th>
                      <th className="px-4 py-3 border-r border-white/5">Down Pmt</th>
                      <th className="px-4 py-3 border-r border-white/5">Cash Flow</th>
                      <th className="px-4 py-3 border-r border-white/5">CoC %</th>
                      <th className="px-4 py-3 border-r border-white/5">Assg. Fee</th>
                      <th className="px-4 py-3 border-r border-white/5 text-center">Contacted?</th>
                      <th className="px-4 py-3 border-r border-white/5 text-center">Seller Status</th>
                      <th className="px-4 py-3 min-w-[150px]">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr 
                        key={lead.id} 
                        onClick={() => handleRowClick(lead, 'lead')}
                        className={`border-b border-white/5 cursor-pointer transition-colors group text-xs ${selectedIds.has(lead.id) ? 'bg-emerald-900/10 hover:bg-emerald-900/20' : 'hover:bg-white/5'}`}
                      >
                        <td className="px-4 py-3 border-r border-white/5 text-center" onClick={e => e.stopPropagation()}>
                            <input 
                                type="checkbox" 
                                checked={selectedIds.has(lead.id)}
                                onChange={(e) => toggleSelectOne(lead.id, e as any)}
                                className="rounded border-slate-700 bg-slate-900 checked:bg-emerald-500"
                            />
                        </td>
                        <td className="px-4 py-3 font-bold text-white border-r border-white/5 whitespace-nowrap">{lead.address}</td>
                        <td className="px-4 py-3 border-r border-white/5">
                            <div className="flex flex-col gap-1">
                                <span className="font-bold text-white">{lead.realtorName || 'N/A'}</span>
                                <span className="text-[10px] text-slate-500">{lead.realtorNumber}</span>
                                <span className="text-[10px] text-slate-500 truncate max-w-[120px]">{lead.realtorEmail}</span>
                            </div>
                        </td>
                        <td className="px-4 py-3 border-r border-white/5" onClick={e => e.stopPropagation()}>
                            <select 
                                value={lead.offerType} 
                                onChange={(e) => updateLead(lead.id, { offerType: e.target.value as any })}
                                className={`bg-transparent border-b border-white/10 outline-none pb-1 ${lead.offerType === 'Cash' ? 'text-amber-500' : 'text-blue-500'}`}
                            >
                                <option value="Cash" className="text-black bg-white">Cash</option>
                                <option value="Creative" className="text-black bg-white">Creative</option>
                                <option value="SubTo" className="text-black bg-white">SubTo</option>
                                <option value="Novation" className="text-black bg-white">Novation</option>
                            </select>
                        </td>
                        <td className="px-4 py-3 border-r border-white/5 font-mono text-white">${lead.purchasePrice.toLocaleString()}</td>
                        <td className="px-4 py-3 border-r border-white/5 font-mono">${lead.monthlyPayment.toLocaleString()}</td>
                        <td className="px-4 py-3 border-r border-white/5 font-mono">${lead.downPayment.toLocaleString()}</td>
                        <td className="px-4 py-3 border-r border-white/5 font-mono text-emerald-400 font-bold">${Math.round(lead.cashFlow).toLocaleString()}</td>
                        <td className="px-4 py-3 border-r border-white/5 font-mono text-emerald-400">{lead.cashOnCash.toFixed(1)}%</td>
                        <td className="px-4 py-3 border-r border-white/5 font-mono text-emerald-400 font-bold">+${lead.assignmentFee.toLocaleString()}</td>
                        
                        {/* Contacted Checkbox */}
                        <td className="px-4 py-3 border-r border-white/5 text-center" onClick={e => e.stopPropagation()}>
                            <select 
                                value={lead.contacted ? "Yes" : "No"}
                                onChange={(e) => updateLead(lead.id, { contacted: e.target.value === "Yes" })}
                                className={`px-2 py-1 rounded text-xs font-bold uppercase outline-none cursor-pointer ${lead.contacted ? 'bg-emerald-500 text-black' : 'bg-red-500 text-white'}`}
                            >
                                <option value="Yes" className="text-black bg-white">Yes</option>
                                <option value="No" className="text-black bg-white">No</option>
                            </select>
                        </td>

                        {/* Seller Status */}
                        <td className="px-4 py-3 border-r border-white/5 text-center" onClick={e => e.stopPropagation()}>
                            <select 
                                value={lead.sellerStatus || 'Pending'}
                                onChange={(e) => updateLead(lead.id, { sellerStatus: e.target.value as any })}
                                className={`px-2 py-1 rounded text-xs font-bold uppercase outline-none cursor-pointer 
                                    ${lead.sellerStatus === 'Accepted' ? 'bg-emerald-500 text-black' : 
                                      lead.sellerStatus === 'Declined' ? 'bg-red-500 text-white' : 'bg-slate-700 text-slate-300'}`}
                            >
                                <option value="Pending" className="text-black bg-white">Pending</option>
                                <option value="Accepted" className="text-black bg-white">Accepted</option>
                                <option value="Declined" className="text-black bg-white">Declined</option>
                            </select>
                        </td>

                        <td className="px-4 py-3 max-w-[150px] truncate text-slate-500">{lead.notes || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-xs text-left text-slate-300">
                    <thead className="text-[10px] text-slate-400 uppercase bg-slate-950/80 sticky top-0 backdrop-blur-md z-10 font-bold tracking-wider">
                    <tr>
                      <th className="px-4 py-3 border-r border-white/5 text-center w-10">
                          <input type="checkbox" onChange={toggleSelectAll} checked={dispoList.length > 0 && selectedIds.size === dispoList.length} className="rounded border-slate-700 bg-slate-900 checked:bg-emerald-500" />
                      </th>
                      <th className="px-4 py-3 border-r border-white/5">Address</th>
                      <th className="px-4 py-3 border-r border-white/5">Status</th>
                      <th className="px-4 py-3 border-r border-white/5">Purchase Price</th>
                      <th className="px-4 py-3 border-r border-white/5">Assigned Price</th>
                      <th className="px-4 py-3 border-r border-white/5">Net Profit</th>
                      <th className="px-4 py-3 border-r border-white/5">Buyer Name</th>
                      <th className="px-4 py-3 border-r border-white/5">Buyer Phone</th>
                      <th className="px-4 py-3">Added</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dispoList.length === 0 && (
                        <tr>
                            <td colSpan={9} className="p-8 text-center text-slate-500">
                                No deals in disposition yet. Push a contract from your Lead Pipeline to see it here.
                            </td>
                        </tr>
                    )}
                    {dispoList.map((deal) => (
                      <tr 
                        key={deal.id} 
                        onClick={() => handleRowClick(deal, 'dispo')}
                        className={`border-b border-white/5 cursor-pointer transition-colors group text-xs ${selectedIds.has(deal.id) ? 'bg-emerald-900/10 hover:bg-emerald-900/20' : 'hover:bg-white/5'}`}
                      >
                        <td className="px-4 py-3 border-r border-white/5 text-center" onClick={e => e.stopPropagation()}>
                            <input 
                                type="checkbox" 
                                checked={selectedIds.has(deal.id)}
                                onClick={(e) => toggleSelectOne(deal.id, e as any)}
                                className="rounded border-slate-700 bg-slate-900 checked:bg-emerald-500"
                            />
                        </td>
                        <td className="px-4 py-3 font-bold text-white border-r border-white/5">{deal.address}</td>
                        <td className="px-4 py-3 border-r border-white/5">
                            <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${deal.status === 'Closed' ? 'bg-emerald-500 text-black' : deal.status === 'Assigned' ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                                {deal.status}
                            </span>
                        </td>
                        <td className="px-4 py-3 border-r border-white/5 font-mono">${deal.purchasePrice.toLocaleString()}</td>
                        <td className="px-4 py-3 border-r border-white/5 font-mono text-slate-200">${deal.assignedPrice.toLocaleString()}</td>
                        <td className="px-4 py-3 border-r border-white/5 font-mono text-emerald-400 font-bold text-sm">+${deal.netProfit.toLocaleString()}</td>
                        <td className="px-4 py-3 border-r border-white/5">{deal.buyerName || '-'}</td>
                        <td className="px-4 py-3 border-r border-white/5">{deal.buyerPhone || '-'}</td>
                        <td className="px-4 py-3 text-slate-500">{deal.dateAdded}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
      )}

      {/* NEW PERFORMANCE STATS CHART */}
      {activeTab === 'leads' && <PipelineStats leads={leads} />}

      {/* Mentorship Upsell Section */}
      <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-indigo-500/20 rounded-3xl p-10 text-center relative overflow-hidden group mt-16">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]"></div>
          
          <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-indigo-500/30">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
                  Taking New Students
              </div>
              
              <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6">Need Help Closing? <br/>Get <span className="text-indigo-400">1-on-1 Mentorship</span></h2>
              
              <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                  Struggling to move deals through the pipeline? Get direct access to Easton and the core team. We'll review your CRM, help you negotiate difficult sellers, and close deals with you.
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