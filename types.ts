
export interface PropertyData {
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  arv: number;
  repairs: number;
  sqft: number;
  beds: number;
  baths: number;
  lotSize: number;
  yearBuilt: number;
  county: string;
  marketRent: number;
  images: string[];
  description: string;
  listedBy: string;
  type: string;
  // Realtor / Contact Info
  realtorName?: string;
  realtorPhone?: string;
  realtorEmail?: string;
  // Oven Specifics
  vacancyRate?: number; // default 0.05
  managementRate?: number; // default 0.10
  maintenanceRate?: number; // default 0.10 (CapEx + Maint)
  taxAnnual?: number;
  insuranceAnnual?: number;
  hoaMonthly?: number;
}

export interface MortgageData {
  hasMortgage: boolean;
  balance: number;
  interestRate: number;
  monthlyPayment: number;
  arrears: number;
  initialLoanAmount: number;
  originalDate?: string;
}

export interface Comp {
  address: string;
  salePrice: number;
  sqft: number;
  dateSold: string;
  similarity: number; // 0-100 score
  distancedMiles: number;
}

export interface OfferCalculations {
  offerPrice: number;
  downPayment: number;
  monthlyPayment: number;
  cashFlow: number;
  cashOnCash: number;
  assignmentFee: number;
  entryFee: number;
  entryFeePercent: number; // PDF Requirement
  netProfit: number;
  piti: number;
  balloonDate?: string;
  amortization: number; // years
  closingCosts: number;
  agentCommission: number; // 3% or 6%
  totalExpenses: number;
}

export interface CRMLead {
  id: string;
  address: string;
  status: 'Not Contacted' | 'Contacted' | 'Offer Made' | 'Negotiating' | 'Contract Signed' | 'Closed' | 'Dead';
  
  // Specific Pipeline Tracking
  contacted: boolean;
  sellerStatus: 'Pending' | 'Accepted' | 'Declined';

  // Property & People
  realtorName: string;
  realtorNumber: string;
  realtorEmail: string;
  sellerName: string;
  sellerAgentPhone: string; // If distinct from Realtor Number
  sellerAgentEmail: string;
  sellerMailingAddress: string;

  // Deal Specifics
  offerType: 'Cash' | 'Creative' | 'SubTo' | 'Novation';
  purchasePrice: number;
  emd: number;
  downPayment: number;
  monthlyPayment: number; // To Seller / Loan Take Over
  cashFlow: number;
  cashOnCash: number;
  assignmentFee: number;
  
  // Terms
  agentInvolved: boolean;
  sellerAgentCommission: number;
  buyerAgentCommission: number;
  coePeriod: string; // "30 Days"
  inspectionPeriod: string; // "7 Days"
  whoPaysClosing: 'Buyer' | 'Seller' | '50/50';
  liens: boolean;
  balloon: string;
  leaseBack: boolean;
  hoa: boolean;
  
  // Other
  notes: string; // "Notes/Contingencies"
  dateAdded: string;
}

export interface CRMDispo {
  id: string;
  leadId: string; 
  address: string;
  purchasePrice: number;
  emd: number;
  buyerName: string;
  buyerPhone: string;
  buyerEmail: string;
  assignedPrice: number;
  netProfit: number;
  status: 'Marketing' | 'Negotiating' | 'Assigned' | 'Closed';
  notes: string; // Added for Dispo notes
  dateAdded: string;
}

export interface ScriptTemplate {
  id: string;
  title: string;
  category: 'Seller Finance' | 'Subject To' | 'Trusts' | 'Low Equity' | 'Multi-Family';
  content: string;
  tips: string;
}

export interface TrainingModule {
  id: string;
  title: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string;
  url?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  plan: 'free' | 'premium';
  whopId: string;
  phone?: string;
  bio?: string;
}

export interface AppState {
  view: 'landing' | 'dashboard' | 'crm' | 'training' | 'scripts' | 'features' | 'howitworks' | 'pricing' | 'calculator' | 'profile' | 'login' | 'signup';
  currentProperty?: PropertyData;
  mortgageData: MortgageData;
  leads: CRMLead[];
  dispoList: CRMDispo[];
  activeCalculator: 'none' | 'cash' | 'creative' | 'subto';
  user: User | null;
}

export interface SellerData {
  reason: string;
  timeline: string;
  askingPrice: number;
  cashToSellerDesired: number;
}

export interface StrategyResult {
  strategyName: string;
  offerPrice: number;
  entryFee: number;
  monthlyCashFlow: number;
  netProfit: number;
  description: string;
  pros: string[];
}

export interface GeneratedOffers {
  cash: StrategyResult;
  subTo: StrategyResult;
  sellerFinance: StrategyResult;
  novation: StrategyResult;
}

export interface DealState {
  step: number;
  property: PropertyData;
  mortgage: MortgageData;
  seller: SellerData;
  calculatedOffers?: GeneratedOffers;
  aiAnalysis?: string;
  aiRating?: number;
  isLoadingAI?: boolean;
}
