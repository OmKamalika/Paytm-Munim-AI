import { demoFixture } from "../../../lib/demo-fixture.js";
import { analyzeIntent } from "../../../lib/intent-engine.js";
import { getSimulatorEvent } from "../../../lib/simulator-store.js";
import { getDemoControl } from "../../../lib/demo-control.js";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json() as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Send a JSON action to check." }, { status: 400 });
  }

  const event = getSimulatorEvent(body.event_seq);
  if (!event || event.kind !== "supplier") {
    return Response.json({ error: "Wait for a supplier response sent from the simulator." }, { status: 409 });
  }
  const candidate = event.payload.candidate;

  // The browser cannot replace the signed mandate or the owner's goal.
  const result = analyzeIntent({
    mandate: demoFixture.mandate,
    originalIntent: demoFixture.originalIntent,
    candidate,
    paused: getDemoControl().isPaused(),
    context: { dataSource: "simulator_dispatch", simulatorEventSeq: event.seq, moneyMovement: "none", supplierContact: "none" },
  });
  const evidenceHash = await hashDecision(result, event.seq);
  return Response.json({
    ...result,
    evidenceHash,
    simulatorEventSeq: event.seq,
    simulatorDispatchedAt: event.timestamp,
    mandateSnapshot: demoFixture.mandate,
    synthetic: true,
    actionTaken: false,
    evidenceLimit: "Decision digest only; no external audit anchor or live supplier acknowledgement.",
  }, { headers: { "Cache-Control": "no-store" } });
}

async function hashDecision(result: ReturnType<typeof analyzeIntent>, eventSeq: number) {
  const bytes = new TextEncoder().encode(JSON.stringify({
    simulatorEventSeq: eventSeq,
    mandateVersion: demoFixture.mandate.version,
    originalIntent: result.originalIntent,
    candidate: result.candidate,
    decision: result.decision,
    reasons: result.reasons,
    checks: result.checks,
    trace: result.trace,
  }));
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return `sha256:${Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("")}`;
}
