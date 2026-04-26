/**
 * Generates a random integer between min (inclusive) and max (inclusive).
 *
 *
 *
 * @global
 * @method
 * @param {number} min The minimum integer value (inclusive).
 * @param {number} max The maximum integer value (inclusive).
 * @returns {number} A random integer between min and max.
 */
export function int(min: number, max: number): number {
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new TypeError("Both min and max must be integers.");
  }
  if (min > max) {
    throw new RangeError("min must be less than or equal to max.");
  }
  return Math.floor(Math.random() * (max - min)) + min;
}
/**
 * Generates a random floating-point number between min (inclusive) and max (exclusive).
 *
 *
 *
 * @global
 * @method
 * @param {number} min The minimum value (inclusive).
 * @param {number} max The maximum value (exclusive).
 * @returns {number} A random floating-point number between min and max.
 */
export function float(min: number, max: number): number {
  if (typeof min !== "number" || typeof max !== "number") {
    throw new TypeError("Both min and max must be number.");
  }
  if (min >= max) {
    throw new RangeError("min must be less the max");
  }
  return Math.random() * (max - min) + min;
}
