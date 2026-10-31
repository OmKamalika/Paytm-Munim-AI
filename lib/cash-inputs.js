// Explicit map of the inputs the cash plan consumes, with the source of each.
//
// Rule: the cash engine reads only what is listed here. Historical bank debits
// are evidence of past payments, not future bills. Only the explicitly mapped
// recurring utility estimates below enter as future bills. If a required
// input is missing, the engine reports it instead of inventing a value.
//
// tests/cash-inputs.test.js checks every value below against the bundled CSVs
// in data/synthetic-v4/ and the retained historical workbook opening scenario.

import { buildOutletForecast } from './outlet-forecast.js';
import { activeSource } from './active-source.js';

// Diwali week as Milestone 2 defines it (the 2025 uplift was measured over the
// matching 7-day festival week). Outside it, outlets get no festival uplift.
export const FESTIVAL_WINDOW = { from: '2026-11-04', to: '2026-11-10' };

// Per-outlet, all-channel collection forecast for the whole plan horizon
// (lib/outlet-forecast.js, Milestone 2 model): same-weekday median of complete
// shift handovers through 29 Oct, bounded recent trend, observed 2025 Diwali
// uplift on festival days. A point estimate, labelled as such.
export const outletCollectionForecast = buildOutletForecast(activeSource.handoverShifts, activeSource.outletMetrics, {
  through: '2026-10-29', from: '2026-10-30', days: 22,
  sourceHash: activeSource.provenance.files.find((file) => file.path === 'csv/shift_handovers.csv')?.sha256,
  closureDates: ['2025-07-09', '2026-01-12'],
  festivalWindow: FESTIVAL_WINDOW,
});

function forecastCollections(forecast) {
  return forecast.outlets[0].days.map((day, index) => {
    const byOutlet = forecast.outlets.map((outlet) => ({ outletId: outlet.id, outlet: outlet.name, amountInr: outlet.days[index].pointInr, lowInr: outlet.days[index].lowInr, highInr: outlet.days[index].highInr }));
    return {
      from: day.date, to: day.date,
      dailyInr: byOutlet.reduce((sum, item) => sum + item.amountInr, 0),
      lowInr: byOutlet.reduce((sum, item) => sum + item.lowInr, 0),
      highInr: byOutlet.reduce((sum, item) => sum + item.highInr, 0),
      byOutlet,
      source: `outlet forecast ${forecast.modelVersion}`, quality: 'estimate',
    };
  });
}

// The workbook's fixed demo estimate, kept for reconciliation and comparison.
// It is no longer the default basis.
export const WORKBOOK_FIXED_COLLECTIONS = [
  { from: '2026-10-30', to: '2026-11-03', dailyInr: 70000, source: 'Workbook Assumptions!B12', quality: 'estimate' },
  { from: '2026-11-04', to: '2026-11-20', dailyInr: 120000, source: 'Workbook Assumptions!B13 (step-up date Assumptions!B14)', quality: 'estimate' },
];

export const CASH_INPUT_SOURCES = {
  workbook: 'data/synthetic/PayTMunim_Synthetic_Data.xlsx',
  upcomingOutflows: 'data/synthetic-v4/csv/upcoming_outflows.csv',
  existingEmis: 'data/synthetic-v4/csv/existing_emis.csv',
  historicalCollections: 'data/synthetic-v4/csv/shift_handovers.csv',
  recurringBills: 'data/synthetic-v4/csv/bank_statement.csv',
  openingSnapshotBankStatement: 'data/synthetic/bank_statement.csv',
};

// The v4 narration model explicitly estimates these four utilities. EMI,
// rent, salary and GST are already mapped below and must not enter twice.
const utilityIds = new Set(['electricity_dadar', 'electricity_matunga', 'electricity_sion', 'broadband']);
const recurringUtilities = activeSource.recurringBills
  .filter((bill) => utilityIds.has(bill.id) && bill.includeInCashPlan && !bill.alreadyInUpcomingOutflows)
  .map((bill) => ({
    id: bill.id, sourceId: `recurring:${bill.id}`, date: bill.nextDueDate,
    payee: bill.name, category: 'utilities', amountInr: bill.monthlyAmountInr,
    quality: 'estimate', source: bill.source, sourceFile: CASH_INPUT_SOURCES.recurringBills,
  }));

