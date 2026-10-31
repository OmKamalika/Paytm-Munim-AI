import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createFlowRuntime } from '../lib/flow-runtime.js';
import { activeSource } from '../lib/active-source.js';
import { evaluateInvoiceEvidence } from '../lib/v3-evidence.js';

const mandate = (changes = {}) => ({ goal: 'Prepare shared Diwali stock for all outlets', product: 'Diwali stock (GD-1182)', outletId: 'all', trigger: 'demand_signal', ownerRole: 'merchant_owner', ...changes });
const normalized = (changes = {}) => ({ ...mandate(), maxOrderInr: 520000, maxAdvanceInr: 260000, minCreditDays: 45, minBuybackPercent: 50, validUntil: '2026-11-15', canNegotiate: true, approvalMode: 'ask_before_commit', ...changes });
function fixture(config = {}) {
  const pin = '381274';
  return { pin, runtime: createFlowRuntime({ source: activeSource, evaluateInvoice: evaluateInvoiceEvidence, pinHash: createHash('sha256').update(pin).digest('hex'), now: () => '2026-10-31T10:00:00.000Z', pauseProvider: () => false, ...config }) };
}
async function reply(runtime, run, scenarioId) { return (await runtime.respond({ requestId: run.currentRequestId, scenarioId })).run; }
async function approve(runtime, run, pin) { return (await runtime.consent({ runId: run.id, disclosureId: run.currentDisclosure.id, decision: 'approve', pin })).run; }
async function ready(runtime, delegation) {
  let run = (await runtime.start('supplier_stock', delegation)).run;
  for (const scenario of ['supplier_agreed', 'judge_clear', 'invoice_full', 'aa_available']) run = await reply(runtime, run, scenario);
  return run;
}

test('owner demand delegation is normalized, immutable and carried into the scoped monitor request', async () => {
  const { runtime } = fixture();
  const customScope = { goal: 'Keep festive namkeen available at Dadar', product: 'Festive namkeen', outletId: 'dadar' };
  const submitted = mandate(customScope);
  const started = await runtime.start('supplier_stock', submitted);
  submitted.goal = 'Mutated outside the server';
  assert.deepEqual(started.run.delegation, normalized(customScope));
  assert.equal(started.run.originalIntent.purpose, 'Keep festive namkeen available at Dadar');
  assert.equal(started.run.stage, 'monitor');
  const operator = await runtime.getState('operator');
  const monitor = operator.requests.find((item) => item.id === started.run.currentRequestId);
  assert.equal(monitor.kind, 'monitor');
  assert.deepEqual(monitor.payload.delegation, normalized(customScope));
  assert.equal(monitor.payload.product, 'Festive namkeen');
  assert.equal(monitor.payload.outletId, 'dadar');
  assert.equal(monitor.payload.simulationOnly, true);
  assert.equal(monitor.payload.backgroundScheduler, false);
  assert.match(monitor.summary, /synthetic|simulated/i);
  assert.match(monitor.summary, /stock|inventory/i);
  assert.ok(operator.traces.some((row) => row.event === 'owner_delegation_configured' && row.delegation.outletId === 'dadar'));
  started.run.delegation.maxOrderInr = 1;
  assert.equal((await runtime.getState('riskops')).runs[0].delegation.maxOrderInr, 520000);
  assert.equal(operator.verification.ok, true);
});

test('delegation validation rejects authority escalation, malformed scope and unsupported intents', async () => {
  const { runtime } = fixture();
  const invalid = [
    { autoPay: true }, { approvalMode: 'automatic' }, { ownerRole: 'delegate_agent' }, { outletId: 'pune' }, { trigger: 'daily' },
    { maxOrderInr: 0 }, { maxAdvanceInr: -1 }, { maxAdvanceInr: 520001 }, { maxOrderInr: 1.2 }, { minCreditDays: 91 },
    { minCreditDays: '45' }, { minBuybackPercent: 101 }, { validUntil: '2026-02-30' }, { validUntil: 'forever' }, { canNegotiate: 'true' },
    { goal: ' ' }, { product: '' }, { scopes: ['pay_without_owner'] },
  ];
  for (const change of invalid) await assert.rejects(runtime.start('supplier_stock', mandate(change)), (error) => error.code === 'DELEGATION_INVALID');
  await assert.rejects(runtime.start('capital_standard', mandate()), (error) => error.code === 'DELEGATION_INVALID');
  assert.equal((await runtime.getState('riskops')).runs.length, 0);
});

