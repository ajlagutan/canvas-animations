import * as lil from "lil-gui";
import { SceneBase } from "@lib/classes";
/**
 * A key for the current scene options in the local storage.
 *
 *
 *
 * @constant
 */
const CURRENT_SCENE_OPTIONS_STORAGE = "/control-panel:scene:{name}";
/**
 * Flattens the target property in the root object.
 *
 *
 *
 * @private
 * @function
 * @param root The root object.
 * @param path The path of the target in the root object.
 * @returns {any} A flattened object.
 */
function flattenObject(root: any, path: any = null): any {
  if (root) {
    let result = {};
    for (let [name, value] of Object.entries(root)) {
      if (typeof value === "object" && !name.startsWith("__")) {
        let key: string = flattenObjectKey(path, name);
        result = Object.assign({}, result, flattenObject(value, key));
        continue;
      }
      if (value) {
        let key: string = flattenObjectKey(path, name);
        result = Object.assign({}, result, { [key]: value });
        continue;
      }
    }
    return result;
  }
  return root;
}
/**
 * Flattens the tree node like path into a single string.
 *
 *
 *
 * @private
 * @function
 * @param {(string | null)[]} paths List of strings that represents a property name.
 * @returns {string} A flattened path string.
 */
function flattenObjectKey(...paths: (string | null)[]): string {
  return [...paths].join(" ").trim().replace(" ", ".");
}
/**
 * Layouts  the scene options on a {@link lil.GUI} component,
 * then returns a mapping of option keys and controllers.
 *
 *
 *
 * @private
 * @function
 * @param {SceneBase} scene The scene owning the {@link options} parameter.
 * @param {lil.GUI} parent The parent {@link lil.GUI} object instance.
 * @param {SceneOptionConfiguration<any>} config An object instance of type {@link SceneOptionConfiguration}.
 * @param {any} options The scene options.
 * @param {any} path An optional path to target initially.
 * @returns {{ [key: string]: lil.GUI | lil.Controller }} A mapping of option keys and controllers.
 */
function layoutOptions(scene: SceneBase, parent: lil.GUI, config: any, options: any, path: any = null): any {
  let result = {};
  const target: any = options[path] ?? options;
  const entries: [string, any][] = Object.entries(target).filter(([name]) => !name.startsWith("_"));
  for (let [name, value] of entries) {
    const key: string = flattenObjectKey(path, name);
    if (typeof value === "object") {
      const folder: lil.GUI = parent.addFolder(name);
      const folderResult: any = layoutOptions(scene, folder, config, value, key);
      result = Object.assign({}, result, { [key]: folder }, folderResult);
    } else {
      let controller: lil.Controller;
      switch (config[flattenObjectKey(key, "__type")]) {
        case "color":
          controller = parent.addColor(target, name);
          break;
        case "options":
          controller = parent.add(target, name, config[flattenObjectKey(key, "__options")] ?? {});
          break;
        default:
          const __options = config[flattenObjectKey(key, "__options")] ?? undefined;
          controller = parent.add(target, name, __options);
          break;
      }
      switch (typeof value) {
        case "number":
          if (typeof config[flattenObjectKey(key, "max")] === "number") {
            controller.max(config[flattenObjectKey(key, "max")]);
          }
          if (typeof config[flattenObjectKey(key, "min")] === "number") {
            controller.min(config[flattenObjectKey(key, "min")]);
          }
          if (typeof config[flattenObjectKey(key, "step")] === "number") {
            controller.step(config[flattenObjectKey(key, "step")]);
          }
          break;
      }
      if (typeof config[flattenObjectKey(key, "onChange")] === "function") {
        const callback: Function = config[flattenObjectKey(key, "onChange")];
        controller.onChange(callback.bind(scene));
      }
      if (typeof config[flattenObjectKey(key, "onFinishChange")] === "function") {
        const callback: Function = config[flattenObjectKey(key, "onFinishChange")];
        controller.onFinishChange(callback.bind(scene));
      }
      controller.name(config[flattenObjectKey(key, "__name")] ?? name);
      result = Object.assign({}, result, { [key]: controller });
    }
  }
  parent.title(config[flattenObjectKey(path, "__title")] ?? parent._title);
  return result;
}
/**
 * Loads the stored state of the scene options.
 *
 *
 *
 * @private
 * @function
 * @param {SceneBase} this The scene that owns the options to be loaded.
 * @param {lil.GUI} gui The scene's {@link lil.GUI} component.
 * @returns {void}
 */
