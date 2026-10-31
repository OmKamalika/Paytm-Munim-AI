import { addDays } from './cash-engine.js';
import { cashInputs } from './cash-inputs.js';

/** Adapt only committed, disclosure-bound ledger effects. Quotes/pending requests are not cash relief. */
export function trackedCashAdjustments(snapshot, inputs = cashInputs) {
  const adjustments = [];
  const seen = new Set();
  for (const effect of snapshot?.ledger ?? []) {
    if (!effect || seen.has(effect.id) || !Number.isSafeInteger(effect.amountInr) || effect.amountInr <= 0) continue;
    const run = snapshot.runs?.find(item => item.id === effect.runId && item.status === 'completed' && item.ledgerEffect?.id === effect.id);
    const type = effect.type === 'drawdown' ? 'loan_consent' : 'payment_consent';
    const disclosure = run?.disclosureHistory?.find(item => item.type === type && item.proposedAction.amountInr === effect.amountInr && item.proposedAction.invoiceId === effect.invoiceId && item.proposedAction.account === effect.account && item.proposedAction.cashDate === effect.cashDate);
    if (!run || !disclosure || !/^\d{4}-\d{2}-\d{2}$/.test(effect.cashDate ?? '')) continue;
    seen.add(effect.id);
    if (effect.type === 'drawdown') {
      adjustments.push({ id: `drawdown_${inputs.relief.drawdown.lenderId}`, type: 'drawdown', amountInr: effect.amountInr, date: effect.cashDate, lenderId: inputs.relief.drawdown.lenderId, source: `Tracked ledger ${effect.id}` });
    } else if (effect.type === 'supplier_payment') {
      const bill = inputs.outflows.find(item => item.invoiceId === effect.invoiceId);
      const days = disclosure.terms.creditDays;
      if (!bill || !Number.isSafeInteger(days) || days <= 0 || effect.amountInr > bill.amountInr) continue;
      adjustments.push({ id: `settlement_${effect.invoiceId}`, type: 'supplier_settlement', invoiceId: effect.invoiceId, amountInr: effect.amountInr, upfrontInr: effect.amountInr, totalInr: bill.amountInr, deferredInr: bill.amountInr - effect.amountInr, date: effect.cashDate, newDate: addDays(bill.date, days), creditDays: days, source: `Tracked ledger ${effect.id}` });
    }
  }
  return adjustments;
}
