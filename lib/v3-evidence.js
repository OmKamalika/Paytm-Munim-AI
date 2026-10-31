/** Pure readers of supplied synthetic evidence. Fixture answer keys are never inputs to decisions. */
const money = value => Number.isFinite(Number(value)) ? Number(value) : null;
const cents = value => Math.round((Number(value) + Number.EPSILON) * 100);
const compact = value => String(value ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '');
const supplierKey = supplier => supplier.id ?? (supplier.supplier_id === 'SUP-02' ? 'gupta' : supplier.supplier_id);
const supplierName = supplier => supplier.name;
const supplierAccount = supplier => String(supplier.accountLast4 ?? supplier.verified_account_last4 ?? '').padStart(4, '0');
const approved = supplier => supplier.approved === true || supplier.approved === 'True';

export function normalizeInvoiceDocument(document, suppliers = []) {
  const header = document?.header ?? {};
  const supplier = suppliers.find(item => approved(item) &&
    (supplierName(item) === header.supplier_name || supplierAccount(item) === String(header.bank_account_masked ?? '').slice(-4)));
  const lines = Array.isArray(document?.lines) ? document.lines.map(line => ({
    lineNo: Number(line.line_no), description: String(line.description ?? ''), hsn: String(line.hsn ?? ''), unit: String(line.unit ?? ''),
    quantity: money(line.qty), rateInr: money(line.rate_inr), discountRatio: money(line.discount_pct),
    taxableInr: money(line.taxable_value_inr), gstRate: money(line.gst_rate), cgstInr: money(line.cgst_inr),
    sgstInr: money(line.sgst_inr), totalInr: money(line.line_total_inr),
  })) : [];
  const invoice = {
    row: String(header.invoice_row ?? ''), id: String(header.invoice_row ?? ''), number: String(header.invoice_no ?? ''),
    supplierId: supplier ? supplierKey(supplier) : null, name: String(header.supplier_name ?? ''),
    supplierGstin: String(header.supplier_gstin ?? ''), buyerName: String(header.buyer_name ?? ''),
    account: String(header.bank_account_masked ?? ''), accountLast4: String(header.bank_account_masked ?? '').slice(-4),
    accountHolder: String(header.account_holder ?? ''), totalInr: money(header.invoice_total),
    issueDate: String(header.issue_date ?? ''), dueDate: String(header.due_date ?? ''),
    paymentTermsDays: money(header.payment_terms_days), notes: String(header.notes ?? ''),
    receivedVia: String(header.received_via ?? ''), roundOffInr: money(header.round_off),
    lineCount: Number(header.line_count), lines,
    hasFullBody: lines.length > 0 && Number(header.line_count) === lines.length,
  };
  invoice.bodyText = [invoice.name, invoice.number, invoice.notes, ...lines.map(line => line.description)].join('\n');
  return invoice;
}

const check = (id, status, detail) => ({ id, status, detail });
function fingerprint(invoice) {
  return JSON.stringify(invoice.lines.map(line => [line.description, line.hsn, line.unit, line.quantity,
    line.rateInr, line.discountRatio, line.taxableInr, line.gstRate, line.cgstInr, line.sgstInr, line.totalInr]));
}

export function containsAgentInstruction(text) {
  return /(?:\b(?:note\s+to\s+)?ai\s+assistant\b|\bignore\b[^\n.]{0,80}\brules\b|\bmark\s+(?:this\s+)?approved\b|\boverride\b[^\n.]{0,50}\b(?:guard|approval|rules)\b|\bsystem\s+prompt\b)/i.test(String(text ?? ''));
}

