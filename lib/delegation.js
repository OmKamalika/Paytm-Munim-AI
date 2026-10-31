const FIELDS = new Set(['goal', 'product', 'outletId', 'trigger', 'maxOrderInr', 'maxAdvanceInr', 'minCreditDays', 'minBuybackPercent', 'validUntil', 'ownerRole', 'canNegotiate', 'approvalMode']);
const DEFAULTS = { maxOrderInr: 520000, maxAdvanceInr: 260000, minCreditDays: 45, minBuybackPercent: 50, validUntil: '2026-11-15', canNegotiate: true, approvalMode: 'ask_before_commit' };

function invalid(message) { const error = new Error(message); error.code = 'DELEGATION_INVALID'; throw error; }
function boundedInteger(value, minimum, maximum, field) {
  if (!Number.isSafeInteger(value) || value < minimum || value > maximum) invalid(`${field} must be an integer from ${minimum} to ${maximum}.`);
}

/** Only explicit owner setup can supply these fields; source replies cannot amend them. */
export function normalizeDelegation(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) invalid('Send an owner delegation object.');
  if (Object.keys(input).some((field) => !FIELDS.has(field))) invalid('The delegation contains an unsupported authority field. Automatic payment authority is not supported.');
  const value = { ...DEFAULTS, ...input };
  for (const [field, maximum] of [['goal', 500], ['product', 120]]) {
    if (typeof value[field] !== 'string' || !value[field].trim() || value[field].trim().length > maximum) invalid(`${field} must contain 1 to ${maximum} characters.`);
    value[field] = value[field].trim();
  }
  if (!['all', 'dadar', 'matunga', 'sion'].includes(value.outletId)) invalid('Choose a supported outlet scope.');
  if (!['demand_signal', 'now'].includes(value.trigger)) invalid('Choose demand_signal or now.');
  if (!['merchant_owner', 'authorized_signatory'].includes(value.ownerRole)) invalid('Only the merchant owner or an authorized signatory can configure this delegation.');
  if (value.approvalMode !== 'ask_before_commit') invalid('Every financial commitment requires final owner approval.');
  if (typeof value.canNegotiate !== 'boolean') invalid('canNegotiate must be true or false.');
  boundedInteger(value.maxOrderInr, 1, Number.MAX_SAFE_INTEGER, 'maxOrderInr');
  boundedInteger(value.maxAdvanceInr, 1, value.maxOrderInr, 'maxAdvanceInr');
  boundedInteger(value.minCreditDays, 0, 90, 'minCreditDays');
  boundedInteger(value.minBuybackPercent, 0, 100, 'minBuybackPercent');
  if (typeof value.validUntil !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value.validUntil) || !Number.isFinite(Date.parse(`${value.validUntil}T00:00:00.000Z`)) || new Date(`${value.validUntil}T00:00:00.000Z`).toISOString().slice(0, 10) !== value.validUntil) invalid('validUntil must be a real ISO calendar date (YYYY-MM-DD).');
  return Object.freeze(value);
}

export function delegationActive(delegation, at) {
  return !delegation || Number.isFinite(Date.parse(at)) && Date.parse(at) <= Date.parse(`${delegation.validUntil}T23:59:59.999Z`);
}

/** The bundled bill proves shared mixed retail procurement, not an arbitrary SKU or outlet allocation. */
export function delegationScopeMatches(delegation, invoiceId) {
  return !delegation || invoiceId === 'GD-1182' && delegation.outletId === 'all' && delegation.product.toLowerCase().replace(/\s+/g, ' ') === 'diwali stock (gd-1182)';
}

/** Hard limits remain binding even if the owner accepts revised commercial terms. */
export function delegationChecks(delegation, { totalInr, advanceInr, invoiceId, at }) {
  if (!delegation) return [];
  return [
    { id: 'delegation_expiry', status: delegationActive(delegation, at) ? 'PASS' : 'BLOCK', detail: `The owner delegation is valid through ${delegation.validUntil} (UTC).` },
    { id: 'delegation_order_limit', status: Number.isSafeInteger(totalInr) && totalInr > 0 && totalInr <= delegation.maxOrderInr ? 'PASS' : 'BLOCK', detail: `The proposed order must not exceed the owner limit of ₹${delegation.maxOrderInr.toLocaleString('en-IN')}.` },
    { id: 'delegation_advance_limit', status: Number.isSafeInteger(advanceInr) && advanceInr > 0 && advanceInr <= delegation.maxAdvanceInr ? 'PASS' : 'BLOCK', detail: `The proposed advance must not exceed the owner limit of ₹${delegation.maxAdvanceInr.toLocaleString('en-IN')}.` },
    { id: 'delegation_negotiation_scope', status: delegation.canNegotiate ? 'PASS' : 'BLOCK', detail: 'Supplier negotiation requires explicit owner authority; monitoring alone cannot create an order or payment.' },
    { id: 'delegation_invoice_scope', status: delegationScopeMatches(delegation, invoiceId) ? 'PASS' : 'NEEDS_VERIFICATION', detail: 'GD-1182 supports only shared Diwali stock procurement across all outlets. Other products or individual outlets require matching source evidence before negotiation or payment.' },
  ];
}
