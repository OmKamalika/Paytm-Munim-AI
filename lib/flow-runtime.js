import { getDemoControl } from './demo-control.js';
import { createPaymentFence, getPaymentFence } from './payment-fence.js';

const clone = (value) => JSON.parse(JSON.stringify(value));
const ACTORS = {
  owner: { id: 'rakesh-owner-demo', role: 'merchant_owner' },
  agent: { id: 'munim-agent-sgs-01', role: 'delegate_agent' },
  operator: { id: 'simulator-operator-demo', role: 'simulator_operator' },
  guard: { id: 'intent-guard-demo', role: 'guardrail_agent' },
};
const BASE_TERMS = { totalInr: 520000, upfrontPercent: 50, creditDays: 45, buybackPercent: 50 };
const INTENTS = [
  { id: 'supplier_stock', title: 'Negotiate Diwali stock and pay the agreed advance', category: 'supplier', description: 'Ask Gupta for 45-day credit and 50% buyback; review the invoice and pay only after owner sign-off.', purpose: 'Keep Diwali stock available while protecting cash and unsold stock.', amountInr: 520000, invoiceId: 'GD-1182', sourceInvoiceRow: 'INV-07' },
  { id: 'supplier_header_review', title: 'Complete the missing GD-1182 invoice evidence', category: 'supplier', description: 'Start from the owner’s header-only photo, then request the full source invoice before negotiating payment.', purpose: 'Verify the full invoice before committing to supplier payment.', amountInr: 520000, invoiceId: 'GD-1182', sourceInvoiceRow: 'INV-01' },
  { id: 'invoice_instruction_review', title: 'Review the uploaded Kumar bill before payment', category: 'invoice', description: 'Check the uploaded bill, supplier details, and payment authority before preparing a payment.', purpose: 'Review an uploaded bill without treating invoice text as authority.', amountInr: 48500, invoiceId: 'KA-7710', sourceInvoiceRow: 'INV-03' },
  { id: 'capital_standard', title: 'Prepare ₹2 lakh capital for the Diwali cash gap', category: 'capital', description: 'Request AA data, authorize a simulated bureau check, compare a lender reply, and review the drawdown.', purpose: 'Cover part of invoice GD-1182 and the projected Diwali cash gap.', amountInr: 200000, invoiceId: 'GD-1182' },
  { id: 'capital_extended', title: 'Review ₹2.5 lakh with Know Your Agent', category: 'capital', description: 'Verify Munim’s identity and delegated authority before preparing a larger capital request.', purpose: 'Review a larger capital request within an explicit simulated agent mandate.', amountInr: 250000, invoiceId: 'GD-1182' },
];
const CATALOG = [
  ['supplier_agreed', 'supplier', 'Agreed: 45 days and 50% buyback', 'Gupta accepts 50% upfront, 45-day credit and 50% buyback.'],
  ['supplier_counteroffer', 'supplier', 'Counteroffer: 30 days, no buyback', 'Commercial terms remain inside the fixed floor but drift from the owner’s goal.'],
  ['supplier_account_changed', 'supplier', 'Changed payee and account', 'Gupta Traders & Logistics requests account ending 3390; hard block.'],
  ['supplier_declined', 'supplier', 'Supplier declines', 'No agreement; negotiation pauses without payment.'],
  ['judge_clear', 'judge', 'Simulated judge: no additional concern', 'A simulated model response adds no further escalation; fixed rules still control.'],
  ['judge_concern', 'judge', 'Simulated judge: owner review needed', 'The judge asks the owner to review trade-credit and buyback obligations.'],
  ['judge_unavailable', 'judge', 'Simulated judge unavailable', 'Pause the run; unavailable review is never recorded as passed.'],
  ['invoice_full', 'invoice', 'Full GD-1182 source (INV-07)', '212 line items from the owner’s app upload; check arithmetic, identity and source text.'],
  ['invoice_header', 'invoice', 'Header-only photo (INV-01)', 'No readable line items; payment remains paused for verification.'],
  ['invoice_duplicate', 'invoice', 'Duplicate GD-1196 (INV-02)', 'A new invoice number reuses the GD-1182 lines and total.'],
  ['invoice_changed_account', 'invoice', 'WhatsApp account change (INV-04)', 'Source document requests an unregistered account and payee.'],
  ['invoice_instruction', 'invoice', 'Instruction inside KA-7710 (INV-03)', 'Invoice notes and line text contain instructions aimed at the agent.'],
  ['aa_available', 'aa', 'AA sample: requested data available', 'Release the bundled ReBIT bank data and GST rows requested by this run.'],
  ['aa_partial', 'aa', 'AA sample: bank only', 'Bank rows arrive but GST is missing; capital requests need the remaining data.'],
  ['aa_failed', 'aa', 'AA request failed', 'The sample request fails without releasing usable data.'],
  ['aa_consent_expired', 'aa', 'AA consent expired', 'The simulated existing consent has expired; no data is released.'],
  ['aa_malformed', 'aa', 'AA schema validation failed', 'The simulated payload does not meet the expected Deposit document shape.'],
  ['kya_verified', 'kya', 'Agent identity and scope verified', 'Synthetic identity, mandate amount, destination, expiry and revocation checks pass.'],
  ['kya_scope_mismatch', 'kya', 'Mandate permits only ₹2 lakh', 'Requested ₹2.5 lakh exceeds the presented agent mandate.'],
  ['kya_revoked', 'kya', 'Agent authority revoked', 'The owner’s simulated agent mandate is revoked.'],
  ['kya_expired', 'kya', 'Agent authority expired', 'The presented mandate has expired.'],
  ['kya_failed', 'kya', 'Agent identity proof failed', 'The synthetic proof-of-possession check fails.'],
  ['bureau_verified', 'bureau', 'Simulated OTP verification passed', 'Record verification of the owner’s bureau consent; no code or bureau rail is used.'],
  ['bureau_failed', 'bureau', 'Simulated OTP verification failed', 'Bureau consent verification fails and the application pauses.'],
  ['bureau_expired', 'bureau', 'Simulated OTP expired', 'The owner must authorize a fresh verification request.'],
  ['lender_offer', 'lender', 'Lender A offers the requested amount', 'Return the synthetic 18.5% APR, three-month offer and EMI calculation.'],
  ['lender_declined', 'lender', 'Lender declines', 'No loan is offered and no money moves.'],
  ['lender_expired', 'lender', 'Lender offer expired', 'Pause and request a fresh illustrative offer.'],
  ['lender_more_data', 'lender', 'Lender requests invoice evidence', 'Return a missing-document response rather than a successful loan.'],
  ['payment_success', 'payment', 'Rail status: successful', 'Record exactly one simulated ledger effect after all approvals.'],
  ['payment_failed', 'payment', 'Rail status: failed', 'Definitive failure; record zero ledger effect.'],
  ['payment_pending', 'payment', 'Rail status: pending reconciliation', 'Keep the transfer pending with no ledger effect; next request checks status only.'],
].map(([id, kind, label, description]) => ({ id, kind, label, description }));
const check = (id, status, detail) => ({ id, status, detail });
const money = (amount) => `₹${amount.toLocaleString('en-IN')}`;

