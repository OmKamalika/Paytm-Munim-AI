"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, CircleAlert, Clock3, FileCheck2, LockKeyhole, RefreshCw, ShieldCheck } from "lucide-react";
import type { FlowDisclosure, FlowRun, FlowState } from "../lib/flow-types";
import AgentSetup, { type AgentDelegation } from "./AgentSetup";
import { displayCopy } from "../lib/ui-copy.js";
import "./FlowMerchant.css";

const money = (value: number) => "₹" + new Intl.NumberFormat("en-IN").format(value);
const statusLabel = (value: string) => ({ awaiting_response: "Waiting for response", awaiting_owner: "Needs your sign-off", paused: "Paused for review", blocked: "Blocked by guard", completed: "Done · simulated", failed: "Failed · no effect", payment_pending: "Payment unresolved", declined: "You declined" }[value] || value.replaceAll("_", " "));
const kindLabel = (value: string) => ({ monitor: "Stock signal", supplier: "Supplier", judge: "Intent review", invoice: "Invoice evidence", aa: "Account data", kya: "Agent authority", bureau: "Bureau verification", lender: "Lender", payment: "Payment rail", owner: "Owner consent", done: "Complete" }[value] || value);
const termLabels: Record<string, string> = { totalInr: "Order value", upfrontPercent: "Upfront share", creditDays: "Negotiated credit", buybackPercent: "Unsold buyback", sourceVersion: "Source version", sourceInvoiceLines: "Invoice lines checked", sourceInvoiceAmountInr: "Source invoice value", sourceInvoiceCreditDays: "Original invoice credit", sourceInvoiceDueDate: "Original invoice due", priorFySpendInr: "Matched FY payments", supplierLimitInr: "Supplier payment ceiling", matchedPaymentCount: "Matched payment count", invoiceTotalInr: "Full invoice value", advanceInr: "Advance to pay", observedPriorFyPaidInr: "Matched FY payments", observedPeriod: "Period checked", completeFinancialYear: "Full FY covered", missingPeriod: "Missing period", sourceInvoiceRow: "Source document", beneficiary: "Verified payee", account: "Account", requestedAmountInr: "Requested loan", amountInr: "Loan amount", destination: "Destination", kyaRequired: "Agent authority check required", kyaVerified: "Agent authority verified", lender: "Lender", aprPercent: "APR", tenorMonths: "Repayment term", emiInr: "Monthly EMI", totalInterestInr: "Illustrative total interest", existingEmiInr: "Existing monthly EMI", combinedEmiInr: "Combined monthly EMI", emiCapInr: "Monthly EMI ceiling", agentMandateMaxInr: "Agent mandate ceiling", agentIdentity: "Agent identity", bureauPull: "Bureau check" };
const termLabel = (key: string) => termLabels[key] || key.replaceAll("_", " ").replace(/([a-z])([A-Z])/g, "$1 $2");
const termValue = (key: string, value: string | number | boolean) => typeof value === "boolean" ? value ? "Yes" : "No" : typeof value === "number" && key.endsWith("Inr") ? money(value) : /Percent$/.test(key) ? String(value) + "%" : /Days$/.test(key) ? String(value) + " days" : /Months$/.test(key) ? String(value) + " months" : String(value);
async function readState(): Promise<FlowState> {
  const response = await fetch("/api/flows/state?view=merchant", { cache: "no-store" });
  if (!response.ok) throw new Error("Tracked tasks could not load.");
  return response.json() as Promise<FlowState>;
}
async function command(path: string, value: unknown): Promise<{ run: FlowRun; state: FlowState }> {
  const response = await fetch("/api/flows/" + path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(value) });
  const result = await response.json() as { run: FlowRun; state: FlowState; error?: string };
  if (!response.ok) throw new Error(result.error || "This task could not advance.");
  return result;
}

