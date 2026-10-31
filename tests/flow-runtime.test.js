import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createFlowRuntime, evaluateAgentAuthority } from '../lib/flow-runtime.js';
import { v3Source } from '../lib/v3-source.generated.js';
import { activeSource } from '../lib/active-source.js';
import { evaluateInvoiceEvidence } from '../lib/v3-evidence.js';
import { createPaymentFence } from '../lib/payment-fence.js';
import { createActionRuntime } from '../lib/action-runtime.js';

function fixture(config = {}) {
  const pin = crypto.randomUUID();
  return { pin, runtime: createFlowRuntime({ source: activeSource, evaluateInvoice: evaluateInvoiceEvidence, pinHash: createHash('sha256').update(pin).digest('hex'), pauseProvider: () => false, ...config }) };
}
async function reply(runtime, run, scenarioId) {
  return (await runtime.respond({ requestId: run.currentRequestId, scenarioId })).run;
}
async function approve(runtime, run, pin) {
  return (await runtime.consent({ runId: run.id, disclosureId: run.currentDisclosure.id, decision: 'approve', pin })).run;
}
async function readySupplier(runtime) {
  let run = (await runtime.start('supplier_stock')).run;
  for (const scenario of ['supplier_agreed', 'judge_clear', 'invoice_full', 'aa_available']) run = await reply(runtime, run, scenario);
  return run;
}
async function readyCapital(runtime, pin, intentId = 'capital_standard') {
  let run = (await runtime.start(intentId)).run;
  run = await reply(runtime, run, 'aa_available');
  if (intentId === 'capital_extended') run = await reply(runtime, run, 'kya_verified');
  assert.equal(run.currentDisclosure.type, 'bureau_consent');
  run = await approve(runtime, run, pin);
  run = await reply(runtime, run, 'bureau_verified');
  return reply(runtime, run, 'lender_offer');
}

test('supplier workflow correlates requests, full invoice, observed-spend disclosure and one rail effect', async () => {
  const { pin, runtime } = fixture();
  let run = await readySupplier(runtime);
  assert.equal(run.status, 'awaiting_owner');
  assert.equal(run.currentDisclosure.type, 'payment_consent');
  assert.equal(run.currentDisclosure.terms.sourceInvoiceRow, 'INV-07');
  assert.equal(run.currentDisclosure.terms.observedPriorFyPaidInr, 6286960);
  assert.equal(run.currentDisclosure.terms.supplierLimitInr, 6915656);
  assert.equal(run.currentDisclosure.terms.completeFinancialYear, true);
  assert.equal(run.currentDisclosure.terms.missingPeriod, 'none');
  assert.equal(run.currentDisclosure.terms.sourceInvoiceCreditDays, 14);
  assert.equal(run.currentDisclosure.terms.creditDays, 45);
  assert.ok(run.currentDisclosure.checks.some((item) => item.id === 'source_invoice_terms_variance' && item.status === 'ESCALATE'));
  assert.ok(run.currentDisclosure.risks.some((risk) => risk.includes('proposed amendment') && risk.includes('14') && risk.includes('45')));
  assert.ok(run.currentDisclosure.dataShared.some((item) => item.includes('GD-1182')));
  assert.ok(run.currentDisclosure.dataShared.some((item) => item.includes('7781')));
  assert.ok(run.currentDisclosure.alternatives.some((item) => item.includes('45-day credit') && item.includes('supplier agreement')));
  const disclosure = structuredClone(run.currentDisclosure);
  run = await approve(runtime, run, pin);
  const paymentRequest = run.currentRequestId;
  assert.equal(run.stage, 'payment');
  assert.equal((await runtime.getState('riskops')).ledger.length, 0);
  run = await reply(runtime, run, 'payment_success');
  assert.equal(run.status, 'completed');
  assert.equal(run.ledgerEffect.amountInr, 260000);
  await assert.rejects(runtime.respond({ requestId: paymentRequest, scenarioId: 'payment_success' }), /answered|superseded/);
  const state = await runtime.getState('riskops');
  assert.equal(state.ledger.length, 1);
  const signoff = state.traces.find((event) => event.event === 'owner_approved_disclosure');
  assert.deepEqual(signoff.merchantDisclosure, disclosure);
  assert.equal(signoff.proposedAction.amountInr, 260000);
  const termsVariance = state.traces.find((event) => event.event === 'source_invoice_terms_variance');
  assert.equal(termsVariance.status, 'escalate');
  assert.ok(termsVariance.delta.some((item) => item.field === 'sourceInvoiceCreditDays' && item.original === 14 && item.proposed === 45));
  assert.equal(state.verification.ok, true);
});

