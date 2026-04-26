Number.prototype.clamp = function (min: number, max: number): number {
  let value = this as number;
  if (typeof value !== "number" || isNaN(value)) {
    throw new TypeError("value must be a valid number.");
  }
  return Math.max(Math.min(value, max), min);
};

Number.prototype.toDegrees = function (): number {
  let radians = this as number;
  if (typeof radians !== "number" || isNaN(radians)) {
    throw new TypeError("radians must be a valid number.");
  }
  return radians * (180 / Math.PI);
};

Number.prototype.toRadians = function (): number {
  let degrees = this as number;
  if (typeof degrees !== "number" || isNaN(degrees)) {
    throw new TypeError("degrees must be a valid number.");
  }
  return degrees * (Math.PI / 180);
};
