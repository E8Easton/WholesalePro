
import { PropertyData, MortgageData, OfferCalculations, Comp } from '../types';

export const calculateARVFromComps = (comps: Comp[]): number => {
  if (comps.length === 0) return 0;
  const totalPpsq = comps.reduce((acc, comp) => acc + (comp.salePrice / (comp.sqft || 1)), 0);
  const avgPpsq = totalPpsq / comps.length;
  return Math.round(avgPpsq);
};

export const estimateRehab = (sqft: number, level: 'light' | 'medium' | 'heavy'): number => {
    switch (level) {
        case 'light': return sqft * 25; 
        case 'medium': return sqft * 45; 
        case 'heavy': return sqft * 70; 
        default: return 0;
    }
};

// Helper to calculate total operating expenses based on PDF logic
const calculateOperatingExpenses = (property: PropertyData): number => {
    // Defaults from PDF: Vacancy 5%, Maintenance 5-10%, Management 10%
    // Plus Taxes, Insurance, HOA
    const monthlyRent = property.marketRent;
    const vacancy = monthlyRent * (property.vacancyRate || 0.05);
    const maintenance = monthlyRent * (property.maintenanceRate || 0.10); // CapEx + Maint
    const management = monthlyRent * (property.managementRate || 0.10);
    
    const taxes = (property.taxAnnual || property.price * 0.012) / 12; // Est 1.2% if not provided
    const insurance = (property.insuranceAnnual || 1200) / 12; // Est $100/mo if not provided
    const hoa = property.hoaMonthly || 0;

    return vacancy + maintenance + management + taxes + insurance + hoa;
};

export const calculateCashOffer = (
  arv: number, 
  repairs: number, 
  assignmentFee: number = 10000
): number => {
  // MAO = (ARV * 0.70) - Repairs - Assignment
  return Math.floor((arv * 0.70) - repairs - assignmentFee);
};

export const calculateNovationOffer = (
    property: PropertyData,
    repairs: number,
    investorProfit: number = 25000
): OfferCalculations => {
    const sellingCosts = property.arv * 0.08; // 6% comm + 2% closing
    const netToSeller = property.arv - repairs - sellingCosts - investorProfit;

    return {
        offerPrice: netToSeller,
        downPayment: 0,
        monthlyPayment: 0,
        cashFlow: 0,
        cashOnCash: 0,
        assignmentFee: investorProfit,
        entryFee: repairs,
        entryFeePercent: (repairs / property.arv) * 100,
        netProfit: investorProfit,
        piti: 0,
        amortization: 0,
        closingCosts: sellingCosts,
        agentCommission: property.arv * 0.06,
        totalExpenses: 0
    };
};

export const calculateSubToOffer = (
  property: PropertyData,
  mortgage: MortgageData,
  assignmentFee: number = 10000
): OfferCalculations => {
  const cashToSeller = Math.max(3000, property.price * 0.03); // Negotiation start
  const closingCosts = property.price * 0.02; // PDF says ~2%
  const agentComm = 0; // Usually buyer pays own agent or none in SubTo, but editable
  
  // PDF: Entry Fee = Down Payment + Rehab + Assignment + Closing
  const entryFee = cashToSeller + (property.repairs || 0) + assignmentFee + closingCosts + mortgage.arrears;
  
  const monthlyExpenses = calculateOperatingExpenses(property);
  const debtService = mortgage.monthlyPayment;
  const cashFlow = property.marketRent - monthlyExpenses - debtService;

  const offerPrice = mortgage.balance + cashToSeller + mortgage.arrears;

  return {
    offerPrice,
    downPayment: cashToSeller,
    monthlyPayment: debtService,
    cashFlow,
    cashOnCash: entryFee > 0 ? (cashFlow * 12) / entryFee * 100 : 0,
    assignmentFee,
    entryFee,
    entryFeePercent: (entryFee / property.price) * 100,
    netProfit: (cashFlow * 12 * 7) + (property.arv - offerPrice), // 7yr hold + equity
    piti: debtService,
    amortization: 30,
    closingCosts,
    agentCommission: agentComm,
    totalExpenses: monthlyExpenses
  };
};

export const calculateSellerFinanceOffer = (
  property: PropertyData,
  desiredCashFlow: number = 300,
  downPaymentPercent: number = 0.10
): OfferCalculations => {
  const offerPrice = property.price;
  const downPayment = offerPrice * downPaymentPercent;
  const loanAmount = offerPrice - downPayment;
  const closingCosts = property.price * 0.02;
  const assignmentFee = 10000;
  
  // PDF Entry Fee calculation
  const entryFee = downPayment + (property.repairs || 0) + assignmentFee + closingCosts;

  const monthlyExpenses = calculateOperatingExpenses(property);
  
  // Reverse engineer Max Allowable Payment to hit Desired Cashflow
  // Rent - Expenses - Payment = Desired Cashflow
  // Payment = Rent - Expenses - Desired Cashflow
  let targetPayment = property.marketRent - monthlyExpenses - desiredCashFlow;
  if (targetPayment < 0) targetPayment = 0;

  return {
    offerPrice,
    downPayment,
    monthlyPayment: targetPayment,
    cashFlow: property.marketRent - monthlyExpenses - targetPayment,
    cashOnCash: entryFee > 0 ? ((property.marketRent - monthlyExpenses - targetPayment) * 12) / entryFee * 100 : 0,
    assignmentFee,
    entryFee,
    entryFeePercent: (entryFee / property.price) * 100,
    netProfit: (property.marketRent - monthlyExpenses - targetPayment) * 12 * 10, // 10yr hold
    piti: targetPayment,
    amortization: 30,
    closingCosts,
    agentCommission: 0,
    totalExpenses: monthlyExpenses
  };
};
