"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Eye, LockKeyhole, MessageSquare, ShieldCheck, X } from "lucide-react";
import "./AgentSetup.css";

export type AgentDelegation = {
  goal: string; product: string; outletId: string; trigger: "demand_signal" | "now";
  maxOrderInr: number; maxAdvanceInr: number; minCreditDays: number; minBuybackPercent: number;
  validUntil: string; ownerRole: "merchant_owner" | "authorized_signatory";
  canNegotiate: boolean; approvalMode: "ask_before_commit";
};
const money = (value: number) => "₹" + new Intl.NumberFormat("en-IN").format(value);
const steps = ["Your goal", "Your limits", "Permissions", "Review"];
const outlets: Record<string, string> = { all: "All three outlets", dadar: "Dadar", matunga: "Matunga", sion: "Sion" };

export default function AgentSetup({ onClose, onActivate, busy, error, initialOutletId = "all" }: {
  onClose: () => void; onActivate: (value: AgentDelegation) => Promise<void>; busy: boolean; error: string; initialOutletId?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState("Help me prepare extra Diwali stock in time, while protecting my cash.");
  const [product, setProduct] = useState("Diwali stock (GD-1182)");
  const [outletId, setOutlet] = useState(initialOutletId);
  const [trigger, setTrigger] = useState<"demand_signal" | "now">("demand_signal");
  const [order, setOrder] = useState("520000");
  const [advance, setAdvance] = useState("260000");
  const [credit, setCredit] = useState("45");
  const [buyback, setBuyback] = useState("50");
  const [validUntil, setValidUntil] = useState("2026-11-15");
  const [canNegotiate, setCanNegotiate] = useState(true);
  const [ownerRole, setRole] = useState<"merchant_owner" | "authorized_signatory">("merchant_owner");
  const [confirmed, setConfirmed] = useState(false);
  const [localError, setLocalError] = useState("");
  useEffect(() => {
    const element = dialog.current;
    const previous = document.activeElement as HTMLElement | null;
    element?.showModal();
    return () => { element?.close(); previous?.focus(); };
  }, []);
  const mandate: AgentDelegation = { goal: goal.trim(), product: product.trim(), outletId, trigger, maxOrderInr: Number(order), maxAdvanceInr: Number(advance), minCreditDays: Number(credit), minBuybackPercent: Number(buyback), validUntil, ownerRole, canNegotiate, approvalMode: "ask_before_commit" };
  async function next(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLocalError("");
    if (step === 1 && Number(advance) > Number(order)) { setLocalError("The maximum advance cannot be more than the order budget."); return; }
    if (step < 3) { setStep(step + 1); return; }
    if (!confirmed) { setLocalError("Confirm that you have authority to set these permissions."); return; }
    await onActivate(mandate);
  }
  return <dialog ref={dialog} className="as-dialog" aria-labelledby="as-title" onCancel={event => { event.preventDefault(); if (!busy) onClose(); }}>
    <form onSubmit={event => void next(event)}>
      <header className="as-header"><div><span>Set up your stock agent</span><h2 id="as-title">{steps[step]}</h2></div><button type="button" className="as-icon" aria-label="Close agent setup" disabled={busy} onClick={onClose}><X size={22}/></button></header>
      <ol className="as-steps" aria-label="Agent setup progress">{steps.map((label, index) => <li key={label} aria-current={index === step ? "step" : undefined}><span>{index < step ? <Check size={13}/> : index + 1}</span><b>{label}</b></li>)}</ol>
      <div className="as-body" key={step}>
        {step === 0 && <>
          <p className="as-lead">Tell Munim what you want help with. You will review its limits before anything starts.</p>
          <label className="as-field">What should Munim help you achieve?<textarea required minLength={10} maxLength={500} rows={3} value={goal} onChange={event => setGoal(event.target.value)}/></label>
          <div className="as-row"><label className="as-field">Stock to plan for<input required maxLength={100} value={product} onChange={event => setProduct(event.target.value)}/></label><label className="as-field">Where?<select value={outletId} onChange={event => setOutlet(event.target.value)}>{Object.entries(outlets).map(([id, name]) => <option key={id} value={id}>{name}</option>)}</select></label></div>
          <small className="as-demo">The available invoice covers shared Diwali stock (GD-1182). A different product or outlet needs matching invoice evidence before Munim can approach the supplier for that order.</small>
          <fieldset className="as-choices"><legend>When should Munim get started?</legend><label><input type="radio" name="as-trigger" checked={trigger === "demand_signal"} onChange={() => setTrigger("demand_signal")}/><span><b>Watch for a replenishment signal</b><small>Use payment pace and supplier evidence to suggest when to review an order.</small></span></label><label><input type="radio" name="as-trigger" checked={trigger === "now"} onChange={() => setTrigger("now")}/><span><b>Ask the supplier now</b><small>Start preparing a quote for the current stock requirement.</small></span></label></fieldset>
          <p className="as-note"><Eye size={18}/><span>We estimate purchasing needs from payment and supplier signals. Munim cannot see exact shelf stock. Monitoring responses in this demo come from the separate simulator.</span></p>
        </>}
        {step === 1 && <>
          <p className="as-lead">These are ceilings and target terms. Entering a budget does not approve an order or a payment.</p>
          <div className="as-row"><label className="as-field">Maximum total order (₹)<input type="number" inputMode="numeric" required min="1" max="10000000" step="1" value={order} onChange={event => setOrder(event.target.value)}/><small>Gupta&apos;s current demo bill is ₹5,20,000. A lower ceiling will stop that proposal.</small></label><label className="as-field">Maximum upfront payment (₹)<input type="number" inputMode="numeric" required min="1" max="10000000" step="1" value={advance} onChange={event => setAdvance(event.target.value)}/><small>Each payment still needs your approval.</small></label></div>
          <div className="as-row"><label className="as-field">Ask for at least this credit (days)<input type="number" required min="0" max="90" step="1" value={credit} onChange={event => setCredit(event.target.value)}/></label><label className="as-field">Ask for this unsold buyback (%)<input type="number" required min="0" max="100" step="1" value={buyback} onChange={event => setBuyback(event.target.value)}/></label></div>
          <label className="as-field">Agent permission ends on<input type="date" required value={validUntil} onChange={event => setValidUntil(event.target.value)}/></label>
          <p className="as-note"><ShieldCheck size={18}/><span>We also check the supplier ceiling derived from matched prior-year bank payments + 10%. The smaller permitted amount applies. We ask you about weaker credit or buyback terms; your order and payment ceilings stay binding.</span></p>
        </>}
        {step === 2 && <>
          <p className="as-lead">Choose how much preparation Munim may handle. You keep control of commitments.</p>
          <section className="as-permission"><h3><Eye size={19}/>Without asking each time</h3><ul><li>Review available payment and supplier evidence.</li><li>Flag a possible need for extra stock.</li><li>Prepare a recommendation within your limits.</li></ul><label className="as-toggle"><input type="checkbox" checked={canNegotiate} onChange={event => setCanNegotiate(event.target.checked)}/><span><b>Let Munim ask Gupta for quotes and negotiate</b><small>Within your goal and limits. Turn this off to monitor and report only.</small></span></label></section>
          <section className="as-permission as-ask"><h3><MessageSquare size={19}/>Always ask me first</h3><ul><li>Confirm an order or commit to changed supplier terms.</li><li>Send any supplier payment.</li><li>Authorize a bureau check or accept a loan.</li></ul></section>
          <section className="as-permission as-never"><h3><LockKeyhole size={19}/>Never permitted by this setup</h3><ul><li>Change Gupta&apos;s registered payment account.</li><li>Exceed your order or advance ceiling.</li><li>Pay against missing or suspicious invoice evidence.</li><li>Create a duplicate payment or continue after permission expires.</li></ul></section>
        </>}
        {step === 3 && <>
          <p className="as-lead">Read this as the instruction you are giving Munim.</p>
          <div className="as-summary"><ShieldCheck size={24}/><div><h3>{product || "Your stock agent"}</h3><p>{goal}</p></div></div>
          <dl className="as-review"><div><dt>Outlet</dt><dd>{outlets[outletId]}</dd></div><div><dt>Start</dt><dd>{trigger === "demand_signal" ? "Watch for a replenishment signal" : "Ask Gupta now"}</dd></div><div><dt>Order ceiling</dt><dd>{money(mandate.maxOrderInr)}</dd></div><div><dt>Advance ceiling</dt><dd>{money(mandate.maxAdvanceInr)} · approval required</dd></div><div><dt>Supplier goal</dt><dd>{credit} days credit · {buyback}% unsold buyback</dd></div><div><dt>Supplier</dt><dd>Gupta Distributors · account ending 7781</dd></div><div><dt>May act alone</dt><dd>{canNegotiate ? "Monitor, ask for quotes and prepare a proposal" : "Monitor and report only"}</dd></div><div><dt>Expires</dt><dd>{validUntil}</dd></div></dl>
          <p className="as-note"><LockKeyhole size={18}/><span>Munim will bring you the exact order, invoice, amount and terms before a commitment. This setup does not authorize money movement or credit.</span></p>
          <label className="as-field">I am setting this as<select value={ownerRole} onChange={event => setRole(event.target.value as AgentDelegation["ownerRole"])}><option value="merchant_owner">Business owner</option><option value="authorized_signatory">Authorized signatory</option></select></label>
          <label className="as-confirm"><input type="checkbox" required checked={confirmed} onChange={event => setConfirmed(event.target.checked)}/><span>I have authority to give these permissions and have reviewed the limits.</span></label>
          <small className="as-demo">Roles are declared, not identity-verified. Monitoring and supplier replies are simulated.</small>
        </>}
        {(localError || error) && <p className="as-error" role="alert">{localError || error}</p>}
      </div>
      <footer className="as-footer"><button type="button" className="as-back" disabled={busy} onClick={() => step ? setStep(step - 1) : onClose()}><ArrowLeft size={17}/>{step ? "Back" : "Cancel"}</button><button type="submit" className="as-next" disabled={busy || (step === 3 && !confirmed)}>{busy ? "Setting up…" : step === 3 ? "Activate with these limits" : "Continue"}{step === 3 ? <ShieldCheck size={17}/> : <ArrowRight size={17}/>}</button></footer>
    </form>
  </dialog>;
}
