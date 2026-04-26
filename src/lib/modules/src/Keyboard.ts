import { Graphics } from "@lib/modules";
import { logger } from "@lib/utils";
/**
 * A global keyboard mapping.
 *
 *
 *
 * @var
 */
var WindowKeyboardMapping: { [key: string]: string | null | undefined } = {
  d: "debug",
};
/**
 * A class that handles the keyboard input events.
 *
 *
 *
 * @class
 */
class WindowKeyboard implements WindowInputInterface {
  private _currentState: WindowInputState = {};
  private _latestKey: string | null = null;
  private _pressedTime: number = 0;
  private _previousState: WindowInputState = {};
  private _repeatInterval: number = 6;
  private _repeatWait: number = 24;
  /**
   * Creates a new {@link WindowKeyboard} object instance.
   *
   *
   *
   * @private
   * @constructor
   */
  private constructor() {}
  /**
   * Gets or sets the keyboard repeat interval.
   *
   *
   *
   * @public
   * @property
   * @returns {number} The keyboard repeat interval.
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
   * Gets or sets the keyboard repeat wait.
   *
   *
   *
   * @public
   * @property
   * @returns {number} The keyboard repeat wait.
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
   * @returns {number | null} **`null`**, if the input context is not mouse; otherwise, the mouse x-coordinate value.
   */
  public get x(): number | null {
    return null;
  }
  /**
   * Gets the mouse y-coordinate.
   *
   *
   *
   * @public
   * @readonly
   * @property
   * @returns {number | null} **`null`**, if the input context is not mouse; otherwise, the mouse y-coordinate value.
   */
  public get y(): number | null {
    return null;
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
    return new WindowKeyboard();
  }
  /**
   * Initializes the keyboard input.
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
   * Checks whether the specified **`key`** has been long pressed.
   *
   *
   *
   * @public
   * @method
   * @param {string} key The key.
   * @returns {boolean} **`true`**, if the specified **`key`** has been long pressed; otherwise, **`false`**.
   */
  public longPressed(key: string): boolean {
    return this._latestKey === key && this._pressedTime >= this._repeatWait;
  }
  /**
   * Checks whether the specified **`key`** has been pressed.
   *
   *
   *
   * @public
   * @method
   * @param {string} key The key.
   * @returns {boolean} **`true`**, if the specified **`key`** has been pressed; otherwise, **`false`**.
   */
  public pressed(key: string): boolean {
    return !!this._currentState[key];
  }
  /**
   * Checks whether the specified **`key`** has been pressed repeatedly.
   *
   *
   *
   * @public
   * @method
   * @param {string} key The key.
   * @returns {boolean} **`true`**, if the specified **`key`** has been pressed repeatedly; otherwise, **`false`**.
   */
  public repeat(key: string): boolean {
    return (
      this._latestKey === key &&
      (this._pressedTime === 0 ||
        (this._pressedTime >= this._repeatWait &&
          this._pressedTime % this._repeatInterval === 0))
    );
  }
  /**
   * Checks whether the specified **`key`** has been triggered.
   *
   *
   *
   * @public
   * @method
   * @param {string} key The key.
   * @returns {boolean} **`true`**, if the specified **`key`** has been triggered; otherwise, **`false`**.
   */
  public trigger(key: string): boolean {
    return this._latestKey === key && this._pressedTime === 0;
  }
  /**
   * Updates the keyboard state.
   *
   *
   *
   * @public
   * @method
   * @returns {void}
   */
  public update(): void {
    const frameDelta: number = 1 / Graphics.frameRate;
    if (this._latestKey && this._currentState[this._latestKey]) {
      this._pressedTime = this._pressedTime + 1 * frameDelta;
    } else {
      this._latestKey = null;
    }
    for (let name in this._currentState) {
      if (this._currentState[name] && !this._previousState[name]) {
        this._latestKey = name;
        this._pressedTime = 0;
      }
      this._previousState[name] = this._currentState[name];
    }
  }
  /**
   * Clears the keyboard state.
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
    this._latestKey = null;
    this._pressedTime = 0;
  }
  /**
   * Fires up when the window receives a key down event.
   *
   *
   *
   * @private
   * @method
   * @param {KeyboardEvent} event The keyboard event passed by the user agent.
   * @returns {void}
   */
  private onKeyDown(event: KeyboardEvent): void {
    const key = WindowKeyboardMapping[event.key];
    if (key) {
      this._currentState[key] = true;
    }
  }
  /**
   * Fires up when the window receives a key up event.
   *
   *
   *
   * @private
   * @method
   * @param {KeyboardEvent} event The keyboard event passed by the user agent.
   * @returns {void}
   */
  private onKeyUp(event: KeyboardEvent): void {
    const key = WindowKeyboardMapping[event.key];
    if (key) {
      this._currentState[key] = false;
    }
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
   * Configures the keyboard event listeners.
   *
   *
   *
   * @private
   * @method
   * @returns {void}
   */
  private setupEventHandlers(): void {
    document.addEventListener("keydown", this.onKeyDown.bind(this));
    document.addEventListener("keyup", this.onKeyUp.bind(this));
    window.addEventListener("blur", this.onLostFocus.bind(this));
  }
}
/**
 * A keyboard input module.
 *
 *
 *
 * @constant
 * @module
 */
export const Keyboard: WindowInputInterface = WindowKeyboard.create();
/**
 * Configures the keyboard mappings.
 *
 *
 *
 * @public
 * @function
 * @param {{ [key: string]: any }} mapping The new keyboard mapping.
 * @returns {void}
 */
export function configKeyboardMapping(mapping: { [key: string]: any }): void {
  WindowKeyboardMapping = Object.assign({}, WindowKeyboardMapping, mapping);
}