function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (value && typeof value === 'object') return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonical(value[key])}`).join(',')}}`;
  return JSON.stringify(value);
}
async function digest(value) {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(typeof value === 'string' ? value : canonical(value)));
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, '0')).join('');
}
function fail(code, message) { const error = new Error(message); error.code = code; throw error; }
function pinMatches(left, right) {
  if (typeof left !== 'string' || typeof right !== 'string') return false;
  let difference = left.length ^ right.length;
  for (let i = 0; i < Math.max(left.length, right.length); i++) difference |= (left.charCodeAt(i) || 0) ^ (right.charCodeAt(i) || 0);
  return difference === 0;
}
function approvedPinHash(hash) { return typeof hash === 'string' && /^[a-f0-9]{64}$/i.test(hash); }

export function evaluateAgentAuthority(authority, expected, at) {
  const checks = [];
  const scopes = ['application_draft', 'owner_authorized_bureau_request', 'owner_authorized_drawdown'];
  checks.push(check('agent_identity', authority?.agentId === expected.agentId && authority?.merchantId === expected.merchantId ? 'PASS' : 'BLOCK', 'Agent and merchant identity must match the requested mandate.'));
  checks.push(check('agent_amount_scope', Number.isSafeInteger(authority?.maxAmountInr) && authority.maxAmountInr >= expected.amountInr ? 'PASS' : 'BLOCK', 'Delegated amount must cover this exact capital request.'));
  checks.push(check('agent_permission_scope', scopes.every((scope) => authority?.scopes?.includes(scope)) && authority?.allowedAccounts?.includes(expected.account) ? 'PASS' : 'BLOCK', 'The mandate must include each operation and the owner destination account.'));
  checks.push(check('agent_expiry', Number.isFinite(Date.parse(authority?.expiresAt)) && Date.parse(authority.expiresAt) > Date.parse(at) ? 'PASS' : 'BLOCK', 'The presented mandate must remain unexpired at runtime.'));
  checks.push(check('agent_revocation', authority?.revoked === false ? 'PASS' : 'BLOCK', 'Revoked or unknown authority cannot proceed.'));
  checks.push(check('agent_proof', authority?.proofOfPossession === 'verified_simulated' ? 'PASS' : 'NEEDS_VERIFICATION', 'The synthetic proof-of-possession result must be verified.'));
  return { decision: checks.some((item) => item.status === 'BLOCK') ? 'BLOCK' : checks.some((item) => item.status !== 'PASS') ? 'NEEDS_VERIFICATION' : 'PASS', checks };
}

