// The single-step guard/execute demo is retired. Every action now goes through
// the tracked workflow (Ask Munim → Delegate and track), which owns request
// correlation, disclosure, PIN approval, the payment fence and the journal.
export function retired(name: string) {
  return Response.json({
    error: `${name} is retired. Start a tracked task from Ask Munim → Delegate and track; it runs the same guard, disclosure, PIN and ledger path.`,
    code: "ROUTE_RETIRED", trackedPath: "/api/flows/start",
  }, { status: 410, headers: { "Cache-Control": "no-store" } });
}
