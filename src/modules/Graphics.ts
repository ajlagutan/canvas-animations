import { debug } from "./Utils";

interface CanvasRenderFunction {
  (context: CanvasRenderingContext2D): void;
}
/**
 * A class that handles graphic functions.
 *
 *
 *
 * @public
 * @static
 * @class
 */
export abstract class Graphics {
  private static _canvas: HTMLCanvasElement;
  private static _context: CanvasRenderingContext2D;
  private static _frameCount: number = 0;
  private static _height: number = 0;
  private static _width: number = 0;
  /**
   * This is a static class, do not invoke the class constructor.
   *
   *
   *
   * @private
   * @constructor
   */
  private constructor() {
    throw new TypeError("This is a static class.");
  }
  /**
   * The graphic context's height.
   *
   *
   *
   * @public
   * @readonly
   * @property
   */
  public static get height(): number {
    return this._height;
  }
  /**
   * The graphic context's width.
   *
   *
   *
   * @public
   * @readonly
   * @property
   */
  public static get width(): number {
    return this._width;
  }
  /**
   * Clears the graphic context.
   *
   *
   *
   * @public
   * @static
   * @method
   * @returns {void}
   */
  public static clear(): void {
    if (this._context) {
      this._context.clearRect(0, 0, this.width, this.height);
    }
  }
  /**
   * Initializes the graphic context.
   *
   *
   *
   * @public
   * @static
   * @method
   * @returns {void}
   */
  public static init(): void {
    try {
      debug(this, "initializing...");
      this.initCanvas();
      this.setupEventHandlers();
      this.resize();
      debug(this, "initialized.");
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Renders an object to the graphic context.
   *
   *
   *
   * @public
   * @static
   * @method
   * @param {any} obj The object to render.
   * @returns {void}
   */
  public static render(obj: any): void {
    if (obj && typeof obj["render"] === "function") {
      const render: CanvasRenderFunction = obj["render"];
      render.call(obj, this._context);
    }
  }
  /**
   * Resizes the graphic context width and height component.
   *
   *
   *
   * @public
   * @static
   * @method
   * @param {number} width The graphic context width.
   * @param {number} height The graphic context height.
   * @returns {void}
   */
  public static resize(width?: number, height?: number): void {
    this._width = width ?? window.innerWidth;
    this._height = height ?? window.innerHeight;
    this._canvas.width = this._width;
    this._canvas.height = this._height;
    this._canvas.style.width = this._width + "px";
    this._canvas.style.height = this._height + "px";
  }
  /**
   * Updates the graphic context.
   *
   *
   *
   * @public
   * @static
   * @method
   * @returns {void}
   */
  public static update(): void {
    this._frameCount++;
  }
  /**
   * Initializes the canvas component.
   *
   *
   *
   * @private
   * @static
   * @method
   * @returns {void}
   */
  private static initCanvas(): void {
    let canvas: HTMLCanvasElement = document.createElement("canvas");
    let context: CanvasRenderingContext2D = canvas.getContext("2d")!;
    canvas.style.backgroundColor = "black";
    canvas.style.position = "fixed";
    canvas.style.left = "0";
    canvas.style.top = "0";
    canvas.style.zIndex = "0";
    document.body.appendChild(canvas);
    this._context = context;
    this._canvas = canvas;
  }
  /**
   * Handles the window's resize event.
   *
   *
   *
   * @private
   * @static
   * @method
   * @returns {void}
   */
  private static onResize(): void {
    this.resize(window.innerWidth, window.innerHeight);
  }
  /**
   * Configures the event listeners.
   *
   *
   *
   * @private
   * @static
   * @method
   * @returns {void}
   */
  private static setupEventHandlers(): void {
    window.addEventListener("resize", this.onResize.bind(this));
  }
}
