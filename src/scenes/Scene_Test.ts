import { randomInt, randomIntInclusive, Scene } from "../_modules";

type HSL_COLOR = { hue: number; sat: number; lum: number };
type POINT = { x: number; y: number };

const COLS: number = 8;
const ROWS: number = 8;

export class Scene_Test extends Scene {
  private _cellHeight: number = 0;
  private _cells: Array<Array<HSL_COLOR>> = [];
  private _cellSelectInterval: number = 0;
  private _cellWidth: number = 0;
  private _selectedCells: Array<POINT> = [];
  private _selectedCellCount: number = Math.floor((COLS * ROWS) / 2);
  override create(): void {
    for (let y = 0; y < ROWS; y++) {
      let data: Array<HSL_COLOR> = [];
      for (let x = 0; x < COLS; x++) {
        data.push({
          hue: randomIntInclusive(0, 360),
          sat: 100,
          lum: 50,
        });
      }
      this._cells.push(data);
    }
    this._cellWidth = this.width / COLS;
    this._cellHeight = this.height / ROWS;
  }
  override draw(context: OffscreenCanvasRenderingContext2D): void {
    context.clearRect(0, 0, this.width, this.height);
    context.save();
    for (let y = 0; y < this._cells.length; y++) {
      for (let x = 0; x < this._cells[y].length; x++) {
        let hsl: HSL_COLOR = this._cells[y][x];
        let dx: number = x * this._cellWidth;
        let dy: number = y * this._cellHeight;
        context.fillStyle = `hsl(${hsl.hue}, ${hsl.sat}%, ${hsl.lum}%)`;
        context.fillRect(dx, dy, this._cellWidth, this._cellHeight);
      }
    }
    context.restore();
  }
  override resize(): void {
    super.resize();
    this._cellWidth = this.width / COLS;
    this._cellHeight = this.height / ROWS;
  }
  override update(step: number): void {
    if (this._cellSelectInterval < 0) {
      this._selectedCells.splice(0);
      for (let i = 0; i < this._selectedCellCount; i++) {
        let x: number = randomInt(0, COLS);
        let y: number = randomInt(0, ROWS);
        this._selectedCells.push({ x, y });
      }
      this._cellSelectInterval = 3;
    }
    for (let pt of this._selectedCells) {
      let hsl: HSL_COLOR = this._cells[pt.y][pt.x];
      hsl.hue = (hsl.hue + 60 * step) % 360;
    }
    this._cellSelectInterval = this._cellSelectInterval - 1 * step;
  }
}
