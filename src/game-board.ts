import * as p5 from 'p5';

import { Grid, nextGeneration } from './life_manager';

class GameBoard {
  private readonly X_CELL_COUNT = 40;
  private readonly Y_CELL_COUNT = 30;

  private readonly width: number;
  private readonly height: number;

  private readonly cellWidth;
  private readonly cellHeight;

  private grid;

  private animating = false;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.cellWidth = this.width / this.X_CELL_COUNT;
    this.cellHeight = this.height / this.Y_CELL_COUNT;

    this.grid = new Grid(this.X_CELL_COUNT, this.Y_CELL_COUNT);
  }

  handleClick(x: number, y: number) {
    const xCell = Math.ceil(x / this.cellWidth) - 1;
    const yCell = Math.ceil(y / this.cellHeight) - 1;

    const value = this.grid.getCell(xCell, yCell);
    if (value) {
      this.grid.setCell(xCell, yCell, 0);
    } else {
      this.grid.setCell(xCell, yCell, 1);
    }
  }

  nextGeneration() {
    this.grid = nextGeneration(this.grid);
  }

  toggleAnimation(start: boolean) {
    this.animating = start;
  }

  draw(p: p5) {
    p.fill(255, 0, 0);
    this.drawGrid(p);

    this.renderGrid(p, this.grid);

    if (this.animating) {
      this.grid = nextGeneration(this.grid);
    }
  }

  private drawGrid(p: p5) {
    for (let x = 0; x <= this.width; x += this.cellWidth) {
      p.line(x, 0, x, this.height);
    }

    for (let y = 0; y <= this.height; y += this.cellHeight) {
      p.line(0, y, this.width, y);
    }
  }

  private renderGrid(p: p5, grid: Grid) {
    grid.getCells((x, y, value) => {
      if (value) {
        p.fill(255, 0, 0);
      } else {
        p.fill(255, 255, 255);
      }
      p.rect(
        x * this.cellWidth,
        y * this.cellHeight,
        this.cellWidth,
        this.cellHeight
      );
    });
  }
}

export default GameBoard;
