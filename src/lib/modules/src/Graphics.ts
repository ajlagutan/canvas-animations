import "fpsmeter";
import { logger } from "../../utils";
/**
 * A class that handles the graphics context functions.
 *
 *
 *
 * @class
 */
class WindowGraphics implements WindowGraphicsInterface {
  private _canvas: HTMLCanvasElement;
  private _fpsmeter?: FPSMeter;
  private _fpsmeterBox?: HTMLElement;
  private _fpsmeterToggled: boolean = false;
  private _frameCount: number = 0;
  private _frameDelta: number = 1 / 60;
  private _frameRate: number = 60;
  private _height: number = 0;
  private _lastGlobalAlphaBeforeTransition: number = -1;
  private _transitionDuration: number = 0;
  private _transitionBackground: number = 0;
  private _transitionForeground: number = 0;
  private _width: number = 0;
  /**
   * Creates a new {@link WindowGraphics} object instance.
   *
   *
   *
   * @private
   * @constructor
   */
  private constructor() {
    this._canvas = document.createElement("canvas");
  }
  /**
   * Gets or sets the total frame count.
   *
   *
   *
   * @public
   * @property
   * @returns {number} The total frame count.
   */
  public get frameCount(): number {
    return Math.floor(this._frameCount);
  }
  public set frameCount(value: number) {
    if (this._frameCount !== value) {
      this._frameCount = value;
    }
  }
  /**
   * Gets or sets the graphics context target frame rate.
   *
   *
   *
   * @public
   * @property
   * @returns {number} The graphics context target frame rate.
   */
  public get frameRate(): number {
    return this._frameRate;
  }
  public set frameRate(value: number) {
    if (this._frameRate !== value) {
      this._frameRate = value;
      this._frameDelta = 1 / value;
    }
  }
  /**
   * Gets the graphics context height.
   *
   *
   *
   * @public
   * @readonly
   * @property
   * @returns {number} The graphics context height.
   */
  public get height(): number {
    return this._height;
  }
  /**
   * Gets the graphics context width.
   *
   *
   *
   * @public
   * @readonly
   * @property
   * @returns {number} The graphics context width.
   */
  public get width(): number {
    return this._width;
  }
  /**
   * Gets the graphics context canvas component.
   *
   *
   *
   * @private
   * @readonly
   * @property
   * @returns {HTMLCanvasElement} The graphics context canvas component.
   */
  private get canvas(): HTMLCanvasElement {
    if (!this._canvas) {
      throw new Error("Graphics context canvas is not initialized.");
    }
    return this._canvas;
  }
  /**
   * Clears the graphics context.
   *
   *
   *
   * @public
   * @method
   * @returns {void}
   */
  public clear(): void {
    const context = this.canvas.getContext("2d");
    if (context) {
      context.clearRect(0, 0, this.width, this.height);
    }
  }
  /**
   * Creates a new {@link WindowGraphicsInterface} object instance.
   *
   *
   *
   * @public
   * @static
   * @method
   * @returns {WindowGraphicsInterface} A new {@link WindowGraphicsInterface} object instance.
   */
  public static create(): WindowGraphicsInterface {
    return new WindowGraphics();
  }
  /**
   * Initializes the graphics context components.
   *
   *
   *
   * @public
   * @method
   * @returns {void}
   */
  public init(): void {
    try {
      logger.debug(this, "initializing...");
      this.initCanvas();
      this.initFpsmeter();
      this.setupEventHandlers();
      this.resize(innerWidth, innerHeight);
      logger.debug(this, "initialized.");
    } catch (error) {
      logger.error(this, error);
    }
  }
  /**
   * Checks whether the graphics context is doing a transition.
   *
   *
   *
   * @public
   * @method
   * @returns {boolean} **`true`**, if the graphics context is currently doing a transition; otherwise, **`false`**.
   */
  public isTransitioning(): boolean {
    return this._transitionDuration > 0;
  }
  /**
   * Renders a drawable objects to the graphics context.
   *
   *
   *
   * @public
   * @method
   * @param {DrawableObject[]} drawables The drawable objects.
   * @returns {void}
   */
  public render(...drawables: Array<DrawableObject>): void {
    const context = this.canvas.getContext("2d");
    if (context) {
      if (this._lastGlobalAlphaBeforeTransition !== -1) {
        context.globalAlpha = this._lastGlobalAlphaBeforeTransition;
        this._lastGlobalAlphaBeforeTransition = -1;
      }
      for (let drawable of drawables) {
        drawable.render(context);
      }
    }
  }
  /**
   * Renders the transition of two drawable objects.
   *
   *
   *
   * @public
   * @method
   * @param {DrawableObject | null} bg The drawable object to be rendered in the background.
   * @param {DrawableObject | null} fg The drawable object to be rendered in the foreground.
   * @returns {void}
   */
  public renderTransition(bg: DrawableObject | null, fg: DrawableObject | null): void {
    const context = this.canvas.getContext("2d");
    if (this.isTransitioning() && context) {
      context.save();
      if (bg) {
        context.globalAlpha = this._transitionBackground;
        bg.render(context);
      }
      if (fg) {
        context.globalAlpha = this._transitionForeground;
        fg.render(context);
      }
      context.restore();
    }
  }
  /**
   * Resizes the graphics context width and height.
   *
   *
   *
   * @public
   * @method
   * @param {number} width The graphics context width.
   * @param {number} height The graphics context height.
   * @returns {void}
   */
  public resize(width: number, height: number): void {
    this._width = width;
    this._height = height;
    this.canvas.width = this._width;
    this.canvas.height = this._height;
    this.canvas.style.width = this._width + "px";
    this.canvas.style.height = this._height + "px";
  }
  /**
   * Ticks the FPS meter component.
   *
   *
   *
   * @public
   * @method
   * @returns {void}
   */
  public tickEnd(): void {
    if (this._fpsmeterToggled && this._fpsmeter) {
      this._fpsmeter.tick();
    }
  }
  /**
   * Ticks the FPS meter component.
   *
   *
   *
   * @public
   * @method
   * @returns {void}
   */
  public tickStart(): void {
    if (this._fpsmeterToggled && this._fpsmeter) {
      this._fpsmeter.tickStart();
    }
  }
  /**
   * Toggles the FPS meter visibility.
   *
   *
   *
   * @public
   * @method
   * @param {boolean} visible The FPS meter visibility.
   * @returns {void}
   */
  public toggleFps(visible: boolean): void {
    if (this._fpsmeter && this._fpsmeterBox) {
      if (visible) {
        this._fpsmeter.show();
        this._fpsmeterBox.style.display = "block";
      } else {
        this._fpsmeter.hide();
        this._fpsmeterBox.style.display = "none";
      }
      this._fpsmeterToggled = visible;
    }
  }
  /**
   * Starts the transition from drawable object to another.
   *
   *
   *
   * @public
   * @method
   * @param {number} duration The duration of the transition mode.
   * @returns {void}
   */
  public transitionStart(duration: number): void {
    const context = this._canvas.getContext("2d");
    if (context) {
      this._lastGlobalAlphaBeforeTransition = context.globalAlpha;
    }
    this._transitionDuration = duration;
    this._transitionBackground = 1;
    this._transitionForeground = 0;
    console.log(this._lastGlobalAlphaBeforeTransition);
  }
  /**
   * Updates the graphics context.
   *
   *
   *
   * @public
   * @method
   * @returns {void}
   */
  public update(): void {
    if (this._transitionDuration > 0) {
      let duration = this._transitionDuration;
      this._transitionBackground -= this._transitionBackground / duration;
      this._transitionForeground += (1 - this._transitionForeground) / duration;
      this._transitionDuration--;
    }
    this._frameCount = this._frameCount + 1 * this._frameDelta;
  }
  /**
   * Initializes the canvas component.
   *
   *
   *
   * @private
   * @method
   * @returns {void}
   */
  private initCanvas(): void {
    this._canvas.style.backgroundColor = "black";
    this._canvas.style.left = "50%";
    this._canvas.style.position = "fixed";
    this._canvas.style.top = "50%";
    this._canvas.style.transform = "translate(-50%, -50%)";
    this._canvas.style.zIndex = "0";
    document.body.appendChild(this._canvas);
  }
  /**
   * Initializes the FPS meter component.
   *
   *
   *
   * @private
   * @method
   * @returns {void}
   */
  private initFpsmeter(): void {
    let options: FPSMeterOptions = {
      left: "20px",
      graph: 1,
      decimals: 1,
      theme: "transparent",
      toggleOn: undefined,
    };
    this._fpsmeterBox = document.createElement("div");
    this._fpsmeterBox.id = "fpsmeter-box";
    this._fpsmeterBox.style.backgroundColor = "rgb(0 0 0 / .1)";
    this._fpsmeterBox.style.position = "absolute";
    this._fpsmeterBox.style.top = "0";
    this._fpsmeterBox.style.left = "15px";
    this._fpsmeterBox.style.width = "129px";
    this._fpsmeterBox.style.height = "50px";
    this._fpsmeterBox.style.zIndex = "9";
    this._fpsmeter = new FPSMeter(document.body, options);
    document.body.appendChild(this._fpsmeterBox);
    this.toggleFps(false);
  }
  /**
   * Fires up when window was resized.
   *
   *
   *
   * @private
   * @method
   * @returns {void}
   */
  private onResize(): void {
    this.resize(innerWidth, innerHeight);
  }
  /**
   * Configures the event listeners.
   *
   *
   *
   * @private
   * @method
   * @returns {void}
   */
  private setupEventHandlers(): void {
    window.addEventListener("resize", this.onResize.bind(this));
  }
}
/**
 * A window graphics context.
 *
 *
 *
 * @constant
 * @module
 */
export const Graphics: WindowGraphicsInterface = WindowGraphics.create();
