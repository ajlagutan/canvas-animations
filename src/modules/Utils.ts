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
    debug(category["constructor"]);
    return;
  }
  console.debug(...data);
}
