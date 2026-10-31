import { getFlowRuntime } from "../../../../lib/flow-runtime.js";

export const dynamic = "force-dynamic";

export async function GET() {
  const { sessionId, verification, entries } = await (await getFlowRuntime()).getJournal();
  return Response.json({ ok: verification.ok, first_broken_seq: verification.firstBrokenSeq, entries: entries.length, sessionId, status: verification.ok ? "OK" : "VERIFICATION_FAILED", synthetic: true }, {
    headers: { "Cache-Control": "no-store" },
  });
}
