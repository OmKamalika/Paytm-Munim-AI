const STATUS_ORDER = { PASS: 0, ESCALATE: 1, BLOCK: 2 };

/**
 * Narrow text extraction for the seeded English demo. It is intentionally
 * conservative: an unparsed statement is never treated as approval.
 */
export function detectIntent(text = '') {
  const words = typeof text === 'string' ? text : '';
  const units = words.match(/\b(\d[\d,]*)\s+(?:diwali\s+)?gift\s+boxes\b/i);
  const credit = words.match(/\b(\d{1,3})\s*days?\s*(?:of\s+)?credit\b/i)
    ?? words.match(/\b(?:balance|rest)\s+(?:in|after)\s+(\d{1,3})\s*days?\b/i);
  const buyback = words.match(/\b(\d{1,3})\s*%\s*buyback\b/i);
  const account = words.match(/\b(?:new\s+)?account\s+(?:ending\s+|··)(\d{4})\b/i);
  return {
    units: units ? Number(units[1].replaceAll(',', '')) : null,
    creditDays: credit ? Number(credit[1]) : null,
    buybackPercent: buyback ? Number(buyback[1]) : null,
    supplierMention: /\bgupta\b/i.test(words) ? 'gupta' : null,
    noBuyback: /\b(?:no|without|zero)\s+buyback\b/i.test(words),
    accountEnding: account?.[1] ?? null,
    injectedInstruction: /\b(ignore (your|the|all) (rules|instructions|checks)|skip (the )?(guard|checks)|system prompt)\b/i.test(words),
  };
}

/**
 * A deliberately small, inspectable intent checker for the synthetic demo.
 * It makes no calls that move money or contact a supplier.
 * @param {{mandate: any, originalIntent: any, candidate: any, paused?: boolean, context?: any}} input
 */