test('header-only evidence pauses; a fresh source request can advance only after full body', async () => {
  const { runtime } = fixture();
  let run = (await runtime.start('supplier_header_review')).run;
  const originalRequest = run.currentRequestId;
  run = await reply(runtime, run, 'invoice_header');
  assert.equal(run.status, 'paused');
  assert.equal(run.ledgerEffect, null);
  run = (await runtime.retry({ runId: run.id })).run;
  assert.notEqual(run.currentRequestId, originalRequest);
  run = await reply(runtime, run, 'invoice_full');
  assert.equal(run.stage, 'supplier');
  assert.equal(run.sourceInvoiceRow, 'INV-07');
});

test('source instructions and changed account cannot become owner-approved payments', async () => {
  const { runtime } = fixture();
  let injection = (await runtime.start('invoice_instruction_review')).run;
  injection = await reply(runtime, injection, 'invoice_instruction');
  assert.equal(injection.status, 'paused');
  assert.equal(injection.currentDisclosure, null);
  assert.equal(injection.judge.decision, 'concern');
  let account = (await runtime.start('supplier_stock')).run;
  account = await reply(runtime, account, 'supplier_account_changed');
  assert.equal(account.status, 'blocked');
  assert.ok(account.delta.every((delta) => delta.severity === 'hard'));
  await assert.rejects(runtime.retry({ runId: account.id }), /Only a paused/);
  assert.equal((await runtime.getState('riskops')).ledger.length, 0);
});

test('duplicate source invoice blocks even if its lines and totals reconcile', async () => {
  const { runtime } = fixture();
  let run = (await runtime.start('supplier_header_review')).run;
  run = await reply(runtime, run, 'invoice_duplicate');
  assert.equal(run.status, 'blocked');
  assert.ok(run.checks.some((item) => item.id === 'invoice_duplicate' && item.status === 'BLOCK'));
});

test('commercial drift requires immutable terms signoff and wrong PIN changes no authority', async () => {
  const { pin, runtime } = fixture();
  let run = (await runtime.start('supplier_stock')).run;
  run = await reply(runtime, run, 'supplier_counteroffer');
  const shown = structuredClone(run.currentDisclosure);
  assert.equal(shown.type, 'terms_change');
  assert.equal(shown.originalIntent.purpose, run.originalIntent.purpose);
  assert.deepEqual(run.delta.map((delta) => delta.field), ['upfrontPercent', 'creditDays', 'buybackPercent']);
  await assert.rejects(runtime.consent({ runId: run.id, disclosureId: shown.id, decision: 'approve', pin: crypto.randomUUID() }), /PIN verification failed/);
  assert.equal((await runtime.getState('merchant', run.id)).runs[0].currentDisclosure.id, shown.id);
  run = await approve(runtime, run, pin);
  assert.equal(run.stage, 'judge');
  assert.equal(run.proposedAction.amountInr, 312000);
  await assert.rejects(runtime.consent({ runId: run.id, disclosureId: shown.id, decision: 'approve', pin }), /stale|already answered/);
});

