import { Graphics } from "@lib/modules";

export abstract class SceneBase implements SceneObject {
  /**
   * Gets the scene height.
   *
   *
   *
   * @public
   * @readonly
   * @property
   * @returns {number} The scene height.
   */
  public get height(): number {
    return Graphics.height;
  }
  /**
   * Gets the scene width.
   *
   *
   *
   * @public
   * @readonly
   * @property
   * @returns {number} The scene width.
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
  public create(): void {}
  /**
   * Checks whether the scene is in a busy state.
   *
   *
   *
   * @public
   * @method
   * @returns {boolean} **`true`**, if the scene is in a busy state; otherwise, **`false`**.
   */
  public isBusy(): boolean {
    return false;
  }
  /**
   * Checks whether the scene is in a ready state.
   *
   *
   *
   * @public
   * @method
   * @returns {boolean} **`true`**, if the scene is in a ready state; otherwise, **`false`**.
   */
  public isReady(): boolean {
    return true;
  }
  /**
   * Renders the scene on the graphics context.
   *
   *
   *
   * @public
   * @method
   * @param {CanvasRenderingContext2D} context The graphics context.
   * @returns {vooid}
   */
  // @ts-ignore TS6133 `context` is not used in the base class.
  public render(context: CanvasRenderingContext2D): void {}
  /**
   * Resizes the scene.
   *
   *
   *
   * @public
   * @method
   * @returns {void}
   */
  public resize(): void {}
  /**
   * Takes a snapshot of the scene's current state.
   *
   *
   *
   * @public
   * @method
   * @returns {CanvasImageSource} A snapshot of the scene.
   */
  public snapshot(): CanvasImageSource {
    return Graphics.snapshot();
  }
  /**
   * Starts the scene execution.
   *
   *
   *
   * @public
   * @method
   * @returns {void}
   */
  public start(): void {}
  /**
   * Stops the scene execution.
   *
   *
   *
   * @public
   * @method
   * @returns {void}
   */
  public stop(): void {}
  /**
   * Terminates the scene and free up its resources.
   *
   *
   *
   * @public
   * @method
   * @returns {void}
   */
  public terminate(): void {}
  /**
   * Updates the scene with a fixed rate value.
   *
   *
   *
   * @public
   * @method
   * @param {number} rate The fixed rate.
   * @returns {void}
   */
  // @ts-ignore TS6133 `rate` is not used in the base class.
  public update(rate: number): void {}
}
