// Deterministic cash plan. Plain arithmetic over the mapped inputs in
// lib/cash-inputs.js: no forecasting model, no LLM, no invented values.
//
//   closing(day) = closing(day - 1) + expected collections + relief inflows - dated outflows
//
// Relief is applied as dated adjustments:
//   - drawdown:          one dated inflow. The invoice it pays for stays a full outflow.
//   - supplier_deferral: part of an invoice moves to a later date. It is never deleted;
//                        a portion that lands after the horizon is listed as still payable.
// Each adjustment has an id and is counted once, however many times it is passed in.

const DAY_MS = 86400000;

export function addDays(isoDate, days) {
  return new Date(Date.parse(`${isoDate}T00:00:00Z`) + days * DAY_MS).toISOString().slice(0, 10);
}

export function daysBetween(fromIso, toIso) {
  return Math.round((Date.parse(`${toIso}T00:00:00Z`) - Date.parse(`${fromIso}T00:00:00Z`)) / DAY_MS);
}

function dateRange(start, end) {
  const dates = [];
  for (let date = start; date <= end; date = addDays(date, 1)) dates.push(date);
  return dates;
}

const isWholeRupees = (value) => Number.isSafeInteger(value);
const isIsoDate = (value) => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));

export function formatInr(amount) {
  if (typeof amount !== 'number' || !Number.isFinite(amount)) return 'not supplied';
  return `${amount < 0 ? '−' : ''}₹${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.abs(amount))}`;
}

/** Simple interest rounded to the nearest ₹100, as in the workbook (Cash_Plan row 32). */
export function simpleInterestInr(amountInr, aprPercent, fromIso, toIso) {
  const days = daysBetween(fromIso, toIso);
  return Math.round((amountInr * (aprPercent / 100) * days) / 365 / 100) * 100;
}

function collectionBand(inputs, date) {
  const band = (inputs.expectedCollections ?? []).find((item) => item.from <= date && date <= item.to);
  return band && isWholeRupees(band.dailyInr) ? band : null;
}

/**
 * Turns relief adjustments into dated inflows and a revised outflow list.
 * Returns problems instead of throwing, so the caller can show them.
 */
