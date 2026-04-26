/**
 * A class that represents a 2D coordinates.
 *
 *
 *
 * @class
 */
export class Vector2 implements MathVector2, MathVectorFunctions<Vector2> {
  private _x: number;
  private _y: number;
  /**
   * Creates a new {@link Vector2} object instance.
   *
   *
   *
   * @public
   * @constructor
   * @param {number} x The vector's x-coordinate value.
   * @param {number} y The vector's y-coordinate value.
   */
  public constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }
  public get x(): number {
    return this._x;
  }
  public set x(value: number) {
    if (this._x !== value) {
      this._x = value;
    }
  }
  public get y(): number {
    return this._y;
  }
  public set y(value: number) {
    if (this._y !== value) {
      this._y = value;
    }
  }
  /**
   * Creates a new {@link Vector2} object instance
   * where coordinates are copied from another vector.
   *
   *
   *
   * @public
   * @static
   * @param {Vector2} vector The vector to copy the values from.
   * @returns {Vector2} A new 2D vector.
   */
  public static from(vector: Vector2): Vector2 {
    return new Vector2(vector.x, vector.y);
  }
  public ceil(): Vector2 {
    let x = Math.ceil(this.x);
    let y = Math.ceil(this.y);
    return new Vector2(x, y);
  }
  public clamp(min: number | Vector2, max: number | Vector2): Vector2 {
    if (typeof min === "number" && typeof max === "number") {
      let x = this.x.clamp(min, max);
      let y = this.y.clamp(min, max);
      return new Vector2(x, y);
    }
    if (min instanceof Vector2 && max instanceof Vector2) {
      let x = this.x.clamp(min.x, max.x);
      let y = this.y.clamp(min.y, max.y);
      return new Vector2(x, y);
    }
    return this;
  }
  public floor(): Vector2 {
    let x = Math.floor(this.x);
    let y = Math.floor(this.y);
    return new Vector2(x, y);
  }
  public round(): Vector2 {
    let x = Math.round(this.x);
    let y = Math.round(this.y);
    return new Vector2(x, y);
  }
}
/**
 * A class that represents a 3D coordinates.
 *
 *
 *
 * @class
 */
export class Vector3 implements MathVector3, MathVectorFunctions<Vector3> {
  private _x: number;
  private _y: number;
  private _z: number;
  /**
   * Creates a new {@link Vector3} object instance.
   *
   *
   *
   * @public
   * @constructor
   * @param {number} x The vector's x-coordinate value.
   * @param {number} y The vector's y-coordinate value.
   * @param {number} z The vector's z-coordinate value.
   */
  public constructor(x: number, y: number, z: number) {
    this._x = x;
    this._y = y;
    this._z = z;
  }
  public get x(): number {
    return this._x;
  }
  public set x(value: number) {
    if (this._x !== value) {
      this._x = value;
    }
  }
  public get y(): number {
    return this._y;
  }
  public set y(value: number) {
    if (this._y !== value) {
      this._y = value;
    }
  }
  public get z(): number {
    return this._z;
  }
  public set z(value: number) {
    if (this._z !== value) {
      this._z = value;
    }
  }
  /**
   * Creates a new {@link Vector3} object instance
   * where coordinates are copied from another vector.
   *
   *
   *
   * @public
   * @static
   * @param {Vector3} vector The vector to copy the values from.
   * @returns {Vector3} A new 3D vector.
   */
  public static from(vector: Vector3): Vector3 {
    return new Vector3(vector.x, vector.y, vector.z);
  }
  public ceil(): Vector3 {
    let x = Math.ceil(this.x);
    let y = Math.ceil(this.y);
    let z = Math.ceil(this.z);
    return new Vector3(x, y, z);
  }
  public clamp(min: number | Vector3, max: number | Vector3): Vector3 {
    if (typeof min === "number" && typeof max === "number") {
      let x = this.x.clamp(min, max);
      let y = this.y.clamp(min, max);
      let z = this.z.clamp(min, max);
      return new Vector3(x, y, z);
    }
    if (min instanceof Vector3 && max instanceof Vector3) {
      let x = this.x.clamp(min.x, max.x);
      let y = this.y.clamp(min.y, max.y);
      let z = this.z.clamp(min.z, max.z);
      return new Vector3(x, y, z);
    }
    return this;
  }
  public floor(): Vector3 {
    let x = Math.floor(this.x);
    let y = Math.floor(this.y);
    let z = Math.floor(this.z);
    return new Vector3(x, y, z);
  }
  public round(): Vector3 {
    let x = Math.round(this.x);
    let y = Math.round(this.y);
    let z = Math.round(this.z);
    return new Vector3(x, y, z);
  }
}
/**
 * A class that represents a 4D coordinates.
 *
 *
 *
 * @class
 */
