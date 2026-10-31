import { getDemoControl } from "../../../../lib/demo-control.js";

export const dynamic = "force-dynamic";

const noStore = { "Cache-Control": "no-store" };

export async function GET() {
  return Response.json(getDemoControl().get(), { headers: noStore });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json() as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Send a JSON pause state." }, { status: 400, headers: noStore });
  }
  if (typeof body.paused !== "boolean") {
    return Response.json({ error: "paused must be true or false." }, { status: 400, headers: noStore });
  }
  return Response.json(getDemoControl().set(body.paused), { headers: noStore });
}
