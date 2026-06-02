/** Money is stored as integer cents. Format for display in ZAR. */
export function formatMoney(cents: number, currency = "ZAR"): string {
  const amount = (cents ?? 0) / 100;
  try {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency,
    }).format(amount);
  } catch {
    return `R ${amount.toFixed(2)}`;
  }
}

/** Parse a user-entered price string (e.g. "299.99") into integer cents. */
export function parsePriceToCents(input: string): number | null {
  const cleaned = String(input).replace(/[^\d.]/g, "").trim();
  if (!cleaned) return null;
  const value = Number(cleaned);
  if (!Number.isFinite(value) || value < 0) return null;
  return Math.round(value * 100);
}