function Disclosure({ item: sourceItem }: { item: FlowDisclosure }) {
  const item = { ...sourceItem, summary: displayCopy(sourceItem.summary), why: displayCopy(sourceItem.why), risks: sourceItem.risks.map(displayCopy), alternatives: sourceItem.alternatives.map(displayCopy), dataShared: sourceItem.dataShared.map(displayCopy) };
  const preferred = item.type === "payment_consent" ? ["invoiceTotalInr", "advanceInr", "upfrontPercent", "creditDays", "buybackPercent", "supplierLimitInr", "sourceInvoiceCreditDays", "sourceInvoiceDueDate"] : item.type === "loan_consent" ? ["amountInr", "lender", "aprPercent", "tenorMonths", "emiInr", "totalInterestInr", "combinedEmiInr", "emiCapInr", "kyaRequired", "kyaVerified"] : item.type === "bureau_consent" ? ["requestedAmountInr", "bureauPull", "account"] : ["totalInr", "upfrontPercent", "creditDays", "buybackPercent"];
  const primary = Object.entries(item.terms).filter(([key]) => preferred.includes(key));
  const supporting = Object.entries(item.terms).filter(([key]) => !preferred.includes(key));
  return <div className="fm-disclosure">
    <div className="fm-section-label"><ShieldCheck size={16}/>Review before you decide</div>
    <h3>{item.summary}</h3><p>{item.why}</p>
    <dl className="fm-facts"><div><dt>Original purpose</dt><dd>{item.originalIntent.description}</dd></div><div><dt>Proposed action</dt><dd>{money(item.proposedAction.amountInr)} · {item.proposedAction.payee}</dd></div><div><dt>Account / rail</dt><dd>{item.proposedAction.account} · {item.proposedAction.rail}</dd></div>{primary.map(([key, value]) => <div key={key}><dt>{termLabel(key)}</dt><dd>{termValue(key, value)}</dd></div>)}</dl>
    {supporting.length > 0 && <details className="fm-checks"><summary>Supporting evidence and authority</summary><dl className="fm-facts">{supporting.map(([key, value]) => <div key={key}><dt>{termLabel(key)}</dt><dd>{termValue(key, value)}</dd></div>)}</dl></details>}
    {item.delta.length > 0 && <div className="fm-delta"><b>What changed from your intent</b>{item.delta.map((delta, index) => <div key={delta.field + index}><span>{termLabel(delta.field)}</span><strong>{termValue(delta.field, delta.original)} → {termValue(delta.field, delta.proposed)}</strong></div>)}</div>}
    {item.risks.length > 0 && <div className="fm-list"><b>Things to consider</b><ul>{item.risks.map((risk, index) => <li key={index}>{risk}</li>)}</ul></div>}
    {item.alternatives.length > 0 && <div className="fm-list"><b>Your alternatives</b><ul>{item.alternatives.map((alternative, index) => <li key={index}>{alternative}</li>)}</ul></div>}
    {item.dataShared.length > 0 && <div className="fm-list"><b>Data in this simulated request</b><ul>{item.dataShared.map((data, index) => <li key={index}>{data}</li>)}</ul></div>}
    <small className="fm-fingerprint">Decision version {item.version} · {item.hash.slice(0, 18)}…</small>
  </div>;
}

