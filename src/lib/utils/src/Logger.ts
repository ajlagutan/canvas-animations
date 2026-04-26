type LogLevel = "trace" | "debug" | "info" | "warn" | "error";

interface LogFunction extends Function {
  (...data: any[]): void;
}

function log(level: LogLevel, category: any, ...data: any[]): void {
  let fn: LogFunction = console[level] ?? console.log;
  let name: string = "logger";
  if (typeof category === "function" && category["name"]) {
    name = category["name"];
    fn.call(console, `[${name.toLowerCase()}]`, ...data);
    return;
  }
  if (typeof category === "object" && category["constructor"]) {
    log(level, category["constructor"], ...data);
    return;
  }
  fn.call(console, `[${name}]`, ...data);
}

export function debug(category: any, ...data: any[]): void {
  log("debug", category, ...data);
}

export function error(category: any, ...data: any[]): void {
  log("error", category, ...data);
}

export function info(category: any, ...data: any[]): void {
  log("info", category, ...data);
}

export function trace(category: any, ...data: any[]): void {
  log("trace", category, ...data);
}

export function warn(category: any, ...data: any[]): void {
  log("warn", category, ...data);
}
