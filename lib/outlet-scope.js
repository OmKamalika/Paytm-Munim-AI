export const outletScopes = [
  { id: "all", label: "All outlets", dataId: "" },
  { id: "dadar", label: "Dadar", dataId: "DAD" },
  { id: "matunga", label: "Matunga", dataId: "MAT" },
  { id: "sion", label: "Sion", dataId: "SIO" },
];

export function isOutletScope(scope) {
  return outletScopes.some(outlet => outlet.id === scope);
}

function selection(scope) {
  const outlet = outletScopes.find(item => item.id === scope);
  if (!outlet) throw new RangeError("Unknown outlet scope: " + scope);
  return outlet;
}

export const outletScopeLabel = scope => selection(scope).label;
export const outletDataId = scope => selection(scope).dataId;

export function questionOutletScope(question, scope) {
  selection(scope);
  const text = String(question || "").toLowerCase();
  if (/\ball outlets\b/.test(text)) return "all";
  return outletScopes.find(outlet => outlet.id !== "all" && new RegExp("\\b" + outlet.id + "\\b").test(text))?.id || scope;
}

/** @template T @param {T[]} rows @param {string} scope @param {(row: T) => string} identify @returns {T[]} */
export function filterOutletRows(rows, scope, identify) {
  const outlet = selection(scope);
  if (outlet.id === "all") return [...rows];
  return rows.filter(row => {
    const id = identify(row).toLowerCase();
    return id === outlet.id || id === outlet.dataId.toLowerCase();
  });
}

/** @param {{outlet: string, amountInr: number}[]} rows @param {string} scope */
export function sumOutletSales(rows, scope) {
  return filterOutletRows(rows, scope, row => row.outlet).reduce((sum, row) => sum + row.amountInr, 0);
}