export default function FlowMerchant({ setupRequest = 0, onSetupOpened, outletId = "all" }: { setupRequest?: number; onSetupOpened?: () => void; outletId?: string }) {
  const [state, setState] = useState<FlowState | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loadError, setLoadError] = useState("");
  const [busy, setBusy] = useState(false);
  const [pin, setPin] = useState("");
  const [showSetup, setShowSetup] = useState(false);
  const previousSetupRequest = useRef(0);
  useEffect(() => {
    if (setupRequest > previousSetupRequest.current) { setShowSetup(true); onSetupOpened?.(); }
    previousSetupRequest.current = setupRequest;
  }, [setupRequest, onSetupOpened]);
  const refresh = useCallback(async () => {
    try { setState(await readState()); setLoadError(""); }
    catch (caught) { setLoadError(caught instanceof Error ? caught.message : "Tracked tasks are unavailable."); }
  }, []);
  useEffect(() => {
    let active = true;
    const load = () => { void readState().then(result => { if (active) { setState(result); setLoadError(""); } }).catch(() => { if (active) setLoadError("Tracked tasks could not load. Try refreshing."); }); };
    load();
    const timer = window.setInterval(load, 1000);
    return () => { active = false; window.clearInterval(timer); };
  }, []);
  const run = state?.runs.find(item => item.id === selected);
  const request = state?.requests.find(item => item.id === run?.currentRequestId);
  async function start(intentId: string, delegation?: AgentDelegation) {
    setBusy(true); setError(""); setPin("");
    try { const result = await command("start", { intentId, ...(delegation ? { delegation } : {}) }); setState(result.state); setSelected(result.run.id); setShowSetup(false); }
    catch (caught) { setError(caught instanceof Error ? caught.message : "Task could not start."); }
    finally { setBusy(false); }
  }
  async function consent(decision: "approve" | "decline") {
    if (!run?.currentDisclosure) return;
    setBusy(true); setError("");
    try {
      const result = await command("consent", { runId: run.id, disclosureId: run.currentDisclosure.id, decision, pin });
      setState(result.state); setPin("");
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Sign-off could not be recorded."); }
    finally { setBusy(false); }
  }
  async function retry() {
    if (!run) return;
    setBusy(true); setError("");
    try { const result = await command("retry", { runId: run.id }); setState(result.state); }
    catch (caught) { setError(caught instanceof Error ? caught.message : "A new request could not be made."); }
    finally { setBusy(false); }
  }
  return <section className="fm-shell" aria-label="Tracked delegated tasks">
    <div className="fm-heading"><div><h2>A stock agent, on your terms</h2></div><ShieldCheck size={24}/></div>
    <p className="fm-intro">Let Munim watch purchasing signals and prepare a supplier proposal. You set the limits and approve commitments.</p>
    <button type="button" className="fm-setup-entry" disabled={busy || state?.paused} onClick={() => { setError(""); setShowSetup(true); }}><span><b>Set up a stock agent</b><small>Goal → limits → permissions → your review</small></span><ArrowRight size={19}/></button>
    {(error || loadError) && <div className="fm-alert" role="alert"><CircleAlert size={17}/><span>{error || loadError}</span><button type="button" onClick={() => { setError(""); void refresh(); }} aria-label="Refresh task status"><RefreshCw size={15}/></button></div>}
    {!state && <p className="fm-muted">Loading your agents…</p>}
    {state?.paused && <div className="fm-alert"><CircleAlert size={17}/><span>RiskOps has paused this demo session. New task actions are on hold.</span></div>}
    {state && state.runs.length > 0 && <>
      <details className="fm-task-list"><summary>Your agents and tasks <span>{state.runs.length}</span>{state.runs.some(item => item.status === "awaiting_owner") && <small>Decision needed</small>}</summary><div className="fm-run-tabs">{state.runs.map(item => <button type="button" key={item.id} aria-pressed={run?.id === item.id} onClick={() => { setSelected(item.id); setPin(""); setError(""); }}><b>{item.title}</b><small>{statusLabel(item.status)}</small></button>)}</div></details>
    </>}
    {run && <div className="fm-run" aria-live="polite">
      <div className="fm-run-top"><span className={"fm-status fm-status-" + run.status}>{statusLabel(run.status)}</span><small>{kindLabel(run.stage)}</small></div>
      <h3>{run.title}</h3><p>{displayCopy(run.summary)}</p>
      <details className="fm-checks"><summary>Your goal, limits and permissions</summary><div className="fm-original"><b>Your instruction</b><span>{run.originalIntent.description}</span></div>{run.delegation && <dl className="fm-facts fm-scope"><div><dt>Order ceiling</dt><dd>{money(run.delegation.maxOrderInr)}</dd></div><div><dt>Advance ceiling</dt><dd>{money(run.delegation.maxAdvanceInr)}</dd></div><div><dt>Supplier goal</dt><dd>{run.delegation.minCreditDays} days credit · {run.delegation.minBuybackPercent}% buyback</dd></div><div><dt>May do alone</dt><dd>{run.delegation.canNegotiate ? "Monitor, seek quotes and prepare a proposal" : "Monitor and report only"}</dd></div><div><dt>Ask you first</dt><dd>Commit to an order, change terms or send money</dd></div><div><dt>Permission ends</dt><dd>{run.delegation.validUntil}</dd></div></dl>}</details>
      {!run.currentDisclosure && run.delta.length > 0 && <div className="fm-delta"><b>What needs your attention</b>{run.delta.map((delta, index) => <div key={delta.field + index}><span>{termLabel(delta.field)}</span><strong>{termValue(delta.field, delta.original)} → {termValue(delta.field, delta.proposed)}</strong></div>)}</div>}
      {run.status === "awaiting_response" && <div className="fm-wait"><Clock3 size={19}/><div><b>{run.stage === "monitor" ? "Watching for a purchasing signal" : request?.title || `Waiting for ${kindLabel(run.stage)}`}</b><p>{run.stage === "monitor" ? "You do not need to do anything now. Munim will prepare a proposal when the simulated signal arrives, within your permissions." : request?.summary || run.summary}</p><small>{run.stage === "monitor" ? "No order placed. No money committed." : "Nothing for you to approve yet."} Demo responses arrive from the simulator.</small></div></div>}
      {run.currentDisclosure && run.status === "awaiting_owner" && <>
        <Disclosure item={run.currentDisclosure}/>
        {run.currentDisclosure.requiresPin && <label className="fm-pin">Owner PIN<input type="password" autoComplete="off" value={pin} onChange={event => setPin(event.target.value)} placeholder="Enter privately"/></label>}
        {!state?.pinConfigured && run.currentDisclosure.requiresPin && <p className="fm-alert"><LockKeyhole size={17}/><span>Owner verification needs to be configured for this local demo before approval can proceed.</span></p>}
        <div className="fm-consent-actions"><button type="button" disabled={busy || state?.paused} onClick={() => void consent("decline")}>Decline</button><button type="button" className="fm-primary" disabled={busy || state?.paused || (run.currentDisclosure.requiresPin && (!pin || !state?.pinConfigured))} onClick={() => void consent("approve")}>{busy ? "Recording…" : "Approve this decision"}<LockKeyhole size={16}/></button></div>
      </>}
      {run.status === "paused" && <button type="button" className="fm-primary" disabled={busy || state?.paused} onClick={() => void retry()}>Request a new response<RefreshCw size={16}/></button>}
      {run.status === "payment_pending" && <div className="fm-alert"><Clock3 size={18}/><span>The rail outcome is unresolved. The task is held to prevent a duplicate payment.</span></div>}
      {run.ledgerEffect && <div className="fm-success"><CheckCircle2 size={20}/><span><b>{money(run.ledgerEffect.amountInr)} · {run.ledgerEffect.type === "drawdown" ? "drawdown" : "supplier payment"} recorded</b>{typeof run.ledgerEffect.projected5NovInr === "number" && <b>5 Nov projected balance: {money(run.ledgerEffect.projected5NovInr)}</b>}<small>One simulated ledger effect. No real money moved.</small></span></div>}
      <details className="fm-checks"><summary>Updates and evidence{run.checks.length > 0 ? ` · ${run.checks.length} checks` : ""}</summary>{run.latestResponse && <div className="fm-responses"><b>{run.latestResponse.label}</b><p>{run.latestResponse.summary}</p></div>}{run.checks.map((check, index) => <div key={check.id + index}><span className={check.status === "PASS" ? "fm-good" : "fm-attention"}>{check.status === "PASS" ? <FileCheck2 size={15}/> : <CircleAlert size={15}/>}</span><p><b>{check.id.replaceAll("_", " ")} · {check.status.replaceAll("_", " ")}</b><small>{check.detail}</small></p></div>)}{run.judge && <p className="fm-judge"><ShieldCheck size={15}/><span>{run.judge.mode === "deterministic_document_scan" ? "Document instruction scan" : "Simulated LLM judge"}: {run.judge.decision}. {run.judge.reason}</span></p>}<small className="fm-task-id">Task {run.id} · trace {run.traceId}</small></details>
      <button type="button" className="fm-dismiss" onClick={() => setSelected(null)}>Close task details</button>
    </div>}
    {state && <details className="fm-other"><summary>Other things Munim can help with</summary><div className="fm-intents">{state.intents.filter(intent => intent.id !== "supplier_stock").map(intent => <button type="button" key={intent.id} disabled={busy || state.paused} onClick={() => void start(intent.id)}><span><b>{intent.title}</b><small>{intent.description}</small></span><ArrowRight size={17}/></button>)}</div></details>}
    <p className="fm-foot">Responses and money movement are simulated. Agents reset when the server restarts.</p>
    {showSetup && <AgentSetup initialOutletId={outletId} onClose={() => { setShowSetup(false); setError(""); }} onActivate={delegation => start("supplier_stock", delegation)} busy={busy} error={error}/>}
  </section>;
}
