import { getDemoControl } from './demo-control.js';
import { demoFixture } from './demo-fixture.js';
import { analyzeIntent } from './intent-engine.js';
import { getSimulatorStore } from './simulator-store.js';
import { activeSource } from './active-source.js';
import { createPaymentFence, getPaymentFence } from './payment-fence.js';

/**
 * Synthetic, process-local action gate. It does not contact a lender, supplier,
 * account aggregator, bank, or payment rail. The only money effect is a ledger
 * entry in memory for the current server process.
 */

const OWNER_ACCOUNT = '**4029';
const SUPPLIERS = {
  gupta: { name: 'Gupta Distributors', account: 'XXXX7781' },
};
const DEFAULT_LENDER_EMIS = { A: 68730, B: 69130, C: 35960 };
const MONTHLY_COLLECTIONS = 1900000;
const EXISTING_EMI = 22000;
const EMI_CAP = MONTHLY_COLLECTIONS * 0.08;
const DRAWDOWN_MAX = 200000;
const BASELINE_5_NOV = -184500;
const LAST_FY_START = '2025-04-01';
const LAST_FY_END = '2026-03-31';

const clone = (value) => JSON.parse(JSON.stringify(value));

function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

export async function sha256Hex(value) {
  const data = new TextEncoder().encode(String(value));
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function equalHex(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const left = a.toLowerCase();
  const right = b.toLowerCase();
  let difference = left.length ^ right.length;
  for (let index = 0; index < Math.max(left.length, right.length); index += 1) {
    difference |= (left.charCodeAt(index) || 0) ^ (right.charCodeAt(index) || 0);
  }
  return difference === 0;
}

function isValidHash(value) {
  return typeof value === 'string' && /^[a-f0-9]{64}$/i.test(value);
}

function cleanAction(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  try {
    const action = clone(raw);
    // Invoice source bytes are resolved server-side. Client text must never
    // become the invoice evidence or affect the approval payload.
    if (action?.type === 'supplier_payment') delete action.invoice_text;
    return action && typeof action === 'object' && !Array.isArray(action) ? action : null;
  } catch {
    return null;
  }
}

function supplierLimitFromAa(aaDebits, supplierId) {
  const matching = aaDebits.filter((row) =>
    row && row.supplier_id === supplierId && row.source === 'AA' && row.direction === 'debit' &&
    row.verified === true && typeof row.date === 'string' &&
    row.date >= LAST_FY_START && row.date <= LAST_FY_END &&
    Number.isSafeInteger(row.amount) && row.amount > 0);
  if (matching.length === 0) return null;
  const spend = matching.reduce((sum, row) => sum + row.amount, 0);
  if (!Number.isSafeInteger(spend)) return null;
  const limit = Math.floor(spend * 1.10);
  return Number.isSafeInteger(limit) ? { spend, limit, count: matching.length } : null;
}

function suspiciousInvoiceText(text) {
  if (typeof text !== 'string') return false;
  return /\b(?:ignore\s+(?:the\s+|all\s+|your\s+)?rules|skip\s+(?:the\s+)?(?:guard|checks)|override\s+(?:the\s+)?(?:rules|approval)|system\s+prompt)\b/i.test(text);
}

function rule(id, status, detail, value) {
  return { id, status, detail, ...(value === undefined ? {} : { value }) };
}

function decide(checks) {
  if (checks.some((check) => check.status === 'BLOCK' || check.status === 'NEEDS_VERIFICATION')) return 'BLOCK';
  if (checks.some((check) => check.status === 'ESCALATE')) return 'ESCALATE';
  return 'PASS';
}

/**
 * @param {{pinHash?: string, aaDebits?: object[], lenderEmis?: Record<string, number>, now?: () => string, evidenceStore?: object[], pauseProvider?: () => boolean | Promise<boolean>, simulatorStore?: object, invoiceProvider?: (action: object) => object}} config
 */
export function createActionRuntime(config = {}) {
  const pinHash = config.pinHash;
  const aaDebits = Array.isArray(config.aaDebits) ? clone(config.aaDebits) : [];
  const lenderEmis = { ...DEFAULT_LENDER_EMIS, ...(config.lenderEmis ?? {}) };
  const now = config.now ?? (() => new Date().toISOString());
  const pauseProvider = config.pauseProvider ?? (() => getDemoControl().isPaused());
  const simulatorStore = config.simulatorStore ?? getSimulatorStore();
  const paymentFence = config.paymentFence ?? createPaymentFence();
  const runtimeId = crypto.randomUUID();
  const invoiceProvider = config.invoiceProvider ?? (() => activeSource.invoices.find(row => row.row === 'INV-01'));
  const approvals = new Map();
  const executedHashes = new Set();
  const usedKeys = new Set();
  const evidence = Array.isArray(config.evidenceStore) ? config.evidenceStore : [];
  const ledger = { effects: [], drawdownTotal: 0, supplierPaymentTotal: 0 };
  let queue = Promise.resolve();

  async function serial(task) {
    const previous = queue;
    let release;
    queue = new Promise((resolve) => { release = resolve; });
    await previous;
    try { return await task(); }
    finally { release(); }
  }

  async function actionHash(action) {
    return `sha256:${await sha256Hex(stableStringify(action))}`;
  }

  async function guard(action) {
    const checks = [];
    if (!action || !['drawdown', 'supplier_payment'].includes(action.type)) {
      checks.push(rule('action_type', 'BLOCK', 'Choose a supported action type.'));
      return { decision: 'BLOCK', checks, needs_verification: false, action_hash: action ? await actionHash(action) : null };
    }
    const hash = await actionHash(action);
    const paused = await pauseProvider();
    checks.push(paused
      ? rule('demo_pause', 'BLOCK', 'RiskOps paused future checks in this demo server session.')
      : rule('demo_pause', 'PASS', 'Demo checks are active.'));
    if (!Number.isSafeInteger(action.amount) || action.amount <= 0) {
      checks.push(rule('amount', 'BLOCK', 'Amount must be a positive whole rupee value.'));
    } else {
      checks.push(rule('amount', 'PASS', 'A positive whole rupee amount was supplied.', action.amount));
    }

    if (action.type === 'drawdown') {
      checks.push(action.invoice_id === 'GD-1182'
        ? rule('invoice_scope', 'PASS', 'The drawdown is tied to the seeded Gupta invoice GD-1182.')
        : rule('invoice_scope', 'BLOCK', 'This synthetic drawdown is scoped only to Gupta invoice GD-1182.'));
      const knownLender = Object.hasOwn(DEFAULT_LENDER_EMIS, action.lender_id);
      checks.push(knownLender
        ? rule('approved_lender', 'PASS', `Lender ${action.lender_id} is in the synthetic offer list.`)
        : rule('approved_lender', 'BLOCK', 'The proposed lender is not approved.'));
      checks.push(action.destination_account === OWNER_ACCOUNT
        ? rule('owner_destination', 'PASS', `Drawdown goes to the owner's verified account ${OWNER_ACCOUNT}.`)
        : rule('owner_destination', 'BLOCK', `Drawdown must go to the owner's verified account ${OWNER_ACCOUNT}.`));
      const emi = knownLender ? lenderEmis[action.lender_id] : null;
      if (!Number.isSafeInteger(emi) || emi < 0) {
        checks.push(rule('emi_cap', 'NEEDS_VERIFICATION', 'The lender EMI cannot be checked from the synthetic offer data.'));
      } else {
        const combined = EXISTING_EMI + emi;
        checks.push(combined <= EMI_CAP
          ? rule('emi_cap', 'PASS', `Existing ₹${EXISTING_EMI.toLocaleString('en-IN')} + lender EMI ₹${emi.toLocaleString('en-IN')} = ₹${combined.toLocaleString('en-IN')}, within the ₹${EMI_CAP.toLocaleString('en-IN')} monthly cap.`, combined)
          : rule('emi_cap', 'BLOCK', `Combined monthly EMI ₹${combined.toLocaleString('en-IN')} exceeds the ₹${EMI_CAP.toLocaleString('en-IN')} cap.`, combined));
      }
      const projectedDrawdown = ledger.drawdownTotal + action.amount;
      checks.push(!Number.isSafeInteger(action.amount) || action.amount <= 0
        ? rule('amount_limit', 'NEEDS_VERIFICATION', 'A valid drawdown amount is required to evaluate the limit.')
        : action.amount > DRAWDOWN_MAX || projectedDrawdown > DRAWDOWN_MAX
          ? rule('amount_limit', 'BLOCK', `This action or cumulative drawdowns exceed the owner-set ₹${DRAWDOWN_MAX.toLocaleString('en-IN')} demo limit. A future Know Your Agent review would be required; that flow is not implemented.`, DRAWDOWN_MAX)
          : rule('amount_limit', 'PASS', `This action and cumulative drawdowns stay within the owner-set ₹${DRAWDOWN_MAX.toLocaleString('en-IN')} demo limit.`, DRAWDOWN_MAX));
      checks.push(ledger.effects.some((effect) => effect.type === 'drawdown' && effect.invoice_id === action.invoice_id) || paymentFence.get('drawdown', action.invoice_id)
        ? rule('invoice_duplicate', 'BLOCK', 'A drawdown for this seeded invoice already has a simulated ledger effect.')
        : rule('invoice_duplicate', 'PASS', 'No simulated drawdown for this invoice has executed.'));
    } else {
      checks.push(paymentFence.get('supplier_payment', action.invoice_id)
        ? rule('invoice_duplicate', 'BLOCK', 'A supplier payment for this invoice is reserved or completed in this demo session.')
        : rule('invoice_duplicate', 'PASS', 'No other simulated payment instruction owns this invoice.'));
      const event = simulatorStore.getEvent(action.simulator_event_seq);
      // Only the response that answers the latest merchant request counts. A
      // reply to an older request, or one nobody requested, cannot authorize.
      const activeSupplierSeq = simulatorStore.getActiveResponse('supplier')?.seq;
      const candidate = event?.kind === 'supplier' ? event.payload?.candidate : null;
      if (!candidate) {
        checks.push(rule('simulator_event', 'NEEDS_VERIFICATION', 'A dispatched supplier response is required before payment can be checked.'));
      } else {
        checks.push(event.seq === activeSupplierSeq
          ? rule('simulator_event', 'PASS', `Supplier response event #${event.seq} answers the latest supplier request.`)
          : rule('simulator_event', 'BLOCK', `Supplier response event #${event.seq} does not answer the latest supplier request (superseded, stale or unrequested); request and review a fresh response.`));
        const intent = analyzeIntent({
          mandate: demoFixture.mandate,
          originalIntent: demoFixture.originalIntent,
          candidate,
          paused,
          context: { dataSource: 'simulator_dispatch', simulatorEventSeq: event.seq },
        });
        checks.push(rule('supplier_intent', intent.decision,
          intent.reasons[0]?.message ?? 'The dispatched supplier response remains within the merchant goal and mandate.'));
        const expectedUpfront = candidate.totalAmount * candidate.upfrontPercent / 100;
        const expectedName = candidate.beneficiaryName ?? SUPPLIERS[candidate.supplierId]?.name;
        const commercialMatches = action.supplier_id === candidate.supplierId &&
          action.amount === expectedUpfront &&
          action.beneficiary_name === expectedName &&
          action.beneficiary_account === candidate.supplierAccount &&
          action.invoice_id === 'GD-1182' && Number.isSafeInteger(expectedUpfront);
        checks.push(commercialMatches
          ? rule('simulator_terms', 'PASS', 'Payment fields match the latest dispatched supplier response and seeded invoice.')
          : rule('simulator_terms', 'BLOCK', 'Payment fields differ from the latest dispatched supplier response or seeded invoice.'));
      }
      const supplier = SUPPLIERS[action.supplier_id];
      checks.push(supplier
        ? rule('approved_supplier', 'PASS', `${supplier.name} is an approved synthetic supplier.`)
        : rule('approved_supplier', 'BLOCK', 'The proposed supplier is not approved.'));
      if (!supplier) {
        checks.push(rule('beneficiary_name', 'NEEDS_VERIFICATION', 'No registered beneficiary name is available for this supplier.'));
        checks.push(rule('beneficiary_account', 'NEEDS_VERIFICATION', 'No registered beneficiary account is available for this supplier.'));
      } else {
        checks.push(action.beneficiary_name === supplier.name
          ? rule('beneficiary_name', 'PASS', 'Beneficiary name exactly matches the registered supplier name.')
          : rule('beneficiary_name', 'BLOCK', `Beneficiary name changed from the registered ${supplier.name}; payment is blocked.`));
        checks.push(action.beneficiary_account === supplier.account
          ? rule('beneficiary_account', 'PASS', 'Beneficiary account exactly matches the registered supplier account.')
          : rule('beneficiary_account', 'BLOCK', 'Beneficiary account differs from the registered supplier account.'));
      }
      const aaEvent = simulatorStore.getActiveResponse('aa');
      const aaAvailable = aaEvent?.payload?.status === 'available';
      checks.push(aaAvailable
        ? rule('aa_response', 'PASS', `Synthetic AA sample released by simulator event #${aaEvent.seq}.`)
        : rule('aa_response', 'NEEDS_VERIFICATION', 'The synthetic AA bank sample has not been released; request it and dispatch an available response in the simulator.'));
      const derived = aaAvailable ? supplierLimitFromAa(aaDebits, action.supplier_id) : null;
      checks.push(derived
        ? (action.amount <= derived.limit
          ? rule('amount_limit', 'PASS', `Within the 110% ceiling from clearly matched prior-FY bank debits (₹${derived.limit.toLocaleString('en-IN')}). Narration attribution is inferred, not bank-attested identity.`, derived.limit)
          : rule('amount_limit', 'BLOCK', `Above the conservative 110% ceiling from observed matched bank debits (₹${derived.limit.toLocaleString('en-IN')}).`, derived.limit))
        : rule('amount_limit', 'NEEDS_VERIFICATION', aaAvailable
          ? 'No labeled synthetic prior-FY bank debits for this same supplier were supplied. The payment limit cannot be established.'
          : 'The supplier payment limit cannot be established before the synthetic AA response is released.'));
      const invoice = invoiceProvider(action);
      const invoiceBody = invoice?.hasFullBody === true && typeof invoice?.fullBody === 'string' ? invoice.fullBody : null;
      checks.push(!invoiceBody
        ? rule('invoice_injection', 'NEEDS_VERIFICATION', 'Original invoice body was not supplied; invoice instructions cannot be checked.')
        : suspiciousInvoiceText(invoiceBody)
          ? rule('invoice_injection', 'ESCALATE', 'Source invoice contains instructions aimed at the agent; no payment may proceed.')
          : rule('invoice_injection', 'PASS', 'No instruction attack was detected in the source invoice body.'));
    }
    checks.push(executedHashes.has(hash)
      ? rule('duplicate_execution', 'BLOCK', 'This exact action already has a simulated ledger effect.')
      : rule('duplicate_execution', 'PASS', 'No prior simulated execution of this exact action.'));
    checks.push(isValidHash(pinHash)
      ? rule('pin_config', 'PASS', 'An owner PIN hash is configured server-side.')
      : rule('pin_config', 'NEEDS_VERIFICATION', 'Owner PIN hash is not configured on this server.'));
    return {
      decision: decide(checks), checks,
      needs_verification: checks.some((check) => check.status === 'NEEDS_VERIFICATION'),
      action_hash: hash,
    };
  }

  async function prepareEntry(fields) {
    const previous = evidence.at(-1);
    const entry = {
      seq: evidence.length + 1,
      timestamp: now(),
      actor: fields.actor,
      action: clone(fields.action),
      guardResults: clone(fields.guardResults),
      approvalState: fields.approvalState,
      outcome: fields.outcome,
      reason: fields.reason ?? null,
      action_hash: fields.action_hash,
      approval_id: fields.approval_id ?? null,
      prev_hash: previous?.hash ?? null,
    };
    entry.hash = `sha256:${await sha256Hex(stableStringify(entry))}`;
    return entry;
  }

  async function appendEntry(fields) {
    const entry = await prepareEntry(fields);
    evidence.push(entry);
    return clone(entry);
  }

  async function evaluate(rawAction) {
    return serial(async () => {
      const integrity = await verifyEvidenceChain(evidence);
      if (!integrity.ok) {
        return {
          decision: 'BLOCK',
          checks: [rule('evidence_chain', 'BLOCK', `Evidence verification failed at sequence ${integrity.first_broken_seq}; no new action was accepted.`)],
          needs_verification: true,
          action_hash: null,
          reason: 'EVIDENCE_CHAIN_BROKEN',
          evidence_entry: null,
        };
      }
      const action = cleanAction(rawAction);
      const result = await guard(action);
      const approvalId = result.decision === 'PASS' ? crypto.randomUUID() : undefined;
      if (approvalId) approvals.set(approvalId, { actionHash: result.action_hash, used: false });
      let evidenceEntry;
      try {
        evidenceEntry = await appendEntry({
          actor: 'munim_delegate', action, guardResults: result.checks,
          approvalState: approvalId ? 'requested-waiting' : 'not-issued',
          outcome: approvalId ? 'requested-waiting' : 'blocked',
          reason: result.decision === 'PASS' ? null : result.decision,
          action_hash: result.action_hash, approval_id: approvalId,
        });
      } catch {
        if (approvalId) approvals.delete(approvalId);
        return { ...result, decision: 'BLOCK', approval_id: undefined, reason: 'EVIDENCE_WRITE_FAILED', evidence_entry: null };
      }
      return { ...result, ...(approvalId ? { approval_id: approvalId } : {}), evidence_entry: evidenceEntry };
    });
  }

  async function execute({ action: rawAction, approval_id: approvalId, pin, idempotency_key: key } = {}) {
    return serial(async () => {
      const integrity = await verifyEvidenceChain(evidence);
      if (!integrity.ok) {
        return { outcome: 'blocked', reason: 'EVIDENCE_CHAIN_BROKEN', ledger_effect: null, evidence_entry: null,
          guard: { decision: 'BLOCK', checks: [rule('evidence_chain', 'BLOCK', `Evidence verification failed at sequence ${integrity.first_broken_seq}.`)] } };
      }
      const action = cleanAction(rawAction);
      const result = await guard(action);
      const approval = approvals.get(approvalId);
      let reason = null;
      if (typeof key !== 'string' || key.length === 0 || key.length > 128) reason = 'IDEMPOTENCY_KEY_REQUIRED';
      else if (usedKeys.has(key)) reason = 'REPLAY';
      else if (!approval) reason = 'APPROVAL_REQUIRED';
      else if (approval.actionHash !== result.action_hash) reason = 'PAYLOAD_CHANGED';
      else if (approval.used) reason = 'APPROVAL_USED';
      else if (result.decision !== 'PASS') reason = 'GUARD_FAILED';
      else if (!isValidHash(pinHash)) reason = 'PIN_NOT_CONFIGURED';
      else if (typeof pin !== 'string' || !equalHex(await sha256Hex(pin), pinHash)) reason = 'WRONG_PIN';

      let reservation = null;
      if (!reason) {
        reservation = paymentFence.reserve(action.type, action.invoice_id, runtimeId);
        if (!reservation) reason = 'INVOICE_ALREADY_RESERVED';
      }
      let evidenceEntry;
      let preparedEntry;
      const fields = () => ({
        actor: 'merchant_owner', action, guardResults: result.checks,
        approvalState: reason ? 'refused' : 'approved', outcome: reason ? 'blocked' : 'done-simulated', reason,
        action_hash: result.action_hash, approval_id: approvalId,
      });
      try {
        // Prepare and hash the receipt before deciding whether it can be
        // committed. A later pause must not leave a successful receipt behind.
        preparedEntry = await prepareEntry(fields());
      } catch {
        if (reservation) paymentFence.release(reservation);
        return { outcome: 'blocked', reason: 'EVIDENCE_WRITE_FAILED', ledger_effect: null, evidence_entry: null, guard: result };
      }

      if (!reason) {
        const finalIntegrity = await verifyEvidenceChain(evidence);
        if (!finalIntegrity.ok) {
          paymentFence.release(reservation);
          return { outcome: 'blocked', reason: 'EVIDENCE_CHAIN_BROKEN', ledger_effect: null, evidence_entry: null,
            guard: { decision: 'BLOCK', checks: [rule('evidence_chain', 'BLOCK', `Evidence verification failed at sequence ${finalIntegrity.first_broken_seq}.`)] } };
        }
        let finalPaused;
        try {
          const pauseValue = pauseProvider();
          // The real session control returns a boolean. Do not introduce an
          // await between that final read and the synchronous commit below.
          finalPaused = typeof pauseValue === 'boolean' ? pauseValue : await pauseValue;
        } catch {
          finalPaused = true;
        }
        if (finalPaused) {
          reason = 'RISKOPS_PAUSED';
          paymentFence.release(reservation); reservation = null;
          const pauseIndex = result.checks.findIndex((item) => item.id === 'demo_pause');
          const pausedCheck = rule('demo_pause', 'BLOCK', 'RiskOps paused this demo server session before the final evidence and ledger commit.');
          if (pauseIndex >= 0) result.checks[pauseIndex] = pausedCheck;
          else result.checks.push(pausedCheck);
          result.decision = 'BLOCK';
          try { preparedEntry = await prepareEntry(fields()); }
          catch { return { outcome: 'blocked', reason: 'EVIDENCE_WRITE_FAILED', ledger_effect: null, evidence_entry: null, guard: result }; }
        }
      }

      const effect = reason ? null : { type: action.type, amount: action.amount, invoice_id: action.invoice_id ?? null, action_hash: result.action_hash, idempotency_key: key };
      let entryCommitted = false;
      try {
        evidenceEntry = clone(preparedEntry);
        evidence.push(preparedEntry); entryCommitted = true;
        if (effect) {
          // No asynchronous work occurs between the final pause check and
          // these local evidence, reservation, and ledger mutations.
          paymentFence.commit(reservation, effect);
          ledger.effects.push(effect);
          if (action.type === 'drawdown') ledger.drawdownTotal += action.amount;
          else ledger.supplierPaymentTotal += action.amount;
          executedHashes.add(result.action_hash);
          approval.used = true;
        }
      } catch {
        if (entryCommitted && evidence.at(-1) === preparedEntry) evidence.pop();
        if (reservation) paymentFence.release(reservation);
        return { outcome: 'blocked', reason: 'EVIDENCE_WRITE_FAILED', ledger_effect: null, evidence_entry: null, guard: result };
      }
      // A recorded attempt owns its key even when refused; otherwise the same
      // key could be replayed after a wrong PIN or changed payload.
      if (typeof key === 'string' && key.length > 0 && key.length <= 128) usedKeys.add(key);
      if (reason) {
        return { outcome: 'blocked', reason, ledger_effect: null, evidence_entry: evidenceEntry, guard: result };
      }
      return {
        outcome: 'done-simulated', ledger_effect: clone(effect),
        ...(action.type === 'drawdown' ? { balance_on_5_nov: BASELINE_5_NOV + ledger.drawdownTotal } : {}),
        evidence_entry: evidenceEntry, guard: result,
      };
    });
  }

  return {
    evaluate,
    execute,
    getEvidence: () => serial(async () => ({ entries: clone(evidence) })),
    verifyEvidence: () => serial(async () => verifyEvidenceChain(evidence)),
    getLedger: () => serial(async () => clone(ledger)),
  };
}

export async function verifyEvidenceChain(entries) {
  if (!Array.isArray(entries)) return { ok: false, first_broken_seq: 1 };
  let previousHash = null;
  for (let index = 0; index < entries.length; index += 1) {
    const entry = entries[index];
    const { hash, ...fields } = entry ?? {};
    if (entry?.seq !== index + 1 || entry?.prev_hash !== previousHash || typeof hash !== 'string') {
      return { ok: false, first_broken_seq: index + 1 };
    }
    const expected = `sha256:${await sha256Hex(stableStringify(fields))}`;
    if (!equalHex(hash.slice(7), expected.slice(7))) return { ok: false, first_broken_seq: index + 1 };
    previousHash = hash;
  }
  return { ok: true, first_broken_seq: null };
}

// Route modules share this process-local singleton. It is deliberately not a
// durable log, and must never be described as an independently anchored audit.
export function getDemoActionRuntime() {
  const key = '__paytmunimActionRuntime';
  if (!globalThis[key]) {
    const pinHash = typeof process !== 'undefined' ? process.env.DEMO_PIN_HASH : undefined;
    globalThis[key] = createActionRuntime({ pinHash, aaDebits: activeSource.aaDebits, paymentFence: getPaymentFence() });
  }
  return globalThis[key];
}