export const cashInputs = {
  synthetic: true,
  asOf: '2026-10-30',
  // Workbook Cash_Plan rows 5-26: 30 Oct to 20 Nov 2026.
  horizon: { start: '2026-10-30', end: '2026-11-20' },

  // Workbook Cash_Plan!B2 = ROUND(Bank_Statement!E7794 + Assumptions!B6, 0).
  // It is used inside the engine and is not returned by the cash plan API.
  openingBalance: {
    date: '2026-10-30',
    amountInr: 450000,
    source: 'Historical workbook Cash_Plan!B2 scenario, original 29 Oct snapshot; not the current v4 bank balance.',
    components: [
      { id: 'bank_close_29_oct', amountInr: 354156, source: 'Original data/synthetic/bank_statement.csv last row (BNK007793) currentBalance; historical workbook snapshot' },
      { id: 'till_cash_29_oct', amountInr: 95844, source: 'Workbook Assumptions!B6 (generator output: undeposited cash + float)' },
    ],
    quality: 'synthetic_supplied',
  },

  // Dated expected collections, all channels: the sum of the three outlet
  // forecasts for each day (owner chose the per-outlet basis).
  collectionsBasis: 'outlet_forecast',
  expectedCollections: forecastCollections(outletCollectionForecast),

  // Dated outflows. Supplier dues, salaries, rent, bonus and GST come from
  // upcoming_outflows.csv. The existing EMI comes from existing_emis.csv
  // (debit day 7); the workbook Cash_Plan sheet leaves it out. Explicit v4
  // recurring utility estimates supplement these supplied future bills.
  outflows: [
    { id: 'patel', sourceId: 'OUT-01', date: '2026-10-31', payee: 'Patel Traders', category: 'festival_stock', invoiceId: 'PT-5521', amountInr: 290000, quality: 'exact' },
    { id: 'salaries', sourceId: 'OUT-02', date: '2026-11-01', payee: 'Staff pool (7 staff)', category: 'salaries', amountInr: 105000, quality: 'exact' },
    { id: 'mehta', sourceId: 'OUT-03', date: '2026-11-01', payee: 'Mehta Dry Fruits', category: 'festival_stock', invoiceId: 'MDF-884', amountInr: 150000, quality: 'exact' },
    { id: 'gupta', sourceId: 'OUT-04', date: '2026-11-04', payee: 'Gupta Distributors', category: 'festival_stock', invoiceId: 'GD-1182', amountInr: 520000, quality: 'exact' },
    {
      id: 'rent', sourceId: 'OUT-05', date: '2026-11-05', payee: 'Landlord (3 outlets)', category: 'rent', amountInr: 107000, quality: 'exact',
      outletSplit: [
        { outlet: 'Dadar', amountInr: 45000 },
        { outlet: 'Matunga', amountInr: 30000 },
        { outlet: 'Sion', amountInr: 32000 },
      ],
    },
    { id: 'bonus', sourceId: 'OUT-06', date: '2026-11-05', payee: 'Staff pool', category: 'diwali_bonus', amountInr: 52500, quality: 'exact' },
    { id: 'existing_emi', sourceId: 'TL-0042-8817', date: '2026-11-07', payee: 'Existing term loan EMI', category: 'emi', amountInr: 22000, quality: 'exact' },
    { id: 'gst', sourceId: 'OUT-07', date: '2026-11-20', payee: 'GST (October)', category: 'gst', amountInr: 42000, quality: 'estimate' },
    ...recurringUtilities,
  ],

  // What a relief option is allowed to assume.
  relief: {
    drawdown: { lenderId: 'A', amountInr: 200000, date: '2026-11-04', aprPercent: 18.5, earlyRepayDate: '2026-11-30', minAmountInr: 50000, roundingInr: 10000, destinationAccountMasked: '**4029', source: 'Workbook Assumptions!B7, B8, B24, B25; lenders.csv' },
    // The owner's requested Gupta terms (demo-fixture originalIntent + mandate v3):
    // pay the mandate's minimum upfront share on the due date, the rest after
    // the requested credit period, counted from the 4 Nov due date (assumption).
    supplierDeferral: { invoiceId: 'GD-1182', upfrontPercent: 50, creditDays: 45, creditFrom: 'due_date' },
    // Invoice lines and synthetic SKU allocations exist, but no observed
    // retail stock-on-hand or SKU sales support a measured smaller order.
    stockCut: { orderReductionInr: 185000, marginAtRiskInr: 28000, source: 'Owner what-if; margin uses an assumed ~15% rate', calculated: false },
  },

  // Inputs that are not supplied and must not be guessed.
  notSupplied: [
    { id: 'outlet_level_cash', note: 'One bank account serves all three outlets, so the cash plan is combined. There is no per-outlet cash balance.' },
    { id: 'plan_after_horizon', note: 'The plan ends on 20 Nov, as the workbook Cash_Plan does. Bills moved past it, such as a deferred supplier balance, are listed as still owed.' },
    { id: 'sku_stock', note: 'The v4 evidence includes 710 invoice lines and the order has synthetic SKU assumptions. Observed retail stock-on-hand and SKU sales are unavailable, so stock cuts cannot be calculated from measured inventory.' },
  ],
};
