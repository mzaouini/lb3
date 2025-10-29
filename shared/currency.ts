/**
 * Currency constants for LibertyPay
 * Default currency: Moroccan Dirham (MAD)
 */

export const CURRENCY_CODE = "MAD" as const;
export const CURRENCY_SYMBOL = "Dhs" as const;
export const CURRENCY_NAME = "Moroccan Dirham" as const;

// Smallest unit: 1 Dirham = 100 fils
export const FILS_PER_DIRHAM = 100;

/**
 * Format amount in fils to display string with currency symbol
 * @param amountInFils - Amount in fils (smallest unit)
 * @returns Formatted string like "150 Dhs"
 */
export function formatCurrency(amountInFils: number): string {
  const dirhams = amountInFils / FILS_PER_DIRHAM;
  return `${dirhams.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })} ${CURRENCY_SYMBOL}`;
}

/**
 * Parse currency amount from user input to fils
 * @param input - User input string (e.g., "150" or "150.50")
 * @returns Amount in fils
 */
export function parseCurrencyToFils(input: string | number): number {
  const amount = typeof input === "string" ? parseFloat(input) : input;
  if (isNaN(amount)) return 0;
  return Math.round(amount * FILS_PER_DIRHAM);
}

/**
 * Convert fils to dirhams (for display)
 * @param amountInFils - Amount in fils
 * @returns Amount in dirhams
 */
export function filsToDirhams(amountInFils: number): number {
  return amountInFils / FILS_PER_DIRHAM;
}

/**
 * Convert dirhams to fils (for storage)
 * @param amountInDirhams - Amount in dirhams
 * @returns Amount in fils
 */
export function dirhamsToFils(amountInDirhams: number): number {
  return Math.round(amountInDirhams * FILS_PER_DIRHAM);
}
