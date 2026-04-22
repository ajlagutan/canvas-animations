import { randomInt, Scene } from "../_modules";

type Point2 = { x: number; y: number };
type Particle = Point2 & { velocity: Point2; size: number; hue: number };

const FullPie: number = Math.PI * 2;

export class Scene_Particle2 extends Scene {
  private _pieAngle: number = 0;
  private _pieDuration: number = 0;
  private _pieHue: number = 0;
  private _pieRadius: number = 10;
  private _pieSpeed: Point2 = { x: 0, y: 0 };
  private _particleCount: number = 10000;
  private _particles: Array<Particle> = [];
  override create(): void {
    this.startPieCreation();
  }
  override update(step: number): void {
    this.updateParticles(step);
    this.updatePie();
  }
  protected override draw(context: OffscreenCanvasRenderingContext2D): void {
    context.clearRect(0, 0, this.width, this.height);
    this.drawParticles(context);
    this.drawPie(context);
  }
  private drawParticles(context: OffscreenCanvasRenderingContext2D): void {
    context.save();
    for (let p of this._particles) {
      context.beginPath();
      context.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      context.closePath();
      context.fillStyle = `hsl(${p.hue}, 100%, 50%)`;
      context.fill();
    }
    context.restore();
  }
  private drawPie(context: OffscreenCanvasRenderingContext2D): void {
    if (this._particles.length < this._particleCount) {
      context.save();
      context.font = "bold 24px Consolas";
      let count = this._particles.length.toString();
      let metrics = context.measureText(count);
      let x = (this.width - metrics.width) / 2;
      let y = (this.height - metrics.alphabeticBaseline) / 2;
      context.fillStyle = "white";
      context.fillText(count, x, y);
      context.strokeStyle = "black";
      context.strokeText(count, x, y);
      context.save();
      context.beginPath();
      context.moveTo(this.width / 2, this.height / 2);
      context.arc(this.width / 2, this.height / 2, this._pieRadius, 0, this._pieAngle);
      context.lineTo(this.width / 2, this.height / 2);
      context.closePath();
      context.save();
      context.strokeStyle = `hsl(${this._pieHue}, 100%, 50%)`;
      context.stroke();
      context.restore();
    }
  }
  private pushParticle(): void {
    this._particles.push({
      x: this.width / 2,
      y: this.height / 2,
      velocity: {
        x: this._pieSpeed.x,
        y: this._pieSpeed.y,
      },
      size: this._pieRadius,
      hue: this._pieHue,
    });
  }
  private startPieCreation(): void {
    let speedAngle = (randomInt(0, 361) * Math.PI) / 180;
    let speed = randomInt(10, 100);
    this._pieAngle = 0;
    this._pieDuration = 1;
    this._pieHue = randomInt(0, 361);
    this._pieRadius = randomInt(10, 60);
    this._pieSpeed = {
      x: Math.cos(speedAngle) * speed,
      y: Math.sin(speedAngle) * speed,
    };
  }
  private updateParticles(step: number): void {
    for (let p of this._particles) {
      p.x = p.x + p.velocity.x * step;
      p.y = p.y + p.velocity.y * step;
      if (p.x < p.size || p.x > this.width - p.size) {
        p.x = Math.max(Math.min(p.x, this.width - p.size), p.size);
        p.velocity.x = -p.velocity.x;
      }
      if (p.y < p.size || p.y > this.height - p.size) {
        p.y = Math.max(Math.min(p.y, this.height - p.size), p.size);
        p.velocity.y = -p.velocity.y;
      }
    }
  }
  private updatePie(): void {
    if (this._particles.length < this._particleCount) {
      if (this._pieDuration > 0) {
        let duration = this._pieDuration;
        this._pieAngle += (FullPie - this._pieAngle) / duration;
        this._pieDuration--;
      } else {
        this.pushParticle();
        this.startPieCreation();
      }
    }
  }
}