test('judge concern adds owner review; unavailable judge never counts as passed', async () => {
  const { runtime } = fixture();
  let run = (await runtime.start('supplier_stock')).run;
  run = await reply(runtime, run, 'supplier_agreed');
  run = await reply(runtime, run, 'judge_concern');
  assert.equal(run.currentDisclosure.type, 'judge_review');
  assert.equal(run.judge.mode, 'simulated_llm_judge');
  let unavailable = (await runtime.start('supplier_stock')).run;
  unavailable = await reply(runtime, unavailable, 'supplier_agreed');
  unavailable = await reply(runtime, unavailable, 'judge_unavailable');
  assert.equal(unavailable.status, 'paused');
  assert.ok(unavailable.checks.some((item) => item.status === 'NEEDS_VERIFICATION'));
});

test('AA failures and missing GST pause capital before any bureau or lender request', async () => {
  for (const scenario of ['aa_failed', 'aa_consent_expired', 'aa_malformed', 'aa_partial']) {
    const { runtime } = fixture();
    let run = (await runtime.start('capital_standard')).run;
    run = await reply(runtime, run, scenario);
    assert.equal(run.status, 'paused');
    assert.equal(run.currentDisclosure, null);
    assert.equal((await runtime.getState('operator')).requests.some((request) => request.kind === 'bureau' || request.kind === 'lender'), false);
  }
});

test('capital path records bureau purpose disclosure, verified consent and final loan signoff separately', async () => {
  const { pin, runtime } = fixture();
  let run = await readyCapital(runtime, pin);
  assert.equal(run.currentDisclosure.type, 'loan_consent');
  assert.equal(run.currentDisclosure.terms.emiInr, 68730);
  assert.equal(run.disclosureHistory.length, 2);
  run = await approve(runtime, run, pin);
  run = await reply(runtime, run, 'payment_success');
  assert.equal(run.ledgerEffect.type, 'drawdown');
  assert.equal(run.ledgerEffect.amountInr, 200000);
  assert.equal(run.ledgerEffect.account, '**4029');
  assert.equal(run.ledgerEffect.projected5NovInr, 15500);
});

test('higher capital requires KYA scope, expiry and revocation checks before bureau consent', async () => {
  for (const scenario of ['kya_scope_mismatch', 'kya_revoked', 'kya_expired']) {
    const { runtime } = fixture();
    let run = (await runtime.start('capital_extended')).run;
    run = await reply(runtime, run, 'aa_available');
    assert.equal(run.stage, 'kya');
    run = await reply(runtime, run, scenario);
    assert.equal(run.status, 'blocked');
    assert.equal(run.currentDisclosure, null);
  }
  const { pin, runtime } = fixture();
  let run = await readyCapital(runtime, pin, 'capital_extended');
  assert.equal(run.currentDisclosure.terms.kyaVerified, true);
  assert.equal(run.currentDisclosure.terms.amountInr, 250000);
  assert.ok(run.currentDisclosure.terms.emiInr > 68730);
  assert.ok(run.currentDisclosure.terms.combinedEmiInr <= 152000);
  run = await approve(runtime, run, pin);
  run = await reply(runtime, run, 'payment_success');
  assert.equal(run.ledgerEffect.projected5NovInr, 65500);
});

test('failed bureau or lender response never fabricates a successful loan', async () => {
  const { pin, runtime } = fixture();
  let run = (await runtime.start('capital_standard')).run;
  run = await reply(runtime, run, 'aa_available');
  run = await approve(runtime, run, pin);
  run = await reply(runtime, run, 'bureau_failed');
  assert.equal(run.status, 'paused');
  run = (await runtime.retry({ runId: run.id })).run;
  assert.equal(run.currentDisclosure.type, 'bureau_consent');
  run = await approve(runtime, run, pin);
  run = await reply(runtime, run, 'bureau_verified');
  run = await reply(runtime, run, 'lender_declined');
  assert.equal(run.status, 'failed');
  assert.equal((await runtime.getState('riskops')).ledger.length, 0);
});

