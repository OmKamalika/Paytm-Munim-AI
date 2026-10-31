/** Suggest a reviewable setup choice only; this function never starts a task. */
export function suggestsStockAgent(question) {
  const text = String(question || "").trim().toLowerCase();
  if (!text || /\b(don['’]?t|do not|never|not ready|cancel|stop|no agent)\b/.test(text)) return false;
  if (/^(what (is|are)|explain|tell me about|how does|how do|should i|can i|could i|do i need)\b/.test(text)) return false;
  const stockWork = /\b(stock|inventory|replenish\w*|reorder\w*|supplier|procurement|ordering|orders)\b/.test(text);
  const agentSetup = /\b(set\s*up|create|start|build|add|activate|delegate|make|hire)\b.{0,60}\bagent\b|\bagent\b.{0,30}\b(chahiye|bana|set\s*up)\b/.test(text);
  const monitor = /\b(monitor\w*|watch|manage|track|delegate)\b/.test(text);
  const automatic = /\b(automatic\w*|automate|jit|just[ -]in[ -]time|on my behalf)\b/.test(text);
  const orderCommand = /^(please )?(order|reorder|replenish)\b|\b(can|could|would|will) you\b.{0,30}\b(order|reorder|replenish)\b/.test(text);
  return stockWork && (agentSetup || monitor || automatic || orderCommand);
}
