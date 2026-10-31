// Explicit map of the inputs the cash plan consumes, with the source of each.
//
// Rule: the cash engine reads only what is listed here. Historical bank debits
// are evidence of past payments, not future bills, and outlet payment history
// is not a dated forecast, so neither is read automatically. If a required
// input is missing, the engine reports it instead of inventing a value.
//
// tests/cash-inputs.test.js checks every value below against the bundled CSVs
// in data/synthetic/ (and records which workbook cells the rest come from).

export const CASH_INPUT_SOURCES = {
  workbook: 'data/synthetic/PayTMunim_Synthetic_Data.xlsx',
  upcomingOutflows: 'data/synthetic/upcoming_outflows.csv',
  existingEmis: 'data/synthetic/existing_emis.csv',
  bankStatement: 'data/synthetic/bank_statement.csv',
};

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
    components: [
      { id: 'bank_close_29_oct', amountInr: 354156, source: 'bank_statement.csv last row (BNK007793) currentBalance' },
      { id: 'till_cash_29_oct', amountInr: 95844, source: 'Workbook Assumptions!B6 (generator output: undeposited cash + float)' },
    ],
    quality: 'synthetic_supplied',
  },

  // Dated expected collections, all channels combined. These are the workbook's
  // fixed demo forecast (PRD 03 output), not a statistical forecast run here.
  expectedCollections: [
    { from: '2026-10-30', to: '2026-11-03', dailyInr: 70000, source: 'Workbook Assumptions!B12', quality: 'estimate' },
    { from: '2026-11-04', to: '2026-11-20', dailyInr: 120000, source: 'Workbook Assumptions!B13 (step-up date Assumptions!B14)', quality: 'estimate' },
  ],

  // Dated outflows. Supplier dues, salaries, rent, bonus and GST come from
  // upcoming_outflows.csv. The existing EMI comes from existing_emis.csv
  // (debit day 7); the workbook Cash_Plan sheet leaves it out.
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
  ],

  // What a relief option is allowed to assume.
  relief: {
    drawdown: { lenderId: 'A', amountInr: 200000, date: '2026-11-04', aprPercent: 18.5, earlyRepayDate: '2026-11-30', minAmountInr: 50000, roundingInr: 10000, destinationAccountMasked: '**4029', source: 'Workbook Assumptions!B7, B8, B24, B25; lenders.csv' },
    // The owner's requested Gupta terms (demo-fixture originalIntent + mandate v3):
    // pay the mandate's minimum upfront share on the due date, the rest after
    // the requested credit period, counted from the 4 Nov due date (assumption).
    supplierDeferral: { invoiceId: 'GD-1182', upfrontPercent: 50, creditDays: 45, creditFrom: 'due_date' },
    // No stock or SKU data exists, so a smaller order is an assumption only.
    stockCut: { orderReductionInr: 185000, marginAtRiskInr: 28000, source: 'Owner what-if; margin uses an assumed ~15% rate', calculated: false },
  },

  // Inputs that are not supplied and must not be guessed.
  notSupplied: [
    { id: 'outlet_level_cash', note: 'One bank account serves all three outlets, so the cash plan is combined. There is no per-outlet cash balance.' },
    { id: 'collections_after_horizon', note: 'No dated expected collections exist after 20 Nov, so the plan stops there.' },
    { id: 'sku_stock', note: 'No SKU, stock-on-hand or invoice line data exists, so stock cuts cannot be calculated.' },
  ],
};
