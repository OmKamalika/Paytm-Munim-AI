/** Presentation wording only. Source records and API field names stay intact. */
export function displayCopy(text) {
  return String(text ?? "")
    .replace(/\bsynthetic\s+/gi, "")
    .replace(/\bcollections?\b/gi, word => word === word.toUpperCase() ? "SALES" : /^[A-Z]/.test(word) ? "Sales" : "sales");
}
