// Which relief has actually happened in this server session.
//
// The cash plan changes only when:
//   - the latest supplier response answers the latest merchant request, the
//     supplier explicitly accepted recorded terms, and the intent check passes
//     (drifted, changed-account, renamed or paused responses change nothing); or
//   - a drawdown has a simulated ledger effect after guard + PIN.
// Everything is process memory and resets on restart.

import { cashInputs } from './cash-inputs.js';
import { deferralAdjustment, drawdownAdjustment } from './cash-engine.js';
import { demoFixture } from './demo-fixture.js';
import { analyzeIntent } from './intent-engine.js';
import { getSimulatorStore } from './simulator-store.js';
import { getDemoActionRuntime } from './action-runtime.js';
import { getDemoControl } from './demo-control.js';

export function supplierDeferralFrom(simulatorStore, { paused = false, inputs = cashInputs } = {}) {
  const event = simulatorStore.getActiveResponse('supplier');
  const candidate = event?.payload?.candidate;
  const accepted = candidate?.supplierAcceptance;
  if (!candidate || !accepted?.accepted || !accepted.terms) return null;
  const check = analyzeIntent({
    mandate: demoFixture.mandate,
    originalIntent: demoFixture.originalIntent,
    candidate,
    paused,
    context: { dataSource: 'simulator_dispatch', simulatorEventSeq: event.seq, purpose: 'cash_plan_relief' },
  });
  if (check.decision !== 'PASS') return null;
  const adjustment = deferralAdjustment(inputs, {
    upfrontPercent: accepted.terms.upfrontPercent,
    creditDays: accepted.terms.creditDays,
    totalAmount: accepted.terms.totalAmount,
  });
  return adjustment ? { ...adjustment, simulatorEventSeq: event.seq, reference: accepted.reference } : null;
}

export function drawdownsFrom(ledger, inputs = cashInputs) {
  // Executed drawdowns for the prepared offer become one inflow with the
  // option's id, so an option preview cannot add the same money again. (The
  // guard already refuses a second drawdown for the invoice.)
  const effects = (ledger?.effects ?? []).filter((effect) => effect.type === 'drawdown');
  if (!effects.length) return [];
  const total = effects.reduce((sum, effect) => sum + effect.amount, 0);
  return [{ ...drawdownAdjustment(inputs, total), actionHashes: effects.map((effect) => effect.action_hash) }];
}

export async function currentRelief({
  simulatorStore = getSimulatorStore(),
  runtime = getDemoActionRuntime(),
  paused = getDemoControl().isPaused(),
} = {}) {
  const adjustments = [];
  const deferral = supplierDeferralFrom(simulatorStore, { paused });
  if (deferral) adjustments.push(deferral);
  adjustments.push(...drawdownsFrom(await runtime.getLedger()));
  return adjustments;
}
