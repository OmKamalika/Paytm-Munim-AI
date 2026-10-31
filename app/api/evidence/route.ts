import { getDemoActionRuntime } from "../../../lib/action-runtime.js";
import { getFlowRuntime } from "../../../lib/flow-runtime.js";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const legacy = await getDemoActionRuntime().getEvidence();
  const legacyHistory = { ...legacy, readOnly: true, label: "Historical single-step checks · execution retired" };
  if (request && new URL(request.url).searchParams.get("scope") === "legacy") {
    return Response.json({ ...legacyHistory, scope: "legacy_read_only", synthetic: true }, { headers: { "Cache-Control": "no-store" } });
  }
  const state = await (await getFlowRuntime()).getState("riskops");
  return Response.json({
    scope: "tracked_workflow_journal", entries: state.traces, runs: state.runs,
    ledger: state.ledger, verification: state.verification, revision: state.revision,
    legacy: legacyHistory, synthetic: true, storage: "process-local memory",
  }, {
    headers: { "Cache-Control": "no-store" },
  });
}
