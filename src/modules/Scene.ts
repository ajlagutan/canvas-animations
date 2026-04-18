import { Graphics } from "./Graphics";
import { debug } from "./Utils";
/**
 * Scene constructor interface.
 *
 *
 *
 * @interface
 * @constructor
 */
export interface SceneConstructor {
  new (): Scene;
}
/**
 * A base class for a scene object.
 *
 *
 *
 * @public
 * @abstract
 * @class
 */
export abstract class Scene {
  /**
   * Gets the current height of the graphics context.
   *
   *
   *
   * @public
   * @property
   * @returns {number} The current height of the graphics context.
   */
  public get height(): number {
    return Graphics.height;
  }
  /**
   * Gets the current width of the graphics context.
   *
   *
   *
   * @public
   * @property
   * @returns {number} The current width of the graphics context.
   */
  public get width(): number {
    return Graphics.width;
  }
  /**
   * Creates the scene and its components.
   *
   *
   *
   * @public
   * @method
   * @returns {void}
   */
  public create(): void {
    debug(this, "The 'create()' method is not implemented.");
  }
  /**
   * Checks whether the scene is currently busy.
   *
   *
   *
   * @public
   * @method
   * @returns {boolean} true, if the scene is busy to be updated and rendered; otherwise, false.
   */
  public isBusy(): boolean {
    return false;
  }
  /**
   * Checkes whether the scne is ready.
   *
   *
   *
   * @public
   * @method
   * @returns {boolean} true, if the scene ready to be updated and rendered; otherwise, false.
   */
  public isReady(): boolean {
    return true;
  }
  /**
   * Renders the scene to the graphics context.
   *
   *
   *
   * @public
   * @method
   * @param {CanvasRenderingContext2D} context The graphics context.
   * @returns {void}
   */
  // @ts-ignore: TS6133 - parameter is unused in base class.
  public render(context: CanvasRenderingContext2D): void {}
  /**
   * Starts the scene process.
   *
   *
   *
   * @public
   * @method
   * @returns {void}
   */
  public start(): void {
    debug(this, "The 'start()' method is not implemented.");
  }
  /**
   * Stops the scene process.
   *
   *
   *
   * @public
   * @method
   * @returns {void}
   */
  public stop(): void {
    debug(this, "The 'stop()' method is not implemented.");
  }
  /**
   * Terminates the scene and its components.
   *
   *
   *
   * @public
   * @method
   * @returns {void}
   */
  public terminate(): void {
    debug(this, "The 'terminate()' method is not implemented.");
  }
  /**
   * Updates the scene by a fixed rate.
   *
   *
   * @public
   * @method
   * @param {number} step The fixed rate value.
   * @returns {void}
   */
  // @ts-ignore: TS6133 - parameter is unused in base class.
  public update(step: number): void {}
}
