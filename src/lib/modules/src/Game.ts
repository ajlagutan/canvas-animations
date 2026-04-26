import { Graphics, Keyboard, Mouse } from "..";
import { logger } from "../../utils";
/**
 * A class that handles the game loop logic.
 *
 *
 *
 * @class
 */
class GameLoop implements GameLoop {
  private _accumulator: number;
  private _nextScene?: SceneObject;
  private _stopped: boolean;
  private _scene?: SceneObject;
  private _sceneStarted: boolean;
  private _time: number;
  /**
   * Creates a new {@link GameLoop} object instance.
   *
   *
   *
   * @private
   * @constructor
   */
  private constructor() {
    this._accumulator = 0;
    this._time = 0;
    this._nextScene = undefined;
    this._scene = undefined;
    this._sceneStarted = false;
    this._stopped = false;
  }
  /**
   * Creates a new {@link GameLoop} object instance.
   *
   *
   *
   * @public
   * @static
   * @method
   * @returns {GameLoop} A new {@link GameLoop} object instance.
   */
  public static create(): GameLoop {
    return new GameLoop();
  }
  /**
   * Commands the game to render the specified scene object.
   *
   *
   *
   * @public
   * @method
   * @param {SceneObject | SceneObjectConstructor} scene The scene object to be rendered.
   * @returns {void}
   */
  public goto(scene?: SceneObject | SceneObjectConstructor): void {
    if (typeof scene === "object") {
      this._nextScene = scene;
    } else if (typeof scene === "function") {
      const ctor: SceneObjectConstructor = scene;
      const nextScene: SceneObject = new ctor();
      this._nextScene = nextScene;
    }
    if (this._scene) {
      this._scene.stop();
    }
  }
  /**
   * Starts the game loop.
   *
   *
   *
   * @public
   * @method
   * @param {SceneObject | SceneObjectConstructor} scene The initial scene to render.
   * @returns {void}
   */
  public run(scene?: SceneObject | SceneObjectConstructor): void {
    try {
      logger.debug(this, "starting...");
      this.initInputs();
      this.initGraphics();
      this.setupEventHandlers();
      this.goto(scene);
      this.requestUpdate();
      logger.debug(this, "started.");
    } catch (error) {
      logger.error(this, error);
    }
  }
  /**
   * Changes the scene rendered.
   *
   *
   *
   * @private
   * @method
   * @returns {void}
   */
  private changeScene(): void {
    if (this.isSceneChanging() && !this.isCurrentSceneBusy()) {
      if (this._scene) {
        this._scene.terminate();
        Graphics.transitionStart(15);
      }
      this._scene = this._nextScene;
      if (this._scene) {
        this._scene.create();
        this._sceneStarted = false;
        delete this._nextScene;
      }
    }
  }
  /**
   * Initializes the graphics context.
   *
   *
   *
   * @private
   * @method
   * @returns {void}
   */
  private initGraphics(): void {
    Graphics.init();
  }
  /**
   * Initializes the keyboard and mouse inputs.
   *
   *
   *
   * @private
   * @method
   * @returns {void}
   */
  private initInputs(): void {
    Keyboard.init();
    Mouse.init();
  }
  /**
   * Checks whether the current scene is busy.
   *
   *
   *
   * @returns {boolean} **`true`**, if the current scene is busy; otherwise, **`false`**.
   */
  private isCurrentSceneBusy(): boolean {
    return !!this._scene && this._scene.isBusy();
  }
  /**
   * Checks whether the current scene has started.
   *
   *
   *
   * @returns {boolean} **`true`**, if the current scene has started; otherwise, **`false`**.
   */
  private isCurrentSceneStarted(): boolean {
    return !!this._scene && this._sceneStarted;
  }
  /**
   * Checks whether the scene is changing.
   *
   *
   *
   * @returns {boolean} **`true`**, if the scene is changing; otherwise, **`false`**.
   */
  private isSceneChanging(): boolean {
    return !!this._nextScene;
  }
  /**
   * The main game loop logic.
   *
   *
   *
   * @private
   * @method
   * @param {number} time A high-resolution time stamp.
   * @returns {void}
   */
  private loop(time: number): void {
    Graphics.tickStart();
    const rate: number = 1 / Graphics.frameRate;
    const delta: number = (time - this._time) / 1000;
    this._accumulator += delta;
    while (this._accumulator >= rate) {
      this.updateInputs();
      this.updateGraphics();
      this.changeScene();
      this.updateScene(rate);
      this._accumulator -= rate;
    }
    this.renderScene();
    this._time = time;
    Graphics.tickEnd();
    this.requestUpdate();
  }
  /**
   * Fires up when the window receives a resize event.
   *
   *
   *
   * @private
   * @method
   * @returns {void}
   */
  private onResize(): void {
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
   * @method
   * @returns {void}
   */
  private renderScene(): void {
    Graphics.clear();
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
   * @method
   * @returns {void}
   */
  private requestUpdate(): void {
    if (!this._stopped) {
      requestAnimationFrame(this.loop.bind(this));
    }
  }
  /**
   * Configures the window event listeners.
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
  /**
   * Updates the graphics context.
   *
   *
   *
   * @private
   * @method
   * @returns {void}
   */
  private updateGraphics(): void {
    Graphics.update();
  }
  /**
   * Updates the input modules.
   *
   *
   *
   * @private
   * @method
   * @returns {void}
   */
  private updateInputs(): void {
    Keyboard.update();
  }
  /**
   * Updates the current scene.
   *
   *
   *
   * @private
   * @method
   * @returns {void}
   */
  private updateScene(rate: number): void {
    if (this._scene) {
      if (!this._sceneStarted && this._scene.isReady()) {
        this._scene.start();
        this._sceneStarted = true;
      }
      if (this.isCurrentSceneStarted()) {
        this._scene.update(rate);
      }
    }
  }
}
/**
 * A game loop.
 *
 *
 *
 * @constant
 * @module
 */
export const Game: GameLoop = GameLoop.create();