function applyAdjustments(inputs, adjustments) {
  const outflows = (inputs.outflows ?? []).map((item) => ({ ...item }));
  const inflows = [];
  const applied = [];
  const rejected = [];
  const seen = new Set();

  for (const adjustment of adjustments) {
    if (!adjustment || typeof adjustment.id !== 'string') {
      rejected.push({ id: null, reason: 'Adjustment has no id.' });
      continue;
    }
    if (seen.has(adjustment.id)) continue; // counted once
    seen.add(adjustment.id);

    if (adjustment.type === 'drawdown') {
      if (!isWholeRupees(adjustment.amountInr) || adjustment.amountInr <= 0 || !isIsoDate(adjustment.date)) {
        rejected.push({ id: adjustment.id, reason: 'Drawdown needs a positive whole-rupee amount and a date.' });
        continue;
      }
      inflows.push({ id: adjustment.id, date: adjustment.date, amountInr: adjustment.amountInr, kind: 'drawdown', source: adjustment.source ?? null });
      applied.push({ ...adjustment });
      continue;
    }

    if (adjustment.type === 'supplier_deferral') {
      const index = outflows.findIndex((item) => item.invoiceId === adjustment.invoiceId && !item.deferredFrom);
      const original = outflows[index];
      if (!original) {
        rejected.push({ id: adjustment.id, reason: `Invoice ${adjustment.invoiceId} is not a listed outflow.` });
        continue;
      }
      if (!isWholeRupees(adjustment.deferredInr) || adjustment.deferredInr <= 0 || adjustment.deferredInr > original.amountInr
        || !isIsoDate(adjustment.newDate) || adjustment.newDate <= original.date) {
        rejected.push({ id: adjustment.id, reason: 'A deferral must move part of the invoice, up to its full amount, to a later date.' });
        continue;
      }
      const payableNow = original.amountInr - adjustment.deferredInr;
      const deferred = {
        ...original,
        id: `${original.id}_deferred`,
        date: adjustment.newDate,
        amountInr: adjustment.deferredInr,
        deferredFrom: original.date,
        reliefId: adjustment.id,
      };
      delete deferred.outletSplit;
      outflows.splice(index, 1, ...(payableNow > 0 ? [{ ...original, amountInr: payableNow, splitBy: adjustment.id }] : []), deferred);
      applied.push({ ...adjustment });
      continue;
    }

    if (adjustment.type === 'supplier_settlement') {
      const index = outflows.findIndex(item => item.invoiceId === adjustment.invoiceId && !item.deferredFrom);
      const original = outflows[index];
      if (!original || adjustment.totalInr !== original.amountInr || !isWholeRupees(adjustment.amountInr) || adjustment.amountInr <= 0 || adjustment.amountInr > original.amountInr || !isIsoDate(adjustment.date) || !isIsoDate(adjustment.newDate) || adjustment.newDate <= adjustment.date) {
        rejected.push({ id: adjustment.id, reason: 'A settlement must match the listed invoice and preserve a valid remaining payable.' });
        continue;
      }
      const remaining = original.amountInr - adjustment.amountInr;
      const paid = { ...original, date: adjustment.date, amountInr: adjustment.amountInr, paidSimulated: true, paymentRef: adjustment.id };
      const deferred = { ...original, id: `${original.id}_deferred`, date: adjustment.newDate, amountInr: remaining, deferredFrom: original.date, reliefId: adjustment.id };
      delete deferred.outletSplit;
      outflows.splice(index, 1, paid, ...(remaining > 0 ? [deferred] : []));
      applied.push({ ...adjustment });
      continue;
    }

    if (adjustment.type === 'payment_record') {
      // A supplier payment pays a bill already in the plan on its due date: it
      // marks that bill paid and does not move cash a second time.
      const bill = outflows.find((item) => item.invoiceId === adjustment.invoiceId && !item.deferredFrom && !item.paidSimulated);
      if (!bill || bill.amountInr !== adjustment.amountInr) {
        rejected.push({ id: adjustment.id, reason: 'A recorded payment must match a listed bill amount exactly.' });
        continue;
      }
      bill.paidSimulated = true;
      bill.paymentRef = adjustment.id;
      applied.push({ ...adjustment, date: bill.date });
      continue;
    }

    rejected.push({ id: adjustment.id, reason: `Unsupported adjustment type ${String(adjustment.type)}.` });
  }
  return { outflows, inflows, applied, rejected };
}

/**
 * @param {typeof import('./cash-inputs.js').cashInputs} inputs
 * @param {Array<object>} adjustments relief to apply (each counted once by id)
 */
export function computeCashPlan(inputs, adjustments = []) {
  const missingInputs = [];
  const { start, end } = inputs.horizon ?? {};
  if (!isIsoDate(start) || !isIsoDate(end) || end < start) {
    return { ok: false, missingInputs: [{ id: 'horizon', note: 'No valid plan horizon was supplied.' }], days: [], anchors: emptyAnchors(), outflows: [], inflows: [], afterHorizon: [], applied: [], rejected: [] };
  }
  const opening = inputs.openingBalance?.amountInr;
  if (!isWholeRupees(opening)) missingInputs.push({ id: 'opening_balance', note: 'No opening cash and bank balance was supplied for the start of the plan.' });

  const { outflows, inflows, applied, rejected } = applyAdjustments(inputs, adjustments);
  for (const item of outflows) {
    if (!isWholeRupees(item.amountInr) || !isIsoDate(item.date)) missingInputs.push({ id: `outflow_${item.id}`, note: `Outflow ${item.id} has no valid amount or date.` });
  }

  const days = [];
  let balance = isWholeRupees(opening) ? opening : null;
  for (const date of dateRange(start, end)) {
    const band = collectionBand(inputs, date);
    const collections = band ? band.dailyInr : null;
    if (collections === null) missingInputs.push({ id: `expected_collections_${date}`, note: `No expected collections were supplied for ${date}.` });
    const dayOutflows = outflows.filter((item) => item.date === date);
    const dayInflows = inflows.filter((item) => item.date === date);
    const outflowInr = dayOutflows.reduce((sum, item) => sum + item.amountInr, 0);
    const reliefInflowInr = dayInflows.reduce((sum, item) => sum + item.amountInr, 0);
    // Once an input is missing, later closings are unknown rather than guessed.
    balance = balance === null || collections === null ? null : balance + collections + reliefInflowInr - outflowInr;
    days.push({
      date,
      inflowForecastInr: collections,
      collectionsByOutlet: band?.byOutlet?.map(({ outletId, outlet, amountInr }) => ({ outletId, outlet, amountInr })) ?? null,
      collectionsRange: band && isWholeRupees(band.lowInr) && isWholeRupees(band.highInr) ? { lowInr: band.lowInr, highInr: band.highInr } : null,
      reliefInflowInr,
      knownOutflowsInr: outflowInr,
      balanceInr: balance,
      outflowIds: dayOutflows.map((item) => item.id),
      inflowIds: dayInflows.map((item) => item.id),
    });
  }

  return {
    ok: missingInputs.length === 0,
    missingInputs,
    days,
    anchors: anchorsFor(days),
    outflows: outflows.filter((item) => item.date >= start && item.date <= end),
    afterHorizon: outflows.filter((item) => item.date > end).map((item) => ({ ...item, note: 'Still payable after the plan horizon; collections for that period are not supplied.' })),
    inflows,
    applied,
    rejected,
  };
}

