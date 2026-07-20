/** Date + money formatting helpers. Output is rendered in the mono face. */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Parse an ISO `YYYY-MM-DD` into parts without timezone drift. */
function parts(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m: m - 1, d };
}

/** "Jun 13, 2026" — or a compact range "Jun 13–14, 2026" / "May 23 – May 31, 2026". */
export function formatEventDate(start: string, end?: string): string {
  const s = parts(start);
  const base = `${MONTHS[s.m]} ${s.d}, ${s.y}`;
  if (!end || end === start) return base;
  const e = parts(end);
  if (s.y === e.y && s.m === e.m) return `${MONTHS[s.m]} ${s.d}–${e.d}, ${s.y}`;
  if (s.y === e.y) return `${MONTHS[s.m]} ${s.d} – ${MONTHS[e.m]} ${e.d}, ${s.y}`;
  return `${base} – ${MONTHS[e.m]} ${e.d}, ${e.y}`;
}

/** Short date for cards: "13 Jun 2026". */
export function formatShortDate(iso: string): string {
  const { y, m, d } = parts(iso);
  return `${d} ${MONTHS[m]} ${y}`;
}

/** "₹1,499" or "Free". */
export function formatPrice(price: number | null, currency = "INR"): string {
  if (price == null) return "Free";
  const symbol = currency === "INR" ? "₹" : "";
  return `${symbol}${price.toLocaleString("en-IN")}`;
}
