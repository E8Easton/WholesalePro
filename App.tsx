
import React, { useState } from 'react';
import { AppState, CRMLead, CRMDispo, PropertyData, User } from './types';
import { LandingPage } from './components/LandingPage';
import { DealDashboard } from './components/DealDashboard';
import { CRM } from './components/CRM';
import { TrainingCenter } from './components/TrainingCenter';
import { FeaturesPage } from './components/FeaturesPage';
import { HowItWorksPage } from './components/HowItWorksPage';
import { PricingPage } from './components/PricingPage';
import { AuthGate } from './components/AuthGate';
import { CalculatorPage } from './components/CalculatorPage';
import { ProfilePage } from './components/ProfilePage';
import { ScriptsPage } from './components/ScriptsPage';
import { fetchPropertyDetails } from './services/geminiService';

const initialProperty: PropertyData = {
  address: '', city: '', state: '', zip: '', price: 0, arv: 0, repairs: 0, sqft: 0, beds: 0, baths: 0,
  lotSize: 0, yearBuilt: 0, county: '', marketRent: 0, images: [], description: '', listedBy: '', type: 'Single Family'
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    view: 'landing',
    mortgageData: { hasMortgage: false, balance: 0, interestRate: 0, monthlyPayment: 0, arrears: 0, initialLoanAmount: 0 },
    leads: [],
    dispoList: [],
    activeCalculator: 'none',
    user: null 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [pendingAddress, setPendingAddress] = useState<string | null>(null);

  const handleMockLogin = (email: string) => {
    const newUser: User = {
      id: 'admin-bypass-id',
      name: 'Admin User',
      email: email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
      plan: 'premium',
      whopId: 'whop_admin',
    };
    
    setState(prev => ({ 
      ...prev, 
      user: newUser, 
      view: prev.view === 'landing' ? 'dashboard' : prev.view 
    }));

    if (pendingAddress) {
        handleSearch(pendingAddress, true);
        setPendingAddress(null);
    }
  };

  const handleLogout = () => {
      setState(prev => ({ ...prev, user: null, view: 'landing', currentProperty: undefined }));
      setPendingAddress(null);
  };

  const handleWhopLogin = () => {
    window.open('https://whop.com/new-era-wholesale/', '_blank');
  };

  const handleSearch = async (address: string, forceAuth = false) => {
    if (!state.user && !forceAuth) {
        setPendingAddress(address);
        setState(prev => ({ ...prev, view: 'landing' })); 
        return;
    }

    setLoadingMessage('Fetching Real Estate Data...');
    setIsLoading(true);
    
    try {
        const fetchedDetails = await fetchPropertyDetails(address);
        
        const propData: PropertyData = {
            ...initialProperty,
            address: address,
            ...fetchedDetails,
            arv: 0, 
            repairs: 0, 
            marketRent: 0, 
            listedBy: 'Public Records',
        } as PropertyData;

        setState(prev => ({ ...prev, currentProperty: propData, view: 'dashboard' }));
    } catch (e) {
        console.error(e);
    } finally {
        setIsLoading(false);
    }
  };

  const handleAddToCRM = (leadData: Partial<CRMLead>) => {
    const newLead: CRMLead = {
        id: Date.now().toString(),
        address: state.currentProperty?.address || '',
        status: 'Not Contacted',
        contacted: false,
        sellerStatus: 'Pending',
        realtorName: state.currentProperty?.realtorName || '', 
        realtorNumber: state.currentProperty?.realtorPhone || '', 
        realtorEmail: state.currentProperty?.realtorEmail || '',
        sellerName: '',
        sellerAgentPhone: '',
        sellerAgentEmail: '',
        sellerMailingAddress: '',
        offerType: 'Cash',
        purchasePrice: 0, 
        emd: 1000,
        monthlyPayment: 0, 
        downPayment: 0, 
        cashFlow: 0, 
        cashOnCash: 0, 
        assignmentFee: 0,
        agentInvolved: false,
        sellerAgentCommission: 0,
        buyerAgentCommission: 0,
        coePeriod: '30 Days',
        inspectionPeriod: '7 Days',
        whoPaysClosing: 'Buyer',
        liens: false,
        balloon: '',
        leaseBack: false,
        hoa: false,
        notes: '', 
        dateAdded: new Date().toLocaleDateString(),
        ...leadData
    };
    setState(prev => ({ ...prev, leads: [...prev.leads, newLead], view: 'crm' }));
  };

  const handleSendToCalculator = (lead: CRMLead) => {
      if (state.currentProperty) {
          setState(prev => ({
              ...prev,
              view: 'dashboard',
              currentProperty: {
                  ...prev.currentProperty!,
                  address: lead.address,
                  price: lead.purchasePrice,
              },
              activeCalculator: lead.offerType === 'Cash' ? 'cash' : 'creative'
          }));
      }
  };

  const pushToDispo = (lead: CRMLead) => {
    const newDispo: CRMDispo = {
        id: Date.now().toString(),
        leadId: lead.id,
        address: lead.address,
        purchasePrice: lead.purchasePrice,
        emd: lead.emd,
        buyerName: '',
        buyerPhone: '',
        buyerEmail: '',
        assignedPrice: 0,
        netProfit: 0,
        status: 'Marketing',
        notes: lead.notes || '',
        dateAdded: new Date().toLocaleDateString()
    };
    setState(prev => ({ 
        ...prev, 
        dispoList: [...prev.dispoList, newDispo],
        leads: prev.leads.map(l => l.id === lead.id ? { ...l, status: 'Contract Signed', sellerStatus: 'Accepted' } : l)
    }));
  };

  const renderView = () => {
    if (state.user) {
        if (state.view === 'crm') return (
            <CRM 
                leads={state.leads} 
                dispoList={state.dispoList}
                updateLead={(id, u) => setState(p => ({...p, leads: p.leads.map(l => l.id === id ? {...l, ...u} : l)}))}
                updateDispo={(id, u) => setState(p => ({...p, dispoList: p.dispoList.map(d => d.id === id ? {...d, ...u} : d)}))}
                deleteLead={(id) => setState(p => ({...p, leads: p.leads.filter(l => l.id !== id)}))}
                deleteDispo={(id) => setState(p => ({...p, dispoList: p.dispoList.filter(d => d.id !== id)}))}
                pushToDispo={pushToDispo}
                onSendToCalculator={handleSendToCalculator}
            />
        );
        if (state.view === 'training') return <TrainingCenter />;
        if (state.view === 'scripts') return <ScriptsPage />;
        if (state.view === 'calculator') return <CalculatorPage />;
        if (state.view === 'profile') return <ProfilePage user={state.user} onUpdateUser={(u) => setState(p => ({...p, user: {...p.user!, ...u}}))} />;
        
        if (state.currentProperty && state.currentProperty.address && state.view === 'dashboard') {
             return (
                <DealDashboard 
                    property={state.currentProperty} 
                    mortgageData={state.mortgageData}
                    onUpdateProperty={(u) => setState(p => ({...p, currentProperty: {...p.currentProperty!, ...u}}))}
                    onUpdateMortgage={(u) => setState(p => ({...p, mortgageData: {...p.mortgageData, ...u}}))}
                    onAddToCRM={handleAddToCRM}
                    onReset={() => setState(p => ({...p, currentProperty: undefined}))}
                />
             );
        } else if (state.view === 'dashboard') {
             return <LandingPage onSearch={(addr) => handleSearch(addr)} onNavigate={(view) => setState(p => ({...p, view}))} isMember={true} />;
        }
    }

    if (state.view === 'landing') {
      if (pendingAddress) {
        return <AuthGate onLogin={handleWhopLogin} lockedAddress={pendingAddress} />;
      }
      return <LandingPage onSearch={(addr) => handleSearch(addr)} onNavigate={(view) => setState(p => ({...p, view}))} isMember={false} />;
    }
    if (state.view === 'features') return <FeaturesPage />;
    if (state.view === 'howitworks') return <HowItWorksPage />;
    if (state.view === 'pricing') return <PricingPage />;
    
    return <LandingPage onSearch={(addr) => handleSearch(addr)} onNavigate={(view) => setState(p => ({...p, view}))} isMember={false} />;
  };

  const SidebarItem = ({ icon, label, viewName }: any) => (
      <button 
        onClick={() => setState(p => ({...p, view: viewName}))}
        className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${state.view === viewName ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
      >
          <span className="text-xl">{icon}</span>
          <span className="font-bold text-sm hidden md:block">{label}</span>
      </button>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-pink-500 selection:text-white relative">
      
      {/* Admin Bypass Button - Always visible at top for easy developer/admin access */}
      {!state.user && (
          <button
            onClick={() => handleMockLogin('admin@wholesalepro.ai')}
            className="fixed top-0 left-0 z-[1000] bg-red-600/80 hover:bg-red-600 text-white px-4 py-1.5 text-[10px] font-black tracking-widest uppercase rounded-br-2xl shadow-xl border-b border-r border-white/20 transition-all hover:scale-105 active:scale-95"
            title="Admin Bypass Login"
          >
            🔓 Admin Access
          </button>
      )}

      {isLoading && (
          <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center flex-col">
              <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-white text-lg font-bold animate-pulse font-display">{loadingMessage}</p>
              <p className="text-slate-400 text-sm">Accessing Real Estate API...</p>
          </div>
      )}

      {state.user ? (
          <div className="flex h-screen overflow-hidden">
              <aside className="w-20 md:w-64 bg-slate-950 border-r border-white/5 flex-shrink-0 flex flex-col justify-between py-6 px-3">
                  <div>
                      <div className="flex items-center gap-3 px-2 mb-10">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-pink-600 flex items-center justify-center font-bold text-white text-xl shadow-lg">W</div>
                          <span className="font-display font-black text-xl text-white hidden md:block tracking-tight">Wholesale<span className="text-pink-500">Pro</span></span>
                      </div>
                      
                      <div className="space-y-2">
                          <SidebarItem icon="⚡" label="Dashboard" viewName="dashboard" />
                          <SidebarItem icon="🧮" label="Calculator" viewName="calculator" />
                          <SidebarItem icon="🗂️" label="CRM" viewName="crm" />
                          <SidebarItem icon="🎓" label="Training" viewName="training" />
                          <SidebarItem icon="📝" label="Scripts & Docs" viewName="scripts" />
                      </div>
                  </div>

                  <div className="border-t border-white/5 pt-6">
                      <button onClick={() => setState(p => ({...p, view: 'profile'}))} className="flex items-center gap-3 w-full p-2 hover:bg-white/5 rounded-xl transition-colors text-left group">
                          <img src={state.user.avatar} className="w-10 h-10 rounded-full border border-white/10" alt="User" />
                          <div className="hidden md:block overflow-hidden">
                              <div className="text-sm font-bold text-white truncate">{state.user.name}</div>
                              <div className="text-[10px] text-emerald-400 font-bold uppercase">Pro Member</div>
                          </div>
                      </button>
                      <button onClick={handleLogout} className="mt-4 w-full text-center text-xs text-slate-500 hover:text-red-400 transition-colors">
                          Log Out
                      </button>
                  </div>
              </aside>
              <main className="flex-1 overflow-y-auto bg-[#020617] relative">
                  {renderView()}
              </main>
          </div>
      ) : (
          <>
            <nav className={`border-b border-white/5 bg-[#020617]/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300`}>
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex items-center justify-between h-20">
                            <div 
                                className="flex items-center cursor-pointer" 
                                onClick={() => setState(p => ({...p, view: 'landing', currentProperty: undefined}))}
                            >
                                <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-600 to-pink-600 flex items-center justify-center font-bold text-white mr-2">W</div>
                                <span className="font-bold text-xl tracking-tight text-white hidden md:block">Wholesale<span className="text-pink-500">Pro</span></span>
                            </div>
                            
                            <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-400">
                                <button onClick={() => setState(p => ({...p, view: 'features'}))} className={`hover:text-white transition-colors ${state.view === 'features' ? 'text-white' : ''}`}>Features</button>
                                <button onClick={() => setState(p => ({...p, view: 'howitworks'}))} className={`hover:text-white transition-colors ${state.view === 'howitworks' ? 'text-white' : ''}`}>How it Works</button>
                                <button onClick={() => setState(p => ({...p, view: 'pricing'}))} className={`hover:text-white transition-colors ${state.view === 'pricing' ? 'text-white' : ''}`}>Pricing</button>
                            </div>

                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={handleWhopLogin}
                                    className="px-6 py-2.5 bg-[#FF6243] hover:bg-[#ff4f2c] text-white rounded-lg text-sm font-bold transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2"
                                >
                                    Login with Whop
                                </button>
                            </div>
                        </div>
                    </div>
            </nav>
            <main>
                {renderView()}
            </main>
          </>
      )}
    </div>
  );
};

export default App;
