/**
 * A class that represents a rectangular area on the screen.
 *
 *
 *
 * @class
 */
export class Rect implements MathRect, MathRectFunctions<Rect> {
  private _height: number;
  private _width: number;
  private _x: number;
  private _y: number;
  /**
   * Creates a new {@link Rect} object instance.
   *
   *
   *
   * @public
   * @constructor
   * @param {number} x The rectangle's x-coordinate.
   * @param {number} y The rectangle's y-coordinate.
   * @param {number} width The rectangle's width.
   * @param {number} height The rectangle's height.
   */
  public constructor(x?: number, y?: number, width?: number, height?: number) {
    this._x = typeof x === "number" ? x : 0;
    this._y = typeof y === "number" ? y : 0;
    this._width = typeof width === "number" ? width : 0;
    this._height = typeof height === "number" ? height : 0;
  }
  public get bottom(): number {
    return this._y + this._height;
  }
  public get height(): number {
    return this._height;
  }
  public set height(value: number) {
    if (this._height !== value) {
      this._height = value;
    }
  }
  public get left(): number {
    return this._x;
  }
  public get right(): number {
    return this._x + this._width;
  }
  public get top(): number {
    return this._y;
  }
  public get width(): number {
    return this._width;
  }
  public set width(value: number) {
    if (this._width !== value) {
      this._width = value;
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
  public empty(): void {
    this.set(0, 0, 0, 0);
  }
  /**
   * @param {T} rect The rectangle object to copy from.
   */
  public set(rect: Rect): void;
  /**
   * @param {number} x The rectangle's x-coordinate.
   * @param {number} y The rectangle's y-coordinate.
   * @param {number} width The rectangle's width.
   * @param {number} height The rectangle's height.
   * @returns {void}
   */
  public set(x: number, y: number, width: number, height: number): void;
  public set(x: number | Rect, y?: number, width?: number, height?: number): void {
    this.x = x instanceof Rect ? x.x : typeof x === "number" ? x : this.x;
    this.y = x instanceof Rect ? x.y : typeof y === "number" ? y : this.y;
    this.width = x instanceof Rect ? x.width : typeof width === "number" ? width : this.x;
    this.height = x instanceof Rect ? x.height : typeof height === "number" ? height : this.height;
  }
}
