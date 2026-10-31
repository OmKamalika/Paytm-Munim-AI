// The cash plan reads relief only from the tracked flow runtime: one action
// pipeline, so every view shows the same balances for the same action.
import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createFlowRuntime } from '../lib/flow-runtime.js';
import { activeSource } from '../lib/active-source.js';
import { evaluateInvoiceEvidence } from '../lib/v3-evidence.js';
import { createPaymentFence } from '../lib/payment-fence.js';
import { currentRelief } from '../lib/cash-state.js';
import { buildCashPlan, buildOptions } from '../lib/cash-fixture.js';

function fixture() {
  const pin = crypto.randomUUID();
  const runtime = createFlowRuntime({ source: activeSource, evaluateInvoice: evaluateInvoiceEvidence, pinHash: createHash('sha256').update(pin).digest('hex'), pauseProvider: () => false, paymentFence: createPaymentFence() });
  return { pin, runtime };
}
const reply = async (runtime, run, scenarioId) => (await runtime.respond({ requestId: run.currentRequestId, scenarioId })).run;
const approve = async (runtime, run, pin) => (await runtime.consent({ runId: run.id, disclosureId: run.currentDisclosure.id, decision: 'approve', pin })).run;
const day = (cash, date) => cash.cashPlan.dailyBalanceSeries.find((row) => row.date === date).balanceInr;
async function views(runtime) {
  const relief = await currentRelief({ flowRuntime: runtime });
  return { relief, cash: buildCashPlan(relief), options: buildOptions(relief) };
}
async function supplierToPayment(runtime, pin, supplierScenario = 'supplier_agreed') {
  let run = (await runtime.start('supplier_stock')).run;
  run = await reply(runtime, run, supplierScenario);
  if (run.currentDisclosure?.type === 'terms_change') run = await approve(runtime, run, pin);
  for (const scenario of ['judge_clear', 'invoice_full', 'aa_available']) run = await reply(runtime, run, scenario);
  assert.equal(run.currentDisclosure.type, 'payment_consent');
  return approve(runtime, run, pin);
}
async function capitalToPayment(runtime, pin) {
  let run = (await runtime.start('capital_standard')).run;
  run = await reply(runtime, run, 'aa_available');
  run = await approve(runtime, run, pin);
  run = await reply(runtime, run, 'bureau_verified');
  run = await reply(runtime, run, 'lender_offer');
  return approve(runtime, run, pin);
}

test('before any confirmed action the plan is the baseline, whatever was negotiated', async () => {
  const { runtime } = fixture();
  let run = (await runtime.start('supplier_stock')).run;
  run = await reply(runtime, run, 'supplier_agreed');
  const { relief, cash } = await views(runtime);
  assert.deepEqual(relief, []);
  assert.equal(cash.cashPlan.anchors.lowestBalanceInr, -268279);
});

test('a completed supplier advance applies its agreed terms once and is not deducted twice', async () => {
  const { pin, runtime } = fixture();
  let run = await supplierToPayment(runtime, pin);
  run = await reply(runtime, run, 'payment_success');
  assert.equal(run.status, 'completed');
  const { cash, options } = await views(runtime);
  const gupta = cash.cashPlan.outflows.filter((item) => item.invoiceId === 'GD-1182');
  assert.deepEqual(gupta.map((item) => [item.date, item.amountInr, item.status]), [['2026-11-04', 260000, 'paid_simulated']]);
  assert.deepEqual(cash.cashPlan.afterHorizon.map((item) => [item.date, item.amountInr]), [['2026-12-19', 260000]]);
  assert.equal(day(cash, '2026-11-05'), -8279);
  // The recommendation now covers only what is left: a top-up drawdown, no second deferral.
  assert.equal(options.recommendation.status, 'shortfall');
  assert.deepEqual(options.recommendation.steps.map((step) => [step.option, step.amountInr]), [['drawdown', 50000]]);
});

test('counteroffer terms approved by the owner are the terms the plan applies', async () => {
  const { pin, runtime } = fixture();
  let run = await supplierToPayment(runtime, pin, 'supplier_counteroffer');
  run = await reply(runtime, run, 'payment_success');
  assert.equal(run.ledgerEffect.amountInr, 312000);
  const { cash } = await views(runtime);
  assert.deepEqual(cash.cashPlan.afterHorizon.map((item) => [item.date, item.amountInr]), [['2026-12-04', 208000]]);
  assert.equal(day(cash, '2026-11-05'), -268279 + 208000);
});

test('a pending payment changes no balance, is flagged, and the plan never prompts a second payment', async () => {
  const { pin, runtime } = fixture();
  let run = await supplierToPayment(runtime, pin);
  run = await reply(runtime, run, 'payment_pending');
  assert.equal(run.status, 'payment_pending');
  let { cash, options } = await views(runtime);
  assert.equal(day(cash, '2026-11-05'), -268279);
  assert.equal(cash.cashPlan.outflows.find((item) => item.invoiceId === 'GD-1182').status, 'payment_pending');
  assert.equal(cash.cashPlan.pendingActions.length, 1);
  assert.equal(options.recommendation.status, 'pending_reconciliation');
  assert.deepEqual(options.recommendation.steps, []);
  assert.match(options.recommendation.text, /Reconcile that same instruction/);

  // Reconciling the same instruction resolves it exactly once.
  run = await reply(runtime, run, 'payment_success');
  ({ cash } = await views(runtime));
  assert.equal(cash.cashPlan.pendingActions.length, 0);
  assert.equal(day(cash, '2026-11-05'), -8279);
  assert.equal((await runtime.getLedger()).effects.length, 1);
  // A second supplier task for the same invoice cannot pay again.
  let second = (await runtime.start('supplier_stock')).run;
  for (const scenario of ['supplier_agreed', 'judge_clear', 'invoice_full', 'aa_available']) second = await reply(runtime, second, scenario);
  assert.equal(second.status, 'blocked');
  assert.equal(second.currentDisclosure, null);
  assert.ok(second.checks.some((item) => item.id === 'duplicate_invoice' && item.status === 'BLOCK'));
  assert.equal((await runtime.getLedger()).effects.length, 1);
});

test('a completed drawdown adds cash once and keeps the full supplier bill', async () => {
  const { pin, runtime } = fixture();
  let run = await capitalToPayment(runtime, pin);
  run = await reply(runtime, run, 'payment_success');
  const { cash, options } = await views(runtime);
  assert.equal(day(cash, '2026-11-05'), -68279);
  assert.equal(cash.cashPlan.dailyBalanceSeries.reduce((sum, row) => sum + row.reliefInflowInr, 0), 200000);
  assert.equal(cash.cashPlan.outflows.find((item) => item.invoiceId === 'GD-1182').amountInr, 520000);
  const drawdown = options.options.find((item) => item.id === 'drawdown');
  assert.equal(drawdown.effectOn5Nov.inflowCount, 1);
  assert.equal(drawdown.effectOn5Nov.balanceInr, -68279);
});

test('deferral plus drawdown clears the gap, and the plan then stops recommending relief', async () => {
  const { pin, runtime } = fixture();
  let supplier = await supplierToPayment(runtime, pin);
  supplier = await reply(runtime, supplier, 'payment_success');
  let capital = await capitalToPayment(runtime, pin);
  capital = await reply(runtime, capital, 'payment_success');
  const { cash, options } = await views(runtime);
  assert.ok(cash.cashPlan.anchors.lowestBalanceInr >= 0);
  assert.equal(cash.cashPlan.anchors.firstNegativeDate, null);
  assert.equal(options.recommendation.status, 'covered');
  assert.deepEqual(options.recommendation.steps, []);
});