function loadOptions(this: SceneBase, gui: lil.GUI): void {
  const name = CURRENT_SCENE_OPTIONS_STORAGE.replace("{name}", this.constructor.name);
  const data = JSON.parse(localStorage.getItem(name) ?? "{}");
  gui.load(data, true);
}
/**
 * Stores the current state of the scene options.
 *
 *
 *
 * @private
 * @function
 * @param {SceneBase} this The scene that owns the options to be stored.
 * @param {lil.GUI} gui The scene's {@link lil.GUI} component.
 * @returns {void}
 */
function saveOptions(this: SceneBase, gui: lil.GUI): void {
  const name = CURRENT_SCENE_OPTIONS_STORAGE.replace("{name}", this.constructor.name);
  const data = JSON.stringify(gui.save(true) ?? {});
  localStorage.setItem(name, data);
}
/**
 * A class that handles scene's {@link lil.GUI} component.
 *
 *
 *
 * @class
 */
class SceneOptionController implements SceneOptionControllerInterface {
  private _controller?: lil.GUI;
  private _controllerMapping: Map<string, lil.GUI | lil.Controller>;
  /**
   * Creates a new {@link SceneOptionController} object instance.
   *
   *
   *
   * @private
   * @constructor
   */
  private constructor() {
    this._controllerMapping = new Map();
  }
  /**
   * Creates a new {@link SceneOptionControllerInterface} object instance.
   *
   *
   *
   * @public
   * @static
   * @method
   * @returns {SceneOptionControllerInterface} A new {@link SceneOptionControllerInterface} object instance.
   */
  public static create(): SceneOptionControllerInterface {
    return new SceneOptionController();
  }
  /**
   * Searches for the specified key.
   *
   *
   *
   * @public
   * @method
   * @param {string} key The scene option property name.
   * @returns {lil.GUI | lil.Controller | undefined} An instance of {@link lil.GUI} or {@link lil.Controller}, if found; otherwise, **`undefined`**.
   */
  public get(key: string): lil.GUI | lil.Controller | undefined {
    if (this._controllerMapping.size > 0) {
      return this._controllerMapping.get(key);
    }
  }
  /**
   * Initializes the controller for the current {@link scene}.
   *
   *
   *
   * @public
   * @method
   * @param {lil.GUI} gui The root {@link lil.GUI} component.
   * @param {SceneBase} scene The current scene.
   * @returns {void}
   */
  public init(gui: lil.GUI, scene: SceneBase): void {
    if (this._controller) {
      this._controllerMapping.clear();
      this._controller.destroy();
    }
    const options = scene.options;
    if (options) {
      this._controller = gui.addFolder("scene settings");
      this._controller.onFinishChange(saveOptions.bind(scene, this._controller));
      const config = flattenObject(options["__config"] ?? {});
      const results = layoutOptions(scene, this._controller, config, options);
      for (let [key, value] of Object.entries(results)) {
        if (value instanceof lil.GUI) {
          this._controllerMapping.set(key, value);
          continue;
        }
        if (value instanceof lil.Controller) {
          this._controllerMapping.set(key, value);
          continue;
        }
      }
      loadOptions.call(scene, this._controller);
    }
  }
}
/**
 * A window scene controller.
 *
 *
 *
 * @constant
 * @module
 */
export const SceneController: SceneOptionControllerInterface = SceneOptionController.create();
