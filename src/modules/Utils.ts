/**
 * Logs an event with a prototype name.
 *
 *
 *
 * @param {any} category The log event category.
 * @param {any[]} data Additional data for the log event.
 */
export function debug(category: any, ...data: any[]): void {
  if (typeof category === "function" && category["name"]) {
    let name: string = category["name"];
    console.debug(`[${name.toLowerCase()}]`, ...data);
    return;
  }
  if (typeof category === "object" && category["constructor"]) {
    debug(category["constructor"], ...data);
    return;
  }
  console.debug(...data);
}
/**
 * Returns a random integer between min and max (exclusive).
 *
 *
 *
 * @global
 * @method
 * @param {number} min The minimum integer value.
 * @param {number} max The maximum integer value.
 * @returns {number} A random integer between min and max (exclusive).
 */
export function randomInt(min: number, max: number): number {
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new Error("Both min and max must be integers.");
  }
  if (min > max) {
    throw new Error("Parameter 'min' must be less than or equal to 'max'.");
  }
  return Math.floor(Math.random() * (max - min)) + min;
}
/**
 * Returns a random integer between min and max (inclusive).
 *
 *
 *
 * @global
 * @method
 * @param {number} min The minimum integer value.
 * @param {number} max The maximum integer value.
 * @returns {number} A random integer between min and max (inclusive).
 */
export function randomIntInclusive(min: number, max: number): number {
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new Error("Both min and max must be integers.");
  }
  if (min > max) {
    throw new Error("Parameter 'min' must be less than or equal to 'max'.");
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
