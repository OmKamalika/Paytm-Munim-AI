import test from 'node:test';
import assert from 'node:assert/strict';
import { createSimulatorStore } from '../lib/simulator-store.js';
import { createActionRuntime, sha256Hex } from '../lib/action-runtime.js';
import { currentRelief } from '../lib/cash-state.js';
import { buildCashPlan, buildOptions } from '../lib/cash-fixture.js';

const emptyRuntime = { getLedger: async () => ({ effects: [] }) };
const emptyTracked = { getState: async () => ({ runs: [], ledger: [] }) };
const fiveNov = (cash) => cash.cashPlan.dailyBalanceSeries.find((day) => day.date === '2026-11-05').balanceInr;

async function reliefAfter(scenarioId, { requestFirst = true, paused = false, newRequestAfter = false } = {}) {
  const store = createSimulatorStore();
  if (requestFirst) store.request('supplier');
  store.dispatch(scenarioId);
  if (newRequestAfter) store.request('supplier');
  return currentRelief({ simulatorStore: store, runtime: emptyRuntime, flowRuntime: emptyTracked, paused });
}

test('a supplier quote alone does not commit relief before owner approval and a ledger receipt', async () => {
  const relief = await reliefAfter('supplier_clean');
  assert.deepEqual(relief, []);
  const cash = buildCashPlan(relief);
  assert.equal(fiveNov(cash), fiveNov(buildCashPlan()));
  assert.equal(cash.cashPlan.afterHorizon.length, 0);
  const rec = buildOptions(relief).recommendation;
  assert.equal(rec.status, 'shortfall');
  assert.equal(buildOptions(relief).options[0].conditional, true);
});

for (const [scenario, why] of [['supplier_drift', 'drifted terms escalate'], ['supplier_account_change', 'a changed account blocks'], ['supplier_name_change', 'a renamed payee has no acceptance']]) {
  test(`the plan does not change when ${why}`, async () => {
    assert.deepEqual(await reliefAfter(scenario), []);
  });
}

test('a stale or unrequested supplier response cannot update the plan', async () => {
  assert.deepEqual(await reliefAfter('supplier_clean', { requestFirst: false }), []);
  assert.deepEqual(await reliefAfter('supplier_clean', { newRequestAfter: true }), []);
});

test('a paused delegate cannot apply supplier relief', async () => {
  assert.deepEqual(await reliefAfter('supplier_clean', { paused: true }), []);
});

test('an executed drawdown is counted once in the plan and in the option preview', async () => {
  const pin = crypto.randomUUID();
  const store = createSimulatorStore();
  const runtime = createActionRuntime({ pinHash: await sha256Hex(pin), simulatorStore: store, pauseProvider: () => false });
  const action = { type: 'drawdown', lender_id: 'A', amount: 200000, destination_account: '**4029', invoice_id: 'GD-1182' };
  const { approval_id } = await runtime.evaluate(action);
  const done = await runtime.execute({ action, approval_id, pin, idempotency_key: crypto.randomUUID() });
  assert.equal(done.outcome, 'done-simulated');

  const relief = await currentRelief({ simulatorStore: store, runtime, flowRuntime: emptyTracked, paused: false });
  assert.equal(relief.filter((item) => item.type === 'drawdown').length, 1);
  const cash = buildCashPlan(relief);
  assert.equal(fiveNov(cash), fiveNov(buildCashPlan()) + 200000);
  assert.equal(cash.cashPlan.dailyBalanceSeries.reduce((sum, day) => sum + day.reliefInflowInr, 0), 200000);
  const options = buildOptions(relief);
  const drawdown = options.options.find((item) => item.id === 'drawdown');
  assert.equal(drawdown.effectOn5Nov.balanceInr, fiveNov(buildCashPlan()) + 200000);
  assert.equal(drawdown.effectOn5Nov.inflowCount, 1);
  assert.equal(drawdown.effectOn5Nov.guptaInvoiceOutflowInr, 520000);
});