export function analyzeIntent({ mandate, originalIntent, candidate, paused = false, context = {} } = {}) {
  const checks = [];
  const reasons = [];
  const drift = [];
  const trace = [
    {
      step: 'Intent captured',
      tool: 'merchant_request',
      status: 'RECORDED',
      details: originalIntent?.explanation ?? 'Original merchant goal unavailable',
    },
    {
      step: 'Counteroffer received',
      tool: 'supplier_simulator',
      status: 'SIMULATED',
      details: candidate?.supplierMessage ?? 'Structured supplier terms supplied',
    },
  ];

  const add = (id, status, detail, code) => {
    checks.push({ id, status, detail });
    if (code) reasons.push({ code, message: detail });
  };

  if (!mandate || !originalIntent || !candidate) {
    add('input', 'BLOCK', 'The mandate, original goal, and candidate action are required.', 'INVALID_ACTION');
    return finish();
  }

  const requiredNumbers = [
    'units',
    'totalAmount',
    'upfrontPercent',
    'creditDays',
    'buybackPercent',
  ];
  if (
    !candidate.supplierId ||
    !candidate.supplierAccount ||
    !candidate.purpose ||
    !candidate.sku ||
    requiredNumbers.some((key) => !Number.isFinite(candidate[key]) || candidate[key] < 0) ||
    !Number.isInteger(candidate.units) ||
    !Number.isInteger(candidate.creditDays) ||
    candidate.units === 0 || candidate.totalAmount === 0 ||
    candidate.creditDays === 0 || candidate.creditDays > 365 ||
    candidate.upfrontPercent > 100 || candidate.buybackPercent > 100
  ) {
    add('input', 'BLOCK', 'The proposed action is missing or has invalid commercial terms.', 'INVALID_ACTION');
    return finish();
  }
  add('input', 'PASS', 'Structured supplier, amount, quantity, and term fields are present.');

  if (paused || !mandate.active) {
    add('delegate_active', 'BLOCK', 'The delegate is paused and cannot proceed.', 'DELEGATE_PAUSED');
  } else {
    add('delegate_active', 'PASS', `Mandate v${mandate.version} is active.`);
  }

  if (!mandate.allowedActorRoles?.includes(candidate.actorRole)) {
    add('actor_role', 'BLOCK', 'This actor is not authorized to negotiate under the mandate.', 'ROLE_NOT_ALLOWED');
  } else {
    add('actor_role', 'PASS', 'The delegate role is authorized.');
  }

  const supplier = mandate.approvedSuppliers?.find((item) => item.id === candidate.supplierId);
  if (!supplier) {
    add('approved_supplier', 'BLOCK', 'The proposed supplier is not approved by the merchant.', 'UNKNOWN_SUPPLIER');
    add('verified_account', 'BLOCK', 'No verified account exists for this supplier.', 'ACCOUNT_MISMATCH');
  } else {
    add('approved_supplier', 'PASS', `${supplier.name} is on the approved list.`);
    if (supplier.verifiedAccount !== candidate.supplierAccount) {
      add('verified_account', 'BLOCK', `The proposed account ${candidate.supplierAccount} differs from the verified account ${supplier.verifiedAccount}.`, 'ACCOUNT_MISMATCH');
    } else {
      add('verified_account', 'PASS', `Supplier account ${supplier.verifiedAccount} matches the verified record.`);
    }
    if (candidate.beneficiaryName !== undefined) {
      if (candidate.beneficiaryName !== supplier.name) {
        add('beneficiary_name', 'BLOCK', `The proposed beneficiary name ${candidate.beneficiaryName} differs from the registered name ${supplier.name}.`, 'BENEFICIARY_NAME_MISMATCH');
      } else {
        add('beneficiary_name', 'PASS', `Beneficiary name matches ${supplier.name} exactly.`);
      }
    }
  }

  if (candidate.totalAmount > mandate.maxOrderAmount) {
    add('spend_limit', 'BLOCK', `Order value ₹${formatIndian(candidate.totalAmount)} exceeds the mandate limit of ₹${formatIndian(mandate.maxOrderAmount)}.`, 'SPEND_LIMIT');
  } else {
    add('spend_limit', 'PASS', `Order value is within the ₹${formatIndian(mandate.maxOrderAmount)} limit.`);
  }

  if (candidate.units > mandate.maxUnits) {
    add('quantity_limit', 'BLOCK', `Quantity ${candidate.units} exceeds the ${mandate.maxUnits}-unit mandate.`, 'QUANTITY_LIMIT');
  } else {
    add('quantity_limit', 'PASS', `Quantity is within the ${mandate.maxUnits}-unit mandate.`);
  }

  if (candidate.upfrontPercent < mandate.upfrontPercent.min || candidate.upfrontPercent > mandate.upfrontPercent.max) {
    add('upfront_band', 'BLOCK', `Upfront payment ${candidate.upfrontPercent}% is outside the ${mandate.upfrontPercent.min}–${mandate.upfrontPercent.max}% band.`, 'UPFRONT_LIMIT');
  } else {
    add('upfront_band', 'PASS', `Upfront payment ${candidate.upfrontPercent}% is inside the merchant's band.`);
  }

  if (candidate.creditDays < mandate.minCreditDays) {
    add('credit_floor', 'BLOCK', `Supplier credit ${candidate.creditDays} days is below the ${mandate.minCreditDays}-day mandate floor.`, 'CREDIT_FLOOR');
  } else {
    add('credit_floor', 'PASS', `Supplier credit meets the ${mandate.minCreditDays}-day floor.`);
  }

  if (candidate.buybackPercent < mandate.minBuybackPercent) {
    add('buyback_floor', 'BLOCK', `Buyback ${candidate.buybackPercent}% is below the ${mandate.minBuybackPercent}% mandate floor.`, 'BUYBACK_FLOOR');
  } else {
    add('buyback_floor', 'PASS', 'Buyback does not cross the hard mandate floor.');
  }

  const accepted = candidate.supplierAcceptance;
  const acceptedFields = ['units', 'totalAmount', 'upfrontPercent', 'creditDays', 'buybackPercent', 'supplierAccount'];
  if (!accepted?.accepted || !accepted.reference || !accepted.acceptedAt || !candidate.supplierMessage?.trim()) {
    add('supplier_acceptance', 'ESCALATE', 'The supplier has not explicitly accepted a recorded quote with a response message.', 'SUPPLIER_ACCEPTANCE_MISSING');
  } else if (!accepted.terms || acceptedFields.some((field) => accepted.terms[field] !== candidate[field])) {
    add('supplier_acceptance', 'ESCALATE', 'The supplier acknowledgement does not match the exact price, quantity, payment, credit, buyback, and account terms.', 'ACCEPTED_TERMS_MISMATCH');
  } else {
    add('supplier_acceptance', 'PASS', `Supplier accepted the recorded terms in ${accepted.reference} (simulated).`);
  }
  trace.push({
    step: 'Supplier acceptance checked',
    tool: 'supplier_acceptance',
    status: checks.find((check) => check.id === 'supplier_acceptance').status,
    details: accepted?.reference ? `${accepted.reference} · simulated; not authenticated by a real supplier.` : 'No accepted quote reference.',
  });

  const ownerText = detectIntent(originalIntent.requestText);
  const supplierText = detectIntent(candidate.supplierMessage);
  trace.push({
    step: 'Text intent extracted',
    tool: 'intent_extractor',
    status: 'HEURISTIC',
    details: `Owner request: ${ownerText.units ?? '?'} boxes, ${ownerText.creditDays ?? '?'} days, ${ownerText.buybackPercent ?? '?'}% buyback. Supplier reply: ${supplierText.creditDays ?? '?'} days, ${supplierText.buybackPercent ?? (supplierText.noBuyback ? 0 : '?')}% buyback.`,
  });
  if (
    (ownerText.units !== null && ownerText.units !== originalIntent.units) ||
    (ownerText.creditDays !== null && ownerText.creditDays !== originalIntent.targetCreditDays) ||
    (ownerText.buybackPercent !== null && ownerText.buybackPercent !== originalIntent.targetBuybackPercent) ||
    (ownerText.supplierMention && ownerText.supplierMention !== originalIntent.supplierId)
  ) {
    drift.push({ code: 'OWNER_INTENT_MISMATCH', message: 'The structured original goal differs from the merchant’s request text; review before acting.' });
  }
  if (candidate.purpose !== originalIntent.purpose) {
    drift.push({ code: 'PURPOSE_DRIFT', message: `The action purpose changed from ${originalIntent.purpose} to ${candidate.purpose}.` });
  }
  if (candidate.sku !== originalIntent.sku) {
    drift.push({ code: 'SKU_DRIFT', message: `The item changed from ${originalIntent.sku} to ${candidate.sku}.` });
  }
  if (candidate.supplierId !== originalIntent.supplierId) {
    drift.push({ code: 'SUPPLIER_DRIFT', message: 'The proposed supplier differs from the merchant’s original request.' });
  }
  if (candidate.creditDays < originalIntent.targetCreditDays) {
    drift.push({ code: 'CREDIT_DRIFT', message: `Supplier credit fell from the merchant's ${originalIntent.targetCreditDays}-day goal to ${candidate.creditDays} days.` });
  }
  if (candidate.buybackPercent < originalIntent.targetBuybackPercent) {
    drift.push({ code: 'BUYBACK_DRIFT', message: `Buyback fell from the merchant's ${originalIntent.targetBuybackPercent}% goal to ${candidate.buybackPercent}%.` });
  }
  if (candidate.units < originalIntent.units) {
    drift.push({ code: 'QUANTITY_DRIFT', message: `The offer covers ${candidate.units} units, below the merchant's ${originalIntent.units}-unit plan.` });
  }
  if (supplierText.noBuyback && candidate.buybackPercent > 0) {
    drift.push({ code: 'TEXT_TERMS_CONFLICT', message: 'The supplier reply says no buyback, but the structured action says buyback applies.' });
  } else if (supplierText.buybackPercent !== null && supplierText.buybackPercent !== candidate.buybackPercent) {
    drift.push({ code: 'TEXT_TERMS_CONFLICT', message: 'The buyback percentage in the supplier reply differs from the structured action.' });
  }
  if (supplierText.creditDays !== null && supplierText.creditDays !== candidate.creditDays) {
    drift.push({ code: 'TEXT_TERMS_CONFLICT', message: 'The credit period in the supplier reply differs from the structured action.' });
  }
  if (supplierText.accountEnding && !candidate.supplierAccount.endsWith(supplierText.accountEnding)) {
    drift.push({ code: 'UNVERIFIED_ACCOUNT_IN_TEXT', message: `The supplier reply mentions account ending ${supplierText.accountEnding}, which differs from the structured account.` });
  }
  if (supplierText.injectedInstruction) {
    drift.push({ code: 'INJECTED_INSTRUCTION', message: 'The supplier message contains an instruction aimed at the agent rather than commercial terms.' });
  }
  if (drift.length) {
    add('owner_goal', 'ESCALATE', `${drift.length} change${drift.length === 1 ? '' : 's'} from the merchant's original goal need review.`);
    for (const item of drift) reasons.push(item);
  } else {
    add('owner_goal', 'PASS', 'The proposal preserves the merchant’s purpose, item, quantity, credit, and buyback goals.');
  }

  return finish();

  function finish() {
    const decision = checks.reduce((current, check) =>
      STATUS_ORDER[check.status] > STATUS_ORDER[current] ? check.status : current, 'PASS');
    const ownerGoalCheck = checks.find((check) => check.id === 'owner_goal');
    trace.push(
      {
        step: 'Hard rules evaluated',
        tool: 'mandate_rules',
        status: checks.some((check) => check.status === 'BLOCK') ? 'BLOCK' : 'PASS',
        details: `${checks.filter((check) => check.status === 'BLOCK').length} hard-rule failures; ${mandate?.version ? `mandate v${mandate.version}` : 'mandate unavailable'}.`,
      },
      {
        step: 'Intent drift evaluated',
        tool: 'semantic_drift',
        status: ownerGoalCheck?.status ?? 'SKIPPED',
        details: ownerGoalCheck ? `${drift.length} goal or message changes found.` : 'Action input invalid; drift check was not run.',
      },
      {
        step: 'Action decision',
        tool: 'intent_guard',
        status: decision,
        details: decision === 'PASS' ? 'Within mandate and original goal; simulated action may proceed.' : decision === 'ESCALATE' ? 'Hold for merchant review; no action executed.' : 'Blocked; no action executed.',
      },
    );
    return { decision, reasons, checks, trace, originalIntent, candidate, context };
  }
}

function formatIndian(amount) {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);
}