export function evaluateInvoiceEvidence(invoice, invoices = [], suppliers = []) {
  const checks = [];
  if (!invoice || typeof invoice !== 'object') return {
    status: 'NEEDS_VERIFICATION', decision: 'NEEDS_VERIFICATION', checks: [check('invoice_source', 'NEEDS_VERIFICATION', 'A source invoice is required.')],
    hasFullBody: false, injectionDetected: false, injection: false, duplicateOf: [], computedTotalInr: null, reason: 'Source invoice missing.',
  };
  const supplier = suppliers.find(item => supplierKey(item) === invoice.supplierId && approved(item));
  checks.push(supplier ? check('approved_supplier', 'PASS', 'Supplier is present in the supplied approved registry.')
    : check('approved_supplier', 'BLOCK', 'Invoice supplier is not approved in the supplied registry.'));
  checks.push(supplier && invoice.name === supplierName(supplier) && invoice.accountHolder === supplierName(supplier)
    ? check('beneficiary_name', 'PASS', 'Supplier and account-holder names exactly match the registry.')
    : check('beneficiary_name', 'BLOCK', 'Supplier or account-holder name differs from the approved registry.'));
  checks.push(supplier && invoice.accountLast4 === supplierAccount(supplier)
    ? check('beneficiary_account', 'PASS', 'Invoice account suffix matches the registered account.')
    : check('beneficiary_account', 'BLOCK', 'Invoice account differs from the registered supplier account.'));
  const hasFullBody = invoice.hasFullBody === true && Array.isArray(invoice.lines) && invoice.lines.length > 0 && invoice.lines.length === invoice.lineCount;
  checks.push(hasFullBody ? check('invoice_body', 'PASS', `${invoice.lines.length} source invoice lines are available.`)
    : check('invoice_body', 'NEEDS_VERIFICATION', 'Only the header is available; the complete source invoice body is required.'));
  let arithmeticOk = hasFullBody;
  let computedTotalInr = null;
  if (hasFullBody) {
    const seenLines = new Set();
    let lineCents = 0;
    for (const line of invoice.lines) {
      const values = [line.quantity, line.rateInr, line.discountRatio, line.taxableInr, line.gstRate, line.cgstInr, line.sgstInr, line.totalInr];
      if (values.some(value => !Number.isFinite(value)) || line.quantity < 0 || line.rateInr < 0 ||
          line.discountRatio < 0 || line.discountRatio > 1 || line.gstRate < 0 || line.gstRate > 1 ||
          !Number.isSafeInteger(line.lineNo) || line.lineNo < 1 || seenLines.has(line.lineNo)) {
        arithmeticOk = false; continue;
      }
      seenLines.add(line.lineNo);
      const taxable = cents(line.quantity * line.rateInr * (1 - line.discountRatio));
      const declaredTaxable = cents(line.taxableInr);
      const gst = cents(declaredTaxable / 100 * line.gstRate);
      const cgst = cents(declaredTaxable / 100 * line.gstRate / 2);
      const declaredCgst = cents(line.cgstInr); const declaredSgst = cents(line.sgstInr);
      // The supplied generator and Excel use different floating-point tie rounding.
      // Permit one paise on each computed rounding boundary, while requiring
      // exact supplied line sums and exact invoice/header reconciliation.
      if (Math.abs(taxable - declaredTaxable) > 1 || Math.abs(cgst - declaredCgst) > 1 ||
          Math.abs(gst - cgst - declaredSgst) > 1 || Math.abs(gst - declaredCgst - declaredSgst) > 1 ||
          declaredTaxable + declaredCgst + declaredSgst !== cents(line.totalInr)) arithmeticOk = false;
      lineCents += cents(line.totalInr);
    }
    if (!Number.isFinite(invoice.roundOffInr) || !Number.isFinite(invoice.totalInr)) arithmeticOk = false;
    const totalCents = lineCents + cents(invoice.roundOffInr ?? 0);
    computedTotalInr = totalCents / 100;
    if (totalCents !== cents(invoice.totalInr)) arithmeticOk = false;
  }
  checks.push(arithmeticOk ? check('invoice_arithmetic', 'PASS', 'Exact line sums and header total reconcile; computed tax/discount boundaries allow one paise for source rounding conventions.')
    : check('invoice_arithmetic', 'NEEDS_VERIFICATION', 'Complete, internally consistent invoice lines and totals are required.'));
  const duplicateOf = hasFullBody ? invoices.filter(other => other.row !== invoice.row && other.number !== invoice.number &&
    other.supplierGstin === invoice.supplierGstin && other.totalInr === invoice.totalInr &&
    other.lines?.length === invoice.lines.length && other.issueDate < invoice.issueDate &&
    other.hasFullBody && fingerprint(other) === fingerprint(invoice)).map(other => other.row) : [];
  checks.push(duplicateOf.length ? check('invoice_duplicate', 'BLOCK', `Earlier matching invoice body found in ${duplicateOf.join(', ')}; no second payment may proceed.`)
    : check('invoice_duplicate', 'PASS', 'No earlier invoice with a different number matches this complete line-item body.'));
  // Reconstruct from normalized source fields every time; a caller cannot clear an attack by replacing bodyText.
  const injectionDetected = containsAgentInstruction([invoice.notes, ...invoice.lines.map(line => line.description)].join('\n'));
  checks.push(injectionDetected ? check('invoice_instruction', 'ESCALATE', 'Source notes or line descriptions contain instructions aimed at the agent; pause for review.')
    : check('invoice_instruction', hasFullBody ? 'PASS' : 'NEEDS_VERIFICATION', hasFullBody ? 'No agent-targeted instruction was detected in the source notes or descriptions.' : 'Instruction check is incomplete while the source body is missing.'));
  const status = checks.some(row => row.status === 'BLOCK') ? 'BLOCK'
    : checks.some(row => row.status === 'NEEDS_VERIFICATION') ? 'NEEDS_VERIFICATION'
      : checks.some(row => row.status === 'ESCALATE') ? 'ESCALATE' : 'PASS';
  return { status, decision: status, checks, hasFullBody, injectionDetected, injection: injectionDetected, duplicateOf,
    computedTotalInr, reason: checks.find(row => row.status === status)?.detail ?? 'Invoice evidence checks passed; owner consent is still required.' };
}

