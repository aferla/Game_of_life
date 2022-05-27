import * as p5 from "p5";
import Cell from "./cell"

type SimpleMouseEvent = {
    x: number,
    y: number
}

class GameBoard {

    private readonly CELLS_WIDTH = 32;
    private readonly CELLS_HEIGHT = 24;

    private readonly width: number;
    private readonly height: number;

    private readonly cellWidth;
    private readonly cellHeight;

    // Stupid - put in some kind of manager for an array
    private readonly cells = Array<Cell>();

    constructor(width: number, height: number){
        this.width = width;
        this.height = height;

        this.cellWidth = this.width / this.CELLS_WIDTH;
        this.cellHeight = this.height / this.CELLS_HEIGHT;
    }

    handleClick(event: MouseEvent){
        const xCell = Math.ceil(event.x / this.cellWidth) -1;
        const yCell = Math.ceil(event.y / this.cellHeight) -1;

        this.cells.push(new Cell(xCell * this.cellWidth, yCell * this.cellHeight,
             this.cellWidth, this.cellHeight));
    }

    draw(p: p5){
        p.fill(255, 0, 0);
        this.drawGrid(p);

        // Just a test
        p.fill(p.color(255,0,0));
        this.cells.forEach((cell) => {
            cell.draw(p);
        });
    }

    private drawGrid(p: p5){
        for (let x = 0 ; x <= this.width; x+=this.cellWidth){
            p.line(x, 0, x, this.height);
        }

        for (let y = 0; y <= this.height; y+=this.cellHeight){
            p.line(0, y, this.width, y);
        }
    }
}

export default GameBoard;