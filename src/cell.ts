import * as p5 from "p5";

class Cell {

    width: number;
    height: number;
    x: number;
    y: number;

    constructor(x:number, y: number, width: number, height: number){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(p: p5){
        p.rect(this.x, this.y, this.width, this.height);
    }
}

export default Cell;