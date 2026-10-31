// Release-gate regressions named in the integration plan. Each runs against the
// real runtime and simulator store, with the bundled (body-less) GD-1182 invoice.
import test from 'node:test';
import assert from 'node:assert/strict';
import { createActionRuntime, sha256Hex } from '../lib/action-runtime.js';
import { createSimulatorStore } from '../lib/simulator-store.js';
import { syntheticSource } from '../lib/synthetic-source.generated.js';

const drawdown = () => ({ type: 'drawdown', lender_id: 'A', amount: 200000, destination_account: '**4029', invoice_id: 'GD-1182' });
async function setup({ paused = () => false } = {}) {
  const pin = String(100000 + (crypto.getRandomValues(new Uint32Array(1))[0] % 900000));
  const store = createSimulatorStore();
  const runtime = createActionRuntime({ pinHash: await sha256Hex(pin), simulatorStore: store, pauseProvider: paused, aaDebits: syntheticSource.aaDebits });
  return { pin, store, runtime };
}

test('GD-1182 has no invoice body, so the supplier payment is held and cannot execute', async () => {
  assert.equal(syntheticSource.invoice.hasFullBody, false);
  const { pin, store, runtime } = await setup();
  store.request('aa'); store.dispatch('aa_available');
  store.request('supplier');
  const event = store.dispatch('supplier_clean');
  const action = { type: 'supplier_payment', supplier_id: 'gupta', amount: 260000, beneficiary_name: 'Gupta Distributors', beneficiary_account: 'XXXX7781', invoice_id: 'GD-1182', simulator_event_seq: event.seq };
  const guard = await runtime.evaluate(action);
  assert.notEqual(guard.decision, 'PASS');
  assert.equal(guard.approval_id, undefined);
  assert.ok(guard.checks.some((check) => check.id === 'invoice_injection' && check.status === 'NEEDS_VERIFICATION'));
  const attempt = await runtime.execute({ action, approval_id: crypto.randomUUID(), pin, idempotency_key: crypto.randomUUID() });
  assert.equal(attempt.outcome, 'blocked');
  assert.equal((await runtime.getLedger()).effects.length, 0);
});

test('changing the action invalidates its earlier approval', async () => {
  const { pin, runtime } = await setup();
  const { approval_id } = await runtime.evaluate(drawdown());
  const changed = { ...drawdown(), amount: 150000 };
  const result = await runtime.execute({ action: changed, approval_id, pin, idempotency_key: crypto.randomUUID() });
  assert.equal(result.reason, 'PAYLOAD_CHANGED');
  assert.equal((await runtime.getLedger()).effects.length, 0);
});

test('repeating an execution creates no second ledger effect', async () => {
  const { pin, runtime } = await setup();
  const action = drawdown();
  const { approval_id } = await runtime.evaluate(action);
  const first = await runtime.execute({ action, approval_id, pin, idempotency_key: crypto.randomUUID() });
  const again = await runtime.execute({ action, approval_id, pin, idempotency_key: crypto.randomUUID() });
  assert.equal(first.outcome, 'done-simulated');
  assert.equal(again.outcome, 'blocked');
  assert.equal((await runtime.getLedger()).effects.length, 1);
});

test('pause prevents execution of an already approved action', async () => {
  let paused = false;
  const { pin, runtime } = await setup({ paused: () => paused });
  const action = drawdown();
  const { approval_id } = await runtime.evaluate(action);
  paused = true;
  const result = await runtime.execute({ action, approval_id, pin, idempotency_key: crypto.randomUUID() });
  assert.equal(result.outcome, 'blocked');
  assert.equal((await runtime.getLedger()).effects.length, 0);
});

test('a stale or unmatched simulator response cannot satisfy a new request', async () => {
  // A full invoice body is supplied here so staleness is the only thing that can fail.
  const pin = '739104';
  const store = createSimulatorStore();
  const runtime = createActionRuntime({ pinHash: await sha256Hex(pin), simulatorStore: store, pauseProvider: () => false,
    aaDebits: syntheticSource.aaDebits, invoiceProvider: () => ({ hasFullBody: true, fullBody: 'FMCG Diwali stock, 212 lines' }) });
  store.request('aa'); store.dispatch('aa_available');
  const pay = (seq) => ({ type: 'supplier_payment', supplier_id: 'gupta', amount: 260000, beneficiary_name: 'Gupta Distributors', beneficiary_account: 'XXXX7781', invoice_id: 'GD-1182', simulator_event_seq: seq });

  // Unrequested: a dispatch with no merchant request cannot authorize.
  const unrequested = store.dispatch('supplier_clean');
  assert.notEqual((await runtime.evaluate(pay(unrequested.seq))).decision, 'PASS');

  // Fresh: the response to the latest request passes the guard.
  store.request('supplier');
  const fresh = store.dispatch('supplier_clean');
  const passing = await runtime.evaluate(pay(fresh.seq));
  assert.equal(passing.decision, 'PASS');

  // Stale: after a new request, the old reply no longer counts, at evaluate or execute.
  store.request('supplier');
  assert.equal(store.getActiveResponse('supplier'), null);
  const stale = await runtime.evaluate(pay(fresh.seq));
  assert.equal(stale.decision, 'BLOCK');
  assert.ok(stale.checks.some((check) => check.id === 'simulator_event' && check.status === 'BLOCK'));
  const late = await runtime.execute({ action: pay(fresh.seq), approval_id: passing.approval_id, pin, idempotency_key: crypto.randomUUID() });
  assert.equal(late.outcome, 'blocked');

  // Wrong kind: a lender event cannot stand in for a supplier reply.
  store.request('lenders');
  const lenders = store.dispatch('lender_offers');
  assert.notEqual((await runtime.evaluate(pay(lenders.seq))).decision, 'PASS');
  assert.equal((await runtime.getLedger()).effects.length, 0);
});
