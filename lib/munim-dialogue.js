// Munim Ask screen: a deterministic dialogue simulator, not an AI model.
//
// It picks one supported intent by keyword, reads the structured cash plan,
// options and invoice status, and fills a fixed template. It never computes
// amounts of its own, never approves or executes anything, and says plainly
// when a question is outside what it supports. Phrase matching on a few
// Hinglish words is not Hindi language understanding.

import { formatInr } from './cash-engine.js';

export const DIALOGUE_ENGINE = Object.freeze({
  kind: 'deterministic_dialogue_simulator',
  model: false,
  languageUnderstanding: false,
  label: 'Scripted demo dialogue · keyword match over calculated results · not an AI model',
});

export const SUPPORTED_QUESTIONS = Object.freeze([
  'Diwali ke liye paisa kahan se aayega?',
  'When will cash run short?',
  'Can Gupta give us more time?',
  'Should I take the Lender A drawdown?',
  'Can you pay Gupta now?',
  'How is each outlet doing?',
  'How should the Gupta order be split across outlets?',
]);

const dateText = (iso) => iso ? new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`)) : 'not supplied';

// Order matters: refusals first, then the narrower intents, then the broad ones.
const INTENTS = [
  { id: 'unsafe_instruction', pattern: /\b(ignore|bypass|skip|override|disable)\b.*\b(rules?|guard|checks?|mandate|pin|limits?)\b|system prompt/i },
  { id: 'supplier_payment', pattern: /\b(pay|send|transfer|release)\b.*\b(gupta|supplier|invoice|money|payment)\b|\bpayment\b.*\bgupta\b|bhej/i },
  { id: 'outlet_order', pattern: /\b(sku|skus|deliver|delivery|split|allocat\w*|how many boxes|order)\b|kitna maal|माल/i },
  { id: 'outlets', pattern: /\boutlets?\b|dadar|matunga|sion|\bdukaan\b|\bstores?\b/i },
  { id: 'drawdown', pattern: /\b(lender|loan|drawdown|draw|emi|capital|credit line|borrow|udhaar)\b/i },
  { id: 'supplier_terms', pattern: /\b(gupta|supplier|defer|deferral|more time|terms)\b/i },
  { id: 'relief_plan', pattern: /kahan se|paisa|kya kar|what should|how (do|can) (i|we) cover|options?|relief|cover the gap|पैसा|कहाँ से/i },
  { id: 'cash_gap', pattern: /\b(short|shortfall|gap|balance|run out|cash)\b|kam pad|kab/i },
];

export function detectDialogueIntent(question) {
  const text = typeof question === 'string' ? question.trim() : '';
  if (!text) return 'empty';
  return INTENTS.find((intent) => intent.pattern.test(text))?.id ?? 'unsupported';
}

/**
 * @param {string} question
 * @param {{ cash: any, options: any, invoice: any, revisedInvoice?: any, order?: any, outlets: any[], supplier?: { requested: boolean, eventSeq: number|null, accepted: boolean, paidInvoiceId?: string|null } }} context
 */
export function answerQuestion(question, context) {
  const intent = detectDialogueIntent(question);
  const figures = [];
  const fig = (id, label, valueInr) => { figures.push({ id, label, valueInr }); return formatInr(valueInr); };
  const reply = (supported, text, next = []) => ({ intent, supported, text, figures, next, engine: DIALOGUE_ENGINE });

  const cash = context?.cash?.cashPlan;
  const options = context?.options;
  if (!cash || !options) return reply(false, 'The cash plan is not available, so I cannot answer with numbers right now.');
  const anchors = cash.anchors;
  const option = (id) => options.options.find((item) => item.id === id);

  switch (intent) {
    case 'empty':
      return reply(false, `Ask one of the demo questions, for example: “${SUPPORTED_QUESTIONS[0]}”`);

    case 'unsafe_instruction':
      return reply(true, 'I can’t switch off the rules. Every payment and drawdown goes through the Intent Guard and the owner PIN, and I can’t approve anything myself.', [{ screen: 'guard', label: 'See the guard' }]);

    case 'cash_gap': {
      if (anchors.lowestBalanceInr === null) return reply(false, 'An input for the cash plan is missing, so I can’t say when cash runs short.', [{ screen: 'data', label: 'See sources' }]);
      if (anchors.lowestBalanceInr >= 0) {
        return reply(true, `With the relief already in place, cash stays above zero until ${dateText(context.cash?.cashPlan?.dailyBalanceSeries?.at(-1)?.date)}. The lowest closing is ${fig('lowest', 'Lowest closing', anchors.lowestBalanceInr)} on ${dateText(anchors.lowestDate)}.`, [{ screen: 'plan', label: 'See cash plan' }]);
      }
      const first = cash.dailyBalanceSeries.find((day) => day.date === anchors.firstNegativeDate)?.balanceInr;
      return reply(true, `Cash first goes below zero on ${dateText(anchors.firstNegativeDate)} at ${fig('first_negative', 'First negative closing', first)}. The lowest point is ${fig('lowest', 'Lowest closing', anchors.lowestBalanceInr)} on ${dateText(anchors.lowestDate)}, and it is back above zero on ${dateText(anchors.recoveryAboveZeroDate)}.`, [{ screen: 'plan', label: 'See cash plan' }]);
    }

    case 'relief_plan': {
      const rec = options.recommendation;
      if (!rec || rec.status === 'missing_inputs') return reply(false, 'An input for the cash plan is missing, so I can’t recommend relief.', [{ screen: 'data', label: 'See sources' }]);
      figures.push(...rec.figures);
      return reply(true, rec.text, [{ screen: 'supplier', label: 'Ask Gupta for terms' }, { screen: 'capital', label: 'Compare lenders' }]);
    }

    case 'supplier_terms': {
      const deferral = option('supplier_deferral');
      if (deferral.accepted) {
        return reply(true, `Gupta accepted in the simulator: ${fig('upfront', 'Paid on the due date', deferral.terms.upfrontInr)} stays due on the invoice date and ${fig('deferred', 'Deferred amount', deferral.terms.deferredInr)} moves to ${dateText(deferral.terms.deferredTo)}. It is still owed. The 5 Nov closing is now ${fig('balance_5_nov', '5 Nov closing', deferral.effectOn5Nov.balanceInr)}.`, [{ screen: 'plan', label: 'See updated plan' }]);
      }
      const waiting = context.supplier?.requested && !context.supplier?.eventSeq;
      return reply(true, `Invoice ${deferral.invoiceId} is ${fig('invoice', 'Invoice amount', deferral.invoiceAmountInr)}. The request asks Gupta for ${fig('upfront', 'Paid on the due date', deferral.terms.upfrontInr)} on the due date and the rest, ${fig('deferred', 'Deferred amount', deferral.terms.deferredInr)}, after ${deferral.terms.creditDays} days. If Gupta accepts, 5 Nov would close at ${fig('balance_5_nov', '5 Nov closing if accepted', deferral.effectOn5Nov.ifAcceptedBalanceInr)}. ${waiting ? 'The request is waiting for a simulated reply.' : 'Nothing changes until a simulated reply is accepted.'}`, [{ screen: 'supplier', label: 'Ask Gupta for terms' }]);
    }

    case 'drawdown': {
      const draw = option('drawdown');
      const minimum = options.recommendation?.steps?.find((step) => step.option === 'drawdown' && step.reason !== 'top_up_after_deferral')?.amountInr;
      const parts = [`Lender A can lend ${fig('drawdown', 'Prepared drawdown', draw.amountInr)} into the owner account ${draw.destinationAccountMasked}. With it, 5 Nov closes at ${fig('balance_5_nov', '5 Nov closing with drawdown', draw.effectOn5Nov.balanceInr)}, at about ${fig('interest', 'Interest if repaid by 30 Nov', draw.costInr)} interest if repaid by 30 Nov.`];
      if (typeof minimum === 'number' && minimum > 0) parts.push(`The smallest drawdown that covers the gap is ${fig('minimum', 'Smallest covering drawdown', minimum)}.`);
      if (option('supplier_deferral').costInr === 0 && !option('supplier_deferral').accepted) parts.push('Asking Gupta first costs nothing.');
      parts.push('It needs the guard check and the owner PIN.');
      return reply(true, parts.join(' '), [{ screen: 'capital', label: 'Compare lenders' }]);
    }

    case 'supplier_payment': {
      const invoice = context.invoice;
      const revised = context.revisedInvoice;
      const parts = [`I can’t pay Gupta myself; only the owner’s PIN can approve a payment that passes the guard.`];
      parts.push(invoice?.hasFullBody ? `Invoice ${invoice.number} can be checked by the guard.` : `A payment against ${invoice?.number ?? 'the original invoice'} stays on hold: its full text was not supplied, so the guard cannot check it for hidden instructions.`);
      if (revised?.hasFullBody) {
        parts.push(`The revised invoice ${revised.number} has full text. Once Gupta’s reply accepts the outlet order and the bank sample is released, the guard checks the ${fig('upfront', 'Upfront payment due on delivery', revised.terms.upfrontInr)} upfront payment line by line against the order.`);
        if (context.supplier?.paidInvoiceId) parts.push(`That payment is already recorded (simulated); a second payment for the same order is blocked.`);
      }
      return reply(true, parts.join(' '), [{ screen: 'supplier', label: 'Supplier terms' }, { screen: 'guard', label: 'See the guard' }]);
    }

    case 'outlet_order': {
      const order = context.order;
      if (!order) return reply(false, 'The outlet order split is not available.');
      const split = order.byOutlet.map((item) => `${item.outlet} ${item.units} boxes`).join(', ');
      return reply(true, `The ${order.orderUnits}-box Gupta order (${fig('order_total', 'Order value', order.totalAmountInr)}) splits as ${split}, in packs of 5, delivered on ${dateText(order.deliveryDate)}. The split follows each outlet’s Diwali-week collection forecast and the SKU fixture’s assumed shares and stock, not observed SKU sales. ${order.note}`, [{ screen: 'supplier', label: 'Ask Gupta for terms' }]);
    }

    case 'outlets': {
      const outlets = context.outlets ?? [];
      if (!outlets.length) return reply(false, 'Outlet figures are not available.');
      const lines = outlets.map((item) => `${item.name}: ${fig(`${item.id}_today`, `${item.name} Paytm today`, item.paytmToday)} on Paytm today, about ${fig(`${item.id}_monthly`, `${item.name} average all-channel month`, item.averageMonthlyAllChannelCollections)} a month across all channels`);
      return reply(true, `${lines.join('; ')}. These are collections only. There is no profit or stock data per outlet, and cash is one pool across all three.`, [{ screen: 'data', label: 'See outlets' }]);
    }

    default:
      return reply(false, `I can only answer the demo questions about the cash gap, Gupta’s terms, the Lender A drawdown, supplier payment and outlet collections. I don’t have an answer for that. Try: “${SUPPORTED_QUESTIONS[0]}”`);
  }
}
