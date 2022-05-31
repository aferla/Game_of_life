import * as p5 from "p5";
import GameBoard from "./game-board";

function gameOfLife(p: p5){

    const gameBoard = new GameBoard(640, 480);

    let started = false;

    p.setup = () => {
        p.frameRate(5);
        p.createCanvas(640, 480);

        const nextGenButton = p.createButton('Next Generation');
        nextGenButton.mousePressed(() => {
            gameBoard.nextGeneration();
        });

        const startStopButton = p.createButton("Start");
        startStopButton.mousePressed(() => {
            if (!started){
                started = true;
                startStopButton.html("Stop")
            }
            else {
                started = false;
                startStopButton.html("Start");
            }

            gameBoard.toggleAnimation(started);
        });
    }

    p.draw = () => {
        gameBoard.draw(p);
    }

    p.mouseClicked = () => {
        gameBoard.handleClick(p.mouseX, p.mouseY);
    }
}

new p5(gameOfLife);