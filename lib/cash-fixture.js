import { activeSource } from './active-source.js';

// Cash-plan values now follow the supplied PayTMunim_Synthetic_Data workbook
// formulas and CSV outflows. Its opening input is used internally only; the
// API returns daily closings and never includes an opening-balance field.
// Cash plan and relief options, built by lib/cash-engine.js from the mapped
// inputs in lib/cash-inputs.js. The response shapes match the earlier fixed
// snapshot so the UI is unchanged. The opening balance is used inside the
// engine only; the API returns daily closings and no opening-balance field.
//
// cashPlanFixture / optionsFixture are the baseline (no relief applied), kept
// under their old names for existing imports. Routes call buildCashPlan /
// buildOptions with whatever relief has actually happened in this session.

import { cashInputs } from './cash-inputs.js';
import {
  balanceOn, computeCashPlan, deferralAdjustment, drawdownAdjustment, formatInr,
  minimumDrawdownInr, simpleInterestInr,
} from './cash-engine.js';

const syntheticLabel = 'Synthetic demo data - nothing here is real.';
const DECISION_DATE = '2026-11-05';
const dateText = (iso) => iso ? new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`)) : 'not supplied';
// The contract's names exclude the engine-internal opening balance.
const publicOutflow = ({ id, date, payee, category, amountInr, quality, invoiceId, outletSplit, deferredFrom, sourceId, paidSimulated, paymentPending }) => ({
  id, date, payee, category, amountInr, quality, status: paidSimulated ? 'paid_simulated' : paymentPending ? 'payment_pending' : 'due',
  ...(invoiceId ? { invoiceId } : {}), ...(outletSplit ? { outletSplit } : {}),
  ...(deferredFrom ? { deferredFrom } : {}), ...(sourceId ? { sourceRef: sourceId } : {}),
});

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
    dailyBalanceNote: 'Daily closings use the current workbook forecast and include recurring EMI and utility bills inferred from bank narrations.',
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
  sourceNote: 'Paytm-only Home collections through 12:40 pm are separate from all-channel monthly collections. The current model includes recurring EMI and utilities once; rent, salaries and GST are already listed.',
};

for (const bill of activeSource.recurringBills.filter(bill => bill.includeInCashPlan)) {
  cashPlanFixture.cashPlan.outflows.push({
    id: `recurring_${bill.id}`, date: bill.nextDueDate, payee: bill.name,
    category: 'recurring', amountInr: bill.monthlyAmountInr,
    quality: bill.id === 'emi' ? 'exact' : 'estimate',
    source: bill.source,
  });
}

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
const business = { name: 'Sharma General Stores', owner: 'Rakesh', outlets: ['Dadar', 'Matunga', 'Sion'] };
const homePaytmToday = {
  channel: 'paytm_only_till_12_40',
  asOfTime: '12:40',
  totalInr: 10140,
  outlets: [
    { outlet: 'Dadar', amountInr: 4980 },
    { outlet: 'Matunga', amountInr: 3120 },
    { outlet: 'Sion', amountInr: 2040 },
  ],
};

function describeRelief(item) {
  if (item.type === 'payment_record') return { id: item.id, type: item.type, label: `Paid ${formatInr(item.amountInr)} to ${item.payee ?? 'the supplier'} for ${item.paidInvoiceId ?? item.invoiceId}, due ${dateText(item.date)} (simulated)`, amountInr: item.amountInr, date: item.date };
  if (item.type === 'drawdown') return { id: item.id, type: item.type, label: `Lender ${item.lenderId} drawdown of ${formatInr(item.amountInr)} on ${dateText(item.date)} (simulated)`, amountInr: item.amountInr, date: item.date };
  return { id: item.id, type: item.type, label: `Gupta ${item.invoiceId}: ${formatInr(item.upfrontInr)} on the due date, ${formatInr(item.deferredInr)} moved to ${dateText(item.newDate)} (simulated acceptance)`, amountInr: item.deferredInr, date: item.newDate };
}

export function buildCashPlan(adjustments = [], inputs = cashInputs) {
  const plan = computeCashPlan(inputs, adjustments);
  return {
    synthetic: true,
    syntheticLabel,
    asOf: inputs.asOf,
    business,
    homePaytmToday,
    monthlyCollectionsChannel: 'all_channels',
    monthlyAllChannelCollectionsInr: 1900000,
    existingMonthlyEmiInr: 22000,
    engine: { name: 'cash-engine', kind: 'deterministic_arithmetic', live: true, collectionsBasis: inputs.collectionsBasis ?? 'workbook_fixed', basis: 'Per-outlet collection forecast + listed bills (upcoming_outflows.csv) + existing EMI (existing_emis.csv)' },
    cashPlan: {
      label: 'Calculated from the listed bills and each outlet\'s collection forecast - an estimate, not a measured future',
      projected: true,
      anchors: plan.anchors,
      dailyBalanceSeries: plan.days.map(({ date, inflowForecastInr, collectionsByOutlet, collectionsRange, reliefInflowInr, knownOutflowsInr, balanceInr }) => ({ date, inflowForecastInr, collectionsByOutlet, collectionsRange, reliefInflowInr, knownOutflowsInr, balanceInr })),
      dailyBalanceNote: 'Each closing = previous closing + expected collections + relief received - bills due that day. Expected collections are the sum of the Dadar, Matunga and Sion forecasts (same-weekday history, recent trend, last Diwali\'s uplift for 4-10 Nov).',
      outflows: plan.outflows.map(publicOutflow),
      afterHorizon: plan.afterHorizon.map((item) => ({ ...publicOutflow(item), note: item.note })),
      appliedRelief: plan.applied.map(describeRelief),
      pendingActions: plan.pending.map((item) => ({ id: item.id, type: item.actionType, amountInr: item.amountInr, label: `${item.actionType === 'drawdown' ? 'Drawdown' : 'Supplier advance'} of ${formatInr(item.amountInr)} is pending reconciliation (simulated). It is not counted until the same instruction resolves.` })),
      missingInputs: plan.missingInputs,
      notSupplied: inputs.notSupplied,
    },
    sourceNote: 'Paytm-only Home collections through 12:40 pm are separate from all-channel monthly collections. One bank account serves all three outlets, so the cash plan is combined.',
  };
}

export function buildOptions(adjustments = [], inputs = cashInputs) {
  const current = computeCashPlan(inputs, adjustments);
  const relief = inputs.relief;
  const requestedTerms = deferralAdjustment(inputs, { upfrontPercent: relief.supplierDeferral.upfrontPercent, creditDays: relief.supplierDeferral.creditDays });
  const acceptedDeferral = current.applied.find((item) => item.type === 'supplier_deferral') ?? null;
  const deferralPlan = acceptedDeferral ? current : computeCashPlan(inputs, [...adjustments, requestedTerms]);
  const deferralTerms = acceptedDeferral ?? requestedTerms;
  const drawdown = drawdownAdjustment(inputs);
  const drawdownPlan = computeCashPlan(inputs, [...adjustments, drawdown]);
  const drawdownCost = simpleInterestInr(relief.drawdown.amountInr, relief.drawdown.aprPercent, relief.drawdown.date, relief.drawdown.earlyRepayDate);
  const currentOnDecision = balanceOn(current, DECISION_DATE);
  const guptaInvoice = inputs.outflows.find((item) => item.invoiceId === relief.supplierDeferral.invoiceId);

  return {
    synthetic: true,
    syntheticLabel,
    asOf: inputs.asOf,
    basis: `Calculated against the current plan: lowest ${formatInr(current.anchors.lowestBalanceInr)} on ${dateText(current.anchors.lowestDate)}.`,
    options: [
      {
        id: 'supplier_deferral', rank: 1,
        title: 'Ask Gupta to defer or split invoice GD-1182',
        costInr: 0, costKind: 'no_fee_if_agreed', costLabel: acceptedDeferral ? '₹0 · Gupta accepted (simulated)' : '₹0 if Gupta agrees',
        invoiceId: guptaInvoice.invoiceId, invoiceAmountInr: guptaInvoice.amountInr,
        conditional: !acceptedDeferral,
        accepted: Boolean(acceptedDeferral),
        terms: { upfrontInr: deferralTerms.upfrontInr, deferredInr: deferralTerms.deferredInr, deferredTo: deferralTerms.newDate, creditDays: deferralTerms.creditDays },
        conditions: acceptedDeferral
          ? ['Gupta accepted these terms in the simulator.', `The deferred ${formatInr(deferralTerms.deferredInr)} is still payable on ${dateText(deferralTerms.newDate)}.`]
          : ['Gupta must agree to the deferral or split.', `Requested terms: ${relief.supplierDeferral.upfrontPercent}% now, the rest after ${relief.supplierDeferral.creditDays} days (counted from the due date).`],
        // balanceInr stays null until Gupta accepts, so a preview is never shown
        // as the plan; the calculated preview is in ifAcceptedBalanceInr.
        effectOn5Nov: {
          balanceInr: acceptedDeferral ? balanceOn(deferralPlan, DECISION_DATE) : null,
          ifAcceptedBalanceInr: balanceOn(deferralPlan, DECISION_DATE),
          lowestBalanceInr: deferralPlan.anchors.lowestBalanceInr,
          balanceBasis: acceptedDeferral ? 'calculated_with_accepted_terms' : 'calculated_if_requested_terms_accepted',
          note: acceptedDeferral ? 'Calculated with the accepted terms.' : `If Gupta accepts the requested terms, 5 Nov closes at ${formatInr(balanceOn(deferralPlan, DECISION_DATE))}. The plan changes only after a simulated acceptance.`,
        },
      },
      {
        id: 'drawdown', rank: 2,
        title: `Draw ${formatInr(relief.drawdown.amountInr)} from Lender A`,
        costInr: drawdownCost, costKind: 'illustrative_26_day_interest', costLabel: `About ${formatInr(drawdownCost)} if repaid after 26 days`,
        amountInr: relief.drawdown.amountInr, lenderId: relief.drawdown.lenderId, destinationAccountMasked: relief.drawdown.destinationAccountMasked,
        conditional: true,
        conditions: ['Owner approval and correct PIN are required.', 'The amount is credited once to the owner’s own verified account.'],
        effectOn5Nov: {
          balanceInr: balanceOn(drawdownPlan, DECISION_DATE),
          lowestBalanceInr: drawdownPlan.anchors.lowestBalanceInr,
          balanceBasis: 'calculated_current_plan_plus_single_drawdown',
          inflowCount: drawdownPlan.inflows.filter((item) => item.kind === 'drawdown').length,
          guptaInvoiceOutflowInr: drawdownPlan.outflows.filter((item) => item.invoiceId === guptaInvoice.invoiceId).reduce((sum, item) => sum + item.amountInr, 0)
            + drawdownPlan.afterHorizon.filter((item) => item.invoiceId === guptaInvoice.invoiceId).reduce((sum, item) => sum + item.amountInr, 0),
        },
      },
      {
        id: 'cut_stock', rank: 3,
        title: `Cut the Diwali stock order by ${formatInr(relief.stockCut.orderReductionInr)}`,
        costInr: relief.stockCut.marginAtRiskInr, costKind: 'approximate_margin_at_risk', costLabel: `About ${formatInr(relief.stockCut.marginAtRiskInr)} margin at risk (assumption)`,
        orderReductionInr: relief.stockCut.orderReductionInr,
        conditional: true,
        calculated: false,
        conditions: ['Assumption only: no SKU or stock data exists to say which items to cut.', 'Actual lost margin depends on demand and sell-through.'],
        effectOn5Nov: {
          balanceInr: currentOnDecision === null ? null : currentOnDecision + relief.stockCut.orderReductionInr,
          balanceBasis: 'assumption_arithmetic_not_calculated_plan',
          note: 'Arithmetic only: current 5 Nov balance plus the order reduction. Which supplier bill shrinks is not known.',
        },
      },
    ],
    recommendation: recommend(inputs, current, deferralPlan, acceptedDeferral, drawdownPlan, drawdownCost),
  };
}

/** A computed recommendation. Every number in `text` is also in `figures`. */
function recommend(inputs, current, deferralPlan, acceptedDeferral, drawdownPlan, drawdownCost) {
  const d = inputs.relief.drawdown;
  const figures = [];
  const fig = (id, label, valueInr) => { figures.push({ id, label, valueInr }); return formatInr(valueInr); };
  const low = current.anchors.lowestBalanceInr;
  if (low === null) {
    return { status: 'missing_inputs', text: 'The plan cannot be calculated because an input is missing.', figures, steps: [] };
  }
  const drawdownDone = current.applied.some((item) => item.type === 'drawdown');
  if (current.pending.length) {
    // Never prompt a second payment while an instruction is unresolved.
    const item = current.pending[0];
    return {
      status: 'pending_reconciliation',
      text: `A ${item.actionType === 'drawdown' ? 'drawdown' : 'supplier advance'} of ${fig('pending_amount', 'Pending instruction', item.amountInr)} is pending reconciliation and is not counted yet. Reconcile that same instruction before any other payment. Without it, the lowest closing is ${fig('current_low', 'Lowest closing', low)} on ${dateText(current.anchors.lowestDate)}.`,
      figures, steps: [], reliefApplied: { deferral: Boolean(acceptedDeferral), drawdown: drawdownDone },
    };
  }
  if (low >= 0) {
    return {
      status: 'covered',
      text: `No further relief is needed before ${dateText(inputs.horizon.end)}. The lowest closing is ${fig('current_low', 'Lowest closing', low)} on ${dateText(current.anchors.lowestDate)}.`,
      figures,
      steps: [],
      drawdownStillUseful: false,
      reliefApplied: { deferral: Boolean(acceptedDeferral), drawdown: drawdownDone },
    };
  }

  const steps = [];
  const parts = [`Cash runs short by ${fig('shortfall', 'Shortfall at the low', -low)} on ${dateText(current.anchors.lowestDate)}.`];
  if (!acceptedDeferral) {
    const afterDeferral = deferralPlan.anchors.lowestBalanceInr;
    const topUp = minimumDrawdownInr(inputs, deferralPlan);
    steps.push({ option: 'supplier_deferral', costInr: 0, resultingLowestInr: afterDeferral });
    parts.push(`Ask Gupta first: it costs ₹0. If Gupta accepts the requested terms, the lowest closing becomes ${fig('low_after_deferral', 'Lowest closing if Gupta accepts', afterDeferral)}${topUp === 0 ? ' and no drawdown is needed.' : '.'}`);
    if (topUp > 0) {
      steps.push({ option: 'drawdown', amountInr: topUp, reason: 'top_up_after_deferral' });
      parts.push(`A smaller drawdown of ${fig('top_up', 'Drawdown still needed after deferral', topUp)} would cover what is left, at about ${fig('top_up_interest', 'Top-up interest if repaid by 30 Nov', simpleInterestInr(topUp, d.aprPercent, d.date, d.earlyRepayDate))} interest if repaid by 30 Nov.`);
    }
  }
  const alone = minimumDrawdownInr(inputs, current);
  if (alone !== null && alone > 0 && !drawdownDone) {
    steps.push({ option: 'drawdown', amountInr: alone, reason: acceptedDeferral ? 'cover_remaining_gap' : 'if_supplier_declines', withinOwnerCap: alone <= d.amountInr });
    parts.push(`${acceptedDeferral ? 'Gupta has accepted, so to cover the rest' : 'If Gupta declines'}, a Lender ${d.lenderId} drawdown of at least ${fig('minimum_drawdown', 'Smallest drawdown that covers the gap', alone)} is needed${acceptedDeferral ? `, at about ${fig('minimum_drawdown_interest', 'Interest if repaid by 30 Nov', simpleInterestInr(alone, d.aprPercent, d.date, d.earlyRepayDate))} interest if repaid by 30 Nov` : ''}.`);
    if (alone <= d.amountInr) {
      parts.push(`The prepared ${fig('prepared_drawdown', 'Prepared drawdown', d.amountInr)} drawdown gives ${fig('balance_after_drawdown', 'Balance on 5 Nov with the drawdown', balanceOn(drawdownPlan, DECISION_DATE))} on 5 Nov at about ${fig('drawdown_interest', 'Interest if repaid by 30 Nov', drawdownCost)} interest if repaid by 30 Nov.`);
    } else {
      parts.push(`That is above the owner's ${fig('owner_cap', 'Owner drawdown cap', d.amountInr)} drawdown cap, so it cannot run here.`);
    }
  }
  return { status: 'shortfall', text: parts.join(' '), figures, steps, reliefApplied: { deferral: Boolean(acceptedDeferral), drawdown: drawdownDone } };
}

export const cashPlanFixture = buildCashPlan([]);
export const optionsFixture = buildOptions([]);

const emiCap = {
  monthlyCollectionsInr: 1900000,
  existingMonthlyEmiInr: 22000,
  percentage: 8,
  maxTotalMonthlyEmiInr: 152000,
};

const offerInputs = [
  { id: 'A', name: 'Lender A', type: 'Bank', aprPercent: 18.5, tenorMonths: 3, emiInr: 68730, totalInterestInr: 6190,
    earlyRepayment: { afterDays: 26, estimatedInterestInr: simpleInterestInr(cashInputs.relief.drawdown.amountInr, 18.5, cashInputs.relief.drawdown.date, cashInputs.relief.drawdown.earlyRepayDate), label: 'Illustrative early-repayment interest; actual lender terms would govern.' } },
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