test('pending payment reconciles the same instruction and cannot resend or double execute across runs', async () => {
  const { pin, runtime } = fixture();
  let run = await readySupplier(runtime); run = await approve(runtime, run, pin);
  const firstRequest = run.currentRequestId;
  run = await reply(runtime, run, 'payment_pending');
  assert.equal(run.status, 'payment_pending');
  const state = await runtime.getState('operator');
  const reconcile = state.requests.find((request) => request.id === run.currentRequestId);
  assert.equal(reconcile.payload.operation, 'reconcile_status');
  assert.equal(state.ledger.length, 0);
  await assert.rejects(runtime.retry({ runId: run.id }), /reconciliation/);
  run = await reply(runtime, run, 'payment_success');
  await assert.rejects(runtime.respond({ requestId: firstRequest, scenarioId: 'payment_success' }), /answered|superseded/);
  const second = await readySupplier(runtime);
  assert.equal(second.status, 'blocked');
  assert.equal((await runtime.getState('riskops')).ledger.length, 1);
});

test('definitive rail failure has zero effect and no success receipt', async () => {
  const { pin, runtime } = fixture();
  let run = await readySupplier(runtime); run = await approve(runtime, run, pin);
  run = await reply(runtime, run, 'payment_failed');
  assert.equal(run.status, 'failed');
  assert.equal(run.ledgerEffect, null);
  assert.equal((await runtime.getState('riskops')).ledger.length, 0);
});

test('wrong-kind, replay, global pause and a broken journal refuse progress', async () => {
  let paused = false; const journalStore = [];
  const { runtime } = fixture({ pauseProvider: () => paused, journalStore });
  let run = (await runtime.start('supplier_stock')).run;
  await assert.rejects(runtime.respond({ requestId: run.currentRequestId, scenarioId: 'aa_available' }), /does not belong/);
  paused = true;
  await assert.rejects(runtime.respond({ requestId: run.currentRequestId, scenarioId: 'supplier_agreed' }), /RiskOps paused/);
  paused = false;
  run = await reply(runtime, run, 'supplier_agreed');
  journalStore[0].summary = 'tampered';
  assert.deepEqual(await runtime.verify(), { ok: false, firstBrokenSeq: 1 });
  await assert.rejects(runtime.respond({ requestId: run.currentRequestId, scenarioId: 'judge_clear' }), /journal failed/);
  assert.equal((await runtime.getState('riskops')).ledger.length, 0);
});

test('server state shares inbox and traces across viewers while withholding operator choices from merchant', async () => {
  const { runtime } = fixture();
  const run = (await runtime.start('supplier_stock')).run;
  const merchant = await runtime.getState('merchant', run.id);
  const operator = await runtime.getState('operator');
  const riskops = await runtime.getState('riskops');
  assert.equal(merchant.catalog.length, 0); assert.equal(merchant.requests.length, 0); assert.equal(merchant.traces.length, 0);
  assert.ok(operator.catalog.length > 20);
  assert.equal(operator.requests[0].runId, run.id);
  assert.equal(riskops.runs[0].traceId, run.traceId);
  assert.ok(riskops.traces.every((event) => event.originalIntent.id === run.intentId && event.proposedAction.type === 'supplier_payment'));
});

test('missing owner PIN setup and owner decline both leave zero payment effects', async () => {
  const { runtime } = fixture({ pinHash: undefined });
  let run = await readySupplier(runtime);
  await assert.rejects(runtime.consent({ runId: run.id, disclosureId: run.currentDisclosure.id, decision: 'approve', pin: crypto.randomUUID() }), /Configure the owner PIN/);
  run = (await runtime.consent({ runId: run.id, disclosureId: run.currentDisclosure.id, decision: 'decline' })).run;
  assert.equal(run.status, 'declined');
  const state = await runtime.getState('riskops');
  assert.equal(state.ledger.length, 0);
  const decline = state.traces.find((event) => event.event === 'owner_declined');
  assert.equal(decline.status, 'declined'); assert.equal(decline.guardAction, 'owner_declined');
  assert.equal(decline.merchantDisclosure.type, 'payment_consent');
});

