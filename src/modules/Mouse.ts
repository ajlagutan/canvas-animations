import { debug } from "./Utils";
/**
 * The mouse mapping configuration.
 *
 *
 *
 * @global
 */
var MouseMapping: any = {
  0: "left",
  1: "right",
  2: "middle",
  3: "back",
  4: "forward",
};
/**
 * A class that handles mouse inputs.
 *
 *
 *
 * @public
 * @static
 * @class
 */
export abstract class Mouse {
  private static _currentState: any;
  private static _latestButton: string | null;
  private static _pressedTime: number;
  private static _previousState: any;
  private static _repeatInterval: number = 6;
  private static _repeatWait: number = 24;
  private static _x: number | null;
  private static _y: number | null;
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
   * Gets the mouse x-coordinate.
   *
   *
   *
   * @public
   * @static
   * @readonly
   * @property
   */
  public static get x(): number | null {
    return this._x;
  }
  /**
   * Gets the mouse y-coordinate.
   *
   *
   *
   * @public
   * @static
   * @readonly
   * @property
   */
  public static get y(): number | null {
    return this._y;
  }
  public static config(mapping: any): void {
    MouseMapping = Object.assign({}, MouseMapping, mapping);
  }
  /**
   * Initializes the mouse input module.
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
      this.clear();
      this.setupEventHandlers();
      debug(this, "initialized.");
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Checks whether the specified mouse data has been long pressed.
   *
   *
   *
   * @public
   * @static
   * @method
   * @param {string} button The mouse data.
   * @returns {boolean} true, if the specified mouse data has been long pressed; otherwise, false.
   */
  public static longPressed(button: string): boolean {
    return (
      this._latestButton === button && this._pressedTime >= this._repeatWait
    );
  }
  /**
   * Checks whether the specified mouse data has been pressed.
   *
   *
   *
   * @public
   * @static
   * @method
   * @param {string} button The mouse data.
   * @returns {boolean} true, if the specified mouse data has been pressed; otherwise, false.
   */
  public static pressed(button: string): boolean {
    return !!this._currentState[button];
  }
  /**
   * Checks whether the specified mouse data has been pressed repeatedly.
   *
   *
   *
   * @public
   * @static
   * @method
   * @param {string} button The mouse data.
   * @returns {boolean} true, if the specified mouse data has been pressed repeatedly; otherwise, false.
   */
  public static repeated(button: string): boolean {
    return (
      this._latestButton === button &&
      (this._pressedTime === 0 ||
        (this._pressedTime >= this._repeatWait &&
          this._pressedTime % this._repeatInterval === 0))
    );
  }
  /**
   * Checks whether the specified mouse data has been triggered.
   *
   *
   *
   * @public
   * @static
   * @method
   * @param {string} button The mouse data.
   * @returns {boolean} true, if the specified mouse data has been triggered; otherwise, false.
   */
  public static triggered(button: string): boolean {
    return this._latestButton === button && this._pressedTime === 0;
  }
  /**
   * Updates the mouse module state.
   *
   *
   *
   * @public
   * @static
   * @method
   * @param {number} step The fixed step.
   * @returns {void}
   */
  public static update(step: number): void {
    if (this._latestButton && this._currentState[this._latestButton]) {
      this._pressedTime = this._pressedTime + 1 * step;
    } else {
      this._latestButton = null;
    }
    for (let name in this._currentState) {
      if (this._currentState[name] && !this._previousState[name]) {
        this._latestButton = name;
        this._pressedTime = 0;
      }
      this._previousState[name] = this._currentState[name];
    }
  }
  /**
   * Clears the mouse module state.
   *
   *
   *
   * @public
   * @static
   * @method
   * @returns {void}
   */
  private static clear(): void {
    this._currentState = {};
    this._previousState = {};
    this._latestButton = null;
    this._pressedTime = 0;
    this._x = null;
    this._y = null;
  }
  /**
   * Handles the window's blur event.
   *
   *
   *
   * @private
   * @static
   * @method
   * @returns {void}
   */
  private static onLostFocus(): void {
    this.clear();
  }
  /**
   * Handles the window's mouse down event.
   *
   *
   *
   * @private
   * @static
   * @method
   * @param {MouseEvent} event The mouse event.
   * @returns {void}
   */
  private static onMouseDown(event: MouseEvent): void {
    const buttonName = MouseMapping[event.button];
    if (buttonName) {
      this._currentState[buttonName] = true;
    }
  }
  /**
   * Handles the window's mouse leave event.
   *
   *
   *
   * @private
   * @static
   * @method
   * @returns {void}
   */
  private static onMouseLeave(): void {
    this.clear();
  }
  /**
   * Handles the window's mouse move event.
   *
   *
   *
   * @private
   * @static
   * @method
   * @param {MouseEvent} event The mouse event.
   * @returns {void}
   */
  private static onMouseMove(event: MouseEvent): void {
    this._x = event.x;
    this._y = event.y;
  }
  /**
   * Handles the window's mouse up event.
   *
   *
   *
   * @private
   * @static
   * @method
   * @param {MouseEvent} event The mouse event.
   * @returns {void}
   */
  private static onMouseUp(event: MouseEvent): void {
    const buttonName = MouseMapping[event.button];
    if (buttonName) {
      this._currentState[buttonName] = false;
    }
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
    document.addEventListener("mousedown", this.onMouseDown.bind(this));
    document.addEventListener("mouseleave", this.onMouseLeave.bind(this));
    document.addEventListener("mousemove", this.onMouseMove.bind(this));
    document.addEventListener("mouseup", this.onMouseUp.bind(this));
    window.addEventListener("blur", this.onLostFocus.bind(this));
  }
}
