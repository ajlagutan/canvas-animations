import * as lil from "lil-gui";
import { Graphics } from "./Graphics";
import { Keyboard } from "./Keyboard";
import { Mouse } from "./Mouse";
import { Scene, type SceneConstructor } from "./Scene";
import { createSceneManager, type SceneManagerFn as SceneManagerInitFn, type SceneManagerInit } from "./SceneManager";
import { debug } from "./Utils";
/**
 * Game options type.
 *
 *
 *
 * @private
 * @type
 */
type GameOptions = {
  /**
   * Gets or sets whether the FPS component is visible on the screen.
   *
   *
   *
   * @property
   */
  fps: boolean;
  /**
   * Gets or sets the current active scene to be rendered.
   *
   *
   *
   * @property
   */
  scene: string;
};
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
  private static _fadeDuration: number = 0;
  private static _nextSceneOpacity: number = 0;
  private static _lastSceneOpacity: number = 1;
  private static _fps: number = 60;
  private static _gui: lil.GUI;
  private static _lastScene: Scene | null;
  private static _lastUpdateTime: number = 0;
  private static _manager: SceneManagerInit | null;
  private static _nextScene: Scene | null;
  private static _options: GameOptions = { fps: false, scene: "" };
  private static _scene: Scene | null;
  private static _sceneSelector: lil.Controller | null;
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
   * Gets the current FPS of the game.
   * 
   * 
   * 
   * @public
   * @static
   * @readonly
   * @property
   * @returns {number} The current FPS of the game.
   */
  public static get fps(): number {
    return this._fps;
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
  public static run(fn: SceneManagerInitFn): void {
    try {
      debug(this, "starting...");
      this.init();
      this.initManager(fn);
      this.initGui();
      this.requestUpdate();
      debug(this, "started.");
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Starts the game loop with an initial scene.
   *
   *
   *
   * @public
   * @static
   * @method
   * @param {Scene | null} scene The starting scene.
   * @returns {void}
   */
  public static runScene(scene: Scene | null): void;
  /**
   * Starts the game loop with an initial scene.
   *
   *
   *
   * @public
   * @static
   * @method
   * @param {SceneConstructor | null} scene The scene constructor of the starting scene.
   * @returns {void}
   */
  public static runScene(scene: SceneConstructor | null): void;
  public static runScene(scene: Scene | SceneConstructor | null): void {
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
        this._lastScene = this._scene;
        this.startSceneTransition(15);
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
   * @param {string | Scene | SceneConstructor | null} scene The scene object to be rendered.
   * @returns {void}
   */
  private static goto(scene: string | Scene | SceneConstructor | null): void {
    if (scene instanceof Scene) {
      this._nextScene = scene;
    } else if (typeof scene === "string" && scene !== "") {
      if (this._manager) {
        this._nextScene = this._manager.get(scene);
      }
    } else if (typeof scene === "function") {
      const ctor: SceneConstructor = scene;
      const nextScene: Scene = new ctor();
      this._nextScene = nextScene;
    } else {
      if (this._manager) {
        let scenes: string[] = Object.values(this._manager.scenes);
        let first: string | null = scenes.length > 0 ? scenes[0] : null;
        this._nextScene = this._manager.get(first);
      }
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
    // Setup event handlers
    this.setupEventHandlers();
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

    let fps = this._gui.add(this._options, "fps");
    fps.onChange(Graphics.toggleFps.bind(Graphics));
    fps.name("show fps");

    this._sceneSelector = this._gui.add(this._options, "scene", this._manager?.scenes);
    this._sceneSelector.onChange(this.goto.bind(this));
    this._sceneSelector.name("scene");
    this._sceneSelector.show(!!this._manager);

    this.loadOptions(this._gui);

    if (this._options.scene === "") {
      let scenes: string[] = Object.values(this._manager?.scenes ?? {});
      let first: string | null = scenes.length > 0 ? scenes[0] : null;
      this._sceneSelector.setValue(first);
    }

    this._gui.onFinishChange(this.saveOptions);
  }
  /**
   * Initializes the {@link SceneManagerInit} component.
   *
   *
   *
   * @private
   * @static
   * @method
   * @param {SceneManagerInitFn} fn A function to configure the initialized {@link SceneManagerInit} component.
   * @returns {void}
   */
  private static initManager(fn: SceneManagerInitFn): void {
    this._manager = createSceneManager();
    if (fn) {
      fn.call(this._manager, this._manager);
    }
    this._manager.finalize();
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
        this.updateFade();
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
    if (this._scene) {
      this._scene.resize();
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
    Graphics.clear();
    if (this._fadeDuration > 0) {
      Graphics.context.save();
      if (this._lastScene) {
        Graphics.context.globalAlpha = this._lastSceneOpacity;
        Graphics.render(this._lastScene);
      }
      if (this._scene) {
        Graphics.context.globalAlpha = this._nextSceneOpacity;
        Graphics.render(this._scene);
      }
      Graphics.context.restore();
    } else {
      if (this._scene) {
        Graphics.render(this._scene);
      }
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
  /**
   * Starts the scene transition.
   *
   *
   *
   * @private
   * @static
   * @method
   * @param {number} duration The duration (in frames) of the transition.
   * @returns {void}
   */
  private static startSceneTransition(duration: number): void {
    this._fadeDuration = duration;
    this._lastSceneOpacity = 1;
    this._nextSceneOpacity = 0;
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
   * Updates the fade transition.
   *
   *
   *
   * @private
   * @static
   * @method
   * @returns {void}
   */
  private static updateFade(): void {
    if (this._fadeDuration > 0) {
      let duration = this._fadeDuration;
      this._lastSceneOpacity -= this._lastSceneOpacity / duration;
      this._nextSceneOpacity += (1 - this._nextSceneOpacity) / duration;
      this._fadeDuration--;
    }
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
