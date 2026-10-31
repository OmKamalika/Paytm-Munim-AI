export const noStore = { "Cache-Control": "no-store" };
export async function input(request: Request): Promise<Record<string, unknown>> {
  const value: unknown = await request.json();
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Send a JSON object.");
  return value as Record<string, unknown>;
}
export async function result(task: () => Promise<unknown>) {
  try { return Response.json(await task(), { headers: noStore }); }
  catch (caught) {
    const error = caught as Error & { code?: string };
    return Response.json({ error: error.message || "The simulated workflow could not continue.", code: error.code || "INVALID_REQUEST" }, { status: error.code ? 409 : 400, headers: noStore });
  }
}
