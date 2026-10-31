"use client";

import { useEffect, useMemo, useState } from "react";
import { Activity, ArrowLeft, ArrowRight, BadgeCheck, Bell, Check, CheckCircle2, ChevronRight, CircleAlert, FileText, Handshake, Home, Info, Landmark, LockKeyhole, RotateCcw, ShieldCheck, Sparkles, Store, Wallet } from "lucide-react";
import RiskOps, { type CaseRecord } from "../components/RiskOps";

type Screen = "home" | "plan" | "munim" | "supplier" | "mandate" | "guard" | "capital" | "data" | "evidence";
type Kind = "supplier" | "aa" | "lenders";
type Cash = {
  business: { name: string; owner: string; outlets: string[] };
  homePaytmToday: { totalInr: number; outlets: { outlet: string; amountInr: number }[] };
  monthlyAllChannelCollectionsInr: number; existingMonthlyEmiInr: number; sourceNote: string;
  cashPlan: { label: string; dailyBalanceNote: string;
    anchors: { firstNegativeDate: string; lowestDate: string; lowestBalanceInr: number; recoveryAboveZeroDate: string };
    dailyBalanceSeries?: { date: string; balanceInr: number; inflowForecastInr: number; knownOutflowsInr: number }[] | null;
    outflows: { id: string; date: string; payee: string; amountInr: number; quality: string; invoiceId?: string; outletSplit?: { outlet: string; amountInr: number }[] }[];
  };
};
type Option = { id: string; rank: number; title: string; costLabel: string; amountInr?: number; destinationAccountMasked?: string; conditions: string[]; effectOn5Nov: { balanceInr: number | null; note?: string } };
type Options = { basis: string; options: Option[] };
type Lender = { id: string; name: string; type: string; aprPercent: number; tenorMonths: number; emiInr: number; totalInterestInr: number; totalMonthlyEmiInr: number; underCap: boolean; earlyRepayment?: { afterDays: number; estimatedInterestInr: number } };
type Lenders = { scheduleLabel: string; emiCap: { monthlyCollectionsInr: number; existingMonthlyEmiInr: number; percentage: number; maxTotalMonthlyEmiInr: number }; offers: Lender[] };
type Event = { seq: number; kind: Kind; scenarioId: string; requestId?: string | null; timestamp: string; payload: {
  candidate?: { totalAmount: number; upfrontPercent: number; supplierId: string; supplierAccount: string; beneficiaryName?: string; supplierMessage?: string };
  offers?: Lender[];
  emiCap?: Lenders["emiCap"];
  status?: string;
  source?: string;
} };
type Simulator = { latestSeq: number; latest: Record<Kind, Event | null>; events: Event[] };
type RequestState = { cursor: number; requestId?: string; event?: Event; waiting: boolean };
type Action = Record<string, string | number | undefined>;
type Guard = { decision: "PASS" | "BLOCK" | "ESCALATE"; checks: { id: string; status: string; detail: string }[]; approval_id?: string; action_hash?: string; needs_verification?: boolean; reason?: string; evidence_entry?: Entry | null };
type Execution = { outcome: "done-simulated" | "requested-waiting" | "blocked"; balance_on_5_nov?: number; ledger_effect?: number; reason?: string };
type Entry = { seq: number; timestamp: string; actor?: string; outcome?: string; hash?: string; action?: Record<string, unknown> };
type Verification = { ok: boolean; first_broken_seq?: number | null };
type PauseState = { paused: boolean; scope: string; durable: boolean };
type DataSummary = {
  synthetic: boolean;
  asOf: string;
  sources: Record<string, unknown>;
  outlets: { id: string; name: string; paytmToday: number; paytmAverageMonthly: number; averageMonthlyAllChannelCollections: number; diwaliWeek2025Multiplier: number; monthlyTarget: number }[];
  supplier: { id: string; name: string; priorFyDebitCount: number; priorFyDebitTotal: number; derivedLimit: number; limitRule: string; aaAvailable: boolean; sourceLabel: string };
  invoice: { number: string; amount: number; verifiedAccountLast4: string; hasFullBody: boolean; integrity: string };
};