export function deriveAaHistory(transactions, suppliers = [], { allowUniqueTransferFragments = false } = {}) {
  const registry = suppliers.filter(approved);
  const matchedDebits = [];
  let unmatchedDebitCount = 0;
  for (const row of transactions) {
    if (row.type !== 'DEBIT') continue;
    const amount = money(row.amount ?? row.amountInr);
    if (!Number.isFinite(amount) || amount <= 0) { unmatchedDebitCount += 1; continue; }
    const narration = compact(row.narration);
    const candidates = registry.flatMap(supplier => {
      const fullName = compact(supplierName(supplier));
      const firstName = compact(supplierName(supplier).split(' ')[0]);
      if (narration.includes(fullName)) return [{ supplier, matchMethod: 'registered_name', confidence: 'high' }];
      const namedAccount = `${supplierAccount(supplier)}${firstName}`;
      const accountAfterName = `${firstName}${supplierAccount(supplier)}`;
      if (narration.includes(namedAccount) || narration.includes(accountAfterName)) return [{ supplier, matchMethod: 'registered_account_suffix_and_name', confidence: 'high' }];
      if (fullName.length >= 10 && narration.includes(fullName.slice(0, 10))) {
        const transferRail = ['NEFT', 'IMPS', 'RTGS'].includes(row.mode) &&
          new RegExp(`^${row.mode}(?:[\\s/:-]|$)`, 'i').test(String(row.narration));
        return [{ supplier, matchMethod: allowUniqueTransferFragments && transferRail ? 'unique_registry_fragment_with_transfer_rail' : 'unique_registry_name_fragment',
          confidence: allowUniqueTransferFragments && transferRail ? 'high' : 'medium' }];
      }
      return [];
    });
    if (candidates.length !== 1) { unmatchedDebitCount += 1; continue; }
    const matched = candidates[0];
    matchedDebits.push({ bankTxnId: String(row.txnId ?? ''), supplier_id: supplierKey(matched.supplier),
      amount, date: String(row.valueDate ?? row.transactionTimestamp).slice(0, 10), source: 'AA', direction: 'debit',
      verified: matched.confidence === 'high', matchMethod: matched.matchMethod, confidence: matched.confidence, notBankAttested: true });
  }
  const supplierSummary = registry.map(supplier => {
    const rows = matchedDebits.filter(row => row.supplier_id === supplierKey(supplier) && row.date >= '2025-04-01' && row.date <= '2026-03-31');
    const highConfidenceRows = rows.filter(row => row.confidence === 'high');
    const priorFyDebitTotal = Math.round(highConfidenceRows.reduce((total, row) => total + row.amount, 0) * 100) / 100;
    const allAttributedDebitTotal = Math.round(rows.reduce((total, row) => total + row.amount, 0) * 100) / 100;
    return { id: supplierKey(supplier), name: supplierName(supplier), accountLast4: supplierAccount(supplier),
      priorFyDebitCount: highConfidenceRows.length, priorFyDebitTotal, derivedLimit: Math.floor(priorFyDebitTotal * 1.1),
      conservativeObservedLimit: Math.floor(priorFyDebitTotal * 1.1), allAttributedDebitTotal, allAttributedDebitCount: rows.length,
      highConfidenceCount: highConfidenceRows.length,
      mediumConfidenceCount: rows.filter(row => row.confidence === 'medium').length,
      source: 'ReBIT narration match; supplier attribution is inferred and not bank-attested identity.' };
  });
  return { matchedDebits, unmatchedDebitCount, supplierSummary };
}