/** Shared local simulation. Roles are trace labels, not authentication. */
export function createFlowRuntime({ source = {}, evaluateInvoice, pinHash, now = () => new Date().toISOString(), pauseProvider = () => getDemoControl().isPaused(), journalStore = [], paymentFence = createPaymentFence() } = {}) {
  const runs = new Map();
  const requests = new Map();
  const ledger = [];
  const journal = journalStore;
  // Identifies this in-memory session. A client that sees it change knows the
  // server restarted and that earlier runs, approvals and effects are gone.
  const sessionId = crypto.randomUUID();
  const sessionStartedAt = now();
  let revision = 0;
  let queue = Promise.resolve();
  async function serial(task) {
    const previous = queue; let release;
    queue = new Promise((resolve) => { release = resolve; });
    await previous;
    try { return await task(); } finally { release(); }
  }
  async function verify() {
    let previous = null;
    for (let index = 0; index < journal.length; index++) {
      const entry = journal[index]; const { hash, ...data } = entry;
      if (entry.seq !== index + 1 || entry.prevHash !== previous || hash !== `sha256:${await digest(data)}`) return { ok: false, firstBrokenSeq: index + 1 };
      previous = hash;
    }
    return { ok: true, firstBrokenSeq: null };
  }
  async function mutable() {
    if (!(await verify()).ok) {
      for (const run of runs.values()) if (run._meta.fenceToken && !run.ledgerEffect) { paymentFence.release(run._meta.fenceToken); run._meta.fenceToken = null; }
      fail('JOURNAL_BROKEN', 'The workflow journal failed verification; no action can proceed.');
    }
    if (await pauseProvider()) fail('RISKOPS_PAUSED', 'RiskOps paused this demo server session.');
  }
  async function record(run, actor, tool, event, summary, status = run.status, requestId = run.currentRequestId, effect = null) {
    const entry = {
      seq: journal.length + 1, eventId: crypto.randomUUID(), runId: run.id, traceId: run.traceId,
      spanId: crypto.randomUUID(), parentSpanId: run._meta.lastSpan ?? null, at: now(), actor: clone(actor),
      tool, event, status, guardAction: effect ? 'completed_simulated' : run.guardAction, summary,
      originalIntent: clone(run.originalIntent), proposedAction: clone(run.proposedAction), terms: clone(run.terms), delta: clone(run.delta), judge: clone(run.judge),
      merchantDisclosure: clone(run.currentDisclosure), requestId: requestId ?? null,
      ledgerRef: effect?.id ?? null,
      prevHash: journal.at(-1)?.hash ?? null,
    };
    entry.hash = `sha256:${await digest(entry)}`;
    // All asynchronous verification finishes before the journal and effect are
    // committed together in this synchronous section. Pause is checked last.
    if (effect) {
      await mutable();
      // mutable() itself awaits chain checks. Re-read the real synchronous
      // session control after that promise boundary, then commit without
      // another await so a queued pause cannot be skipped.
      const pauseValue = pauseProvider();
      const finalPaused = typeof pauseValue === 'boolean' ? pauseValue : await pauseValue;
      if (finalPaused) fail('RISKOPS_PAUSED', 'RiskOps paused before the final workflow ledger commit.');
    }
    journal.push(entry);
    if (effect) {
      try { paymentFence.commit(run._meta.fenceToken, effect); }
      catch (error) { journal.pop(); paymentFence.release(run._meta.fenceToken); run._meta.fenceToken = null; throw error; }
      ledger.push(effect); run.ledgerEffect = effect; run.status = 'completed'; run.stage = 'done'; run.guardAction = 'completed_simulated'; run.currentRequestId = null; run.summary = summary;
    }
    run._meta.lastSpan = entry.spanId;
    run.updatedAt = entry.at; revision++;
  }
  function publicRun(run) { const visible = clone(run); delete visible._meta; return visible; }
  async function state(view = 'merchant', runId) {
    if (!['merchant', 'operator', 'riskops'].includes(view)) fail('VIEW_INVALID', 'Choose merchant, operator or riskops.');
    const selected = [...runs.values()].filter((run) => !runId || run.id === runId);
    const runIds = new Set(selected.map((run) => run.id));
    return {
      synthetic: true, sessionOnly: true, authMode: 'demo_roles_no_authentication', viewerRole: view,
      revision, paused: Boolean(await pauseProvider()), intents: clone(INTENTS), runs: selected.reverse().map(publicRun),
      sessionId, sessionStartedAt, revision, paused: Boolean(await pauseProvider()), intents: clone(INTENTS), runs: selected.reverse().map(publicRun),
      requests: view === 'merchant' ? [] : clone([...requests.values()].filter((request) => runIds.has(request.runId))),
      catalog: view === 'operator' ? clone(CATALOG) : [],
      traces: view === 'merchant' ? [] : clone(journal.filter((entry) => runIds.has(entry.runId))),
      ledger: clone(ledger.filter((effect) => runIds.has(effect.runId))), verification: await verify(), pinConfigured: approvedPinHash(pinHash),
    };
  }
  async function request(run, kind, title, summary, payload = {}, expectedDataTypes = []) {
    const item = { id: crypto.randomUUID(), runId: run.id, traceId: run.traceId, kind, title, summary, payload: clone(payload), expectedDataTypes, status: 'open', createdAt: now() };
    run.currentRequestId = item.id; run.currentDisclosure = null; run.stage = kind; run.status = kind === 'payment' && payload.operation === 'reconcile_status' ? 'payment_pending' : 'awaiting_response';
    run.guardAction = run.status === 'payment_pending' ? 'awaiting_reconciliation' : 'awaiting_response'; run.summary = summary; run.version++;
    await record(run, ACTORS.agent, `${kind}.request`, 'external_request_created', summary, run.status, item.id);
    requests.set(item.id, item); return item;
  }
  async function stop(run, status, detail, checks = []) {
    run.status = status; run.guardAction = status === 'blocked' ? 'blocked' : status === 'failed' ? 'failed' : 'paused';
    run.summary = detail; run.currentRequestId = null; run.currentDisclosure = null; run.checks = checks; run.version++;
    await record(run, ACTORS.guard, 'intent_guard', 'guard_decision', detail);
  }
  async function disclosure(run, type, summary, why, terms, continuation, risks = [], dataShared = []) {
    const alternatives = run.category === 'supplier' ? [
      'Decline revised terms and ask Gupta again for 45-day credit and 50% buyback; supplier agreement is required.',
      'Compare the separate ₹2,00,000 capital option; lender eligibility and owner consent are still required.',
      'Review reducing the stock order by ₹1,85,000, subject to supplier agreement and a possible loss of sales margin.',
    ] : run.category === 'capital' ? [
      'Decline the formal capital application and keep the current commitments for review.',
      'Ask Gupta to defer or split the invoice; any credit terms depend on supplier agreement.',
      'Review reducing the stock order by ₹1,85,000, subject to supplier agreement and a possible loss of sales margin.',
    ] : ['Decline further action and request a corrected source document.'];
    const data = {
      id: crypto.randomUUID(), type, version: run.version + 1, requiresPin: true, summary, why,
      originalIntent: clone(run.originalIntent), proposedAction: clone(run.proposedAction), terms: clone(terms), delta: clone(run.delta),
      risks, alternatives, dataShared,
      checks: clone(run.checks), createdAt: now(),
    };
    data.hash = `sha256:${await digest(data)}`;
    run.currentDisclosure = data; run.disclosureHistory.push(clone(data)); run.currentRequestId = null;
    run.status = 'awaiting_owner'; run.stage = 'owner'; run.guardAction = 'awaiting_merchant_signoff'; run.summary = summary;
    run.version++; run._meta.afterConsent = continuation;
    await record(run, ACTORS.guard, 'merchant.disclosure', 'owner_signoff_requested', summary);
  }
  function sourceInvoice(row) { return source.invoices?.find((invoice) => (invoice.row ?? invoice.id) === row); }
  function sourceTermsRisk(run) {
    const originalDays = run.terms.sourceInvoiceCreditDays; const proposedDays = run.terms.creditDays;
    if (!Number.isFinite(originalDays) || !Number.isFinite(proposedDays) || originalDays === proposedDays) return null;
    return `The source invoice states ${originalDays}-day credit, due ${run.terms.sourceInvoiceDueDate}. The supplier reply’s ${proposedDays}-day credit is a proposed amendment to that invoice, not a verified original invoice term. Your sign-off must explicitly accept the proposed amendment; supplier performance remains simulated.`;
  }
  async function recordSourceTermsVariance(run) {
    const risk = sourceTermsRisk(run);
    run.checks = run.checks.filter((item) => item.id !== 'source_invoice_terms_variance');
    run.delta = run.delta.filter((item) => item.field !== 'sourceInvoiceCreditDays');
    if (!risk) return;
    run.checks.push(check('source_invoice_terms_variance', 'ESCALATE', risk));
    run.delta.push({ field: 'sourceInvoiceCreditDays', original: run.terms.sourceInvoiceCreditDays, proposed: run.terms.creditDays, severity: 'intent' });
    const signature = `${run.terms.sourceInvoiceCreditDays}|${run.terms.creditDays}`;
    if (run._meta.termsVarianceRecorded !== signature) {
      await record(run, ACTORS.guard, 'invoice.terms_compare', 'source_invoice_terms_variance', risk, 'escalate');
      run._meta.termsVarianceRecorded = signature;
    }
  }
  async function requestInvoice(run) {
    return request(run, 'invoice', 'Request invoice evidence', `Request the full source body for ${run.originalIntent.invoiceId}.`, { invoiceId: run.originalIntent.invoiceId, initialSourceRow: run.sourceInvoiceRow, required: 'Full readable line items, source account and arithmetic checks' }, ['invoice_header', 'invoice_line_items', 'source_document_text']);
  }
  async function requestSupplier(run) {
    return request(run, 'supplier', 'Send merchant intent to Gupta', 'Awaiting Gupta’s response to the merchant’s credit and buyback request.', { invoiceId: 'GD-1182', supplier: 'Gupta Distributors', verifiedAccount: 'XXXXXXXX7781', originalIntent: run.originalIntent.purpose, requestedTerms: BASE_TERMS, batna: 'Decline revised terms and review financing or reduce the stock order', zopa: '50–60% upfront; credit at least 30 days; no account change; changes from 45 days or 50% buyback require owner review' }, ['supplier_quote', 'accepted_terms', 'beneficiary_identity']);
  }
  async function requestJudge(run) {
    return request(run, 'judge', 'Review the supplier reply', 'A simulated LLM judge reviews the proposal against the owner’s goal; fixed guard rules remain binding.', { originalIntent: run.originalIntent.purpose, proposedTerms: run.terms, delta: run.delta, judgeMode: 'simulated_llm_judge' }, ['semantic_review', 'rationale']);
  }
  async function requestAa(run) {
    const capital = run.category === 'capital';
    return request(run, 'aa', 'Request synthetic AA data', capital ? 'Request bank and GST samples for the capital application.' : 'Request supplier-payment history from the bundled ReBIT bank sample.', { consent: 'existing_simulated_consent', purpose: run.originalIntent.purpose, account: 'XXXXXXXX4029', period: `${source.bankAccount?.statementFrom ?? 'source start'} to ${source.bankAccount?.statementThrough ?? 'source end'}`, requiredDataTypes: capital ? ['deposit_transactions', 'gst_returns'] : ['deposit_transactions'] }, capital ? ['deposit_transactions', 'gst_returns'] : ['deposit_transactions']);
  }
  function supplierLimit() {
    const rows = (source.aaDebits ?? []).filter((row) => row.supplier_id === 'gupta' && row.direction === 'debit' && row.source === 'AA' && row.verified === true && row.confidence === 'high' && row.date >= '2025-04-01' && row.date <= '2026-03-31' && Number.isSafeInteger(row.amount) && row.amount > 0);
    const spend = rows.reduce((total, row) => total + row.amount, 0);
    const coverage = source.provenance?.fyCoverage ?? {};
    return rows.length && Number.isSafeInteger(spend) ? { count: rows.length, spend, limit: Math.floor(spend * 1.1), observedPeriod: `${coverage.from ?? 'not supplied'} to ${coverage.to ?? 'not supplied'}`, completeFinancialYear: coverage.completeFinancialYear === true, missingPeriod: coverage.missingPeriod || 'none' } : null;
  }
  function duplicateEffect(run) {
    const action = run.proposedAction; const fenced = paymentFence.get(action.type, action.invoiceId);
    return ledger.some((effect) => effect.type === action.type && effect.invoiceId === action.invoiceId) || Boolean(fenced && (fenced.ownerId !== run.id || fenced.status !== 'reserved'));
  }
  function amountBoundary(run) {
    const action = run.proposedAction;
    if (!Number.isSafeInteger(action.amountInr) || action.amountInr <= 0) return false;
    const total = ledger.filter((effect) => effect.type === action.type).reduce((sum, effect) => sum + effect.amountInr, 0);
    if (run.category === 'supplier') return action.payee === 'Gupta Distributors' && action.account === 'XXXXXXXX7781' && run._meta.invoiceVerified && run._meta.aaReady && action.amountInr + total <= run._meta.supplierLimit?.limit;
    if (run.category === 'capital') {
      const authority = run.originalIntent.amountInr > 200000 ? evaluateAgentAuthority(run._meta.authority, { agentId: ACTORS.agent.id, merchantId: 'sharma-general-stores', amountInr: action.amountInr, account: '**4029' }, now()).decision === 'PASS' : true;
      const ceiling = run.originalIntent.amountInr > 200000 ? 250000 : 200000;
      return action.account === '**4029' && action.amountInr === run.originalIntent.amountInr && total + action.amountInr <= ceiling && authority && run._meta.bureauVerified && Number.isSafeInteger(run.terms.combinedEmiInr) && run.terms.combinedEmiInr <= 152000;
    }
    return false;
  }
  async function finalPaymentConsent(run) {
    if (duplicateEffect(run)) return stop(run, 'blocked', 'A successful simulated effect for this invoice and action type already exists.', [check('duplicate_invoice', 'BLOCK', 'No second payment or drawdown may be created for this invoice.')]);
    if (!amountBoundary(run)) return stop(run, 'blocked', 'A runtime cumulative amount, account, evidence or delegated-authority check failed.', [check('runtime_boundary', 'BLOCK', 'The action must remain inside the current cumulative, source-evidence and authority boundaries.')]);
    if (run.category === 'supplier') {
      const limit = run._meta.supplierLimit;
      if (!limit || run.proposedAction.amountInr > limit.limit) return stop(run, 'blocked', 'Supplier payment exceeds the derived same-supplier limit or history is unavailable.', [check('supplier_limit', 'BLOCK', 'The proposed advance is outside the verified simulation boundary.')]);
      const coverageRisk = limit.completeFinancialYear ? 'The statement covers the complete prior financial year. The ceiling still uses only high-confidence narration matches, not every possible supplier payment.' : `The source is incomplete for the prior financial year (${limit.missingPeriod} is missing). The ceiling is 110% of high-confidence observed payments, a conservative lower bound.`;
      return disclosure(run, 'payment_consent', `Review ${money(run.proposedAction.amountInr)} supplier advance`, 'The agent prepared this advance after the supplier responded, the source invoice evidence was checked and the observed AA history supported a conservative limit. Review any proposed amendment to the original invoice terms before approving.', { ...run.terms, invoiceTotalInr: 520000, advanceInr: run.proposedAction.amountInr, supplierLimitInr: limit.limit, observedPriorFyPaidInr: limit.spend, observedPeriod: limit.observedPeriod, completeFinancialYear: limit.completeFinancialYear, missingPeriod: limit.missingPeriod, sourceInvoiceRow: run.sourceInvoiceRow, beneficiary: run.proposedAction.payee, account: run.proposedAction.account }, 'payment', [coverageRisk, ...sourceTermsRisk(run) ? [sourceTermsRisk(run)] : [], 'Supplier credit is a future payable, not free funding.', 'Buyback and delivery are simulated supplier promises, not independently enforced rights.', 'Purchase quantities do not prove current stock or customer sell-through.', 'Narration matching estimates supplier identity; ambiguous and medium-confidence rows are excluded from this ceiling.'], [`Synthetic invoice identifier ${run.proposedAction.invoiceId}`, `Synthetic advance amount ${money(run.proposedAction.amountInr)}`, `Verified synthetic beneficiary name ${run.proposedAction.payee}`, `Verified synthetic beneficiary account ${run.proposedAction.account}`, `Synthetic Paytm rail instruction and payment-status reference`]);
    }
    return disclosure(run, 'loan_consent', `Review ${money(run.proposedAction.amountInr)} drawdown from Lender A`, 'The application was prepared to cover part of Gupta invoice GD-1182 and the projected Diwali cash gap.', { ...run.terms, amountInr: run.proposedAction.amountInr, destination: '**4029', kyaRequired: run.proposedAction.amountInr > 200000, kyaVerified: Boolean(run._meta.kyaVerified) }, 'payment', ['This creates a simulated formal lending obligation.', 'APR, EMI and total interest are illustrative fixture values.', 'A completed drawdown is counted once and does not reduce the Gupta invoice outflow.'], ['Synthetic AA bank rows', 'Synthetic GST filing history', 'Simulated bureau consent result']);
  }
  async function supplierNext(run) {
    if (!run._meta.supplierAccepted) return requestSupplier(run);
    if (!run._meta.judgeCleared) return requestJudge(run);
    if (!run._meta.invoiceVerified) return requestInvoice(run);
    if (!run._meta.aaReady) return requestAa(run);
    return finalPaymentConsent(run);
  }
  async function bureauConsent(run) {
    return disclosure(run, 'bureau_consent', 'Authorize the simulated bureau verification', 'Munim drafted a capital application because the current cash plan has a projected Diwali shortfall. The owner must authorize the purpose and data before the verification request.', { requestedAmountInr: run.originalIntent.amountInr, bureauPull: 'simulated soft bureau pull; no external bureau contacted', account: '**4029' }, 'bureau', ['A real bureau pull would require explicit consent through the regulated partner.', 'This demo exchanges verification status only and does not contain a real OTP.'], ['Synthetic bank transactions', 'GST filing count', 'Business identity and requested capital purpose']);
  }
  async function requestKya(run) {
    return request(run, 'kya', 'Verify delegated agent authority', 'The amount exceeds ₹2 lakh; verify synthetic agent identity and the explicit mandate before continuing.', { agentId: ACTORS.agent.id, merchant: 'Sharma General Stores', requestedAmountInr: run.originalIntent.amountInr, allowedDestination: '**4029', requiredScopes: ['application_draft', 'owner_authorized_bureau_request', 'owner_authorized_drawdown'], revocationCheck: true, expiryCheck: true, proofOfPossession: 'simulated' }, ['agent_identity', 'mandate_scope', 'amount_ceiling', 'expiry', 'revocation', 'proof_of_possession']);
  }
  async function paymentRequest(run) {
    if (duplicateEffect(run)) return stop(run, 'blocked', 'A successful effect already exists for this invoice.', [check('duplicate_invoice', 'BLOCK', 'No duplicate payment is permitted.')]);
    if (!amountBoundary(run)) return stop(run, 'blocked', 'The action changed or the authority expired before payment submission.', [check('runtime_boundary', 'BLOCK', 'Current evidence, authority and cumulative amount are rechecked at submission.')]);
    const reservation = paymentFence.reserve(run.proposedAction.type, run.proposedAction.invoiceId, run.id);
    if (!reservation) return stop(run, 'blocked', 'Another workflow or the original demo already owns this invoice action.', [check('app_wide_payment_fence', 'BLOCK', 'No second instruction can be submitted for the same invoice action.')]);
    run._meta.fenceToken = reservation;
    run._meta.paymentInstructionId = crypto.randomUUID();
    try { return await request(run, 'payment', 'Submit simulated Paytm payment instruction', 'Owner approval is recorded. Await a backend rail status; no funds have moved.', { operation: 'submit_instruction', instructionId: run._meta.paymentInstructionId, action: run.proposedAction, ownerDisclosureId: run._meta.lastApprovedDisclosure, simulationOnly: true }, ['payment_status', 'rail_reference']); }
    catch (error) { paymentFence.release(reservation); run._meta.fenceToken = null; throw error; }
  }
  async function start(intentId) {
    return serial(async () => {
      await mutable();
      const intent = INTENTS.find((item) => item.id === intentId); if (!intent) fail('INTENT_INVALID', 'Choose a listed merchant intent.');
      const capital = intent.category === 'capital';
      const run = {
        id: crypto.randomUUID(), traceId: crypto.randomUUID(), intentId: intent.id, title: intent.title, category: intent.category,
        status: 'awaiting_response', stage: capital ? 'aa' : intent.id === 'supplier_stock' ? 'supplier' : 'invoice', version: 1,
        createdAt: now(), updatedAt: now(), originalIntent: clone(intent),
        proposedAction: { type: capital ? 'drawdown' : intent.category === 'invoice' ? 'invoice_review' : 'supplier_payment', amountInr: capital || intent.category === 'invoice' ? intent.amountInr : 260000, payee: capital ? 'Sharma General Stores' : intent.category === 'invoice' ? 'Kumar Agencies' : 'Gupta Distributors', account: capital ? '**4029' : intent.category === 'invoice' ? 'XXXXXXXX2048' : 'XXXXXXXX7781', invoiceId: intent.invoiceId, rail: capital ? 'Paytm partner drawdown (simulated)' : 'Paytm ecosystem supplier transfer (simulated)' },
        terms: capital ? { requestedAmountInr: intent.amountInr, sourceVersion: source.version ?? 'not supplied' } : intent.category === 'invoice' ? { invoiceAmountInr: intent.amountInr, sourceVersion: source.version ?? 'not supplied' } : { ...BASE_TERMS, sourceVersion: source.version ?? 'not supplied' }, delta: [], checks: [], currentRequestId: null, currentDisclosure: null, disclosureHistory: [], latestResponse: null, judge: null, guardAction: 'awaiting_response', summary: intent.description, sourceInvoiceRow: intent.sourceInvoiceRow ?? '', ledgerEffect: null,
        _meta: { lastSpan: null, invoiceVerified: false, supplierAccepted: false, judgeCleared: false, aaReady: false, kyaVerified: false, lastApprovedDisclosure: null },
      };
      runs.set(run.id, run); await record(run, ACTORS.owner, 'merchant.intent', 'merchant_intent_recorded', intent.description);
      if (capital) await requestAa(run); else if (intent.id === 'supplier_stock') await requestSupplier(run); else await requestInvoice(run);
      return { run: publicRun(run), state: await state('merchant', run.id) };
    });
  }
  async function supplierResponse(run, scenarioId) {
    if (scenarioId === 'supplier_declined') return stop(run, 'paused', 'Gupta declined the proposed terms; no order or payment was committed.', [check('supplier_agreement', 'NEEDS_VERIFICATION', 'No supplier agreement.')]);
    if (scenarioId === 'supplier_account_changed') {
      run.proposedAction.payee = 'Gupta Traders & Logistics'; run.proposedAction.account = 'XXXXXXXX3390';
      run.delta = [{ field: 'beneficiaryName', original: 'Gupta Distributors', proposed: run.proposedAction.payee, severity: 'hard' }, { field: 'account', original: 'XXXXXXXX7781', proposed: run.proposedAction.account, severity: 'hard' }];
      return stop(run, 'blocked', 'The supplier changed the beneficiary name and account. Owner sign-off cannot override the fixed payee rule.', [check('beneficiary_identity', 'BLOCK', 'Proposed payee/account differs from the approved synthetic registry.')]);
    }
    run._meta.supplierAccepted = true;
    run.terms = scenarioId === 'supplier_counteroffer' ? { ...run.terms, ...BASE_TERMS, sourceVersion: source.version ?? 'not supplied', upfrontPercent: 60, creditDays: 30, buybackPercent: 0 } : { ...run.terms, ...BASE_TERMS, sourceVersion: source.version ?? 'not supplied' };
    run.proposedAction.amountInr = run.terms.totalInr * run.terms.upfrontPercent / 100;
    run.delta = ['upfrontPercent', 'creditDays', 'buybackPercent'].filter((field) => run.terms[field] !== BASE_TERMS[field]).map((field) => ({ field, original: BASE_TERMS[field], proposed: run.terms[field], severity: 'intent' }));
    const ownerGoalChanged = run.delta.length > 0;
    run.checks = [check('registered_payee', 'PASS', 'Gupta Distributors and account ending 7781 match the registry.'), check('mandate_floor', 'PASS', 'The offer remains inside the fixed 50–60% upfront and minimum 30-day credit boundary.'), check('original_intent', ownerGoalChanged ? 'ESCALATE' : 'PASS', ownerGoalChanged ? 'The supplier offer changes the owner’s requested credit and buyback protection.' : 'The supplier terms preserve the owner’s requested goal.'), ...(run._meta.invoiceChecks ?? [])];
    await recordSourceTermsVariance(run);
    if (ownerGoalChanged) return disclosure(run, 'terms_change', 'Gupta’s counteroffer changes your requested protection', 'The fixed policy permits the proposed floor, but the runtime terms differ from your original instruction. Approving this disclosure accepts revised terms only; payment still needs separate approval.', run.terms, 'judge', ['60% upfront ties up more cash.', '30-day credit is shorter than requested.', 'No buyback leaves unsold-stock risk with the merchant.', ...(sourceTermsRisk(run) ? [sourceTermsRisk(run)] : [])]);
    return supplierNext(run);
  }
  async function judgeResponse(run, scenarioId) {
    run.judge = { mode: 'simulated_llm_judge', decision: scenarioId === 'judge_clear' ? 'clear' : scenarioId === 'judge_concern' ? 'concern' : 'unavailable', reason: scenarioId === 'judge_clear' ? 'No additional semantic concern was returned by the simulated judge.' : scenarioId === 'judge_concern' ? 'The simulated judge requests an owner review of enforceability, buyback wording and trade-credit obligations.' : 'The simulated judge returned no usable review.' };
    await record(run, ACTORS.guard, 'judge.simulated', 'judge_result', run.judge.reason);
    if (scenarioId === 'judge_unavailable') return stop(run, 'paused', run.judge.reason, [check('semantic_judge', 'NEEDS_VERIFICATION', 'No judge review is available.')]);
    run._meta.judgeCleared = true;
    if (scenarioId === 'judge_concern') return disclosure(run, 'judge_review', 'Review the judge’s concern before continuing', run.judge.reason, run.terms, 'supplier_next', ['The judge is a simulated response, not proof that the supplier will perform.', 'Review the recorded supplier obligations before authorizing further steps.']);
    return supplierNext(run);
  }
  async function invoiceResponse(run, scenarioId) {
    const row = { invoice_full: 'INV-07', invoice_header: 'INV-01', invoice_duplicate: 'INV-02', invoice_changed_account: 'INV-04', invoice_instruction: 'INV-03' }[scenarioId];
    const invoice = sourceInvoice(row); run.sourceInvoiceRow = row;
    if (!invoice || typeof evaluateInvoice !== 'function') return stop(run, 'paused', 'The selected source invoice or verifier is unavailable.', [check('source_invoice', 'NEEDS_VERIFICATION', 'A readable source record is required.')]);
    const evaluated = evaluateInvoice(invoice, source.invoices, source.suppliers);
    run.checks = clone(evaluated.checks ?? []);
    if (evaluated.injectionDetected || evaluated.injection) {
      run.judge = { mode: 'deterministic_document_scan', decision: 'concern', reason: 'Source notes or invoice line descriptions contain instructions aimed at the agent. Those words are untrusted document data.' };
      await record(run, ACTORS.guard, 'invoice.instruction_detector', 'instruction_attack_flagged', run.judge.reason);
      return stop(run, 'paused', 'Invoice instructions were quarantined. No payment authority is granted by document text.', [...run.checks, check('document_authority', 'ESCALATE', 'Invoice text cannot authorize payment or override the owner mandate.')]);
    }
    if (evaluated.status === 'BLOCK' || evaluated.decision === 'BLOCK') return stop(run, 'blocked', evaluated.reason ?? 'Invoice evidence failed a fixed guard rule.', run.checks);
    if (evaluated.status !== 'PASS' || !evaluated.hasFullBody) return stop(run, 'paused', evaluated.reason ?? 'The full source invoice remains unverified.', run.checks);
    if (invoice.number !== run.originalIntent.invoiceId || invoice.totalInr !== run.originalIntent.amountInr || (run.category === 'supplier' && (invoice.supplierId !== 'gupta' || invoice.accountLast4 !== '7781'))) return stop(run, 'blocked', 'The source invoice is outside the merchant’s original instruction.', [...run.checks, check('invoice_scope', 'BLOCK', 'Invoice number, total or registered supplier does not match the requested bill.')]);
    run._meta.invoiceVerified = true;
    run.terms.sourceInvoiceLines = invoice.lineCount ?? invoice.lines.length;
    run.terms.sourceInvoiceAmountInr = invoice.totalInr;
    run.terms.sourceInvoiceCreditDays = invoice.paymentTermsDays;
    run.terms.sourceInvoiceDueDate = invoice.dueDate;
    run._meta.invoiceChecks = clone(run.checks);
    await recordSourceTermsVariance(run);
    await record(run, ACTORS.guard, 'invoice.evidence', 'invoice_verified', `Source ${row}: full line items, arithmetic and registered beneficiary checks passed.`);
    if (run.category === 'invoice') { run.status = 'completed'; run.stage = 'done'; run.guardAction = 'review_complete'; run.summary = 'Invoice review completed without a payment instruction.'; return record(run, ACTORS.guard, 'invoice.review', 'review_complete', run.summary); }
    return supplierNext(run);
  }
  async function aaResponse(run, scenarioId) {
    if (!['aa_available', 'aa_partial'].includes(scenarioId)) return stop(run, 'paused', scenarioId === 'aa_consent_expired' ? 'The simulated AA consent expired; no data was released.' : scenarioId === 'aa_malformed' ? 'AA payload schema validation failed; no data was accepted.' : 'The simulated AA request failed.', [check('aa_data', 'NEEDS_VERIFICATION', 'No usable current response for this request.')]);
    if (run.category === 'capital' && scenarioId === 'aa_partial') return stop(run, 'paused', 'Bank data arrived, but GST rows required for capital eligibility are missing.', [check('required_data_types', 'NEEDS_VERIFICATION', 'Capital requests need both bank and GST sample data.')]);
    if (!source.bankTransactions?.length || String(source.bankAccount?.maskedAccNumber ?? source.bankAccount?.maskedAccount ?? '').slice(-4) !== '4029') return stop(run, 'paused', 'The bundled AA response lacks a usable transaction set for the owner account.', [check('aa_source_shape', 'NEEDS_VERIFICATION', 'Account ending 4029 and nonempty Deposit transaction rows are required.')]);
    if (run.category === 'capital' && !(source.gstHistorySummary?.filingMonths >= 12)) return stop(run, 'paused', 'The source bundle does not contain twelve usable GST filing months.', [check('gst_source_rows', 'NEEDS_VERIFICATION', 'GST data must come from the supplied source, not a response label.')]);
    run._meta.aaReady = true;
    if (run.category !== 'capital') {
      const limit = supplierLimit(); run._meta.supplierLimit = limit;
      if (!limit) return stop(run, 'paused', 'No same-supplier prior-FY payments could be matched from ReBIT narrations.', [check('supplier_history', 'NEEDS_VERIFICATION', 'No supplier payment ceiling could be derived.')]);
      run.terms.priorFySpendInr = limit.spend; run.terms.supplierLimitInr = limit.limit; run.terms.matchedPaymentCount = limit.count;
      run.checks.push(check('aa_supplier_history', 'PASS', `${limit.count} high-confidence supplier debits matched from narration in ${limit.observedPeriod}; ${limit.completeFinancialYear ? 'the statement covers the complete financial year' : `${limit.missingPeriod} is missing`}. The conservative observed-spend ceiling is ${money(limit.limit)}. Ambiguous/medium matches and label answer keys are excluded.`));
      return supplierNext(run);
    }
    run.terms.gstFilingMonths = source.gstHistorySummary.filingMonths;
    run.terms.gstPeriod = `${source.gstHistorySummary.from} to ${source.gstHistorySummary.to}`;
    run.terms.gstSchemaValidation = source.gstHistorySummary.fullXsdValidation === true ? 'Full XSD validation supplied' : 'Basic structure and XML/JSON mirror checks only; full XSD validation not performed';
    run.checks = [check('aa_bank_data', 'PASS', 'Bundled ReBIT Deposit sample accepted for account ending 4029.'), check('gst_data', 'PASS', `${source.gstHistorySummary.filingMonths} filed GST periods are available from the supplied source. ${source.gstHistorySummary.validationCaveat ?? 'Synthetic fixture; no live GST system contacted.'}`)];
    if (run.originalIntent.amountInr > 200000) return requestKya(run);
    return bureauConsent(run);
  }
  async function kyaResponse(run, scenarioId) {
    const authority = { agentId: ACTORS.agent.id, merchantId: 'sharma-general-stores', maxAmountInr: scenarioId === 'kya_scope_mismatch' ? 200000 : 250000, scopes: ['application_draft', 'owner_authorized_bureau_request', 'owner_authorized_drawdown'], allowedAccounts: ['**4029'], expiresAt: new Date(Date.parse(now()) + (scenarioId === 'kya_expired' ? -86400000 : 86400000)).toISOString(), revoked: scenarioId === 'kya_revoked', proofOfPossession: scenarioId === 'kya_failed' ? 'failed_simulated' : 'verified_simulated' };
    const evaluated = evaluateAgentAuthority(authority, { agentId: ACTORS.agent.id, merchantId: 'sharma-general-stores', amountInr: run.originalIntent.amountInr, account: '**4029' }, now());
    run.checks.push(...evaluated.checks);
    if (evaluated.decision !== 'PASS') {
      run.delta = evaluated.checks.filter((item) => item.status !== 'PASS').map((item) => ({ field: item.id, original: 'authorized in scope', proposed: item.detail, severity: 'hard' }));
      return stop(run, evaluated.decision === 'BLOCK' ? 'blocked' : 'paused', 'The structured synthetic agent authority failed a runtime check.', run.checks);
    }
    run._meta.authority = authority; run._meta.kyaVerified = true; run.terms.agentMandateMaxInr = authority.maxAmountInr; run.terms.agentIdentity = authority.agentId; run.terms.agentMandateExpiresAt = authority.expiresAt; run.terms.agentRevoked = false;
    return bureauConsent(run);
  }
  async function bureauResponse(run, scenarioId) {
    if (scenarioId !== 'bureau_verified') return stop(run, 'paused', scenarioId === 'bureau_expired' ? 'The simulated OTP verification expired. Fresh owner authorization is required.' : 'The simulated bureau consent verification failed.', [check('bureau_consent', 'NEEDS_VERIFICATION', 'No verified consent result for a bureau request.')]);
    run._meta.bureauVerified = true; run.checks.push(check('bureau_consent', 'PASS', 'The operator returned a simulated owner verification success; no real bureau pull occurred.'));
    return request(run, 'lender', 'Request the illustrative lender reply', 'The simulated application is ready for a lender response after owner consent.', { amountInr: run.originalIntent.amountInr, purpose: run.originalIntent.purpose, dataTypes: ['deposit_transactions', 'gst_returns', 'bureau_consent_status'], bureauConsent: 'verified_simulated' }, ['lender_decision', 'offer_terms']);
  }
  async function lenderResponse(run, scenarioId) {
    if (scenarioId !== 'lender_offer') return stop(run, scenarioId === 'lender_declined' ? 'failed' : 'paused', scenarioId === 'lender_declined' ? 'The lender declined. No loan or drawdown was created.' : scenarioId === 'lender_more_data' ? 'The lender requests further invoice evidence; no final offer is available.' : 'The illustrative lender offer expired.', [check('lender_offer', 'NEEDS_VERIFICATION', 'A valid lender offer is required for final owner sign-off.')]);
    const amount = run.originalIntent.amountInr; const rate = 0.185 / 12; const emi = amount === 200000 ? 68730 : Math.round((amount * rate / (1 - (1 + rate) ** -3)) / 10) * 10;
    run.terms = { ...run.terms, lender: 'Lender A', aprPercent: 18.5, tenorMonths: 3, emiInr: emi, totalInterestInr: emi * 3 - amount, existingEmiInr: 22000, combinedEmiInr: emi + 22000, emiCapInr: 152000 };
    const passes = emi + 22000 <= 152000 && (amount <= 200000 || run._meta.kyaVerified);
    run.checks.push(check('emi_cap', passes ? 'PASS' : 'BLOCK', passes ? 'Combined monthly EMI is within the 8% monthly-collections cap.' : 'EMI or delegated-authority boundary failed.'));
    if (!passes) return stop(run, 'blocked', 'The proposed loan fails an EMI or delegated-authority boundary.', run.checks);
    return finalPaymentConsent(run);
  }
  async function paymentResponse(run, scenarioId, item) {
    if (scenarioId === 'payment_pending') {
      await request(run, 'payment', 'Reconcile the pending simulated instruction', 'The rail status is pending. Check the same instruction’s status; do not submit another transfer.', { operation: 'reconcile_status', instructionId: run._meta.paymentInstructionId, action: run.proposedAction, simulationOnly: true }, ['payment_status', 'rail_reference']);
      return;
    }
    if (scenarioId === 'payment_failed') { paymentFence.release(run._meta.fenceToken); run._meta.fenceToken = null; return stop(run, 'failed', 'The simulated payment rail returned a definitive failure. Zero ledger effect.', [check('rail_result', 'BLOCK', 'No successful money movement status was returned.')]); }
    if (!run._meta.lastApprovedDisclosure) return stop(run, 'blocked', 'No owner approval is bound to this payment instruction.', [check('owner_approval', 'BLOCK', 'Payment requires recorded owner approval.')]);
    if (duplicateEffect(run)) return stop(run, 'blocked', 'A successful effect already exists for this invoice and action type. Duplicate status has zero effect.', [check('duplicate_invoice', 'BLOCK', 'This invoice cannot execute twice.')]);
    if (!amountBoundary(run)) { paymentFence.release(run._meta.fenceToken); run._meta.fenceToken = null; return stop(run, 'blocked', 'The cumulative amount, evidence, destination or delegated authority failed the final runtime check.', [check('runtime_boundary', 'BLOCK', 'No ledger effect is allowed outside the current runtime boundary.')]); }
    const effect = { id: run._meta.paymentInstructionId, runId: run.id, type: run.proposedAction.type, amountInr: run.proposedAction.amountInr, payee: run.proposedAction.payee, account: run.proposedAction.account, invoiceId: run.proposedAction.invoiceId, rail: run.proposedAction.rail, recordedAt: now(), requestId: item.id };
    if (effect.type === 'drawdown') effect.projected5NovInr = -184500 + effect.amountInr + ledger.filter((row) => row.type === 'drawdown').reduce((total, row) => total + row.amountInr, 0);
    const summary = effect.type === 'drawdown' ? `Done (simulated). One drawdown inflow is counted once; the 5 Nov story balance is ${money(effect.projected5NovInr)}. The full Gupta bill remains an outflow. No real funds moved.` : 'Done (simulated). Exactly one supplier advance was recorded in this workflow ledger. The workbook cash plan has not been recomputed; its full Gupta bill remains unchanged. No real funds moved.';
    const summary = effect.type === 'drawdown'
      ? `Done (simulated). One ${money(effect.amountInr)} drawdown inflow is recorded once; the cash plan counts it and keeps the full Gupta bill as an outflow. No real funds moved.`
      : `Done (simulated). One ${money(effect.amountInr)} supplier advance was recorded; the cash plan marks that part of the bill paid and moves the agreed balance to its credit date. No real funds moved.`;
    try { await record(run, ACTORS.guard, 'payment.simulated_ledger', 'ledger_effect_recorded', summary, 'completed', item.id, effect); }
    catch (error) {
      if (error.code !== 'RISKOPS_PAUSED') throw error;
      run.stage = 'payment'; run._meta.paymentAwaitingReconciliation = true;
      return stop(run, 'paused', 'RiskOps paused before the final ledger commit. Zero effect; resume and reconcile the same instruction.', [check('session_pause', 'BLOCK', 'Global pause was rechecked immediately before the ledger commit.')]);
    }
  }
  async function respond({ requestId, scenarioId } = {}) {
    return serial(async () => {
      await mutable();
      const item = requests.get(requestId); if (!item) fail('REQUEST_NOT_FOUND', 'Choose an incoming backend request.');
      const run = runs.get(item.runId);
      if (item.status !== 'open' || run.currentRequestId !== item.id || !['awaiting_response', 'payment_pending'].includes(run.status)) fail('STALE_REQUEST', 'This request was answered, superseded or is no longer active.');
      const scenario = CATALOG.find((candidate) => candidate.id === scenarioId && candidate.kind === item.kind);
      if (!scenario) fail('SCENARIO_MISMATCH', 'The selected response does not belong to this request type.');
      const response = { requestId: item.id, scenarioId, label: scenario.label, summary: scenario.description, receivedAt: now(), data: { simulationOnly: true, kind: item.kind } };
      item.status = 'answered'; item.response = response; run.latestResponse = response; run.currentRequestId = null; run.version++;
      await record(run, ACTORS.operator, `${item.kind}.response`, 'external_response_received', `${scenario.label}. ${scenario.description}`, run.status, item.id);
      const handlers = { supplier: supplierResponse, judge: judgeResponse, invoice: invoiceResponse, aa: aaResponse, kya: kyaResponse, bureau: bureauResponse, lender: lenderResponse, payment: paymentResponse };
      await handlers[item.kind](run, scenarioId, item);
      response.data = { ...response.data, resultingStatus: run.status, guardAction: run.guardAction, checkedSourceInvoiceRow: run.sourceInvoiceRow || null };
      return { run: publicRun(run), state: await state('operator') };
    });
  }
  async function consent({ runId, disclosureId, decision, pin } = {}) {
    return serial(async () => {
      await mutable();
      const run = runs.get(runId); if (!run) fail('RUN_NOT_FOUND', 'The workflow run was not found.');
      const shown = run.currentDisclosure;
      if (run.status !== 'awaiting_owner' || !shown || shown.id !== disclosureId || shown.version !== run.version) fail('STALE_DISCLOSURE', 'Review the current disclosure; this sign-off request is stale or already answered.');
      if (!['approve', 'decline'].includes(decision)) fail('DECISION_INVALID', 'Choose approve or decline.');
      if (decision === 'decline') {
        run.status = 'declined'; run.guardAction = 'owner_declined'; run.summary = 'The owner declined. No payment was authorized.';
        await record(run, ACTORS.owner, 'merchant.consent', 'owner_declined', 'The owner declined the displayed disclosure. No payment instruction was created.');
        run.currentDisclosure = null; run.version++;
        return { run: publicRun(run), state: await state('merchant', run.id) };
      }
      if (!approvedPinHash(pinHash) || typeof pin !== 'string' || !pinMatches(await digest(pin), pinHash.toLowerCase())) {
        await record(run, ACTORS.owner, 'merchant.pin_check', 'owner_approval_refused', approvedPinHash(pinHash) ? 'The supplied owner PIN did not match. No action was approved.' : 'The server has no owner PIN hash configured. Approval fails closed.');
        fail(approvedPinHash(pinHash) ? 'WRONG_PIN' : 'PIN_NOT_CONFIGURED', approvedPinHash(pinHash) ? 'Owner PIN verification failed.' : 'Configure the owner PIN privately on the server before approving.');
      }
      const continuation = run._meta.afterConsent;
      run._meta.lastApprovedDisclosure = shown.id;
      run.guardAction = 'merchant_approved_displayed_disclosure';
      await record(run, ACTORS.owner, 'merchant.consent', 'owner_approved_disclosure', `Owner approval bound to disclosure ${shown.id} (${shown.type}); displayed hash ${shown.hash}.`, 'approved');
      run.currentDisclosure = null; run.version++;
      if (continuation === 'judge') await requestJudge(run);
      else if (continuation === 'supplier_next') await supplierNext(run);
      else if (continuation === 'bureau') await request(run, 'bureau', 'Verify owner bureau consent (simulated OTP)', 'Owner authorized the displayed purpose and data. Await the simulator’s OTP verification result before a lender request.', { consentDisclosureId: shown.id, purpose: run.originalIntent.purpose, amountInr: run.originalIntent.amountInr, codeStored: false }, ['owner_verification_status']);
      else if (continuation === 'payment') await paymentRequest(run);
      else fail('CONTINUATION_INVALID', 'The approved workflow continuation is unavailable.');
      return { run: publicRun(run), state: await state('merchant', run.id) };
    });
  }
  async function retry({ runId } = {}) {
    return serial(async () => {
      await mutable(); const run = runs.get(runId); if (!run) fail('RUN_NOT_FOUND', 'The workflow run was not found.');
      if (run.status !== 'paused') fail('RETRY_NOT_ALLOWED', 'Only a paused evidence or external-response step can be retried. Pending payments require reconciliation.');
      const stage = run.stage;
      if (stage === 'supplier') await requestSupplier(run);
      else if (stage === 'judge') await requestJudge(run);
      else if (stage === 'invoice') await requestInvoice(run);
      else if (stage === 'aa') await requestAa(run);
      else if (stage === 'kya') await requestKya(run);
      else if (stage === 'bureau') await bureauConsent(run);
      else if (stage === 'lender') await request(run, 'lender', 'Request a fresh lender reply', 'Await a new illustrative lender decision.', { amountInr: run.originalIntent.amountInr, bureauConsent: 'verified_simulated' }, ['lender_decision', 'offer_terms']);
      else if (stage === 'payment' && run._meta.paymentAwaitingReconciliation) await request(run, 'payment', 'Reconcile the same paused instruction', 'Check status of the existing instruction after RiskOps resumes; do not send another payment.', { operation: 'reconcile_status', instructionId: run._meta.paymentInstructionId, action: run.proposedAction, simulationOnly: true }, ['payment_status', 'rail_reference']);
      else fail('RETRY_NOT_ALLOWED', 'This paused step cannot be retried.');
      return { run: publicRun(run), state: await state('merchant', run.id) };
    });
  }
  return { start, respond, consent, retry, getState: (view, runId) => serial(() => state(view, runId)), verify: () => serial(verify) };
  return {
    start, respond, consent, retry,
    getState: (view, runId) => serial(() => state(view, runId)),
    verify: () => serial(verify),
    // Authoritative action history for merchant Evidence and RiskOps alike.
    getJournal: () => serial(async () => ({ sessionId, sessionStartedAt, revision, entries: clone(journal), verification: await verify() })),
    getSession: () => serial(async () => ({ sessionId, sessionStartedAt, revision, paused: Boolean(await pauseProvider()) })),
    getLedger: () => serial(async () => ({ sessionId, effects: clone(ledger), runs: [...runs.values()].map(publicRun), aaReleased: [...runs.values()].some((run) => run._meta.aaReady) })),
  };
}

export async function getFlowRuntime() {
  const key = '__paytmunimFlowRuntimePromise';
  if (!globalThis[key]) globalThis[key] = (async () => {
    const [{ activeSource }, { evaluateInvoiceEvidence }] = await Promise.all([import('./active-source.js'), import('./v3-evidence.js')]);
    return createFlowRuntime({ source: activeSource, evaluateInvoice: evaluateInvoiceEvidence, pinHash: typeof process !== 'undefined' ? process.env.DEMO_PIN_HASH : undefined, paymentFence: getPaymentFence() });
  })();
  return globalThis[key];
}