test('a no-signal monitor response only opens another monitor; ready creates a supplier request', async () => {
  const { runtime } = fixture();
  let run = (await runtime.start('supplier_stock', mandate())).run;
  const initialRequest = run.currentRequestId;
  run = await reply(runtime, run, 'monitor_wait');
  assert.equal(run.stage, 'monitor');
  assert.notEqual(run.currentRequestId, initialRequest);
  assert.equal(run.currentDisclosure, null);
  let state = await runtime.getState('operator');
  assert.equal(state.requests.some((row) => row.kind === 'supplier' || row.kind === 'payment'), false);
  assert.equal(state.ledger.length, 0);
  run = await reply(runtime, run, 'monitor_ready');
  assert.equal(run.stage, 'supplier');
  state = await runtime.getState('operator');
  const supplier = state.requests.find((row) => row.id === run.currentRequestId);
  assert.deepEqual(supplier.payload.delegation, normalized());
  assert.equal(supplier.payload.outletId, 'all');
  assert.equal(supplier.payload.product, 'Diwali stock (GD-1182)');
  assert.equal(supplier.payload.actualSkuStockAvailable, false);
  assert.equal(state.ledger.length, 0);
});

test('unavailable monitoring pauses and retries monitoring without supplier or payment action', async () => {
  const { runtime } = fixture();
  let run = (await runtime.start('supplier_stock', mandate())).run;
  run = await reply(runtime, run, 'monitor_unavailable');
  assert.equal(run.status, 'paused');
  assert.equal(run.stage, 'monitor');
  run = (await runtime.retry({ runId: run.id })).run;
  assert.equal(run.stage, 'monitor');
  assert.equal(run.status, 'awaiting_response');
  assert.equal((await runtime.getState('operator')).requests.every((item) => item.kind === 'monitor'), true);
});

test('monitoring without negotiation authority requires a new owner setup when the signal arrives', async () => {
  const { runtime } = fixture();
  let run = (await runtime.start('supplier_stock', mandate({ canNegotiate: false }))).run;
  run = await reply(runtime, run, 'monitor_ready');
  assert.equal(run.status, 'paused');
  assert.match(run.summary, /new.*setup/i);
  assert.equal((await runtime.getState('operator')).requests.some((item) => item.kind === 'supplier'), false);
  assert.equal(run.currentDisclosure, null);
});

test('owner order and advance ceilings block proposals before any disclosure or financial request', async () => {
  for (const limits of [{ maxOrderInr: 500000, maxAdvanceInr: 250000 }, { maxAdvanceInr: 200000 }]) {
    const { runtime } = fixture();
    let run = (await runtime.start('supplier_stock', mandate({ trigger: 'now', ...limits }))).run;
    run = await reply(runtime, run, 'supplier_agreed');
    assert.equal(run.status, 'blocked');
    assert.equal(run.currentDisclosure, null);
    assert.ok(run.checks.some((item) => ['delegation_order_limit', 'delegation_advance_limit'].includes(item.id) && item.status === 'BLOCK'));
    const state = await runtime.getState('operator');
    assert.equal(state.requests.some((item) => item.kind === 'payment'), false);
    assert.equal(state.ledger.length, 0);
  }
});

test('configured goals determine revised-term owner review while tighter advance limits remain binding', async () => {
  const { runtime } = fixture();
  let run = (await runtime.start('supplier_stock', mandate({ trigger: 'now', minCreditDays: 60, minBuybackPercent: 80 }))).run;
  run = await reply(runtime, run, 'supplier_agreed');
  assert.ok(run.currentDisclosure, 'The owner must review the loss of configured credit and buyback protection.');
  assert.equal(run.currentDisclosure.type, 'terms_change');
  assert.deepEqual(run.delta, [
    { field: 'creditDays', original: 60, proposed: 45, severity: 'intent' },
    { field: 'buybackPercent', original: 80, proposed: 50, severity: 'intent' },
  ]);
  const second = fixture();
  let capped = (await second.runtime.start('supplier_stock', mandate({ trigger: 'now' }))).run;
  capped = await reply(second.runtime, capped, 'supplier_counteroffer');
  assert.equal(capped.status, 'blocked');
  assert.equal(capped.currentDisclosure, null);
});

