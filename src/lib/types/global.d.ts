declare interface DrawableObject {
  render(context: CanvasRenderingContext2D): void;
}

declare interface GameLoop {
  run(): void;
  run(scene: SceneObject): void;
  run(scene: SceneObjectConstructor): void;
}

declare interface MathRect {
  /**
   * The rectangle's bottom value.
   *
   *
   *
   * @public
   * @property
   */
  readonly bottom: number;
  /**
   * The rectangle's height value.
   *
   *
   *
   * @public
   * @property
   */
  height: number;
  /**
   * The rectangle's left value.
   *
   *
   *
   * @public
   * @property
   */
  readonly left: number;
  /**
   * The rectangle's right value.
   *
   *
   *
   * @public
   * @property
   */
  readonly right: number;
  /**
   * The rectangle's top value.
   *
   *
   *
   * @public
   * @property
   */
  readonly top: number;
  /**
   * The rectangle's width value.
   *
   *
   *
   * @public
   * @property
   */
  width: number;
  /**
   * The rectangle's x-coordinate value.
   *
   *
   *
   * @public
   * @property
   */
  x: number;
  /**
   * The rectangle's y-coordinate value.
   *
   *
   *
   * @public
   * @property
   */
  y: number;
}

declare interface MathRectFunctions<T> {
  /**
   * Sets all the components to zero.
   *
   *
   *
   * @public
   * @method
   * @returns {void}
   */
  empty(): void;
  /**
   * Sets all the components at once.
   *
   *
   *
   * @public
   * @method
   * @returns {void}
   */
  set(x: number, y: number, width: number, height: number): void;
  set(rect: T): void;
}

declare interface MathVector2 {
  /**
   * The vector's x-coordinate value.
   *
   *
   *
   * @public
   * @property
   */
  x: number;
  /**
   * The vector's y-coordinate value.
   *
   *
   *
   * @public
   * @property
   */
  y: number;
}

declare interface MathVector3 {
  /**
   * The vector's x-coordinate value.
   *
   *
   *
   * @public
   * @property
   */
  x: number;
  /**
   * The vector's y-coordinate value.
   *
   *
   *
   * @public
   * @property
   */
  y: number;
  /**
   * The vector's z-coordinate value.
   *
   *
   *
   * @public
   * @property
   */
  z: number;
}

declare interface MathVector4 {
  /**
   * The vector's w-coordinate value.
   *
   *
   *
   * @public
   * @property
   */
  w: number;
  /**
   * The vector's x-coordinate value.
   *
   *
   *
   * @public
   * @property
   */
  x: number;
  /**
   * The vector's y-coordinate value.
   *
   *
   *
   * @public
   * @property
   */
  y: number;
  /**
   * The vector's z-coordinate value.
   *
   *
   *
   * @public
   * @property
   */
  z: number;
}

declare interface MathVectorFunctions<T> {
  /**
   * Returns a new vector with all components rounded up.
   *
   *
   *
   * @public
   * @method
   * @returns {T} A new vector with all components rounded up.
   */
  ceil(): T;
  /**
   * Returns a new vector with all components clamped
   * between **`min`** and **`max`** values.
   *
   *
   *
   * @public
   * @method
   * @param {number | T} min The minimum value.
   * @param {number | T} max The maximum value.
   * @returns {T} A new vector with all components clamped.
   */
  clamp(min: number, max: number): T;
  clamp(min: T, max: T): T;
  /**
   * Returns a new vector with all components rounded down.
   *
   *
   *
   * @public
   * @method
   * @returns {T} A new vector with all components rounded down.
   */
  floor(): T;
  /**
   * Returns a new vector with all components rounded to the nearest
   * integer, with halfway cases rounded away from zero.
   *
   *
   *
   * @public
   * @method
   * @returns {T} A new vector with all components rounded to the nearest integer.
   */
  round(): T;
}

declare interface Number {
  /**
   * Clamps the number between the min and max values.
   *
   *
   *
   * @public
   * @method
   * @param {number} min The minimum boundary of the value.
   * @param {number} max The maximum boundary of the value.
   * @returns {number} The clamped number between min and max value.
   */
  clamp(min: number, max: number): number;
  /**
   * Converts the radians value to degrees.
   *
   * Formula: **`degrees`** = **`radians`** × (**`180`** ÷ **`π`**)
   *
   *
   *
   * @public
   * @method
   * @returns {number} The degrees value.
   */
  toDegrees(): number;
  /**
   * Converts the degrees value to radians.
   *
   * Formula: **`radians`** = **`degrees`** × (**`π`** ÷ **`180`**)
   *
   *
   *
   * @public
   * @method
   * @returns {number} The degrees value.
   */
  toRadians(): number;
}

declare interface SceneObjectConstructor {
  new (): SceneObject;
}

declare interface SceneObject extends DrawableObject {
  readonly height: number;
  readonly width: number;
  create(): void;
  isBusy(): boolean;
  isReady(): boolean;
  resize(): void;
  snapshot(): CanvasImageSource;
  start(): void;
  stop(): void;
  terminate(): void;
  update(rate: number): void;
}

declare interface SceneObjectManagerInterface<T> {
  run(...scenes: Array<SceneObjectRegistration<T>>): void;
  runScene(scene: T): void;
}

declare type SceneObjectManagerOptions = { fps: boolean; scene: string };

declare type SceneObjectRegistration<T> = { scene: T; id?: string; title?: string };

declare interface WindowGraphicsInterface {
  frameCount: number;
  frameRate: number;
  readonly height: number;
  readonly width: number;
  clear(): void;
  init(): void;
  render(...drawables: Array<DrawableObject>): void;
  resize(width: number, height: number): void;
  snapshot(): CanvasImageSource;
  tickEnd(): void;
  tickStart(): void;
  toggleFps(visible: boolean): void;
  transitioning(): boolean;
  transitionStart(duration: number): void;
  update(): void;
}

declare interface WindowInputInterface {
  repeatInterval: number;
  repeatWait: number;
  readonly x: number | null;
  readonly y: number | null;
  init(): void;
  longPressed(input: string): boolean;
  pressed(input: string): boolean;
  repeat(input: string): boolean;
  trigger(input: string): boolean;
  update(): void;
}

declare type WindowInputState = { [key: string]: boolean };
