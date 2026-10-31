import test from 'node:test';
import assert from 'node:assert/strict';
import { createActionRuntime, sha256Hex } from '../lib/action-runtime.js';
import { createFlowRuntime } from '../lib/flow-runtime.js';
import { createPaymentFence } from '../lib/payment-fence.js';
import { activeSource } from '../lib/active-source.js';
import { evaluateInvoiceEvidence } from '../lib/v3-evidence.js';
import { POST as legacyExecute } from '../app/api/execute/route.ts';
import { GET as readEvidence } from '../app/api/evidence/route.ts';
import { GET as verifyEvidence } from '../app/api/evidence/verify/route.ts';

async function session() {
  const pin = crypto.randomUUID();
  const pinHash = await sha256Hex(pin);
  const paymentFence = createPaymentFence();
  const legacy = createActionRuntime({ pinHash, paymentFence, pauseProvider: () => false });
  const tracked = createFlowRuntime({ source: activeSource, evaluateInvoice: evaluateInvoiceEvidence, pinHash, paymentFence, pauseProvider: () => false });
  globalThis.__paytmunimActionRuntime = legacy;
  globalThis.__paytmunimFlowRuntimePromise = Promise.resolve(tracked);
  return { pin, legacy, tracked };
}

test('the public legacy execution route refuses an otherwise valid approval and PIN without any money effect', async () => {
  const { pin, legacy, tracked } = await session();
  const action = { type: 'drawdown', lender_id: 'A', amount: 200000, destination_account: '**4029', invoice_id: 'GD-1182' };
  const guard = await legacy.evaluate(action);
  assert.equal(guard.decision, 'PASS');
  for (const spoofedProof of [{}, { runId: 'invented', aaVerified: true, gstVerified: true, bureauVerified: true, disclosureApproved: true }]) {
    const response = await legacyExecute(new Request('https://demo.example/api/execute', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action, approval_id: guard.approval_id, pin, idempotency_key: crypto.randomUUID(), ...spoofedProof }) }));
    assert.equal(response.status, 410);
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
    assert.equal((await response.json()).code, 'TRACKED_WORKFLOW_REQUIRED');
  }
  assert.equal((await legacy.getLedger()).effects.length, 0);
  assert.equal((await tracked.getState('riskops')).ledger.length, 0);
});

test('merchant evidence and verification expose the same tracked run, bureau disclosure, and journal seen in RiskOps', async () => {
  const { tracked } = await session();
  let run = (await tracked.start('capital_standard')).run;
  run = (await tracked.respond({ requestId: run.currentRequestId, scenarioId: 'aa_available' })).run;
  assert.equal(run.currentDisclosure.type, 'bureau_consent');
  const riskops = await tracked.getState('riskops');
  const response = await readEvidence(new Request('https://demo.example/api/evidence'));
  const evidence = await response.json();
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  assert.equal(evidence.scope, 'tracked_workflow_journal');
  assert.deepEqual(evidence.entries, riskops.traces);
  assert.deepEqual(evidence.runs.find(item => item.id === run.id).currentDisclosure, run.currentDisclosure);
  assert.deepEqual(evidence.ledger, riskops.ledger);
  const verification = await (await verifyEvidence(new Request('https://demo.example/api/evidence/verify'))).json();
  assert.equal(verification.scope, 'tracked_workflow_journal');
  assert.equal(verification.ok, riskops.verification.ok);
  assert.equal(verification.first_broken_seq, riskops.verification.firstBrokenSeq);
  assert.equal(evidence.legacy.readOnly, true);
});
