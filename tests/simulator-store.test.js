import test from 'node:test';
import assert from 'node:assert/strict';
import { createSimulatorStore } from '../lib/simulator-store.js';

const makeStore = () => createSimulatorStore({ now: () => '2026-10-30T19:20:00+05:30' });

test('the simulator starts with no dispatched responses or events', () => {
  const state = makeStore().getState();
  assert.deepEqual(state.latest, { supplier: null, aa: null, lenders: null });
  assert.deepEqual(state.events, []);
  assert.equal(state.latestSeq, 0);
  assert.equal(state.synthetic, true);
  assert.equal(state.sessionOnly, true);
  assert.equal(state.catalog.length, 9);
});

test('supplier dispatch uses the server fixture and monotonically numbered events', () => {
  const store = makeStore();
  const first = store.dispatch('supplier_clean');
  const second = store.dispatch('supplier_drift');
  const third = store.dispatch('supplier_account_change');
  assert.deepEqual([first.seq, second.seq, third.seq], [1, 2, 3]);
  assert.equal(first.kind, 'supplier');
  assert.equal(first.payload.candidate.id, 'clean');
  assert.equal(first.payload.candidate.totalAmount, 520000);
  assert.equal(second.payload.candidate.creditDays, 30);
  assert.equal(third.payload.candidate.supplierAccount, 'XXXX9910');
  assert.equal(third.timestamp, '2026-10-30T19:20:00+05:30');
  assert.equal(store.getState().latest.supplier.seq, 3);
  assert.equal(store.getState().latestSeq, 3);
  assert.equal(store.getEvent(2).scenarioId, 'supplier_drift');
  assert.equal(store.getEvent(99), null);
});

test('AA dispatch contains status only and never exposes a balance', () => {
  const store = makeStore();
  const available = store.dispatch('aa_available');
  const unavailable = store.dispatch('aa_unavailable');
  assert.equal(available.kind, 'aa');
  assert.equal(available.payload.status, 'available');
  assert.equal(unavailable.payload.status, 'unavailable');
  assert.equal(store.getState().latest.aa.seq, 2);
  assert.equal(JSON.stringify({ available, unavailable }).toLowerCase().includes('balance'), false);
});

test('beneficiary-name change is a distinct supplier response', () => {
  const event = makeStore().dispatch('supplier_name_change');
  assert.equal(event.kind, 'supplier');
  assert.equal(event.payload.candidate.beneficiaryName, 'Gupta Traders & Logistics');
  assert.equal(event.payload.candidate.supplierId, 'gupta');
  assert.equal(event.payload.candidate.supplierAccount, 'XXXX7781');
  assert.equal(event.payload.candidate.supplierAcceptance, null);
});

test('lender dispatch includes the exact synthetic A/B/C fixture', () => {
  const event = makeStore().dispatch('lender_offers');
  assert.equal(event.kind, 'lenders');
  assert.deepEqual(event.payload.offers.map((offer) => [offer.id, offer.emiInr]), [
    ['A', 68730], ['B', 69130], ['C', 35960],
  ]);
  assert.equal(event.payload.emiCap.maxTotalMonthlyEmiInr, 152000);
});

test('unknown scenario IDs cannot be dispatched', () => {
  const store = makeStore();
  assert.throws(() => store.dispatch('unlisted_case'), /Unknown simulator scenario/);
  assert.deepEqual(store.getState().events, []);
});

test('merchant request captures an atomic event cursor before external dispatch', () => {
  const store = createSimulatorStore();
  const request = store.request('supplier');
  assert.equal(request.cursor, 0);
  const event = store.dispatch('supplier_clean');
  assert.ok(event.seq > request.cursor);
  assert.equal(event.kind, request.kind);
  assert.equal(event.requestId, request.requestId);
  assert.equal(store.getActiveResponse('supplier').seq, event.seq);
  store.request('supplier');
  assert.equal(store.getActiveResponse('supplier'), null);
  assert.ok(request.requestId);
  assert.throws(() => store.request('unknown'), RangeError);
});
