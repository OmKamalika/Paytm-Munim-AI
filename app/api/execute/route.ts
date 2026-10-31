export const dynamic = "force-dynamic";

// Historical single-step approvals do not prove the tracked AA/GST, bureau,
// disclosure and rail sequence. Keep this endpoint closed even for a valid PIN.
export async function POST() {
  return Response.json({
    outcome: "blocked",
    code: "TRACKED_WORKFLOW_REQUIRED",
    reason: "Start a tracked task and approve its current server disclosure. Single-step financial execution has been retired.",
    synthetic: true,
    moneyMovement: "none",
  }, { status: 410, headers: { "Cache-Control": "no-store" } });
}