test('partial v3 source keeps its missing-April coverage caveat in the exact owner disclosure', async () => {
  const { runtime } = fixture({ source: v3Source });
  const run = await readySupplier(runtime);
  assert.equal(run.currentDisclosure.terms.supplierLimitInr, 4919728);
  assert.equal(run.currentDisclosure.terms.completeFinancialYear, false);
  assert.equal(run.currentDisclosure.terms.missingPeriod, '2025-04-01 to 2025-04-30');
  assert.ok(run.currentDisclosure.risks.some((risk) => risk.includes('incomplete')));
});

test('structured KYA checks use evidence fields, not a response label', () => {
  const expected = { agentId: 'agent', merchantId: 'merchant', amountInr: 250000, account: '**4029' };
  const authority = { agentId: 'agent', merchantId: 'merchant', maxAmountInr: 250000, scopes: ['application_draft', 'owner_authorized_bureau_request', 'owner_authorized_drawdown'], allowedAccounts: ['**4029'], expiresAt: '2026-11-01T10:00:00Z', revoked: false, proofOfPossession: 'verified_simulated' };
  assert.equal(evaluateAgentAuthority(authority, expected, '2026-10-31T10:00:00Z').decision, 'PASS');
  for (const patch of [{ agentId: 'other' }, { maxAmountInr: 200000 }, { scopes: ['application_draft'] }, { allowedAccounts: ['**9999'] }, { revoked: true }, { expiresAt: '2026-10-30T10:00:00Z' }]) assert.equal(evaluateAgentAuthority({ ...authority, ...patch }, expected, '2026-10-31T10:00:00Z').decision, 'BLOCK');
  assert.equal(evaluateAgentAuthority({ ...authority, proofOfPossession: 'unknown' }, expected, '2026-10-31T10:00:00Z').decision, 'NEEDS_VERIFICATION');
});

test('KYA authority expiry is rechecked after owner approval and before the rail effect', async () => {
  let time = '2026-10-31T10:00:00Z';
  const { pin, runtime } = fixture({ now: () => time });
  let run = await readyCapital(runtime, pin, 'capital_extended');
  run = await approve(runtime, run, pin);
  time = '2026-11-02T10:00:00Z';
  run = await reply(runtime, run, 'payment_success');
  assert.equal(run.status, 'blocked');
  assert.equal((await runtime.getState('riskops')).ledger.length, 0);
});

test('AA success label cannot manufacture missing bank or GST source evidence', async () => {
  for (const source of [{ ...activeSource, bankTransactions: [] }, { ...activeSource, gstHistorySummary: { filingMonths: 0 } }]) {
    const { runtime } = fixture({ source });
    let run = (await runtime.start('capital_standard')).run;
    run = await reply(runtime, run, 'aa_available');
    assert.equal(run.status, 'paused');
    assert.equal(run.currentDisclosure, null);
  }
});

test('shared payment fence prevents two runtimes from submitting the same pending invoice', async () => {
  const paymentFence = createPaymentFence();
  const first = fixture({ paymentFence }); const second = fixture({ paymentFence });
  let run = await readySupplier(first.runtime); run = await approve(first.runtime, run, first.pin);
  run = await reply(first.runtime, run, 'payment_pending');
  const other = await readySupplier(second.runtime);
  assert.equal(other.status, 'blocked');
  assert.equal(paymentFence.get('supplier_payment', 'GD-1182').status, 'reserved');
  run = await reply(first.runtime, run, 'payment_success');
  assert.equal(paymentFence.get('supplier_payment', 'GD-1182').status, 'completed');
  assert.equal(run.ledgerEffect.amountInr, 260000);
});

test('a pause arriving at final commit records zero effect and resumes through reconciliation only', async () => {
  let commitPause = false; let calls = 0;
  const { pin, runtime } = fixture({ pauseProvider: () => { if (!commitPause) return false; calls++; return calls > 1; } });
  let run = await readySupplier(runtime); run = await approve(runtime, run, pin);
  commitPause = true;
  run = await reply(runtime, run, 'payment_success');
  assert.equal(run.status, 'paused');
  assert.equal(run.ledgerEffect, null);
  commitPause = false;
  run = (await runtime.retry({ runId: run.id })).run;
  const state = await runtime.getState('operator');
  assert.equal(state.requests.find((item) => item.id === run.currentRequestId).payload.operation, 'reconcile_status');
  run = await reply(runtime, run, 'payment_success');
  assert.equal((await runtime.getState('riskops')).ledger.length, 1);
});