test('expired delegation cannot start, approve owner disclosures or commit a pending payment', async () => {
  let at = '2026-10-31T10:00:00.000Z';
  const { runtime, pin } = fixture({ now: () => at });
  await assert.rejects(runtime.start('supplier_stock', mandate({ validUntil: '2026-10-30' })), (error) => error.code === 'DELEGATION_EXPIRED');
  let run = await ready(runtime, mandate({ trigger: 'now', validUntil: '2026-10-31' }));
  at = '2026-11-01T00:00:00.000Z';
  run = await approve(runtime, run, pin);
  assert.equal(run.status, 'blocked');
  assert.equal((await runtime.getState('operator')).requests.some((item) => item.kind === 'payment'), false);
  at = '2026-10-31T10:00:00.000Z';
  run = await ready(runtime, mandate({ trigger: 'now', validUntil: '2026-10-31' }));
  run = await approve(runtime, run, pin);
  assert.equal(run.stage, 'payment');
  at = '2026-11-01T00:00:00.000Z';
  run = await reply(runtime, run, 'payment_success');
  assert.equal(run.status, 'blocked');
  assert.equal(run.ledgerEffect, null);
  assert.equal((await runtime.getState('riskops')).ledger.length, 0);
});

test('legacy starts retain their request flow and negotiated advance behavior', async () => {
  const { runtime, pin } = fixture();
  let run = (await runtime.start('supplier_stock')).run;
  assert.equal(run.stage, 'supplier');
  assert.equal(run.delegation, null);
  run = await reply(runtime, run, 'supplier_counteroffer');
  assert.equal(run.currentDisclosure.type, 'terms_change');
  run = await approve(runtime, run, pin);
  assert.equal(run.stage, 'judge');
  assert.equal(run.proposedAction.amountInr, 312000);
});

test('custom delegation stays bound to the final owner disclosure and one successful simulated effect', async () => {
  const { runtime, pin } = fixture();
  const custom = mandate({ trigger: 'now', ownerRole: 'authorized_signatory', maxOrderInr: 600000, maxAdvanceInr: 330000, minCreditDays: 30, minBuybackPercent: 0 });
  let run = await ready(runtime, custom);
  assert.equal(run.currentDisclosure.type, 'payment_consent');
  assert.deepEqual(run.currentDisclosure.delegation, normalized(custom));
  assert.deepEqual(run.delegation, normalized(custom));
  assert.equal(run.currentDisclosure.proposedAction.amountInr, 260000);
  run = await approve(runtime, run, pin);
  assert.equal((await runtime.getState('riskops')).ledger.length, 0);
  run = await reply(runtime, run, 'payment_success');
  assert.equal(run.status, 'completed');
  const state = await runtime.getState('riskops');
  assert.equal(state.ledger.length, 1);
  assert.deepEqual(state.traces.find((row) => row.event === 'owner_approved_disclosure').merchantDisclosure.delegation, normalized(custom));
  assert.ok(state.traces.some((row) => row.event === 'owner_delegation_configured' && row.actor.role === 'authorized_signatory'));
  assert.equal(state.verification.ok, true);
});

test('delegation expiry during PIN verification refuses approval before a financial instruction', async () => {
  let armed = false;
  let reads = 0;
  const { runtime, pin } = fixture({ now: () => armed && ++reads > 1 ? '2026-11-01T00:00:00.000Z' : '2026-10-31T23:59:59.999Z' });
  let run = await ready(runtime, mandate({ trigger: 'now', validUntil: '2026-10-31' }));
  armed = true;
  run = await approve(runtime, run, pin);
  assert.equal(run.status, 'blocked');
  const state = await runtime.getState('riskops');
  assert.equal(state.traces.some((row) => row.event === 'owner_approved_disclosure'), false);
  assert.equal(state.ledger.length, 0);
});

test('delegation expiry at final commit releases the pending fence without a success receipt', async () => {
  let at = '2026-10-31T10:00:00.000Z';
  let armed = false;
  let pauseReads = 0;
  const { runtime, pin } = fixture({ now: () => at, pauseProvider: () => {
    if (armed && ++pauseReads === 2) queueMicrotask(() => { at = '2026-11-01T00:00:00.000Z'; });
    return false;
  } });
  let run = await ready(runtime, mandate({ trigger: 'now', validUntil: '2026-10-31' }));
  run = await approve(runtime, run, pin);
  armed = true;
  run = await reply(runtime, run, 'payment_success');
  assert.equal(run.status, 'blocked');
  const state = await runtime.getState('riskops');
  assert.equal(state.ledger.length, 0);
  assert.equal(state.traces.some((row) => row.event === 'ledger_effect_recorded'), false);
});

