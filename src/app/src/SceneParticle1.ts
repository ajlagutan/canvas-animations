import { random, SceneBase } from "@lib";

type Point2 = { x: number; y: number };
type Particle = Point2 & { velocity: Point2; size: number; hue: number };

export class SceneParticle1 extends SceneBase {
  private _particles: Array<Particle> = new Array(1000);
  override create(): void {
    for (let i = 0; i < this._particles.length; i++) {
      let speed: number = random.int(50, 501);
      let speedAngle: number = (random.int(0, 361) * Math.PI) / 180;
      let size: number = random.int(10, 51);
      let x: number = random.int(size, this.width - size + 1);
      let y: number = random.int(size, this.height - size + 1);
      let hue: number = random.int(0, 361);
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
  override render(context: CanvasRenderingContext2D): void {
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
  override update(rate: number): void {
    for (let p of this._particles) {
      p.x = p.x + p.velocity.x * rate;
      p.y = p.y + p.velocity.y * rate;
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
