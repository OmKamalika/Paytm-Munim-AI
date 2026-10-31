export type FlowKind = "monitor" | "supplier" | "judge" | "invoice" | "aa" | "kya" | "bureau" | "lender" | "payment";
export type FlowStatus = "awaiting_response" | "awaiting_owner" | "paused" | "blocked" | "completed" | "failed" | "payment_pending" | "declined";
export type FlowValue = string | number | boolean | null | FlowValue[] | { [key: string]: FlowValue };
export type FlowCheck = { id: string; status: "PASS" | "BLOCK" | "NEEDS_VERIFICATION" | "ESCALATE"; detail: string };
export type FlowDelta = { field: string; original: string | number; proposed: string | number; severity: "hard" | "intent" | "info" };
export type FlowActor = { id: string; role: "merchant_owner" | "authorized_signatory" | "delegate_agent" | "simulator_operator" | "guardrail_agent" | "riskops" | "system" };
export type FlowDelegation = Readonly<{
  goal: string; product: string; outletId: "all" | "dadar" | "matunga" | "sion";
  trigger: "demand_signal" | "now"; maxOrderInr: number; maxAdvanceInr: number;
  minCreditDays: number; minBuybackPercent: number; validUntil: string;
  ownerRole: "merchant_owner" | "authorized_signatory"; canNegotiate: boolean; approvalMode: "ask_before_commit";
}>;
export type FlowIntent = { id: string; title: string; category: "supplier" | "capital" | "invoice"; description: string; purpose: string; amountInr: number; invoiceId?: string; sourceInvoiceRow?: string };
export type FlowAction = { type: "supplier_payment" | "drawdown" | "invoice_review"; amountInr: number; payee: string; account: string; invoiceId?: string; rail: string; [key: string]: FlowValue | undefined };
export type FlowJudge = { mode: "simulated_llm_judge" | "deterministic_document_scan"; decision: "clear" | "concern" | "unavailable"; reason: string };
export type FlowDisclosure = {
  id: string; type: "terms_change" | "judge_review" | "bureau_consent" | "payment_consent" | "loan_consent";
  version: number; requiresPin: boolean; summary: string; why: string;
  originalIntent: FlowIntent; delegation: FlowDelegation | null; proposedAction: FlowAction;
  terms: Record<string, string | number | boolean>; delta: FlowDelta[];
  risks: string[]; alternatives: string[]; dataShared: string[]; checks: FlowCheck[];
  createdAt: string; hash: string;
};
export type FlowResponse = { requestId: string; scenarioId: string; label: string; summary: string; receivedAt: string; data: Record<string, FlowValue> };
export type FlowRequest = {
  id: string; runId: string; traceId: string; kind: FlowKind; title: string; summary: string;
  payload: Record<string, FlowValue>; expectedDataTypes: string[];
  status: "open" | "answered" | "cancelled"; createdAt: string; response?: FlowResponse;
};
export type FlowScenario = { id: string; kind: FlowKind; label: string; description: string };
export type FlowEffect = { id: string; runId: string; type: "supplier_payment" | "drawdown"; amountInr: number; payee: string; account: string; invoiceId?: string; rail: string; recordedAt: string; requestId: string; projected5NovInr?: number };
export type FlowRun = {
  id: string; traceId: string; intentId: string; title: string; category: "supplier" | "capital" | "invoice";
  status: FlowStatus; stage: FlowKind | "owner" | "done"; version: number;
  createdAt: string; updatedAt: string; originalIntent: FlowIntent; delegation: FlowDelegation | null; proposedAction: FlowAction;
  terms: Record<string, string | number | boolean>; delta: FlowDelta[]; checks: FlowCheck[];
  currentRequestId: string | null; currentDisclosure: FlowDisclosure | null; disclosureHistory: FlowDisclosure[];
  latestResponse: FlowResponse | null; judge: FlowJudge | null; guardAction: string;
  summary: string; sourceInvoiceRow: string; ledgerEffect: FlowEffect | null;
};
export type FlowTrace = {
  seq: number; eventId: string; runId: string; traceId: string; spanId: string; parentSpanId: string | null;
  at: string; actor: FlowActor; tool: string; event: string; status: string; guardAction: string;
  summary: string; originalIntent: FlowIntent; delegation: FlowDelegation | null; proposedAction: FlowAction; terms: Record<string, string | number | boolean>; delta: FlowDelta[]; judge: FlowJudge | null;
  merchantDisclosure: FlowDisclosure | null; requestId: string | null; prevHash: string | null; hash: string;
};
export type FlowState = {
  synthetic: true; sessionOnly: true; authMode: "demo_roles_no_authentication"; viewerRole: "merchant" | "operator" | "riskops";
  revision: number; paused: boolean; intents: FlowIntent[]; runs: FlowRun[]; requests: FlowRequest[];
  catalog: FlowScenario[]; traces: FlowTrace[]; ledger: FlowEffect[];
  verification: { ok: boolean; firstBrokenSeq: number | null }; pinConfigured: boolean;
};
