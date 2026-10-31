// Basic source consistency checks, deliberately separate from XSD validation.
const CAVEAT = 'The supplied gstr1_3b v1.1.0 fixture uses GSTN field names after osup_det and assumes filingFrequency MONTHLY, inv_typ R, and date formats. XML/JSON structure and source values are checked here; no complete ReBIT XSD validation has been performed.';
const decode = text => String(text).replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const tagName = text => text.split(':').at(-1);

function parseXml(xml) {
  if (typeof xml !== 'string' || /<!DOCTYPE|<!ENTITY/i.test(xml)) throw new Error('DTD/entity declarations are not accepted by the fixture reader.');
  const stack = []; let root = null; let cursor = 0;
  const tokens = xml.matchAll(/<([^>]+)>/g);
  for (const token of tokens) {
    const text = xml.slice(cursor, token.index).trim();
    if (text && stack.length) stack.at(-1).text += decode(text);
    cursor = token.index + token[0].length;
    const raw = token[1].trim();
    if (raw.startsWith('?') || raw.startsWith('!--')) continue;
    if (raw.startsWith('/')) {
      if (!stack.length || stack.at(-1).tag !== tagName(raw.slice(1).trim())) throw new Error('Unbalanced XML fixture.');
      stack.pop(); continue;
    }
    const selfClosing = raw.endsWith('/');
    const name = raw.match(/^([^\s/]+)/)?.[1];
    if (!name) throw new Error('Malformed XML tag.');
    const node = { tag: tagName(name), attrs: {}, children: [], text: '' };
    for (const attribute of raw.matchAll(/([\w:.-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) node.attrs[attribute[1]] = decode(attribute[2] ?? attribute[3]);
    if (stack.length) stack.at(-1).children.push(node);
    else if (root) throw new Error('Multiple XML roots.');
    else root = node;
    if (!selfClosing) stack.push(node);
  }
  if (!root || stack.length) throw new Error('Incomplete XML fixture.');
  return root;
}

function jsonNode(tag, value) {
  const node = { tag, attrs: {}, children: [], text: '' };
  if (!value || typeof value !== 'object') { node.text = String(value ?? ''); return node; }
  for (const [key, field] of Object.entries(value)) {
    if (Array.isArray(field)) node.children.push(...field.map(item => jsonNode(key, item)));
    else if (field && typeof field === 'object') node.children.push(jsonNode(key, field));
    else if (field !== null && field !== undefined) node.attrs[key] = field;
  }
  return node;
}

function compare(left, right, path) {
  if (left.tag !== right.tag || left.text !== right.text) return path;
  const keys = attrs => Object.keys(attrs).filter(key => !key.startsWith('xmlns')).sort();
  if (JSON.stringify(keys(left.attrs)) !== JSON.stringify(keys(right.attrs))) return `${path}/attributes`;
  for (const key of keys(right.attrs)) {
    const expected = right.attrs[key]; const actual = left.attrs[key];
    // Only fields represented as JSON numbers may differ in decimal formatting.
    // String identifiers and date/return-period codes keep their exact spelling.
    if (typeof expected === 'number' ? Number(actual) !== expected : String(actual) !== String(expected)) return `${path}/attributes/${key}`;
  }
  if (left.children.length !== right.children.length) return `${path}/children`;
  for (let index = 0; index < left.children.length; index += 1) {
    const mismatch = compare(left.children[index], right.children[index], `${path}/${left.children[index].tag}[${index}]`);
    if (mismatch) return mismatch;
  }
  return null;
}

export function validateXmlJsonMirror(xml, account, expectedNamespace) {
  try {
    const parsed = parseXml(xml);
    const namespace = Object.entries(parsed.attrs).find(([key]) => key.startsWith('xmlns'))?.[1];
    const firstMismatch = namespace !== expectedNamespace ? '/Account/namespace' : compare(parsed, jsonNode('Account', account), '/Account');
    return { ok: firstMismatch === null, firstMismatch, namespace, fullXsdValidation: false,
      validationScope: 'Exact normalized field/tree comparison of supplied JSON and XML, including numeric attributes; no XSD validation.' };
  } catch (error) {
    return { ok: false, firstMismatch: '/Account', error: error.message, fullXsdValidation: false,
      validationScope: 'Basic XML/JSON fixture consistency only.' };
  }
}

function periodKey(value) {
  if (!/^(0[1-9]|1[0-2])\d{4}$/.test(String(value))) return null;
  return `${String(value).slice(2)}-${String(value).slice(0, 2)}`;
}
function isoDate(value) {
  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(String(value));
  if (!match) return null;
  const result = `${match[3]}-${match[2]}-${match[1]}`;
  return new Date(`${result}T00:00:00Z`).toISOString().slice(0, 10) === result ? result : null;
}

export function deriveGstEvidence(document) {
  const account = document?.Account;
  const gstr1 = account?.Transactions?.Gstr1Details?.gstr1;
  const gstr3b = account?.Transactions?.Gstr3bDetails?.gstr3b;
  const errors = [];
  if (account?.type !== 'gstr1_3b' || account.version !== '1.1.0') errors.push('Unexpected account type or version.');
  if (!Array.isArray(gstr1) || !Array.isArray(gstr3b)) throw new Error('GSTR-1 and GSTR-3B source arrays are required.');
  const periodRows = new Map();
  for (const row of gstr1) {
    const period = periodKey(row.ret_prd);
    if (!period || !isoDate(row.dof) || periodRows.has(period)) { errors.push('Invalid or duplicate GSTR-1 filing period.'); continue; }
    if (row.status === 'Filed') periodRows.set(period, row);
  }
  const seen = new Set(); const filed = [];
  for (const row of gstr3b) {
    const period = periodKey(row.ret_prd);
    if (!period || !isoDate(row.dof) || seen.has(period)) { errors.push('Invalid or duplicate GSTR-3B filing period.'); continue; }
    seen.add(period);
    const partner = periodRows.get(period);
    if (row.status !== 'Filed' || !partner) continue;
    const outward = row.sup_details?.osup_det;
    if (!outward || !Number.isFinite(outward.txval)) { errors.push('Missing or invalid outward taxable value.'); continue; }
    const cash = row.pdcash_dtls?.pdcash;
    if (!Array.isArray(cash) || cash.some(item => Object.values(item).some(value => !Number.isFinite(value)))) { errors.push('Missing or invalid cash-payment data.'); continue; }
    filed.push({ period, returnPeriod: row.ret_prd, status: 'Filed', filedOnGstr1: isoDate(partner.dof), filedOnGstr3b: isoDate(row.dof),
      taxableOutwardInr: outward.txval, nilExemptOutwardInr: row.sup_details?.osup_nil_exmp?.txval ?? 0,
      cashPaidInr: Math.round(cash.reduce((total, item) => total + Object.values(item).reduce((sum, value) => sum + value, 0), 0) * 100) / 100,
      b2bInvoiceCount: partner.b2b_dtls?.b2b?.length ?? 0,
      source: 'Supplied synthetic AA GST filing document; Filed status is read from the source FI data.' });
  }
  filed.sort((a, b) => a.period.localeCompare(b.period));
  const profile = account.Profile?.BusinessDetails;
  if (!profile?.lgnm || !profile?.trdnm) errors.push('Missing GST business profile.');
  return {
    gstReturnsFiled: filed,
    gstProfile: { maskedGstinNumber: account.maskedGstinNumber, legalName: profile?.lgnm ?? null, tradeName: profile?.trdnm ?? null,
      registrationDate: profile?.apprvdt ?? null, taxpayerType: profile?.dty ?? null,
      compositionScheme: profile?.iscmp ?? null, status: profile?.sts ?? null,
      businessCategories: profile?.CategoryList?.cat ?? [], principalPlace: account.Profile?.PlaceofBusiness?.Address?.loc ?? null },
    gstHistorySummary: { filingMonths: filed.length, from: filed[0]?.period ?? null, to: filed.at(-1)?.period ?? null,
      source: 'Supplied ReBIT gstr1_3b v1.1.0 JSON', validationCaveat: CAVEAT,
      schemaCaveat: CAVEAT, fullXsdValidation: false, validatedStructure: errors.length === 0,
      b2bInvoiceCount: filed.reduce((total, row) => total + row.b2bInvoiceCount, 0), errors },
  };
}
