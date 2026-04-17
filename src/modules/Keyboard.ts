import { debug } from "./Utils";
/**
 * The keyboard mapping configuration.
 *
 *
 *
 * @global
 */
var KeyboardMapping: any = {};
/**
 * A class that handles keyboard inputs.
 *
 *
 *
 * @public
 * @static
 * @class
 */
export abstract class Keyboard {
  private static _currentState: any;
  private static _latestKey: string | null;
  private static _pressedTime: number;
  private static _previousState: any;
  private static _repeatInterval: number = 6;
  private static _repeatWait: number = 24;
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
   * Gets or sets the keyboard repeat interval.
   *
   *
   *
   * @public
   * @static
   * @property
   * @returns {number} The keyboard repeat interval.
   */
  public static get repeatInterval(): number {
    return this._repeatInterval;
  }
  public static set repeatInterval(value: number) {
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
   * @static
   * @property
   * @returns {number} The keyboard repeat wait.
   */
  public static get repeatWait(): number {
    return this._repeatWait;
  }
  public static set repeatWait(value: number) {
    if (this._repeatWait !== value) {
      this._repeatWait = value;
    }
  }
  /**
   * Configures the keyboard mapping.
   *
   *
   *
   * @param {any} mapping The keyboard mapping.
   * @returns {void}
   */
  public static config(mapping: any): void {
    KeyboardMapping = Object.assign({}, KeyboardMapping, mapping);
    console.info(KeyboardMapping);
  }
  /**
   * Initializes the keyboard input module.
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
      debug(this, "initialized");
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Checks whether the specified key data has been long pressed.
   *
   *
   *
   * @public
   * @static
   * @method
   * @param {string} key The key data.
   * @returns {boolean} true, if the specified key data has been long pressed; otherwise, false.
   */
  public static longPressed(key: string): boolean {
    return this._latestKey === key && this._pressedTime >= this._repeatWait;
  }
  /**
   * Checks whether the specified key data has been pressed.
   *
   *
   *
   * @public
   * @static
   * @method
   * @param {string} key The key data.
   * @returns {boolean} true, if the specified key data has been pressed; otherwise, false.
   */
  public static pressed(key: string): boolean {
    return !!this._currentState[key];
  }
  /**
   * Checks whether the specified key data has been pressed repeatedly.
   *
   *
   *
   * @public
   * @static
   * @method
   * @param {string} key The key data.
   * @returns {boolean} true, if the specified key data has been pressed repeatedly; otherwise, false.
   */
  public static repeated(key: string): boolean {
    return (
      this._latestKey === key &&
      (this._pressedTime === 0 ||
        (this._pressedTime >= this._repeatWait &&
          this._pressedTime % this._repeatInterval === 0))
    );
  }
  /**
   * Checks whether the specified key data has been triggered.
   *
   *
   *
   * @public
   * @static
   * @method
   * @param {string} key The key data.
   * @returns {boolean} true, if the specified key data has been triggered; otherwise, false.
   */
  public static triggered(key: string): boolean {
    return this._latestKey === key && this._pressedTime === 0;
  }
  /**
   * Updates the keyboard module state.
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
    if (this._latestKey && this._currentState[this._latestKey]) {
      this._pressedTime = this._pressedTime + 1 * step;
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
   * Clears the keyboard module state.
   *
   *
   *
   * @private
   * @static
   * @method
   * @returns {void}
   */
  private static clear(): void {
    this._currentState = {};
    this._previousState = {};
    this._latestKey = null;
    this._pressedTime = 0;
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
   * Handles the window's key down event.
   *
   *
   *
   * @private
   * @static
   * @method
   * @param {KeyboardEvent} event The keyboard event.
   * @returns {void}
   */
  private static onKeyDown(event: KeyboardEvent): void {
    if (event.key === "NumLock") {
      this.clear();
    }
    const keyName = KeyboardMapping[event.key];
    console.log(keyName);
    if (keyName) {
      this._currentState[keyName] = true;
    }
  }
  /**
   * Handles the window's key up event.
   *
   *
   *
   * @private
   * @static
   * @method
   * @param {KeyboardEvent} event The keyboard event.
   * @returns {void}
   */
  private static onKeyUp(event: KeyboardEvent): void {
    const keyName = KeyboardMapping[event.key];
    if (keyName) {
      this._currentState[keyName] = false;
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
    document.addEventListener("keydown", this.onKeyDown.bind(this));
    document.addEventListener("keyup", this.onKeyUp.bind(this));
    window.addEventListener("blur", this.onLostFocus.bind(this));
  }
}