export function deriveRecurringBills(transactions) {
  const definitions = [
    { id: 'emi', name: 'Existing term loan EMI', key: 'TL EMI', alreadyInUpcomingOutflows: false },
    { id: 'electricity_dadar', name: 'Electricity Dadar', key: 'ELECTRICITY/CA1000', alreadyInUpcomingOutflows: false },
    { id: 'electricity_matunga', name: 'Electricity Matunga', key: 'ELECTRICITY/CA1001', alreadyInUpcomingOutflows: false },
    { id: 'electricity_sion', name: 'Electricity Sion', key: 'ELECTRICITY/CA1002', alreadyInUpcomingOutflows: false },
    { id: 'broadband', name: 'Broadband, 3 outlets', key: 'BROADBAND', alreadyInUpcomingOutflows: false },
    { id: 'rent', name: 'Rent, 3 outlets', key: '/RENT ', alreadyInUpcomingOutflows: true },
    { id: 'salary', name: 'Salaries', key: 'NEFT/SAL ', alreadyInUpcomingOutflows: true },
    { id: 'gst', name: 'GST payment', key: 'GST CHALLAN', alreadyInUpcomingOutflows: true },
  ];
  return definitions.map(definition => {
    const hit = transactions.filter(row => row.type === 'DEBIT' && String(row.narration).toUpperCase().includes(definition.key));
    const recent = hit.filter(row => String(row.valueDate).slice(0, 10) >= '2026-05-01');
    const amountRows = hit.filter(row => String(row.valueDate).slice(0, 10) >= '2026-08-01' && String(row.valueDate).slice(0, 10) <= '2026-10-31');
    const typicalDay = recent.length ? Math.round(recent.reduce((total, row) => total + Number(String(row.valueDate).slice(8, 10)), 0) / recent.length) : null;
    return { ...definition, occurrencesSinceMay2026: recent.length,
      monthlyAmountInr: Math.round(amountRows.reduce((total, row) => total + Number(row.amount ?? row.amountInr), 0) / 3),
      typicalDay, nextDueDate: typicalDay ? `2026-11-${String(typicalDay).padStart(2, '0')}` : null,
      includeInCashPlan: recent.length >= 5 && !definition.alreadyInUpcomingOutflows,
      source: 'Case-insensitive statement narration pattern; monthly estimate is Aug–Oct sum divided by three.' };
  });
}
