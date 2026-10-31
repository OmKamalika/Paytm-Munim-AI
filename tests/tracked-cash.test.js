import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createFlowRuntime } from '../lib/flow-runtime.js';
import { activeSource } from '../lib/active-source.js';
import { evaluateInvoiceEvidence } from '../lib/v3-evidence.js';
import { trackedCashAdjustments } from '../lib/flow-cash-effects.js';
import { buildCashPlan, buildOptions } from '../lib/cash-fixture.js';
import { currentRelief } from '../lib/cash-state.js';
import { createSimulatorStore } from '../lib/simulator-store.js';

const balance = cash => cash.cashPlan.dailyBalanceSeries.find(day => day.date === '2026-11-05').balanceInr;
function fixture() {
  const pin = crypto.randomUUID();
  return { pin, runtime: createFlowRuntime({ source: activeSource, evaluateInvoice: evaluateInvoiceEvidence, pinHash: createHash('sha256').update(pin).digest('hex'), pauseProvider: () => false }) };
}
const reply = async (runtime, run, scenarioId) => (await runtime.respond({ requestId: run.currentRequestId, scenarioId })).run;
const approve = async (runtime, run, pin) => (await runtime.consent({ runId: run.id, disclosureId: run.currentDisclosure.id, decision: 'approve', pin })).run;
async function supplier(runtime) {
  let run = (await runtime.start('supplier_stock')).run;
  for (const scenario of ['supplier_agreed', 'judge_clear', 'invoice_full', 'aa_available']) run = await reply(runtime, run, scenario);
  return run;
}
async function capital(runtime, pin) {
  let run = (await runtime.start('capital_standard')).run;
  run = await reply(runtime, run, 'aa_available');
  run = await approve(runtime, run, pin);
  run = await reply(runtime, run, 'bureau_verified');
  return reply(runtime, run, 'lender_offer');
}

test('tracked capital affects the shared cash plan only after successful reconciliation and exactly once', async () => {
  const { pin, runtime } = fixture();
  let run = await capital(runtime, pin);
  assert.deepEqual(trackedCashAdjustments(await runtime.getState('riskops')), []);
  assert.equal(run.currentDisclosure.terms.cashDate, '2026-11-04');
  run = await approve(runtime, run, pin);
  run = await reply(runtime, run, 'payment_pending');
  assert.deepEqual(trackedCashAdjustments(await runtime.getState('riskops')), []);
  run = await reply(runtime, run, 'payment_success');
  const state = await runtime.getState('riskops');
  const relief = trackedCashAdjustments(state);
  assert.equal(relief.length, 1);
  assert.deepEqual(await currentRelief({ runtime: { getLedger: async () => ({ effects: [] }) }, simulatorStore: createSimulatorStore(), flowRuntime: runtime, paused: false }), relief);
  const updated = buildCashPlan(relief);
  assert.equal(balance(updated), balance(buildCashPlan()) + 200000);
  assert.equal(run.ledgerEffect.projected5NovInr, balance(updated));
  const duplicateSnapshot = { ...state, ledger: [...state.ledger, ...state.ledger] };
  assert.deepEqual(trackedCashAdjustments(duplicateSnapshot), relief);
  assert.equal(buildOptions(relief).options.find(item => item.id === 'drawdown').effectOn5Nov.inflowCount, 1);
});

test('tracked supplier success records the paid advance and preserves the deferred payable', async () => {
  const { pin, runtime } = fixture();
  let run = await supplier(runtime);
  assert.equal(run.currentDisclosure.terms.cashDate, '2026-11-04');
  assert.equal(run.currentDisclosure.terms.remainingDueDate, '2026-12-19');
  assert.deepEqual(trackedCashAdjustments(await runtime.getState('riskops')), []);
  run = await approve(runtime, run, pin);
  assert.deepEqual(trackedCashAdjustments(await runtime.getState('riskops')), []);
  run = await reply(runtime, run, 'payment_success');
  const relief = trackedCashAdjustments(await runtime.getState('riskops'));
  assert.equal(relief.length, 1);
  const cash = buildCashPlan(relief);
  assert.equal(balance(cash), balance(buildCashPlan()) + 260000);
  const remaining = cash.cashPlan.afterHorizon.filter(item => item.invoiceId === 'GD-1182');
  assert.deepEqual(remaining.map(item => [item.date, item.amountInr]), [['2026-12-19', 260000]]);
  const advance = cash.cashPlan.outflows.find(item => item.invoiceId === 'GD-1182');
  assert.equal(advance.amountInr, 260000);
  assert.equal(advance.status, 'paid_simulated');
  assert.equal(advance.amountInr + remaining[0].amountInr, 520000);
});

test('failed rail status and uncommitted proposals provide no cash relief', async () => {
  const { pin, runtime } = fixture();
  let run = await supplier(runtime);
  run = await approve(runtime, run, pin);
  run = await reply(runtime, run, 'payment_failed');
  assert.equal(run.status, 'failed');
  assert.deepEqual(trackedCashAdjustments(await runtime.getState('riskops')), []);
  assert.deepEqual(trackedCashAdjustments({ runs: [], ledger: [{ id: 'unbound', type: 'drawdown', amountInr: 200000, cashDate: '2026-11-04' }] }), []);
});
