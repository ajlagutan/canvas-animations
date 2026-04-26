import { Graphics } from "..";
import { logger } from "../../utils";
/**
 * A global mouse mapping.
 *
 *
 *
 * @var
 */
var WindowMouseMapping: { [key: number]: string } = {
  0: "left",
  1: "right",
  2: "middle",
  3: "back",
  4: "forward",
};
/**
 * A class that handles the mouse input events.
 *
 *
 *
 * @class
 */
class WindowMouse implements WindowInputInterface {
  private _currentState: WindowInputState = {};
  private _lastestButton: string | null = null;
  private _pressedTime: number = 0;
  private _previousState: WindowInputState = {};
  private _repeatInterval: number = 6;
  private _repeatWait: number = 24;
  private _x: number | null = null;
  private _y: number | null = null;
  /**
   * Creates a new {@link WindowMouse} object instance.
   *
   *
   *
   * @private
   * @constructor
   */
  private constructor() {}
  /**
   * Gets or sets the mouse repeat interval.
   *
   *
   *
   * @public
   * @property
   * @returns {number} The mouse repeat interval.
   */
  public get repeatInterval(): number {
    return this._repeatInterval;
  }
  public set repeatInterval(value: number) {
    if (this._repeatInterval !== value) {
      this._repeatInterval = value;
    }
  }
  /**
   * Gets or sets the mouse repeat wait.
   *
   *
   *
   * @public
   * @property
   * @returns {number} The mouse repeat wait.
   */
  public get repeatWait(): number {
    return this._repeatWait;
  }
  public set repeatWait(value: number) {
    if (this._repeatWait !== value) {
      this._repeatWait = value;
    }
  }
  /**
   * Gets the mouse x-coordinate.
   *
   *
   *
   * @public
   * @readonly
   * @property
   * @returns {number | null} **`null`**, if the mouse is outside the window boundary; otherwise, the mouse x-coordinate value.
   */
  public get x(): number | null {
    return this._x;
  }
  /**
   * Gets the mouse y-coordinate.
   *
   *
   *
   * @public
   * @readonly
   * @property
   * @returns {number | null} **`null`**, if the mouse is outside the window boundary; otherwise, the mouse y-coordinate value.
   */
  public get y(): number | null {
    return this._y;
  }
  /**
   * Creates a new {@link WindowInputInterface} object instance.
   *
   *
   *
   * @public
   * @static
   * @method
   * @returns {WindowInputInterface} A new {@link WindowInputInterface} object instance.
   */
  public static create(): WindowInputInterface {
    return new WindowMouse();
  }
  /**
   * Initializes the mouse input.
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
      this.clear();
      this.setupEventHandlers();
      logger.debug(this, "initialized.");
    } catch (error) {
      logger.error(this, error);
    }
  }
  /**
   * Checks whether the specified mouse **`button`** has been long pressed.
   *
   *
   *
   * @public
   * @method
   * @param {string} button The mouse button.
   * @returns {boolean} **`true`**, if the specified mouse **`button`** has been long pressed; otherwise, **`false`**.
   */
  public longPressed(button: string): boolean {
    return (
      this._lastestButton === button && this._pressedTime >= this._repeatWait
    );
  }
  /**
   * Checks whether the specified mouse **`button`** has been pressed.
   *
   *
   *
   * @public
   * @method
   * @param {string} button The mouse button.
   * @returns {boolean} **`true`**, if the specified mouse **`button`** has been pressed; otherwise, **`false`**.
   */
  public pressed(button: string): boolean {
    return !!this._currentState[button];
  }
  /**
   * Checks whether the specified mouse **`button`** has been pressed repeatedly.
   *
   *
   *
   * @public
   * @method
   * @param {string} button The mouse button.
   * @returns {boolean} **`true`**, if the specified mouse **`button`** has been pressed repeatedly; otherwise, **`false`**.
   */
  public repeat(button: string): boolean {
    return (
      this._lastestButton === button &&
      (this._pressedTime === 0 ||
        (this._pressedTime >= this._repeatWait &&
          this._pressedTime % this._repeatInterval === 0))
    );
  }
  /**
   * Checks whether the specified mouse **`button`** has been triggered.
   *
   *
   *
   * @public
   * @method
   * @param {string} button The mouse button.
   * @returns {boolean} **`true`**, if the specified mouse **`button`** has been triggered; otherwise, **`false`**.
   */
  public trigger(button: string): boolean {
    return this._lastestButton === button && this._pressedTime === 0;
  }
  /**
   * Updates the mouse state.
   *
   *
   *
   * @public
   * @method
   * @returns {void}
   */
  public update(): void {
    const frameDelta: number = 1 / Graphics.frameRate;
    if (this._lastestButton && this._currentState[this._lastestButton]) {
      this._pressedTime = this._pressedTime + 1 * frameDelta;
    } else {
      this._lastestButton = null;
    }
    for (let name in this._currentState) {
      if (this._currentState[name] && !this._previousState[name]) {
        this._lastestButton = name;
        this._pressedTime = 0;
      }
      this._previousState[name] = this._currentState[name];
    }
  }
  /**
   * Clears the mouse state.
   *
   *
   *
   * @private
   * @method
   * @returns {void}
   */
  private clear(): void {
    this._currentState = {};
    this._previousState = {};
    this._lastestButton = null;
    this._pressedTime = 0;
    this._x = null;
    this._y = null;
  }
  /**
   * Fires up when the window lost focus.
   *
   *
   *
   * @private
   * @method
   * @returns {void}
   */
  private onLostFocus(): void {
    this.clear();
  }
  /**
   * Fires up when the window receives a mouse down event.
   *
   *
   *
   * @private
   * @method
   * @param {MouseEvent} event The mouse event passed by the user agent.
   * @returns {void}
   */
  private onMouseDown(event: MouseEvent): void {
    const button = WindowMouseMapping[event.button];
    if (button) {
      this._currentState[button] = true;
    }
  }
  /**
   * Fires up when the window receives a mouse leave event.
   *
   *
   *
   * @private
   * @method
   * @returns {void}
   */
  private onMouseLeave(): void {
    this.clear();
  }
  /**
   * Fires up when the window receives a mouse move event.
   *
   *
   *
   * @private
   * @method
   * @param {MouseEvent} event The mouse event passed by the user agent.
   * @returns {void}
   */
  private onMouseMove(event: MouseEvent): void {
    this._x = event.x;
    this._y = event.y;
  }
  /**
   * Fires up when the window receives a mouse up event.
   *
   *
   *
   * @private
   * @method
   * @param {MouseEvent} event The mouse event passed by the user agent.
   * @returns {void}
   */
  private onMouseUp(event: MouseEvent): void {
    const button = WindowMouseMapping[event.button];
    if (button) {
      this._currentState[button] = false;
    }
  }
  /**
   * Configures the mouse event listeners.
   *
   *
   *
   * @private
   * @method
   * @returns {void}
   */
  private setupEventHandlers(): void {
    document.addEventListener("mousedown", this.onMouseDown.bind(this));
    document.addEventListener("mouseleave", this.onMouseLeave.bind(this));
    document.addEventListener("mousemove", this.onMouseMove.bind(this));
    document.addEventListener("mouseup", this.onMouseUp.bind(this));
    window.addEventListener("blur", this.onLostFocus.bind(this));
  }
}
/**
 * A mouse input module.
 *
 *
 *
 * @constant
 * @module
 */
export const Mouse: WindowInputInterface = WindowMouse.create();
