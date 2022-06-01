import * as p5 from 'p5';
import GameBoard from './game-board';

function gameOfLife(p: p5) {
  const gameBoard = new GameBoard(800, 600);

  let started = false;

  p.setup = () => {
    p.frameRate(15);
    const canvas = p.createCanvas(800, 600);
    canvas.parent('grid_container');

    const nextGenButton = p.createButton('Next Generation');
    nextGenButton.parent('button_container');
    nextGenButton.mousePressed(() => {
      gameBoard.nextGeneration();
    });

    const startStopButton = p.createButton('Start');
    startStopButton.parent('button_container');
    startStopButton.mousePressed(() => {
      if (!started) {
        started = true;
        startStopButton.html('Stop');
      } else {
        started = false;
        startStopButton.html('Start');
      }

      gameBoard.toggleAnimation(started);
    });
  };

  p.draw = () => {
    gameBoard.draw(p);
  };

  p.mouseClicked = () => {
    gameBoard.handleClick(p.mouseX, p.mouseY);
  };
}

new p5(gameOfLife);
