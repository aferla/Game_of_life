import GameBoard from "./game-board";
import * as p5 from "p5";

function gameOfLife(p: p5){
    this.x = 100;
    this.y = 100;

    this.board = new GameBoard(640, 480);

    p.setup = () => {
        p.createCanvas(640, 480);
    }

    p.draw = () => {
        p.background(p.color(200, 200, 200));
        this.board.draw(p);
    }

    p.mouseClicked = () => {
        this.board.handleClick({x: p.mouseX, y: p.mouseY});
    }
}

new p5(gameOfLife);