test('custom products and individual outlets pause for matching evidence rather than paying the fixed stock invoice', async () => {
  for (const scope of [{ product: 'Refrigerators' }, { product: 'Diwali gift boxes' }, { outletId: 'sion' }, { outletId: 'dadar' }, { outletId: 'matunga' }]) {
    const { runtime } = fixture();
    let run = (await runtime.start('supplier_stock', mandate(scope))).run;
    assert.equal(run.stage, 'monitor');
    run = await reply(runtime, run, 'monitor_ready');
    assert.equal(run.status, 'paused');
    assert.equal(run.guardAction, 'needs_matching_scope_evidence');
    assert.ok(run.checks.some((item) => item.id === 'delegation_invoice_scope' && item.status === 'NEEDS_VERIFICATION'));
    assert.equal(run.currentDisclosure, null);
    const state = await runtime.getState('operator');
    assert.equal(state.requests.some((item) => item.kind === 'supplier' || item.kind === 'payment'), false);
    assert.equal(state.ledger.length, 0);
  }
  const { runtime } = fixture();
  const immediate = (await runtime.start('supplier_stock', mandate({ trigger: 'now', product: 'Refrigerators' }))).run;
  assert.equal(immediate.guardAction, 'needs_matching_scope_evidence');
  assert.equal(immediate.currentRequestId, null);
});

test('expiry before an intermediate response prevents further delegated requests', async () => {
  for (const responses of [['supplier_agreed'], ['supplier_agreed', 'judge_clear'], ['supplier_agreed', 'judge_clear', 'invoice_full']]) {
    let at = '2026-10-31T10:00:00.000Z';
    const { runtime } = fixture({ now: () => at });
    let run = (await runtime.start('supplier_stock', mandate({ trigger: 'now', validUntil: '2026-10-31' }))).run;
    for (const scenario of responses) run = await reply(runtime, run, scenario);
    const before = await runtime.getState('operator');
    const stage = run.stage;
    at = '2026-11-01T00:00:00.000Z';
    run = await reply(runtime, run, { judge: 'judge_clear', invoice: 'invoice_full', aa: 'aa_available' }[stage]);
    assert.equal(run.status, 'blocked');
    assert.equal(run.currentRequestId, null);
    assert.equal(run.currentDisclosure, null);
    const after = await runtime.getState('operator');
    assert.equal(after.requests.length, before.requests.length);
    assert.equal(after.requests.some((item) => item.status === 'open'), false);
    assert.equal(after.ledger.length, 0);
  }
});

test('immediate setup without negotiation authority opens no supplier request, including after retry', async () => {
  const { runtime } = fixture();
  let run = (await runtime.start('supplier_stock', mandate({ trigger: 'now', canNegotiate: false }))).run;
  assert.equal(run.status, 'paused');
  assert.equal(run.currentRequestId, null);
  assert.match(run.summary, /new.*setup/i);
  run = (await runtime.retry({ runId: run.id })).run;
  assert.equal(run.status, 'paused');
  const state = await runtime.getState('operator');
  assert.equal(state.requests.length, 0);
  assert.equal(state.ledger.length, 0);
});

test('expired delegation can reconcile only its existing instruction and cannot commit the result', async () => {
  let at = '2026-10-31T10:00:00.000Z';
  const { runtime, pin } = fixture({ now: () => at });
  let run = await ready(runtime, mandate({ trigger: 'now', validUntil: '2026-10-31' }));
  run = await approve(runtime, run, pin);
  const original = (await runtime.getState('operator')).requests.find((item) => item.id === run.currentRequestId);
  at = '2026-11-01T00:00:00.000Z';
  run = await reply(runtime, run, 'payment_pending');
  assert.equal(run.status, 'payment_pending');
  const state = await runtime.getState('operator');
  const reconciliation = state.requests.find((item) => item.id === run.currentRequestId);
  assert.equal(reconciliation.payload.operation, 'reconcile_status');
  assert.equal(reconciliation.payload.instructionId, original.payload.instructionId);
  assert.equal(state.requests.filter((item) => item.payload.operation === 'submit_instruction').length, 1);
  run = await reply(runtime, run, 'payment_success');
  assert.equal(run.status, 'blocked');
  assert.equal((await runtime.getState('riskops')).ledger.length, 0);
});
