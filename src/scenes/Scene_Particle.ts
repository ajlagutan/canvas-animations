import { randomInt, Scene } from "../_modules";

type Point2 = { x: number; y: number };
type Particle = Point2 & { velocity: Point2; size: number; hue: number };

export class Scene_Particle extends Scene {
  private _particles: Array<Particle> = new Array(1000);
  override create(): void {
    for (let i = 0; i < this._particles.length; i++) {
      let speed: number = randomInt(50, 501);
      let speedAngle: number = (randomInt(0, 361) * Math.PI) / 180;
      let size: number = randomInt(10, 51);
      let x: number = randomInt(size, this.width - size + 1);
      let y: number = randomInt(size, this.height - size + 1);
      let hue: number = randomInt(0, 361);
      this._particles[i] = {
        hue,
        size,
        x,
        y,
        velocity: {
          x: speed * Math.cos(speedAngle),
          y: speed * Math.sin(speedAngle),
        },
      };
    }
  }
  override draw(context: OffscreenCanvasRenderingContext2D): void {
    context.clearRect(0, 0, this.width, this.height);
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
  override update(step: number): void {
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
}
