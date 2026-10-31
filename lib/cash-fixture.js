// Cash-plan values now follow the supplied PayTMunim_Synthetic_Data workbook
// formulas and CSV outflows. Its opening input is used internally only; the
// API returns daily closings and never includes an opening-balance field.
const syntheticLabel = 'Synthetic demo data - nothing here is real.';

export const cashPlanFixture = {
  synthetic: true,
  syntheticLabel,
  asOf: '2026-10-30',
  business: {
    name: 'Sharma General Stores',
    owner: 'Rakesh',
    outlets: ['Dadar', 'Matunga', 'Sion'],
  },
  homePaytmToday: {
    channel: 'paytm_only_till_12_40',
    asOfTime: '12:40',
    totalInr: 10140,
    outlets: [
      { outlet: 'Dadar', amountInr: 4980 },
      { outlet: 'Matunga', amountInr: 3120 },
      { outlet: 'Sion', amountInr: 2040 },
    ],
  },
  monthlyCollectionsChannel: 'all_channels',
  monthlyAllChannelCollectionsInr: 1900000,
  existingMonthlyEmiInr: 22000,
  cashPlan: {
    label: 'Illustrative projection from the listed bills - not a measured future',
    projected: true,
    anchors: {
      firstNegativeDate: '2026-11-04',
      lowestDate: '2026-11-05',
      lowestBalanceInr: -184500,
      recoveryAboveZeroDate: '2026-11-07',
    },
    dailyBalanceSeries: [],
    dailyBalanceNote: 'Daily closings use the supplied workbook forecast formula and listed synthetic outflows.',
    outflows: [
      { id: 'patel', date: '2026-10-31', payee: 'Patel Traders', category: 'festival_stock', amountInr: 290000, quality: 'exact' },
      { id: 'salaries', date: '2026-11-01', payee: 'Staff pool (7 staff)', category: 'salaries', amountInr: 105000, quality: 'exact' },
      { id: 'mehta', date: '2026-11-01', payee: 'Mehta Dry Fruits', category: 'festival_stock', amountInr: 150000, quality: 'exact' },
      { id: 'gupta', date: '2026-11-04', payee: 'Gupta Distributors', invoiceId: 'GD-1182', category: 'festival_stock', amountInr: 520000, quality: 'exact' },
      {
        id: 'rent', date: '2026-11-05', payee: 'Landlord (3 outlets)', category: 'rent', amountInr: 107000, quality: 'exact',
        outletSplit: [
          { outlet: 'Dadar', amountInr: 45000 },
          { outlet: 'Matunga', amountInr: 30000 },
          { outlet: 'Sion', amountInr: 32000 },
        ],
      },
      { id: 'bonus', date: '2026-11-05', payee: 'Staff pool', category: 'diwali_bonus', amountInr: 52500, quality: 'exact' },
      { id: 'gst', date: '2026-11-20', payee: 'GST (October)', category: 'gst', amountInr: 42000, quality: 'estimate' },
    ],
  },
  sourceNote: 'Paytm-only Home collections through 12:40 pm are separate from all-channel monthly collections. Daily closing balances follow the supplied synthetic workbook formula.',
};

// Workbook Cash_Plan formula: forecast all-channel inflow is ₹70,000 a day
// through 3 Nov and ₹1,20,000 a day thereafter. The source workbook combines
// the 29 Oct bank close and till cash before the first projected day. This
// internal input is intentionally not returned as a separate API field.
let projectedClose = 450000;
for (let offset = 0; offset < 22; offset += 1) {
  const date = new Date(Date.UTC(2026, 9, 30 + offset)).toISOString().slice(0, 10);
  const inflowForecastInr = date < '2026-11-04' ? 70000 : 120000;
  const knownOutflowsInr = cashPlanFixture.cashPlan.outflows
    .filter((outflow) => outflow.date === date)
    .reduce((total, outflow) => total + outflow.amountInr, 0);
  projectedClose += inflowForecastInr - knownOutflowsInr;
  cashPlanFixture.cashPlan.dailyBalanceSeries.push({
    date, inflowForecastInr, knownOutflowsInr, balanceInr: projectedClose,
  });
}

export const optionsFixture = {
  synthetic: true,
  syntheticLabel,
  asOf: '2026-10-30',
  basis: 'Illustrative effects against the supplied projected 5 Nov low of -₹1,84,500.',
  options: [
    {
      id: 'supplier_deferral', rank: 1,
      title: 'Ask Gupta to defer or split invoice GD-1182',
      costInr: 0, costKind: 'no_fee_if_agreed', costLabel: '₹0 if Gupta agrees',
      invoiceId: 'GD-1182', invoiceAmountInr: 520000,
      conditional: true,
      conditions: ['Gupta must agree to the deferral or split.', 'No revised terms are guaranteed or executed in this demo.'],
      effectOn5Nov: { balanceInr: null, note: 'Depends on the terms Gupta accepts; no new balance is asserted.' },
    },
    {
      id: 'drawdown', rank: 2,
      title: 'Draw ₹2,00,000 from Lender A',
      costInr: 2600, costKind: 'illustrative_26_day_interest', costLabel: 'About ₹2,600 if repaid after 26 days',
      amountInr: 200000, lenderId: 'A', destinationAccountMasked: '**4029',
      conditional: true,
      conditions: ['Owner approval and correct PIN are required.', 'The amount is credited once to the owner’s own verified account.'],
      effectOn5Nov: {
        balanceInr: 15500,
        balanceBasis: 'supplied_story_anchor_plus_single_drawdown',
        inflowCount: 1,
        guptaInvoiceOutflowInr: 520000,
      },
    },
    {
      id: 'cut_stock', rank: 3,
      title: 'Cut the Diwali stock order by ₹1,85,000',
      costInr: 28000, costKind: 'approximate_margin_at_risk', costLabel: 'About ₹28,000 margin at risk',
      orderReductionInr: 185000,
      conditional: true,
      conditions: ['Actual lost margin depends on demand and sell-through.'],
      effectOn5Nov: {
        balanceInr: 500,
        balanceBasis: 'arithmetic_only_from_supplied_low_and_order_reduction',
        note: 'Illustrative arithmetic only; actual inventory and sales are not observed.',
      },
    },
  ],
};

const emiCap = {
  monthlyCollectionsInr: 1900000,
  existingMonthlyEmiInr: 22000,
  percentage: 8,
  maxTotalMonthlyEmiInr: 152000,
};

const offerInputs = [
  { id: 'A', name: 'Lender A', type: 'Bank', aprPercent: 18.5, tenorMonths: 3, emiInr: 68730, totalInterestInr: 6190,
    earlyRepayment: { afterDays: 26, estimatedInterestInr: 2600, label: 'Illustrative early-repayment interest; actual lender terms would govern.' } },
  { id: 'B', name: 'Lender B', type: 'NBFC', aprPercent: 22, tenorMonths: 3, emiInr: 69130, totalInterestInr: 7390 },
  { id: 'C', name: 'Lender C', type: 'NBFC', aprPercent: 26.5, tenorMonths: 6, emiInr: 35960, totalInterestInr: 15760 },
];

export const lendersFixture = {
  synthetic: true,
  syntheticLabel,
  scheduleLabel: 'Synthetic, approximate illustrative schedule; no live lender offer.',
  emiCap,
  offers: offerInputs.map((offer) => ({
    ...offer,
    illustrative: true,
    totalMonthlyEmiInr: emiCap.existingMonthlyEmiInr + offer.emiInr,
    underCap: emiCap.existingMonthlyEmiInr + offer.emiInr <= emiCap.maxTotalMonthlyEmiInr,
  })),
};
