import * as lil from "lil-gui";
import { Graphics } from "./Graphics";
import { Keyboard } from "./Keyboard";
import { Mouse } from "./Mouse";
import { debug } from "./Utils";
type GameOptions = { fps: boolean };
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
  private static _accumulator: number = 0;
  private static _fps: number = 60;
  private static _gui: lil.GUI;
  private static _lastUpdateTime: number = 0;
  private static _options: GameOptions = { fps: false };
  private static _scene: any;
  private static _step: number = 1 / this._fps;
  private static _stopped: boolean;
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
      this.initGui();
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
  private static initGui(): void {
    this._gui = new lil.GUI({ title: "control panel" });
    this._gui.add(this._options, "fps").onFinishChange(Graphics.toggleFps.bind(Graphics)).name("show fps");
    this._gui.onFinishChange(this.saveOptions);
    this.loadOptions(this._gui);
  }
  /**
   * Loads the options from the browser's {@link localStorage} module.
   *
   *
   *
   * @private
   * @static
   * @method
   * @param {lil.GUI} gui A root {@link lil.GUI} instance.
   * @returns {void}
   */
  private static loadOptions(gui: lil.GUI): void {
    try {
      const s = localStorage.getItem("/:root") ?? "{}";
      const o = JSON.parse(s);
      gui.load(o, true);
    } catch (error) {
      console.error(error);
    }
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
   * Saves the options to the browser's {@link localStorage} module.
   *
   *
   *
   * @private
   * @static
   * @method
   * @param event The change event.
   * @returns {void}
   */
  private static saveOptions(event: any): void {
    try {
      if (event["controller"] instanceof lil.Controller) {
        const controller: lil.Controller = event["controller"];
        const gui: lil.GUI = controller.parent;
        const o = gui.save(true);
        const s = JSON.stringify(o);
        localStorage.setItem("/:root", s);
      }
    } catch (error) {
      console.error(error);
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
