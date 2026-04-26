import { SceneBase } from "@lib/classes";
import { random } from "@lib/utils";

const BREATH_DURATION = 120;

export class SceneTest extends SceneBase {
  private _breathDuration: number = BREATH_DURATION;
  private _breathIn: boolean = true;
  private _created: boolean = false;
  private _maxSize: number = 150;
  private _minSize: number = 50;
  private _size: number = 100;
  private _x: number = 0;
  private _xs: number = 0;
  private _y: number = 0;
  private _ys: number = 0;
  override create(): void {
    if (!this._created) {
      let angle = random.int(0, 360).toRadians();
      let speed = random.int(300, 600);
      this._x = (this.width - this._size) / 2;
      this._xs = Math.cos(angle) * speed;
      this._y = (this.height - this._size) / 2;
      this._ys = Math.sin(angle) * speed;
      this._created = true;
    }
  }
  override isReady(): boolean {
    return this._created;
  }
  override render(context: CanvasRenderingContext2D): void {
    context.fillStyle = "black";
    context.fillRect(0, 0, this.width, this.height);
    context.fillStyle = "red";
    context.fillRect(this._x, this._y, this._size, this._size);
  }
  override update(rate: number): void {
    if (this._breathIn) {
      if (this._breathDuration > 0) {
        let duration = this._breathDuration;
        this._size += (this._maxSize - this._size) / duration;
        this._breathDuration--;
      } else {
        this._breathDuration = BREATH_DURATION;
        this._breathIn = false;
      }
    } else {
      if (this._breathDuration > 0) {
        let duration = this._breathDuration;
        this._size -= (this._size - this._minSize) / duration;
        this._breathDuration--;
      } else {
        this._breathDuration = BREATH_DURATION;
        this._breathIn = true;
      }
    }
    this._x = this._x + this._xs * rate;
    if (this._x < 0 || this._x > this.width - this._size) {
      this._x = this._x.clamp(0, this.width - this._size);
      this._xs = -this._xs;
    }
    this._y = this._y + this._ys * rate;
    if (this._y < 0 || this._y > this.height - this._size) {
      this._y = this._y.clamp(0, this.height - this._size);
      this._ys = -this._ys;
    }
  }
}