test('the tracked workflow and original action endpoint share one invoice payment fence', async () => {
  const paymentFence = createPaymentFence();
  const { pin, runtime } = fixture({ paymentFence });
  const original = createActionRuntime({ pinHash: createHash('sha256').update(pin).digest('hex'), paymentFence, pauseProvider: () => false });
  const action = { type: 'drawdown', lender_id: 'A', amount: 200000, destination_account: '**4029', invoice_id: 'GD-1182' };
  let run = await readyCapital(runtime, pin);
  run = await approve(runtime, run, pin);
  const checked = await original.evaluate(action);
  assert.equal(checked.decision, 'BLOCK');
  assert.ok(checked.checks.some((item) => item.id === 'invoice_duplicate' && item.status === 'BLOCK'));
  run = await reply(runtime, run, 'payment_success');
  assert.equal(run.status, 'completed');
  assert.equal((await runtime.getState('riskops')).ledger.length, 1);
  assert.equal((await original.getLedger()).effects.length, 0);

  const otherFence = createPaymentFence();
  const oldFirst = createActionRuntime({ pinHash: createHash('sha256').update(pin).digest('hex'), paymentFence: otherFence, pauseProvider: () => false });
  const approval = await oldFirst.evaluate(action);
  assert.equal(approval.decision, 'PASS');
  const executed = await oldFirst.execute({ action, pin, approval_id: approval.approval_id, idempotency_key: crypto.randomUUID() });
  assert.equal(executed.outcome, 'done-simulated');
  const trackedSecond = fixture({ paymentFence: otherFence });
  const blocked = await readyCapital(trackedSecond.runtime, trackedSecond.pin);
  assert.equal(blocked.status, 'blocked');
  assert.equal((await trackedSecond.runtime.getState('riskops')).ledger.length, 0);
});

test('a microtask pause after the asynchronous final verifier is caught by the synchronous commit read', async () => {
  let paused = false; let armed = false; let calls = 0;
  const { pin, runtime } = fixture({ pauseProvider: () => {
    if (armed) { calls++; if (calls === 2) queueMicrotask(() => { paused = true; }); }
    return paused;
  } });
  let run = await readySupplier(runtime); run = await approve(runtime, run, pin);
  armed = true;
  run = await reply(runtime, run, 'payment_success');
  assert.equal(run.status, 'paused');
  assert.equal(run.ledgerEffect, null);
  assert.equal((await runtime.getState('riskops')).ledger.length, 0);
  assert.equal((await runtime.verify()).ok, true);
});

test('an invoice-first workflow preserves original invoice terms and asks final owner approval for their amendment', async () => {
  const { runtime } = fixture();
  let run = (await runtime.start('supplier_header_review')).run;
  run = await reply(runtime, run, 'invoice_full');
  assert.equal(run.terms.sourceInvoiceCreditDays, 14);
  run = await reply(runtime, run, 'supplier_agreed');
  assert.equal(run.stage, 'judge');
  assert.equal(run.currentDisclosure, null);
  run = await reply(runtime, run, 'judge_clear');
  assert.equal(run.stage, 'aa');
  run = await reply(runtime, run, 'aa_available');
  assert.equal(run.currentDisclosure.type, 'payment_consent');
  assert.equal(run.currentDisclosure.terms.sourceInvoiceCreditDays, 14);
  assert.equal(run.currentDisclosure.terms.creditDays, 45);
  assert.ok(run.currentDisclosure.checks.some((item) => item.id === 'invoice_body' && item.status === 'PASS'));
  assert.ok(run.currentDisclosure.checks.some((item) => item.id === 'source_invoice_terms_variance' && item.status === 'ESCALATE'));
  assert.ok(run.currentDisclosure.risks.some((risk) => risk.includes('proposed amendment')));
});
