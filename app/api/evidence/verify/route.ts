import { getDemoActionRuntime } from "../../../../lib/action-runtime.js";
import { getFlowRuntime } from "../../../../lib/flow-runtime.js";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const legacy = request && new URL(request.url).searchParams.get("scope") === "legacy";
  const verified = legacy ? await getDemoActionRuntime().verifyEvidence() : await (await getFlowRuntime()).verify();
  const result = { ok: verified.ok, first_broken_seq: "first_broken_seq" in verified ? verified.first_broken_seq : verified.firstBrokenSeq };
  return Response.json({ ...result, scope: legacy ? "legacy_read_only" : "tracked_workflow_journal", status: result.ok ? "OK" : "VERIFICATION_FAILED", synthetic: true }, {
    headers: { "Cache-Control": "no-store" },
  });
}