const money = (n?: number | null) => typeof n === "number" ? (n < 0 ? "−" : "") + "₹" + new Intl.NumberFormat("en-IN").format(Math.abs(n)) : "Not supplied";
const dateLabel = (s?: string) => {
  if (!s) return "Not supplied";
  const d = new Date(s + "T12:00:00+05:30");
  return Number.isNaN(d.getTime()) ? s : new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", timeZone: "Asia/Kolkata" }).format(d);
};
async function get<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  const data = await response.json() as T & { error?: string; reason?: string; outcome?: string };
  if (!response.ok && !data.outcome) throw new Error(data.error || data.reason || "Demo service unavailable");
  return data;
}
const body = (value: unknown): RequestInit => ({ method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(value) });
const labels = { home: "Sharma General Stores", plan: "Cash plan preview", munim: "Ask Munim AI", supplier: "Supplier terms", mandate: "Your delegation", guard: "Intent Guard", capital: "Capital", data: "Your data", evidence: "Evidence" };
const Pill = ({ children, tone = "blue" }: { children: React.ReactNode; tone?: string }) => <span className={"pm-pill pm-pill-" + tone}>{children}</span>;
const Heading = ({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) => <div className="pm-section-head"><h2>{title}</h2>{action && <button type="button" onClick={onAction}>{action}<ChevronRight size={16}/></button>}</div>;

function AnchorChart({ cash }: { cash: Cash | null }) {
  const a = cash?.cashPlan.anchors;
  const daily = cash?.cashPlan.dailyBalanceSeries || [];
  const first = daily.find(item => item.date === a?.firstNegativeDate)?.balanceInr;
  const recovered = daily.find(item => item.date === a?.recoveryAboveZeroDate)?.balanceInr;
  return <div className="pm-chart pm-anchor-chart" role="img" aria-label={`First negative on ${dateLabel(a?.firstNegativeDate)} at ${money(first)}, projected low ${money(a?.lowestBalanceInr)} on ${dateLabel(a?.lowestDate)}, back above zero on ${dateLabel(a?.recoveryAboveZeroDate)} at ${money(recovered)}.`}>
    <div><span>{dateLabel(a?.firstNegativeDate)}</span><b>{typeof first === "number" ? money(first) : "Below ₹0"}</b><small>First negative</small></div>
    <div className="low"><span>{dateLabel(a?.lowestDate)}</span><b>{money(a?.lowestBalanceInr)}</b><small>Projected low</small></div>
    <div><span>{dateLabel(a?.recoveryAboveZeroDate)}</span><b>{typeof recovered === "number" ? money(recovered) : "Above ₹0"}</b><small>Back above zero</small></div>
  </div>;
}

function answerFor(question: string, cash: Cash | null, options: Options | null): string {
  if (!cash || !options) return "Loading the synthetic cash plan.";
  const a = cash.cashPlan.anchors;
  const gupta = cash.cashPlan.outflows.find(item => item.id === "gupta");
  if (/gupta|supplier|invoice|defer|split/i.test(question))
    return "The listed " + (gupta?.invoiceId || "Gupta") + " bill is " + money(gupta?.amountInr) + " due " + dateLabel(gupta?.date) + ". Asking for a deferral is conditional on Gupta agreeing. No revised cash balance has been supplied.";
  if (/lender|loan|emi|capital|credit/i.test(question))
    return "The illustrative plan offers a " + money(options.options.find(item => item.id === "drawdown")?.amountInr) + " Lender A drawdown. Open Capital to request the simulated offers and compare their EMI cap checks.";
  return "The illustrative plan marks a projected low of " + money(a.lowestBalanceInr) + " on " + dateLabel(a.lowestDate) + ". It first turns negative on " + dateLabel(a.firstNegativeDate) + " and is above zero on " + dateLabel(a.recoveryAboveZeroDate) + ". Review the three cost-ordered choices.";
}

export default function HomePage() {
  const [mode, setMode] = useState<"merchant" | "riskops">("merchant");
  const [screen, setScreen] = useState<Screen>("home");
  const [cash, setCash] = useState<Cash | null>(null);
  const [options, setOptions] = useState<Options | null>(null);
  const [lenders, setLenders] = useState<Lenders | null>(null);
  const [dataSummary, setDataSummary] = useState<DataSummary | null>(null);
  const [requests, setRequests] = useState<Partial<Record<Kind, RequestState>>>({});
  const [cases, setCases] = useState<CaseRecord[]>([]);
  const [latestCase, setLatestCase] = useState<CaseRecord | null>(null);
  const [paused, setPaused] = useState(false);
  const [question, setQuestion] = useState("Diwali ke liye paisa kahan se aayega?");
  const [answer, setAnswer] = useState("");
  const [whatIf, setWhatIf] = useState(false);
  const [selectedLender, setSelectedLender] = useState("A");
  const [action, setAction] = useState<Action | null>(null);
  const [guard, setGuard] = useState<Guard | null>(null);
  const [execution, setExecution] = useState<Execution | null>(null);
  const [pin, setPin] = useState("");
  const [idempotencyKey, setIdempotencyKey] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [verification, setVerification] = useState<Verification | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([get<Cash>("/api/cashplan"), get<Options>("/api/options"), get<Lenders>("/api/lenders")])
      .then(([c, o, l]) => { setCash(c); setOptions(o); setLenders(l); })
      .catch(e => setError(e instanceof Error ? e.message : "Synthetic data could not load."));
    get<DataSummary>("/api/data-summary").then(setDataSummary)
      .catch(() => setError("Outlet and bank-data summary could not load."));
    get<PauseState>("/api/control/pause").then(state => setPaused(state.paused))
      .catch(() => setError("Pause status could not load."));
  }, []);
  const aaEventSeq = requests.aa?.event?.seq;
  useEffect(() => {
    if (!aaEventSeq) return;
    get<DataSummary>("/api/data-summary").then(setDataSummary)
      .catch(() => setError("The bank-data summary could not refresh."));
  }, [aaEventSeq]);
  useEffect(() => {
    if (!Object.values(requests).some(item => item?.waiting)) return;
    const timer = setInterval(() => {
      get<Simulator>("/api/simulator/state").then(state => {
        setRequests(previous => {
          const next = { ...previous };
          let changed = false;
          for (const kind of ["supplier", "aa", "lenders"] as Kind[]) {
            const request = previous[kind];
            const event = state.latest?.[kind];
            // Only a newer response to this exact request counts.
            if (request?.waiting && event && event.seq > request.cursor && event.requestId === request.requestId) {
              next[kind] = { cursor: request.cursor, requestId: request.requestId, event, waiting: false };
              changed = true;
            }
          }
          return changed ? next : previous;
        });
      }).catch(() => {});
    }, 1000);
    return () => clearInterval(timer);
  }, [requests]);
  const choices = useMemo(() => [...(options?.options || [])].sort((a, b) => a.rank - b.rank), [options]);
  const drawdown = choices.find(item => item.id === "drawdown");
  const gupta = cash?.cashPlan.outflows.find(item => item.id === "gupta");
  const supplierEvent = requests.supplier?.event;
  const receivedCandidate = supplierEvent?.payload.candidate;
  const receivedUpfrontRaw = receivedCandidate && Number.isSafeInteger(receivedCandidate.totalAmount) &&
    receivedCandidate.totalAmount > 0 &&
    typeof receivedCandidate.upfrontPercent === "number" &&
    receivedCandidate.upfrontPercent > 0 && receivedCandidate.upfrontPercent <= 100
    ? receivedCandidate.totalAmount * receivedCandidate.upfrontPercent / 100 : null;
  const receivedUpfront = Number.isSafeInteger(receivedUpfrontRaw) ? receivedUpfrontRaw : null;
  const aaEvent = requests.aa?.event;
  const lenderEvent = requests.lenders?.event;
  const visibleLenders = lenderEvent?.payload?.offers ? { ...lenders, offers: lenderEvent.payload.offers as Lender[], emiCap: lenderEvent.payload.emiCap as Lenders["emiCap"] } : null;

  async function refreshEvidence() {
    try {
      const [log, checked] = await Promise.all([get<{ entries: Entry[] }>("/api/evidence"), get<Verification>("/api/evidence/verify")]);
      setEntries(log.entries || []); setVerification(checked);
    } catch (e) { setVerification(null); setError(e instanceof Error ? e.message : "Evidence unavailable."); }
  }
  async function changePause(next: boolean) {
    try {
      const state = await get<PauseState>("/api/control/pause", body({ paused: next }));
      setPaused(state.paused);
    } catch (e) { setError(e instanceof Error ? e.message : "Pause control unavailable."); }
  }
  useEffect(() => {
    if (screen !== "evidence") return;
    let active = true;
    Promise.all([get<{ entries: Entry[] }>("/api/evidence"), get<Verification>("/api/evidence/verify")])
      .then(([log, checked]) => {
        if (active) { setEntries(log.entries || []); setVerification(checked); }
      })
      .catch(e => {
        if (active) { setVerification(null); setError(e instanceof Error ? e.message : "Evidence unavailable."); }
      });
    return () => { active = false; };
  }, [screen]);
  async function request(kind: Kind) {
    setError("");
    try {
      const started = await get<{ kind: Kind; cursor: number; requestId: string }>("/api/simulator/request", body({ kind }));
      setRequests(previous => ({ ...previous, [kind]: { cursor: started.cursor, requestId: started.requestId, waiting: true } }));
    } catch (e) { setError(e instanceof Error ? e.message : "Simulator unavailable."); }
  }
  async function evaluateAction(next: Action) {
    setBusy(true); setError(""); setAction(next); setGuard(null); setExecution(null); setPin("");
    setIdempotencyKey(crypto.randomUUID());
    try {
      const result = await get<Guard>("/api/guard/evaluate", body({ action: next }));
      setGuard(result); setScreen("guard"); await refreshEvidence();
    } catch (e) { setError(e instanceof Error ? e.message : "Guard check failed."); }
    finally { setBusy(false); }
  }
  async function evaluateDrawdown() {
    if (!drawdown?.amountInr || !visibleLenders) return;
    await evaluateAction({ type: "drawdown", lender_id: "A", amount: drawdown.amountInr, destination_account: drawdown.destinationAccountMasked || "**4029", invoice_id: "GD-1182" });
  }
  async function evaluateSupplier() {
    if (!supplierEvent || !gupta) return;
    const candidate = supplierEvent.payload.candidate;
    if (!candidate) {
      setError("The received response has no supplier quote. No payment action was prepared.");
      return;
    }
    const proposedPayment = candidate.totalAmount * candidate.upfrontPercent / 100;
    if (!Number.isSafeInteger(candidate.totalAmount) || candidate.totalAmount <= 0 ||
      typeof candidate.upfrontPercent !== "number" || candidate.upfrontPercent <= 0 ||
      candidate.upfrontPercent > 100 || !Number.isSafeInteger(proposedPayment) || proposedPayment <= 0) {
      setError("The received quote lacks valid price or upfront terms. No payment action was prepared.");
      return;
    }
    setBusy(true); setError(""); setExecution(null); setPin("");
    try {
      const raw = await get<Omit<CaseRecord, "id" | "timestamp">>("/api/analyze", body({ event_seq: supplierEvent.seq }));
      const reviewed: CaseRecord = { ...raw, id: "EP-" + crypto.randomUUID().slice(0, 8).toUpperCase(), timestamp: new Date().toISOString() };
      setLatestCase(reviewed); setCases(previous => [reviewed, ...previous].slice(0, 20));
      const next: Action = { type: "supplier_payment", supplier_id: "gupta", amount: proposedPayment,
        simulator_event_seq: supplierEvent.seq,
        beneficiary_name: candidate.beneficiaryName || "Gupta Distributors",
        beneficiary_account: candidate.supplierAccount || "XXXX7781", invoice_id: gupta.invoiceId || "GD-1182" };
      setAction(next);
      const result = await get<Guard>("/api/guard/evaluate", body({ action: next }));
      setGuard(result); setScreen("guard"); await refreshEvidence();
    } catch (e) { setError(e instanceof Error ? e.message : "Supplier check failed."); }
    finally { setBusy(false); }
  }
  async function execute() {
    if (!action || !guard?.approval_id || !pin || !idempotencyKey) return;
    setBusy(true); setError("");
    try {
      const result = await get<Execution>("/api/execute", body({ action, approval_id: guard.approval_id, pin, idempotency_key: idempotencyKey }));
      setExecution(result); setPin(""); await refreshEvidence();
    } catch (e) { setError(e instanceof Error ? e.message : "Simulated action refused."); }
    finally { setBusy(false); }
  }
  function choose(item: Option) {
    if (item.id === "supplier_deferral") setScreen("supplier");
    else if (item.id === "drawdown") setScreen("capital");
    else setWhatIf(true);
  }
  function resetView() {
    setMode("merchant"); setScreen("home"); setQuestion("Diwali ke liye paisa kahan se aayega?");
    setAnswer(""); setWhatIf(false); setSelectedLender("A"); setAction(null); setGuard(null);
    setExecution(null); setPin(""); setError("");
  }
  function back() {
    const previous: Partial<Record<Screen, Screen>> = { plan: "home", munim: "home", supplier: "plan", mandate: "supplier", guard: action?.type === "drawdown" ? "capital" : "supplier", capital: "plan", data: "home", evidence: "home" };
    setScreen(previous[screen] || "home");
  }
  if (mode === "riskops") return <RiskOps cases={cases} paused={paused} onPauseChange={next => void changePause(next)} onBack={() => setMode("merchant")} />;
  return <main className="pm-shell">
    <aside className="pm-side" aria-label="Demo navigation">
      <div className="pm-side-brand"><span>paytm</span><small>for Business</small><strong>Munim</strong></div>
      <p>A merchant decision, from early warning to a guarded action.</p>
      <nav>{(["home", "plan", "capital", "guard", "evidence"] as Screen[]).map((item, index) => <button type="button" key={item} className={screen === item ? "active" : ""} onClick={() => setScreen(item)}><i>{index + 1}</i><span><b>{labels[item]}</b><small>{item === "evidence" ? "Verify chain" : "Review demo"}</small></span></button>)}</nav>
      <div className="pm-side-foot"><Pill>Synthetic demo</Pill><span>Fixture date: 30 Oct 2026</span></div>
    </aside>
    <section className="pm-stage">
      <header className="pm-stage-head"><div><p>PayTMunim / Demo journey</p><h1>Give the owner a plan. Keep the mandate in control.</h1></div><div>
        <button type="button" className="pm-quiet" onClick={resetView}><RotateCcw size={16}/>Restart view</button>
        <button type="button" className="pm-risk-button" onClick={() => setMode("riskops")}><ShieldCheck size={17}/>RiskOps view</button>
      </div></header>
      <div className="pm-phone" aria-label="Merchant app">
        <div className="pm-statusbar"><span>9:41</span><span>●●● ▰</span></div>
        <header className="pm-app-head"><div>{screen !== "home" && <button type="button" aria-label="Back" onClick={back}><ArrowLeft size={22}/></button>}{screen === "home" ? <span className="pm-logo">paytm <small>for Business</small></span> : <strong>{labels[screen]}</strong>}</div><button type="button" aria-label="Open evidence" onClick={() => setScreen("evidence")}><Bell size={19}/>{entries.length > 0 && <i/>}</button></header>
        <div className="pm-synthetic"><span/>Synthetic demo data - nothing here is real.<em>30 Oct 2026</em></div>
        <div className="pm-scroll" key={screen}>
          {error && <div className="pm-error" role="alert"><CircleAlert size={17}/>{error}<button type="button" aria-label="Dismiss" onClick={() => setError("")}>×</button></div>}
          {screen === "home" && <div className="pm-screen">
            <p className="pm-greeting">Good evening, {cash?.business.owner || "Rakesh"}</p>
            <button type="button" className="pm-ask" onClick={() => setScreen("munim")}><span><Sparkles size={22}/></span><b>Ask Munim AI<small>“Diwali ke liye paisa kahan se aayega?”</small></b><ArrowRight size={18}/></button>
            <div className="pm-gap"><div className="pm-gap-top"><span><Activity size={16}/>Upcoming payout planning</span><Pill tone="amber">Projected</Pill></div><p>Cash may run short on <b>{dateLabel(cash?.cashPlan.anchors.lowestDate)}</b></p><strong>{money(cash?.cashPlan.anchors.lowestBalanceInr)}</strong><div className="pm-gap-notes"><span>Gupta stock · rent · bonus</span><span>Above zero on {dateLabel(cash?.cashPlan.anchors.recoveryAboveZeroDate)}</span></div><button type="button" className="pm-primary" onClick={() => setScreen("plan")}>Review relief options &amp; scenarios<ArrowRight size={18}/></button></div>
            <Heading title="Today on Paytm" action="See sources" onAction={() => setScreen("data")}/>
            <div className="pm-today"><strong>{money(cash?.homePaytmToday.totalInr)}</strong><small>Collections to 12:40 pm · synthetic Paytm-only sample</small><div>{cash?.homePaytmToday.outlets.map(item => <span key={item.outlet}>{item.outlet} <b>{money(item.amountInr)}</b></span>)}</div></div>
            <button type="button" className="pm-row" onClick={() => setScreen("data")}><span className="pm-row-icon pm-green-bg"><Store size={19}/></span><span><b>How each outlet is doing</b><small>Payment pace and last Diwali&apos;s demand signal</small></span><ChevronRight size={18}/></button>
            <Heading title="Needs your attention" action="View all" onAction={() => setScreen("evidence")}/>
            <button type="button" className="pm-row" onClick={() => setScreen("supplier")}><span className="pm-row-icon"><Handshake size={19}/></span><span><b>Supplier terms</b><small>Ask Gupta to defer or split GD-1182</small></span><ChevronRight size={18}/></button>
            <button type="button" className="pm-row" onClick={() => setScreen("data")}><span className="pm-row-icon pm-green-bg"><BadgeCheck size={19}/></span><span><b>Sources and gaps</b><small>See what is supplied and missing</small></span><ChevronRight size={18}/></button>
            <button type="button" className="pm-capital-tile" onClick={() => setScreen("capital")}><Landmark size={20}/><span><b>Capital when you need it</b><small>Request illustrative lender offers</small></span><ChevronRight size={18}/></button>
          </div>}
          {screen === "plan" && <div className="pm-screen">
            <div className="pm-lead"><p>30 Oct–7 Nov · all outlets</p><h2>A gap before Diwali</h2><span>Projected low on {dateLabel(cash?.cashPlan.anchors.lowestDate)}</span><strong className="pm-negative">{money(cash?.cashPlan.anchors.lowestBalanceInr)}</strong></div>
            <p className="pm-chart-label">{cash?.cashPlan.label || "Illustrative projection from the listed bills - not a measured future"}</p>
            <AnchorChart cash={cash}/>
            {!!cash?.cashPlan.dailyBalanceSeries?.length && <div className="pm-daily-series" aria-label="Modeled closing cash from 4 to 7 November"><b>Modeled closing cash · decision window</b>{cash.cashPlan.dailyBalanceSeries.filter(item => item.date >= "2026-11-04" && item.date <= "2026-11-07").map(item => <div key={item.date}><span>{dateLabel(item.date)}</span><strong className={item.balanceInr < 0 ? "negative" : "positive"}>{money(item.balanceInr)}</strong></div>)}<small>Forecast inflows and listed outflows; no future bank balance is measured.</small></div>}
            <div className="pm-source"><Info size={16}/>{cash?.cashPlan.dailyBalanceNote || "This view highlights three modeled dates."}<button type="button" onClick={() => setScreen("data")}>Sources</button></div>
            <Heading title="Planned outflows"/>
            <div className="pm-ledger">{cash?.cashPlan.outflows.map(item => <div key={item.id}><span>{dateLabel(item.date)}</span><span>{item.payee}{item.invoiceId ? " · " + item.invoiceId : ""}{item.quality === "estimate" && <Pill tone="amber">Estimate</Pill>}</span><b>{money(item.amountInr)}</b></div>)}</div>
            <Heading title="Three ways to cover the gap"/>
            {choices.map(item => <button type="button" className="pm-option" key={item.id} onClick={() => choose(item)}><i>{item.rank}</i><span><b>{item.title}</b><small>{item.costLabel}</small><em>{typeof item.effectOn5Nov.balanceInr === "number" ? "5 Nov: " + money(item.effectOn5Nov.balanceInr) + (item.id === "cut_stock" ? " · illustrative arithmetic" : "") : item.effectOn5Nov.note || "Effect not supplied"}</em></span><ChevronRight size={18}/></button>)}
            {whatIf && <div className="pm-note"><b>Stock reduction · illustrative</b><p>{choices.find(item => item.id === "cut_stock")?.conditions.join(" ")}</p><p>Payment amounts do not reveal which products sold.</p><button type="button" onClick={() => setWhatIf(false)}>Close</button></div>}
          </div>}
          {screen === "munim" && <div className="pm-screen pm-chat">
            <form className="pm-ask-form" onSubmit={event => { event.preventDefault(); setAnswer(answerFor(question, cash, options)); }}><label htmlFor="pm-question">Ask about cash, suppliers, or lenders</label><input id="pm-question" value={question} onChange={event => setQuestion(event.target.value)}/><button type="submit" className="pm-primary">Ask Munim<ArrowRight size={17}/></button></form>
            <div className="pm-answer"><span><Sparkles size={18}/></span><div><b>Munim</b><p>{answer || answerFor(question, cash, options)}</p><small>Scripted demo response · numbers from backend tools</small></div></div>
            <Heading title="Choose what to explore"/>
            <button type="button" className="pm-row" onClick={() => setScreen("plan")}><Activity size={19}/><span><b>See cash gap and options</b><small>Supplied anchors and outflows</small></span><ChevronRight size={18}/></button>
            <button type="button" className="pm-row" onClick={() => setScreen("supplier")}><Handshake size={19}/><span><b>Ask Gupta for terms</b><small>Wait for a simulated supplier reply</small></span><ChevronRight size={18}/></button>
            <button type="button" className="pm-row" onClick={() => setScreen("capital")}><Landmark size={19}/><span><b>Compare lenders</b><small>Owner PIN controls a passing drawdown</small></span><ChevronRight size={18}/></button>
          </div>}
          {screen === "supplier" && <div className="pm-screen">
            <div className="pm-lead"><p>Gupta Distributors · invoice {gupta?.invoiceId || "GD-1182"}</p><h2>Ask for room to stock up</h2><span>Deferral or a split costs ₹0 only if Gupta agrees. No revised terms are guaranteed.</span></div>
            <div className="pm-intent"><div><Handshake size={17}/><b>Listed supplier bill</b></div><p>{money(gupta?.amountInr)} due {dateLabel(gupta?.date)}. No supplier is contacted by this demo.</p></div>
            <button type="button" className="pm-row pm-mandate-link" onClick={() => setScreen("mandate")}><ShieldCheck size={19}/><span><b>View guard boundaries</b><small>Identity, account, amount limit, and owner approval</small></span><ChevronRight size={18}/></button>
            <button type="button" className="pm-primary pm-full" onClick={() => void request("supplier")}>Request supplier response<ArrowRight size={18}/></button>
            {requests.supplier?.waiting && <div className="pm-hold"><CircleAlert size={18}/><span><b>Requested - waiting (simulated)</b><small>Waiting for Gupta&apos;s response.</small></span></div>}
            {supplierEvent && !requests.supplier?.waiting && <div className="pm-loan-step"><div><Handshake size={19}/><b>Supplier response received</b></div><p>{String(receivedCandidate?.supplierMessage || "A supplier response was received.")}</p><small>{receivedCandidate?.beneficiaryName ? "Proposed beneficiary name: " + String(receivedCandidate.beneficiaryName) : "Registered payee on file: Gupta Distributors; reply did not supply a name."}</small><small>Conditional upfront payment from quote: {money(receivedUpfront)}. The listed {money(gupta?.amountInr)} invoice stays in the baseline plan.</small><small>Received after this request · event #{supplierEvent.seq}</small><button type="button" className="pm-primary pm-full" disabled={busy} onClick={() => void evaluateSupplier()}>{busy ? "Checking…" : "Check received response"}<ArrowRight size={18}/></button></div>}
            <p className="pm-caption">{aaEvent && dataSummary?.supplier.aaAvailable ? "The synthetic AA sample has released prior-FY Gupta payments for the guard." : "Request a simulated AA response before the guard uses prior-FY Gupta payments."} The full original GD-1182 invoice body is still unavailable.</p>
          </div>}
          {screen === "mandate" && <div className="pm-screen">
            <div className="pm-lead"><p>Owner boundaries</p><h2>What the guard can verify</h2><span>Missing requirements fail closed.</span></div>
            <div className="pm-mandate-table"><div><span>Drawdown destination</span><b>Owner account **4029</b></div><div><span>Drawdown ceiling</span><b>₹2,00,000</b></div><div><span>Approved lenders</span><b>Lender A, B, C</b></div><div><span>Supplier name</span><b>Gupta Distributors exactly</b></div><div><span>Supplier payment ceiling</span><b>{aaEvent && dataSummary?.supplier.aaAvailable ? money(dataSummary.supplier.derivedLimit) : "Awaiting AA sample"}</b></div></div>
            <div className="pm-hold"><CircleAlert size={18}/><span><b>Still needs verification</b><small>{aaEvent && dataSummary?.supplier.aaAvailable ? "The ceiling comes from 49 synthetic, same-supplier bank debits. The full GD-1182 invoice body is unavailable for instruction checks." : "Request the synthetic AA response before the guard uses prior-FY Gupta payments. The full GD-1182 invoice body is also unavailable."}</small></span></div>
            <button type="button" className="pm-primary pm-full" onClick={() => setScreen("supplier")}>Return to supplier request<ArrowRight size={18}/></button>
          </div>}
          {screen === "guard" && <div className="pm-screen" aria-live="polite">
            {!guard ? <div className="pm-empty"><ShieldCheck size={30}/><h2>No guard check yet</h2><p>Request an offer or supplier response to run the deterministic check.</p><button type="button" className="pm-primary" onClick={() => setScreen("capital")}>Go to Capital<ArrowRight size={18}/></button></div> : <>
              <div className={"pm-result pm-result-" + guard.decision.toLowerCase()}><Pill tone={guard.decision === "PASS" ? "green" : guard.decision === "BLOCK" ? "red" : "amber"}>{guard.decision === "PASS" ? "Guard passed" : guard.decision === "BLOCK" ? "Blocked" : "Needs owner"}</Pill><h2>{guard.decision === "PASS" ? "Requested - waiting (simulated)" : "This action cannot proceed"}</h2><p>{guard.reason || guard.checks.find(item => item.status !== "PASS")?.detail || "The checks are recorded below."}</p></div>
              {latestCase && action?.type === "supplier_payment" && <div className="pm-guard-summary"><span>Supplier intent check</span><b>{latestCase.decision}</b><small>{latestCase.reasons?.[0]?.message || "Runtime action compared with merchant intent."}</small></div>}
              <div className="pm-guard-summary"><span>Server guard action</span><b>{action?.type === "drawdown" ? "Lender A drawdown of " + money(Number(action.amount)) : "Supplier payment to " + action?.beneficiary_name}</b><small>{guard.needs_verification ? "Needs verification · no execution" : "Owner PIN is required for simulated execution."}</small></div>
              <Heading title="Rules and drift checks"/><div className="pm-checks">{guard.checks.map((item, index) => <div key={item.id + index}><span className={item.status === "PASS" ? "pass" : item.status === "BLOCK" ? "block" : "warn"}>{item.status === "PASS" ? <Check size={15}/> : <CircleAlert size={15}/>}</span><div><b>{item.id.replaceAll("_", " ")}</b><small>{item.detail} · {item.status === "NEEDS_VERIFICATION" ? "Needs verification" : item.status}</small></div></div>)}</div>
              <div className="pm-ai-note"><ShieldCheck size={19}/><div><b>AI can stop or escalate, never approve</b><small>Fixed limits are enforced in code. Only the owner PIN can approve a passing action.</small></div></div>
              {guard.action_hash && <div className="pm-evidence-hash"><FileText size={16}/><span>Action hash</span><code>{guard.action_hash.slice(0, 16)}…</code></div>}
              {guard.decision === "PASS" && !execution && action?.type === "drawdown" && <div className="pm-consent"><b>Owner approval · simulated</b><p>This request is waiting. Enter the owner PIN to attempt the simulated drawdown. No real money moves.</p><label htmlFor="pm-pin">Owner PIN</label><input id="pm-pin" type="password" autoComplete="off" value={pin} onChange={event => setPin(event.target.value)} placeholder="Enter PIN"/><button type="button" className="pm-primary pm-full" disabled={!pin || busy} onClick={() => void execute()}>{busy ? "Checking…" : "Approve and simulate"}<LockKeyhole size={17}/></button></div>}
              {execution?.outcome === "done-simulated" && <div className="pm-success"><CheckCircle2 size={20}/><span><b>Done (simulated){typeof execution.balance_on_5_nov === "number" ? " - 5 Nov now " + money(execution.balance_on_5_nov) : ""}</b><small>One simulated ledger effect was recorded. No real funds moved.</small></span></div>}
              {execution?.outcome === "blocked" && <div className="pm-hold"><CircleAlert size={18}/><span><b>Execution refused</b><small>{execution.reason || "Zero ledger effect."}</small></span></div>}
              {guard.decision !== "PASS" && <div className="pm-hold"><CircleAlert size={18}/><span><b>{guard.needs_verification ? "Needs verification" : "Held for review"}</b><small>{guard.evidence_entry ? "No action can proceed. The blocked check was recorded in the server evidence log." : "No action can proceed. Evidence recording failed; this check has no log entry."}</small></span></div>}
              <button type="button" className="pm-secondary pm-full" onClick={() => setScreen("evidence")}>View evidence and verify chain<ArrowRight size={18}/></button>
            </>}
          </div>}
          {screen === "capital" && <div className="pm-screen">
            <div className="pm-lead"><p>Partner financing · separate from supplier terms</p><h2>Compare capital offers</h2><span>Request a simulated lender response to see the illustrative schedule.</span></div>
            <button type="button" className="pm-primary pm-full" onClick={() => void request("lenders")}>Request lender offers<ArrowRight size={18}/></button>
            {requests.lenders?.waiting && <div className="pm-hold"><CircleAlert size={18}/><span><b>Requested - waiting (simulated)</b><small>Waiting for lender offers.</small></span></div>}
            {visibleLenders && !requests.lenders?.waiting && <><p className="pm-caption">{lenders?.scheduleLabel}</p><div className="pm-note"><b>Monthly EMI cap: {money(visibleLenders.emiCap.maxTotalMonthlyEmiInr)}</b><p>{money(visibleLenders.emiCap.monthlyCollectionsInr)} collections × {visibleLenders.emiCap.percentage}%. Existing EMI: {money(visibleLenders.emiCap.existingMonthlyEmiInr)}.</p></div>
              <div className="pm-offer-list">{visibleLenders.offers.map(item => <button type="button" key={item.id} className={"pm-loan pm-offer-choice " + (selectedLender === item.id ? "selected" : "")} onClick={() => setSelectedLender(item.id)}><div><Landmark size={21}/><Pill tone={item.underCap ? "green" : "red"}>{item.underCap ? "Under cap" : "Over cap"}</Pill></div><b>{item.name} · {item.type}</b><p>{item.aprPercent}% APR · {item.tenorMonths} months · {money(item.totalInterestInr)} total interest</p><div><span>Monthly EMI <strong>{money(item.emiInr)}</strong></span><span>With existing <strong>{money(item.totalMonthlyEmiInr)}</strong></span></div>{item.earlyRepayment && <small>After {item.earlyRepayment.afterDays} days: about {money(item.earlyRepayment.estimatedInterestInr)} interest</small>}</button>)}</div>
              {selectedLender === "A" ? <div className="pm-loan-step"><div><ShieldCheck size={19}/><b>Review Lender A drawdown</b></div><p>{money(drawdown?.amountInr)} enters the owner account {drawdown?.destinationAccountMasked || "**4029"} once. Gupta invoice {gupta?.invoiceId || "GD-1182"} remains a full {money(gupta?.amountInr)} outflow.</p><small>5 Nov becomes {money(drawdown?.effectOn5Nov.balanceInr)} only after a completed simulated drawdown. A request alone changes nothing.</small><button type="button" className="pm-primary pm-full" disabled={!drawdown || busy} onClick={() => void evaluateDrawdown()}>Review guard and owner PIN<ArrowRight size={18}/></button></div> : <div className="pm-note"><b>Comparison only</b><p>Select Lender A to run the guarded drawdown simulation.</p></div>}
            </>}
          </div>}
          {screen === "data" && <div className="pm-screen">
            <div className="pm-lead"><p>Sources and limits</p><h2>Where the plan&apos;s numbers come from</h2><span>Cash anchors are illustrative, not measured future balances.</span></div>
            <div className="pm-data-row"><Wallet size={19}/><span><b>Paytm collections</b><small>{money(cash?.homePaytmToday.totalInr)} to 12:40 pm in the synthetic Paytm-only channel.</small></span><Pill tone="green">Sample</Pill></div>
            <div className="pm-data-row"><Activity size={19}/><span><b>Projected cash low</b><small>{money(cash?.cashPlan.anchors.lowestBalanceInr)} on {dateLabel(cash?.cashPlan.anchors.lowestDate)} from the synthetic cash model.</small></span><Pill tone="amber">Projected</Pill></div>
            <div className="pm-data-row"><Store size={19}/><span><b>Outlet payment signals</b><small>Paytm activity by mapped device and last year&apos;s Diwali uplift. No SKU or unit data.</small></span><Pill>Sample</Pill></div>
            <Heading title="Storefront pulse · 12:40 pm"/>
            {dataSummary?.outlets?.length ? <div className="pm-outlets">{dataSummary.outlets.map(item => <section className="pm-outlet" key={item.id}>
              <div className="pm-outlet-head"><span className="pm-outlet-code">{item.id}</span><h3>{item.name}</h3><Pill tone="blue">Paytm</Pill></div>
              <div className="pm-outlet-today"><span>Collected today</span><strong>{money(item.paytmToday)}</strong></div>
              <div className="pm-outlet-stats"><div><span>Average Paytm month</span><b>{money(item.paytmAverageMonthly)}</b></div><div><span>Last Diwali week</span><b>{item.diwaliWeek2025Multiplier.toFixed(2)}×</b><small>vs prior four weeks</small></div></div>
              <p>Average all-channel month: {money(item.averageMonthlyAllChannelCollections)} against a {money(item.monthlyTarget)} monthly target. Today&apos;s Paytm amount is only one channel and part of one day.</p>
            </section>)}</div> : <div className="pm-hold"><CircleAlert size={18}/><span><b>Outlet summary unavailable</b><small>The transaction file could not be summarized.</small></span></div>}
            <div className="pm-note"><b>Stocking signal, not a SKU count</b><p>Last year&apos;s payment uplift can guide an outlet-level replenishment conversation. Payments do not identify units sold or stock on hand.</p></div>
            <div className="pm-data-row"><Landmark size={19}/><span><b>Supplier payment history</b><small>{aaEvent && dataSummary?.supplier.aaAvailable ? `${dataSummary.supplier.priorFyDebitCount} synthetic prior-FY Gupta debits total ${money(dataSummary.supplier.priorFyDebitTotal)}. The 10% rule sets a ${money(dataSummary.supplier.derivedLimit)} ceiling.` : "Prior-FY Gupta debits exist in the synthetic bank file. Request an AA sample response before the guard uses them."}</small></span><Pill tone={aaEvent && dataSummary?.supplier.aaAvailable ? "green" : "amber"}>{aaEvent && dataSummary?.supplier.aaAvailable ? "Sample ready" : "Awaiting"}</Pill></div>
            <div className="pm-data-row"><FileText size={19}/><span><b>GD-1182 invoice</b><small>Amount and verified account are supplied as metadata. The full original invoice body is unavailable for instruction checks.</small></span><Pill tone="amber">Partial</Pill></div>
            <button type="button" className="pm-primary pm-full" onClick={() => void request("aa")}>Request sample AA response<ArrowRight size={18}/></button>
            {requests.aa?.waiting && <div className="pm-hold"><CircleAlert size={18}/><span><b>Requested - waiting (simulated)</b><small>Waiting for the bank data response.</small></span></div>}
            {aaEvent && !requests.aa?.waiting && <div className="pm-note"><b>AA response received</b><p>{String(aaEvent.payload.status || aaEvent.payload.source || "Sample status received")}. {dataSummary?.supplier.aaAvailable ? "The server can now check the synthetic bank rows for the supplier limit." : "The bank sample is not available for this request."} No real AA rail was contacted.</p></div>}
            <p className="pm-caption">{cash?.sourceNote}</p>
          </div>}
          {screen === "evidence" && <div className="pm-screen">
            <div className="pm-lead"><p>Server evidence log</p><h2>What the guard recorded</h2><span>Only demo attempts appear here. The hash-chain check runs on the server.</span></div>
            <div className={verification?.ok && entries.length > 0 ? "pm-success" : "pm-hold"}>{verification?.ok && entries.length > 0 ? <CheckCircle2 size={20}/> : <CircleAlert size={20}/>}<span><b>{verification ? entries.length === 0 ? "No entries to verify" : verification.ok ? "Hash chain verified" : "Hash chain failed" : "Verification unavailable"}</b><small>{verification && !verification.ok ? "First broken sequence: " + String(verification.first_broken_seq ?? "unknown") : "Read from the verification endpoint."}</small></span></div>
            {entries.length === 0 ? <div className="pm-empty"><FileText size={28}/><h2>No attempts yet</h2><p>Run a guard check to create the first evidence entry.</p><button type="button" className="pm-primary" onClick={() => setScreen("capital")}>Go to Capital<ArrowRight size={18}/></button></div> : <div className="pm-case-list">{[...entries].reverse().map(item => <div className="pm-evidence-entry" key={item.seq}><span><b>#{item.seq} · {item.outcome || "Recorded"}</b><small>{item.timestamp}</small></span><code>{item.hash?.slice(0, 20)}…</code></div>)}</div>}
            <button type="button" className="pm-secondary pm-full" onClick={() => void refreshEvidence()}>Verify again<ArrowRight size={18}/></button>
            <button type="button" className="pm-secondary pm-full" onClick={() => setMode("riskops")}>Open RiskOps trace<ArrowRight size={18}/></button>
            <p className="pm-caption">This log records checks and outcomes, not a payment receipt.</p>
          </div>}
        </div>
        <nav className="pm-bottom" aria-label="Merchant sections">{([{ id: "home", icon: Home, name: "Home" }, { id: "plan", icon: Activity, name: "Plan" }, { id: "munim", icon: Sparkles, name: "Munim" }, { id: "capital", icon: Landmark, name: "Capital" }, { id: "evidence", icon: FileText, name: "More" }] as const).map(item => { const Icon = item.icon; return <button type="button" key={item.id} className={screen === item.id ? "active" : ""} onClick={() => setScreen(item.id)}><Icon size={19}/><span>{item.name}</span></button>; })}</nav>
      </div>
    </section>
    <aside className="pm-right" aria-label="Demo controls">
      <div className="pm-control"><span>Journey control</span><h2>From projected gap to guarded action</h2><p>Compare the choices, request an external response, then inspect the guard and evidence.</p><button type="button" className="pm-primary pm-full" onClick={() => setScreen("plan")}>Review cash plan<ArrowRight size={18}/></button></div>
      <div className="pm-right-card"><span>Decision outcomes</span><p><CheckCircle2 size={17} className="pm-green"/>Requested - waiting</p><p><CircleAlert size={17} className="pm-amber"/>Needs verification</p><p><ShieldCheck size={17} className="pm-red"/>Blocked action</p></div>
      <div className="pm-right-card"><span>Source truth</span><p><b>Paytm</b> sees payment amounts by outlet, not products sold.</p><p><b>Cash plan</b> is a synthetic model, not a measured future.</p><p><b>Supplier cap</b> comes from prior-FY bank debits after a simulated AA response.</p></div>
      <button type="button" className="pm-open-risk" onClick={() => setMode("riskops")}><ShieldCheck size={20}/><span><b>Open RiskOps</b><small>Inspect cases and evidence</small></span><ArrowRight size={18}/></button>
    </aside>
  </main>;
}
