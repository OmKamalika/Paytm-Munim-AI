import { demoFixture } from "../../../lib/demo-fixture.js";

export const dynamic = "force-dynamic";

export async function GET() {
  // Scenario choices belong to the separate simulator, never the merchant feed.
  const merchantData = Object.fromEntries(Object.entries(demoFixture).filter(([key]) => key !== "candidates"));
  return Response.json(merchantData, {
    headers: { "Cache-Control": "no-store" },
  });
}
