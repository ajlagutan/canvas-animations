import { Scene, type SceneConstructor } from "./Scene";
/**
 * Scene list type.
 *
 *
 *
 * @private
 * @type
 */
type SceneList = { [key: string]: string };
/**
 * Scene registration type.
 *
 *
 *
 * @private
 * @type
 */
type SceneRegistration = { title: string; scene: any };
/**
 * Scene manager deletage object.
 *
 *
 *
 * @public
 * @function
 * @interface
 */
export interface SceneManagerFn {
  (manager: SceneManagerInit): void;
}
/**
 * Scene manager interface.
 *
 *
 *
 * @public
 * @interface
 */
export interface SceneManagerInit {
  /**
   * Gets the list of all the registered scenes.
   *
   *
   *
   * @public
   * @readonly
   * @property
   * @returns {SceneList} The list of all the registered scenes.
   */
  get scenes(): SceneList;
  /**
   * Marks the scene manager object as final.
   *
   *
   *
   * @public
   * @method
   * @returns {void}
   */
  finalize(): void;
  /**
   * Searches for the scene with the specified {@link id}.
   *
   *
   *
   * @public
   * @method
   * @param {string | null} id The scene id.
   * @returns {Scene | null} A scene object, if the specified id is found; otherwise, null.
   */
  get(id: string | null): Scene | null;
  /**
   * Registers an object type of {@link Scene} with a unique {@link id}
   * and an optional display {@link title} parameter.
   *
   *
   *
   * @public
   * @method
   * @param {T} scene An object type of {@link Scene}.
   * @param {string} id A unique identifier for the scene.
   * @param {string} title A display title for the scene.
   * @returns {SceneManagerInit} The current {@link SceneManagerInit} instance.
   */
  register<T extends typeof Scene>(scene: T, id: string, title: string): SceneManagerInit;
  register<T extends typeof Scene>(scene: T, id: string): SceneManagerInit;
}
/**
 * An implementation of {@link SceneManagerInit} interface type.
 *
 *
 *
 * @private
 * @class
 */
class SceneManager implements SceneManagerInit {
  private _finalized: boolean = false;
  private _sceneList: SceneList | null = null;
  private _scenes: Map<string, SceneRegistration>;
  private constructor() {
    this._scenes = new Map();
  }
  public get scenes(): SceneList {
    if (!this._sceneList) {
      let obj: { [key: string]: string } = {};
      let arr: Array<[string, SceneRegistration]> = [...this._scenes.entries()];
      for (let [id, { title }] of arr.sort(SceneManager.compareFn)) {
        obj = Object.assign({}, obj, { [title]: id });
      }
      this._sceneList = obj;
    }
    return this._sceneList;
  }
  /**
   * Creates a new instance of {@link SceneManagerInit} object.
   *
   *
   *
   * @public
   * @static
   * @method
   * @returns {SceneManagerInit} A new instance of {@link SceneManagerInit} object.
   */
  public static create(): SceneManagerInit {
    return new SceneManager();
  }
  /**
   * Compares two ({@link left} and {@link right}) scene registration display title.
   *
   *
   *
   * @private
   * @static
   * @method
   * @param {[string, SceneRegistration]} left The first scene registration.
   * @param {[string, SceneRegistration]} right The second scene registration.
   * @returns {number}
   */
  private static compareFn(left: [string, SceneRegistration], right: [string, SceneRegistration]): number {
    const [, { title: titleA }] = left;
    const [, { title: titleB }] = right;
    return titleA.localeCompare(titleB);
  }
  public finalize(): void {
    if (!this._finalized) {
      this._finalized = true;
    }
  }
  public get(id: string | null): Scene | null {
    if (id && id !== "") {
      let registration: SceneRegistration | undefined = this._scenes.get(id);
      if (registration) {
        let { title, scene } = registration;
        if (scene instanceof Scene) {
          return scene;
        }
        if (typeof scene === "function") {
          const ctor: SceneConstructor = scene;
          scene = new ctor();
          registration.title = title;
          registration.scene = scene;
          this._scenes.set(id, registration);
          return scene;
        }
      }
    }
    return null;
  }
  /**
   * @public
   * @method
   * @param {T} scene An object type of {@link Scene}.
   * @param {string} id A unique identifier for the scene.
   * @returns {SceneManagerInit} The current {@link SceneManagerInit} instance.
   */
  public register<T extends typeof Scene>(scene: T, id: string): SceneManagerInit;
  /**
   * @public
   * @method
   * @param {T} scene An object type of {@link Scene}.
   * @param {string} id A unique identifier for the scene.
   * @param {string} title A display title for the scene.
   * @returns {SceneManagerInit} The current {@link SceneManagerInit} instance.
   */
  public register<T extends typeof Scene>(scene: T, id: string, title: string): SceneManagerInit;
  public register<T extends typeof Scene>(scene?: T, id?: string, title?: string): SceneManagerInit {
    if (this._finalized) {
      throw new Error("Scene manager instance is already final.");
    }
    if (!scene || typeof scene !== "function") {
      throw new Error("Parameter 'scene' is not a valid type of 'Scene' object.");
    }
    id ??= scene.name;
    title ??= scene.name;
    if (!this._scenes.has(id)) {
      this._scenes.set(id, { title, scene });
    }
    return this;
  }
}
/**
 * Creates a new instance of {@link SceneManagerInit} object.
 *
 *
 *
 * @public
 * @static
 * @method
 * @returns {SceneManagerInit} A new instance of {@link SceneManagerInit} object.
 */
export const createSceneManager = SceneManager.create;
