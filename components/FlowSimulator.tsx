"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, CircleAlert, Inbox, RefreshCw, ShieldCheck } from "lucide-react";
import type { FlowRequest, FlowState } from "../lib/flow-types";
import "./FlowSimulator.css";

const kindLabel = (kind: string) => ({ supplier: "Supplier negotiation", invoice: "Invoice evidence", aa: "AA data response", judge: "Simulated LLM judge", kya: "Know Your Agent", bureau: "Bureau OTP outcome", lender: "Lender decision", payment: "Paytm rail outcome" }[kind] || kind);
const showDate = (date: string) => new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit", second: "2-digit", timeZone: "Asia/Kolkata" }).format(new Date(date));
async function readState(): Promise<FlowState> {
  const response = await fetch("/api/flows/state?view=operator", { cache: "no-store" });
  if (!response.ok) throw new Error("The incoming request queue could not load.");
  return response.json() as Promise<FlowState>;
}

export default function FlowSimulator() {
  const [state, setState] = useState<FlowState | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [lastResponse, setLastResponse] = useState("");
  useEffect(() => {
    let active = true;
    const load = () => { void readState().then(result => { if (active) setState(result); }).catch(caught => { if (active) setError(caught instanceof Error ? caught.message : "Request queue unavailable."); }); };
    load(); const timer = window.setInterval(load, 1000);
    return () => { active = false; window.clearInterval(timer); };
  }, []);
  const requests = state?.requests || [];
  const open = requests.filter(item => item.status === "open");
  const selected = requests.find(item => item.id === selectedId) ?? open[0] ?? requests.at(-1);
  const run = state?.runs.find(item => item.id === selected?.runId);
  const choices = state?.catalog.filter(item => item.kind === selected?.kind) || [];
  const ordered = [...requests].sort((a, b) => Number(b.status === "open") - Number(a.status === "open") || b.createdAt.localeCompare(a.createdAt));
  async function dispatch(request: FlowRequest, scenarioId: string) {
    setBusy(true); setError(""); setLastResponse("");
    try {
      const response = await fetch("/api/flows/respond", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ requestId: request.id, scenarioId }) });
      const result = await response.json() as { run?: { summary: string }; state?: FlowState; error?: string };
      if (!response.ok || !result.state) throw new Error(result.error || "The response could not be dispatched.");
      setState(result.state); setSelectedId(request.id); setLastResponse(result.run?.summary || "Response recorded and sent to the merchant task.");
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Response could not be dispatched."); }
    finally { setBusy(false); }
  }
  async function refresh() {
    try { setState(await readState()); setError(""); }
    catch (caught) { setError(caught instanceof Error ? caught.message : "Request queue unavailable."); }
  }
  return <section className="fs-shell" aria-label="Incoming delegated task requests">
    <div className="fs-heading"><div><span>Live request inbox</span><h2>Respond to the merchant&apos;s next request</h2><p>Requests appear here when a merchant starts a tracked task. Choose a response for that exact request; the merchant sees its result.</p></div><Link href="/riskops">Open live RiskOps<ArrowRight size={16}/></Link></div>
    <div className="fs-summary"><span><Inbox size={16}/><b>{open.length}</b> waiting</span><span><ShieldCheck size={16}/><b>{state?.runs.length || 0}</b> tasks</span><span>Revision {state?.revision ?? "…"} · refreshes every second</span><button onClick={() => void refresh()} aria-label="Refresh incoming task requests"><RefreshCw size={15}/></button></div>
    {error && <div className="fs-alert" role="alert"><CircleAlert size={18}/>{error}</div>}
    {lastResponse && <div className="fs-confirm" role="status"><CheckCircle2 size={18}/>{lastResponse}</div>}
    {state?.paused && <div className="fs-alert"><CircleAlert size={18}/>RiskOps paused the demo session. Responses cannot advance tasks until resumed.</div>}
    <div className="fs-workspace">
      <aside className="fs-inbox" aria-label="Task request list">
        {ordered.length === 0 ? <div className="fs-empty"><Inbox size={28}/><b>No merchant requests yet</b><p>Open Ask Munim in the merchant app and choose a business intent. Its next external request will appear here.</p></div> : ordered.map(item => <button type="button" key={item.id} className={selected?.id === item.id ? "is-selected" : ""} onClick={() => { setSelectedId(item.id); setLastResponse(""); }}><span><b>{kindLabel(item.kind)}</b><small>{item.status}</small></span><strong>{item.title}</strong><p>{item.summary}</p><small>{showDate(item.createdAt)} IST · {item.id.slice(0, 15)}…</small></button>)}
      </aside>
      <div className="fs-detail">
        {!selected ? <div className="fs-empty"><h3>Waiting for an incoming request</h3><p>Supplier, account data, lender, judge, authority, and payment responses are controlled from this inbox.</p></div> : <>
          <div className="fs-request-heading"><span>{kindLabel(selected.kind)}</span><b className={"fs-request-status fs-request-" + selected.status}>{selected.status}</b></div>
          <h3>{selected.title}</h3><p className="fs-request-summary">{selected.summary}</p>
          {run && <div className="fs-intent"><b>Original merchant intent</b><p>{run.originalIntent.description}</p><small>{run.title} · {run.id}</small></div>}
          <dl className="fs-request-ids"><div><dt>Request</dt><dd>{selected.id}</dd></div><div><dt>Trace</dt><dd>{selected.traceId}</dd></div><div><dt>Expected data</dt><dd>{selected.expectedDataTypes.join(", ") || "Response outcome"}</dd></div></dl>
          <details className="fs-payload"><summary>Inspect the request payload</summary><pre>{JSON.stringify(selected.payload, null, 2)}</pre></details>
          {selected.status === "open" ? <div className="fs-choices"><h4>Choose the simulated response</h4>{choices.map(choice => <button type="button" key={choice.id} disabled={busy || state?.paused} onClick={() => void dispatch(selected, choice.id)}><span><b>{choice.label}</b><small>{choice.description}</small></span><ArrowRight size={17}/></button>)}{choices.length === 0 && <p>No matching response choices are available for this request.</p>}</div> : <div className="fs-response"><b>{selected.response?.label || "This request is closed"}</b><p>{selected.response?.summary || "A new request must be selected before another response can be sent."}</p><small>Closed request responses cannot be replayed.</small></div>}
          {run?.status === "awaiting_owner" && <div className="fs-owner-hold"><ShieldCheck size={18}/><span>Waiting for the merchant&apos;s informed sign-off. Review the exact disclosure and intent delta in RiskOps; the simulator cannot approve it.</span></div>}
        </>}
      </div>
    </div>
    {state && <details className="fs-intent-catalog"><summary>Merchant intents available in this demo · {state.intents.length}</summary><div>{state.intents.map(intent => <article key={intent.id}><b>{intent.title}</b><p>{intent.description}</p></article>)}</div></details>}
    <p className="fs-footnote">The operator responses and judge outputs are synthetic fixtures. Each response is correlated to one open request. State is shared across local browser tabs and resets on server restart; these roles are not authenticated users.</p>
  </section>;
}
