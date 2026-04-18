import * as lil from "lil-gui";
import { Graphics } from "./Graphics";
import { Keyboard } from "./Keyboard";
import { Mouse } from "./Mouse";
import { Scene, type SceneConstructor } from "./Scene";
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
  private static _nextScene: Scene | null;
  private static _scene: Scene | null;
  private static _sceneStarted: boolean = false;
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
  public static run(): void;
  /**
   * Starts the game loop with an initial scene.
   *
   *
   *
   * @public
   * @static
   * @method
   * @param {Scene} scene The starting scene.
   * @returns {void}
   */
  public static run(scene: Scene): void;
  /**
   * Starts the game loop with an initial scene.
   *
   *
   *
   * @public
   * @static
   * @method
   * @param {SceneConstructor} scene The scene constructor of the starting scene.
   * @returns {void}
   */
  public static run(scene: SceneConstructor): void;
  public static run(scene?: Scene | SceneConstructor | null): void {
    try {
      debug(this, "starting...");
      this.init();
      this.initGui();
      this.goto(scene);
      this.requestUpdate();
      debug(this, "started.");
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Changes the scene rendered.
   *
   *
   *
   * @private
   * @static
   * @method
   * @returns {void}
   */
  private static changeScene(): void {
    if (this.isSceneChanging() && !this.isCurrentSceneBusy()) {
      if (this._scene) {
        this._scene.terminate();
      }
      this._scene = this._nextScene;
      if (this._scene) {
        this._scene.create();
        this._nextScene = null;
        this._sceneStarted = false;
      }
    }
  }
  /**
   * Commands the game to render the specified scene object.
   *
   *
   *
   * @private
   * @static
   * @method
   * @param {Scene | SceneConstructor | null} scene The scene object to be rendered.
   * @returns {void}
   */
  private static goto(scene?: Scene | SceneConstructor | null): void {
    if (scene instanceof Scene) {
      this._nextScene = scene;
    } else if (typeof scene === "function") {
      const ctor: SceneConstructor = scene;
      this._nextScene = new ctor();
    }
    if (this._scene) {
      this._scene.stop();
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
   * Initializes the GUI components.
   *
   *
   *
   * @private
   * @static
   * @method
   * @returns {void}
   */
  private static initGui(): void {
    this._gui = new lil.GUI({ title: "control panel" });
    this._gui.add(this._options, "fps").onFinishChange(Graphics.toggleFps.bind(Graphics)).name("show fps");
    this._gui.onFinishChange(this.saveOptions);
    this.loadOptions(this._gui);
  }
  /**
   * Checks whether the current scene is busy.
   *
   *
   *
   * @returns {boolean} true, if the current scene is busy; otherwise, false.
   */
  private static isCurrentSceneBusy(): boolean {
    return !!this._scene && this._scene.isBusy();
  }
  /**
   * Checks whether the current scene has started.
   *
   *
   *
   * @returns {boolean} true, if the current scene has started; otherwise, false.
   */
  private static isCurrentSceneStarted(): boolean {
    return !!this._scene && this._sceneStarted;
  }
  /**
   * Checks whether the scene is changing.
   *
   *
   *
   * @returns {boolean} true, if the scene is changing; otherwise, false.
   */
  private static isSceneChanging(): boolean {
    return !!this._nextScene;
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
        this.changeScene();
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
    if (this._scene) {
      if (!this._sceneStarted && this._scene.isReady()) {
        this._scene.start();
        this._sceneStarted = true;
      }
      if (this.isCurrentSceneStarted()) {
        this._scene.update(this._step);
      }
    }
  }
}
