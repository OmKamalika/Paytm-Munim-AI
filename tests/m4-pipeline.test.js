// M4 release checks on the single tracked pipeline.
import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createFlowRuntime } from '../lib/flow-runtime.js';
import { activeSource } from '../lib/active-source.js';
import { evaluateInvoiceEvidence } from '../lib/v3-evidence.js';
import { createPaymentFence } from '../lib/payment-fence.js';

function fixture() {
  const pin = crypto.randomUUID();
  return { pin, runtime: createFlowRuntime({ source: activeSource, evaluateInvoice: evaluateInvoiceEvidence, pinHash: createHash('sha256').update(pin).digest('hex'), pauseProvider: () => false, paymentFence: createPaymentFence() }) };
}
const reply = async (runtime, run, scenarioId) => (await runtime.respond({ requestId: run.currentRequestId, scenarioId })).run;

test('an approval is bound to one disclosure version: an earlier disclosure cannot approve a later step', async () => {
  const { pin, runtime } = fixture();
  let run = (await runtime.start('supplier_stock')).run;
  run = await reply(runtime, run, 'supplier_counteroffer');
  const termsDisclosure = run.currentDisclosure;
  assert.equal(termsDisclosure.type, 'terms_change');
  run = (await runtime.consent({ runId: run.id, disclosureId: termsDisclosure.id, decision: 'approve', pin })).run;
  for (const scenario of ['judge_clear', 'invoice_full', 'aa_available']) run = await reply(runtime, run, scenario);
  assert.equal(run.currentDisclosure.type, 'payment_consent');
  // Re-using the terms approval for the payment is refused.
  await assert.rejects(runtime.consent({ runId: run.id, disclosureId: termsDisclosure.id, decision: 'approve', pin }), (error) => error.code === 'STALE_DISCLOSURE');
  // The payment disclosure shows the changed terms the owner must see before paying.
  assert.equal(run.currentDisclosure.terms.upfrontPercent, 60);
  assert.equal(run.currentDisclosure.terms.advanceInr, 312000);
  assert.equal((await runtime.getLedger()).effects.length, 0);
});

test('hard restrictions are not owner-overridable: a changed payee blocks with no disclosure to approve', async () => {
  const { runtime } = fixture();
  let run = (await runtime.start('supplier_stock')).run;
  run = await reply(runtime, run, 'supplier_account_changed');
  assert.equal(run.status, 'blocked');
  assert.equal(run.currentDisclosure, null);
  assert.equal((await runtime.getLedger()).effects.length, 0);
});

test('the journal records disclosure, approval, outcome and the ledger reference, and verifies after real attempts', async () => {
  const { pin, runtime } = fixture();
  // A blocked attempt.
  let blocked = (await runtime.start('supplier_stock')).run;
  blocked = await reply(runtime, blocked, 'supplier_account_changed');
  // A successful drawdown.
  let run = (await runtime.start('capital_standard')).run;
  run = await reply(runtime, run, 'aa_available');
  run = (await runtime.consent({ runId: run.id, disclosureId: run.currentDisclosure.id, decision: 'approve', pin })).run;
  run = await reply(runtime, run, 'bureau_verified');
  run = await reply(runtime, run, 'lender_offer');
  const loanDisclosure = run.currentDisclosure;
  run = (await runtime.consent({ runId: run.id, disclosureId: loanDisclosure.id, decision: 'approve', pin })).run;
  run = await reply(runtime, run, 'payment_success');

  const journal = await runtime.getJournal();
  assert.equal(journal.verification.ok, true);
  const blockedEntries = journal.entries.filter((entry) => entry.runId === blocked.id);
  assert.ok(blockedEntries.some((entry) => entry.status === 'blocked'));
  const own = journal.entries.filter((entry) => entry.runId === run.id);
  assert.ok(own.some((entry) => entry.event === 'owner_approved_disclosure' && entry.summary.includes(loanDisclosure.id) && entry.summary.includes(loanDisclosure.hash)));
  const effectEntry = own.find((entry) => entry.event === 'ledger_effect_recorded');
  assert.equal(effectEntry.ledgerRef, run.ledgerEffect.id);
  assert.equal((await runtime.getLedger()).effects.length, 1);
  // Merchant view and RiskOps view describe the same session and history.
  const merchant = await runtime.getState('merchant');
  const riskops = await runtime.getState('riskops');
  assert.equal(merchant.sessionId, riskops.sessionId);
  assert.equal(riskops.traces.length, journal.entries.length);
});

test('a new runtime is a new session: nothing from the old one carries over', async () => {
  const first = fixture().runtime;
  await first.start('capital_standard');
  const second = fixture().runtime;
  const [a, b] = [await first.getSession(), await second.getSession()];
  assert.notEqual(a.sessionId, b.sessionId);
  assert.equal((await second.getJournal()).entries.length, 0);
});