function emptyAnchors() {
  return { firstNegativeDate: null, lowestDate: null, lowestBalanceInr: null, recoveryAboveZeroDate: null };
}

function anchorsFor(days) {
  if (!days.length || days.some((day) => day.balanceInr === null)) return emptyAnchors();
  let lowest = days[0];
  for (const day of days) if (day.balanceInr < lowest.balanceInr) lowest = day;
  const firstNegative = days.find((day) => day.balanceInr < 0) ?? null;
  const recovery = firstNegative ? days.find((day) => day.date > lowest.date && day.balanceInr > 0) ?? null : null;
  return {
    firstNegativeDate: firstNegative?.date ?? null,
    lowestDate: lowest.date,
    lowestBalanceInr: lowest.balanceInr,
    recoveryAboveZeroDate: recovery?.date ?? null,
  };
}

export function balanceOn(plan, date) {
  return plan.days.find((day) => day.date === date)?.balanceInr ?? null;
}

/** Relief adjustment for the prepared Lender A drawdown. */
export function drawdownAdjustment(inputs, amountInr = inputs.relief.drawdown.amountInr, id = `drawdown_${inputs.relief.drawdown.lenderId}`) {
  const d = inputs.relief.drawdown;
  return { id, type: 'drawdown', lenderId: d.lenderId, amountInr, date: d.date, source: 'simulated lender drawdown' };
}

/**
 * Relief adjustment for supplier terms: the upfront share stays on the due date,
 * the rest moves by the credit period. Returns null when the terms don't match
 * the listed invoice, so a mismatched quote never changes the plan.
 */
export function deferralAdjustment(inputs, { upfrontPercent, creditDays, totalAmount } = {}, id = 'supplier_deferral') {
  const terms = inputs.relief.supplierDeferral;
  const invoice = inputs.outflows.find((item) => item.invoiceId === terms.invoiceId);
  if (!invoice) return null;
  const total = totalAmount ?? invoice.amountInr;
  if (total !== invoice.amountInr) return null;
  if (!Number.isFinite(upfrontPercent) || upfrontPercent <= 0 || upfrontPercent >= 100) return null;
  if (!Number.isInteger(creditDays) || creditDays <= 0) return null;
  const upfront = Math.round((total * upfrontPercent) / 100);
  return {
    id, type: 'supplier_deferral', invoiceId: terms.invoiceId,
    deferredInr: total - upfront, upfrontInr: upfront,
    newDate: addDays(invoice.date, creditDays), creditDays, upfrontPercent,
  };
}

/**
 * Smallest drawdown (rounded up, at least the lender minimum) that keeps every
 * closing on or after the drawdown date at zero or above. Null if a shortfall
 * falls before the drawdown date, which a drawdown cannot fix.
 */
export function minimumDrawdownInr(inputs, plan) {
  const d = inputs.relief.drawdown;
  if (plan.anchors.lowestBalanceInr === null) return null;
  if (plan.anchors.lowestBalanceInr >= 0) return 0;
  if (plan.days.some((day) => day.date < d.date && day.balanceInr < 0)) return null;
  const worst = Math.min(...plan.days.filter((day) => day.date >= d.date).map((day) => day.balanceInr));
  const needed = Math.ceil(-worst / d.roundingInr) * d.roundingInr;
  return Math.max(needed, d.minAmountInr);
}
