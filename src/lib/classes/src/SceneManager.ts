import * as lil from "lil-gui";
import { SceneBase } from "@lib/classes";
import { logger } from "@lib/utils";
import { Game, Graphics } from "@lib/modules";
/**
 * A key for the current scene in the local storage.
 *
 *
 *
 * @constant
 */
const CURRENT_SCENE_STORAGE = "/control-panel:scene";
/**
 * A type constant for {@link SceneObjectRegistration}.
 *
 *
 *
 * @type
 */
type SceneRegistration = SceneObjectRegistration<typeof SceneBase>;
/**
 * Sorts the scene registrations alphabetical order.
 *
 *
 *
 * @private
 * @function
 * @param {SceneRegistration} a The left scene registration to compare.
 * @param {SceneRegistration} b The right scene registration to compare.
 * @returns {number} The compare value of scene registration title.
 */
function sortRegistrations(a: SceneRegistration, b: SceneRegistration): number {
  return (a.title ?? a.scene.name).localeCompare(b.title ?? b.scene.name);
}
/**
 * A class that handles scene registrations.
 *
 *
 *
 * @class
 */
class SceneObjectManager implements SceneObjectManagerInterface<typeof SceneBase> {
  private _gui?: lil.GUI;
  private _options: SceneObjectManagerOptions;
  private _sceneController?: lil.Controller;
  private _sceneMap: Map<string, typeof SceneBase | SceneBase>;
  private _scenes: { [key: string]: string };
  /**
   * Creates a new {@link SceneObjectManager} object instance.
   *
   *
   *
   * @private
   * @constructor
   */
  private constructor() {
    this._options = { fps: false, scene: "" };
    this._sceneMap = new Map();
    this._scenes = {};
  }
  /**
   * Creates a new {@link SceneObjectManagerInterface} object instance.
   *
   *
   *
   * @public
   * @static
   * @method
   * @returns {SceneObjectManagerInterface} A new {@link SceneObjectManagerInterface} object instance.
   */
  public static create(): SceneObjectManagerInterface<typeof SceneBase> {
    return new SceneObjectManager();
  }
  /**
   * Runs the main loop with multiple scenes.
   *
   *
   *
   * @public
   * @method
   * @param {Array<SceneRegistration>} scenes A list of all the registered scene objects.
   * @returns {void}
   */
  public run(...scenes: Array<SceneRegistration>): void {
    try {
      logger.debug(this, "starting...");
      this.initSceneList(...scenes);
      this.initGui();
      this.runGame();
      logger.debug(this, "started.");
    } catch (error) {
      logger.error(this, error);
    }
  }
  /**
   * Runs the main loop.
   *
   *
   *
   * @public
   * @method
   * @param {typeof SceneBase} scene The scene to execute and render.
   * @returns {void}
   */
  public runScene(scene: typeof SceneBase): void {
    try {
      logger.debug(this, "starting...");
      this.initGui();
      this.runGame();
      this.goto(scene as SceneObjectConstructor);
      logger.debug(this, "started.");
    } catch (error) {
      logger.error(this, error);
    }
  }
  /**
   * Returns the first scene from the registered scene list.
   *
   *
   *
   * @private
   * @method
   * @returns {string | undefined} The first scene's unique identifier, if found; otherwise, **`undefined`**.
   */
  private firstScene(): string | undefined {
    return Object.values(this._scenes).at(0);
  }
  /**
   * Tells the game to render a specific scene object or constructor.
   *
   *
   *
   * @private
   * @method
   * @param {SceneObject | SceneObjectConstructor} scene A scene object or constructor to render.
   * @returns {void}
   */
  private goto(scene: SceneObject | SceneObjectConstructor): void {
    if (scene) {
      Game.goto(scene);
    }
  }
  /**
   * Loads the current scene from the local storage.
   *
   *
   *
   * @private
   * @method
   * @returns {void}
   */
  private loadScene(): void {
    if (this._sceneController) {
      const json = localStorage.getItem(CURRENT_SCENE_STORAGE);
      const data = JSON.parse(json ?? "{}");
      if (typeof data["id"] === "string" && data["id"] !== "") {
        this._sceneController.load(data["id"]);
      } else {
        const firstScene = this.firstScene();
        this._sceneController.setValue(firstScene);
      }
    }
  }
  /**
   * Fires up when the control panel receives a change event.
   *
   *
   *
   * @private
   * @method
   * @param {string} id The scene unique identifier.
   * @returns {void}
   */
  private onSceneChange(id: string): void {
    if (this._sceneMap.has(id)) {
      let value: typeof SceneBase | SceneBase | undefined = this._sceneMap.get(id);
      if (typeof value === "function") {
        const ctor: SceneObjectConstructor = this._sceneMap.get(id) as SceneObjectConstructor;
        const scene: SceneObject = new ctor();
        value = scene;
      }
      if (value instanceof SceneBase) {
        this.goto(value);
        this.saveScene();
      }
    }
  }
  /**
   * Starts the main loop execution.
   *
   *
   *
   * @private
   * @method
   * @returns {void}
   */
  private runGame(): void {
    Game.run();
  }
  /**
   * Saves the current scene on the local storage.
   *
   *
   *
   * @private
   * @method
   * @returns {void}
   */
  private saveScene(): void {
    if (this._sceneController) {
      const data = this._sceneController.save();
      const json = JSON.stringify({ id: data });
      localStorage.setItem(CURRENT_SCENE_STORAGE, json);
    }
  }
  /**
   * Initializes the lil.GUI component.
   *
   *
   *
   * @private
   * @method
   * @returns {void}
   */
  private initGui(): void {
    this._gui = new lil.GUI({ title: "control panel" });

    let fps = this._gui.add(this._options, "fps");
    fps.onChange(Graphics.toggleFps.bind(Graphics));
    fps.name("show fps");

    if (Object.keys(this._scenes).length > 0) {
      this._sceneController = this._gui.add(this._options, "scene", this._scenes);
      this._sceneController.onChange(this.onSceneChange.bind(this));
      this._sceneController.name("scene");
      this.loadScene();
    }
  }
  /**
   * Initializes the dropdown list for all the registered scenes.
   *
   *
   *
   * @private
   * @method
   * @param {Array<SceneRegistration>} scenes A list of scene registration objects.
   * @returns {void}
   */
  private initSceneList(...scenes: Array<SceneRegistration>): void {
    for (let s of scenes.sort(sortRegistrations)) {
      let id: string = s.id ?? s.scene.name;
      let title: string = s.title ?? s.scene.name;
      if (!this._sceneMap.has(id)) {
        this._sceneMap.set(id, s.scene);
        this._scenes = Object.assign({}, this._scenes, { [title]: id });
      }
    }
  }
}
/**
 * A window scene manager.
 *
 *
 *
 * @constant
 * @module
 */
export const SceneManager: SceneObjectManagerInterface<typeof SceneBase> = SceneObjectManager.create();
