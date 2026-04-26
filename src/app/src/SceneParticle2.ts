import { random, SceneBase } from "@lib";

const FULL_PIE = Math.PI * 2;

export class SceneParticle2 extends SceneBase {
  private _pieAngle: number = 0;
  private _pieDuration: number = 30;
  private _pieHue: number = 0;
  private _pieRadius: number = 30;
  override create(): void {
    this.restartPieCreation();
  }
  override render(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.moveTo(this.width / 2, this.height / 2);
    context.arc(
      this.width / 2,
      this.height / 2,
      this._pieRadius,
      0,
      this._pieAngle,
    );
    context.lineTo(this.width / 2, this.height / 2);
    context.closePath();
    context.save();
    context.fillStyle = `hsl(${this._pieHue}, 100%, 50%)`;
    context.fill();
    context.restore();
  }
  override update(rate: number): void {
    if (this._pieDuration > 0) {
      let duration = this._pieDuration;
      this._pieAngle += (FULL_PIE - this._pieAngle) / duration;
      this._pieDuration--;
    } else {
      this.restartPieCreation();
    }
  }
  private restartPieCreation(): void {
    this._pieAngle = 0;
    this._pieDuration = random.int(10, 300);
    this._pieHue = random.int(0, 360);
    this._pieRadius = random.int(30, 300);
  }
}
