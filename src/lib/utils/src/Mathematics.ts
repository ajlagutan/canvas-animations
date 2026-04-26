/**
 * Smooth approach towards the {@link targer} value.
 *
 *
 *
 * @public
 * @function
 * @param value The current value.
 * @param target The target value.
 * @param duration The duration (in frames) of the approach.
 * @returns {number}
 */
export function approach(value: number, target: number, duration: number): number {
  return value + (target - value) / duration;
}
/**
 * Smooth decay towards zero.
 *
 *
 *
 * @public
 * @function
 * @param value The current value to decay.
 * @param duration The duration (in frames) of the decay.
 * @returns {number}
 */
export function decay(value: number, duration: number): number {
  return value - value / duration;
}
/**
 * Returns the mathematical modulo (always non-negative).
 *
 *
 *
 * @public
 * @function
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
