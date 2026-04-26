import * as lil from "lil-gui";
import { SceneBase } from "@lib/classes";
import { logger } from "@lib/utils";
import { Game, Graphics } from "@lib/modules";

const CURRENT_SCENE_STORAGE = "/control-panel:scene";

class SceneObjectManager implements SceneObjectManagerInterface<typeof SceneBase> {
  private _gui?: lil.GUI;
  private _options: SceneObjectManagerOptions;
  private _sceneController?: lil.Controller;
  private _sceneMap: Map<string, typeof SceneBase | SceneBase>;
  private _scenes: { [key: string]: string };
  private constructor() {
    this._options = { fps: false, scene: "" };
    this._sceneMap = new Map();
    this._scenes = {};
  }
  public static create(): SceneObjectManagerInterface<typeof SceneBase> {
    return new SceneObjectManager();
  }
  public run(...scenes: Array<SceneObjectRegistration<typeof SceneBase>>): void {
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
  private goto(scene: SceneObject | SceneObjectConstructor): void {
    if (scene) {
      Game.goto(scene);
    }
  }
  private loadScene(): void {
    if (this._sceneController) {
      const json = localStorage.getItem(CURRENT_SCENE_STORAGE);
      const data = JSON.parse(json ?? "{}");
      this._sceneController.load(data["id"]);
    }
  }
  private runGame(): void {
    Game.run();
  }
  private saveScene(): void {
    if (this._sceneController) {
      const data = this._sceneController.save();
      const json = JSON.stringify({ id: data });
      localStorage.setItem(CURRENT_SCENE_STORAGE, json);
    }
  }
  private sceneChange(id: string): void {
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
  private initGui(): void {
    this._gui = new lil.GUI({ title: "control panel" });

    let fps = this._gui.add(this._options, "fps");
    fps.onChange(Graphics.toggleFps.bind(Graphics));
    fps.name("show fps");

    if (Object.keys(this._scenes).length > 0) {
      this._sceneController = this._gui.add(this._options, "scene", this._scenes);
      this._sceneController.onChange(this.sceneChange.bind(this));
      this._sceneController.name("scene");
      this.loadScene();
    }
  }
  private initSceneList(...scenes: Array<SceneObjectRegistration<typeof SceneBase>>): void {
    for (let s of scenes) {
      let id: string = s.id ?? s.scene.name;
      let title: string = s.title ?? s.scene.name;
      if (!this._sceneMap.has(id)) {
        this._sceneMap.set(id, s.scene);
        this._scenes = Object.assign({}, this._scenes, { [title]: id });
      }
    }
  }
}

export const SceneManager: SceneObjectManagerInterface<typeof SceneBase> = SceneObjectManager.create();
