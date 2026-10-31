// Which relief has actually happened in this server session, read from the one
// authoritative action pipeline: the tracked flow runtime's ledger and runs.
//
//   - A completed drawdown adds one dated inflow (summed per session, counted once).
//   - A completed supplier advance applies that run's agreed terms: the advance is
//     marked paid on the invoice due date and the balance moves to the credit date.
//     It is not deducted a second time.
//   - A payment instruction that is pending reconciliation has no cash effect. The
//     bill is shown as "payment pending" so nobody is prompted to pay it again.
// Negotiated terms alone (no confirmed payment) do not change the plan.
// Everything is process memory and resets on restart.

import { cashInputs } from './cash-inputs.js';
import { addDays, drawdownAdjustment } from './cash-engine.js';

/**
 * @param {{ effects: any[], runs: any[] }} flow  getLedger() result from the flow runtime
 */
export function reliefFromFlow(flow, inputs = cashInputs) {
  const adjustments = [];
  const effects = flow?.effects ?? [];
  const runs = flow?.runs ?? [];

  const drawdowns = effects.filter((effect) => effect.type === 'drawdown');
  if (drawdowns.length) {
    const total = drawdowns.reduce((sum, effect) => sum + effect.amountInr, 0);
    adjustments.push({ ...drawdownAdjustment(inputs, total), ledgerRefs: drawdowns.map((effect) => effect.id) });
  }

  for (const effect of effects.filter((item) => item.type === 'supplier_payment')) {
    const run = runs.find((item) => item.id === effect.runId);
    const bill = inputs.outflows.find((item) => item.invoiceId === effect.invoiceId);
    const terms = run?.terms;
    if (bill && terms && Number.isInteger(terms.creditDays) && terms.creditDays > 0 && effect.amountInr < bill.amountInr) {
      adjustments.push({
        id: `terms_${effect.runId}`, type: 'supplier_deferral', invoiceId: effect.invoiceId,
        deferredInr: bill.amountInr - effect.amountInr, upfrontInr: effect.amountInr,
        newDate: addDays(bill.date, terms.creditDays), creditDays: terms.creditDays, upfrontPercent: terms.upfrontPercent,
        source: 'tracked supplier run', runId: effect.runId,
      });
    }
    adjustments.push({
      id: `paid_${effect.id}`, type: 'payment_record', invoiceId: effect.invoiceId, paidInvoiceId: effect.invoiceId,
      amountInr: effect.amountInr, payee: effect.payee, ledgerRef: effect.id, runId: effect.runId,
    });
  }

  for (const run of runs.filter((item) => item.status === 'payment_pending')) {
    adjustments.push({
      id: `pending_${run.id}`, type: 'payment_pending', actionType: run.proposedAction?.type,
      invoiceId: run.proposedAction?.invoiceId, amountInr: run.proposedAction?.amountInr, payee: run.proposedAction?.payee, runId: run.id,
    });
  }
  return adjustments;
}

export async function currentRelief({ flowRuntime } = {}) {
  const runtime = flowRuntime ?? await (await import('./flow-runtime.js')).getFlowRuntime();
  return reliefFromFlow(await runtime.getLedger());
}
