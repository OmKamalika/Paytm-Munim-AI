import { getFlowRuntime } from "../../../lib/flow-runtime.js";

export const dynamic = "force-dynamic";

// Merchant Evidence and RiskOps read the same authoritative journal.
export async function GET() {
  const journal = await (await getFlowRuntime()).getJournal();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const entries = journal.entries.map((entry: any) => ({
    seq: entry.seq, timestamp: entry.at, actor: entry.actor?.role, runId: entry.runId,
    outcome: entry.status, event: entry.event, guardAction: entry.guardAction, summary: entry.summary,
    disclosure: entry.merchantDisclosure ? { id: entry.merchantDisclosure.id, version: entry.merchantDisclosure.version, hash: entry.merchantDisclosure.hash, type: entry.merchantDisclosure.type } : null,
    ledgerRef: entry.ledgerRef ?? null, hash: entry.hash, prevHash: entry.prevHash,
    action: entry.proposedAction,
  }));
  return Response.json({ sessionId: journal.sessionId, revision: journal.revision, entries, synthetic: true, storage: "process-local memory; resets on restart" }, {
    headers: { "Cache-Control": "no-store" },
  });
}