export class Vector4 implements MathVector4, MathVectorFunctions<Vector4> {
  private _w: number;
  private _x: number;
  private _y: number;
  private _z: number;
  /**
   * Creates a new {@link Vector4} object instance.
   *
   *
   *
   * @public
   * @constructor
   * @param {number} w The vector's w-coordinate value.
   * @param {number} x The vector's x-coordinate value.
   * @param {number} y The vector's y-coordinate value.
   * @param {number} z The vector's z-coordinate value.
   */
  public constructor(w: number, x: number, y: number, z: number) {
    this._w = w;
    this._x = x;
    this._y = y;
    this._z = z;
  }
  public get w(): number {
    return this._w;
  }
  public set w(value: number) {
    if (this._w !== value) {
      this._w = value;
    }
  }
  public get x(): number {
    return this._x;
  }
  public set x(value: number) {
    if (this._x !== value) {
      this._x = value;
    }
  }
  public get y(): number {
    return this._y;
  }
  public set y(value: number) {
    if (this._y !== value) {
      this._y = value;
    }
  }
  public get z(): number {
    return this._z;
  }
  public set z(value: number) {
    if (this._z !== value) {
      this._z = value;
    }
  }
  /**
   * Creates a new {@link Vector4} object instance
   * where coordinates are copied from another vector.
   *
   *
   *
   * @public
   * @static
   * @param {Vector4} vector The vector to copy the values from.
   * @returns {Vector4} A new 4D vector.
   */
  public static from(vector: Vector4): Vector4 {
    return new Vector4(vector.w, vector.x, vector.y, vector.z);
  }
  public ceil(): Vector4 {
    let w = Math.ceil(this.w);
    let x = Math.ceil(this.x);
    let y = Math.ceil(this.y);
    let z = Math.ceil(this.z);
    return new Vector4(w, x, y, z);
  }
  public clamp(min: number | Vector4, max: number | Vector4): Vector4 {
    if (typeof min === "number" && typeof max === "number") {
      let w = this.w.clamp(min, max);
      let x = this.x.clamp(min, max);
      let y = this.y.clamp(min, max);
      let z = this.z.clamp(min, max);
      return new Vector4(w, x, y, z);
    }
    if (min instanceof Vector4 && max instanceof Vector4) {
      let w = this.w.clamp(min.w, max.w);
      let x = this.x.clamp(min.x, max.x);
      let y = this.y.clamp(min.y, max.y);
      let z = this.z.clamp(min.z, max.z);
      return new Vector4(w, x, y, z);
    }
    return this;
  }
  public floor(): Vector4 {
    let w = Math.floor(this.w);
    let x = Math.floor(this.x);
    let y = Math.floor(this.y);
    let z = Math.floor(this.z);
    return new Vector4(w, x, y, z);
  }
  public round(): Vector4 {
    let w = Math.round(this.w);
    let x = Math.round(this.x);
    let y = Math.round(this.y);
    let z = Math.round(this.z);
    return new Vector4(w, x, y, z);
  }
}
