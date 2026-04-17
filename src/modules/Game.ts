import { Graphics } from "./Graphics";
import { Keyboard } from "./Keyboard";
import { Mouse } from "./Mouse";
import { debug } from "./Utils";
/**
 * A class that handles the main game loop.
 *
 * This is a static class, do not invoke the class constructor.
 *
 *
 *
 * @public
 * @static
 * @class
 */
export abstract class Game {
  private static _fps: number = 60;
  private static _scene: any;
  private static _step: number = 1 / this._fps;
  private static _stopped: boolean;
  private static _lastUpdateTime: number = 0;
  private static _accumulator: number = 0;
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
   * Starts the game loop.
   *
   *
   *
   * @public
   * @static
   * @method
   * @returns {void}
   */
  public static run(): void {
    try {
      debug(this, "starting...");
      this.init();
      this.requestUpdate();
      debug(this, "started.");
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Initializes the game components.
   *
   *
   *
   * @private
   * @static
   * @method
   * @returns {void}
   */
  private static init(): void {
    // Input modules
    Keyboard.init();
    Mouse.init();
    // Graphics module
    Graphics.init();
  }
  /**
   * The main game loop logic.
   *
   *
   *
   * @private
   * @static
   * @method
   * @param {number} time A high-resolution time stamp.
   * @returns {void}
   */
  private static loop(time: number): void {
    try {
      this.tickStart();
      this.setAccumulator((time - this._lastUpdateTime) / 1000);
      while (this._accumulator >= this._step) {
        this.updateInput();
        this.updateGraphics();
        this.updateScene();
        this._accumulator -= this._step;
      }
      this.renderScene();
      this.setLastUpdateTime(time);
      this.tickEnd();
      this.requestUpdate();
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Renders the current scene on the graphics context.
   *
   *
   *
   * @private
   * @static
   * @method
   * @returns {void}
   */
  private static renderScene(): void {
    if (this._scene) {
      Graphics.render(this._scene);
    }
  }
  /**
   * Requests an frame update by calling {@link requestAnimationFrame} method.
   *
   *
   *
   * @private
   * @static
   * @method
   * @returns {void}
   */
  private static requestUpdate(): void {
    if (!this._stopped) {
      requestAnimationFrame(this.loop.bind(this));
    }
  }
  /**
   * Sets the accumulator variable.
   *
   *
   *
   * @private
   * @static
   * @method
   * @param {number} delta The real time passed since the last frame.
   * @returns {void}
   */
  private static setAccumulator(delta: number): void {
    this._accumulator += delta;
  }
  /**
   * Sets the last update time variable.
   *
   *
   *
   * @private
   * @static
   * @method
   * @param {number} time The high-resolution time stamp from the {@link requestAnimationFrame} function.
   * @returns {void}
   */
  private static setLastUpdateTime(time: number): void {
    this._lastUpdateTime = time;
  }
  /**
   * Calls the {@link Graphics.tickEnd}() method.
   *
   *
   *
   * @private
   * @static
   * @method
   * @returns {void}
   */
  private static tickEnd(): void {
    Graphics.tickEnd();
  }
  /**
   * Calls the {@link Graphics.tickStart}() method.
   *
   *
   *
   * @private
   * @static
   * @method
   * @returns {void}
   */
  private static tickStart(): void {
    Graphics.tickStart();
  }
  /**
   * Updates the graphics context.
   *
   *
   *
   * @private
   * @static
   * @method
   * @returns {void}
   */
  private static updateGraphics(): void {
    Graphics.update(this._step);
  }
  /**
   * Updates the input modules.
   *
   *
   *
   * @private
   * @static
   * @method
   * @returns {void}
   */
  private static updateInput(): void {
    Keyboard.update(this._step);
    Mouse.update(this._step);
  }
  /**
   * Updates the current scene.
   *
   *
   *
   * @private
   * @static
   * @method
   * @returns {void}
   */
  private static updateScene(): void {
    if (this._scene && typeof this._scene["update"] === "function") {
      const update: Function = this._scene["update"];
      update.call(this._scene, this._step);
    }
  }
}
