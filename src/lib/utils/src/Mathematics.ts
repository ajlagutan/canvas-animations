/**
 * Returns the mathematical modulo (always non-negative).
 *
 *
 *
 * @param n The dividend.
 * @param m The divisor (must be non-zero).
 * @returns {number} The mathematical modulo (positive) result.
 */
export function mod(n: number, m: number): number {
  if (typeof n !== "number" || typeof m !== "number" || !Number.isFinite(n) || !Number.isFinite(m)) {
    throw new TypeError("Both arguments must be finite numbers.");
  }
  if (m === 0) {
    throw new RangeError("Modulo by zero is undefined.");
  }
  return ((n % m) + m) % m;
}
