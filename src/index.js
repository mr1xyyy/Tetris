#!/usr/bin/env node

const Game = require('./game');
const Screen = require('./ui/screen');

let game = null;
const ui = new Screen();
let gameLoopInterval;

function startNewGame() {
  game = new Game();
  ui.showGameUI();
  startGameLoop();
  ui.draw(game);
}

function returnToMenu() {
  game = null;
  ui.showMenu();
}

function showGameOverScreen() {
  clearInterval(gameLoopInterval);
  ui.showGameOver(game, startNewGame, returnToMenu);
}

ui.setOnStart(() => {
  startNewGame();
});

ui.setKeyHandler((action) => {
  if (!game || (game.gameOver && action !== 'restart')) return;
  
  switch (action) {
    case 'left':
      game.move(-1);
      ui.draw(game);
      break;
    case 'right':
      game.move(1);
      ui.draw(game);
      break;
    case 'down':
      game.drop();
      ui.draw(game);
      break;
    case 'hardDrop':
      game.hardDrop();
      ui.draw(game);
      break;
    case 'rotate':
      game.rotate();
      ui.draw(game);
      break;
    case 'pause':
      game.togglePause();
      ui.draw(game);
      break;
    case 'restart':
      startNewGame();
      break;
  }
  
  if (game && game.gameOver) {
    showGameOverScreen();
  }
});

let lastSpeed = 600;

function startGameLoop() {
  if (gameLoopInterval) clearInterval(gameLoopInterval);
  lastSpeed = game ? game.speed : 600;
  gameLoopInterval = setInterval(() => {
    if (game && !game.paused && !game.gameOver) {
      game.tick();
      ui.draw(game);
    }
    if (game && game.gameOver) {
      showGameOverScreen();
    }
    if (game && game.speed !== lastSpeed) {
      lastSpeed = game.speed;
      startGameLoop();
    }
  }, game ? game.speed : 600);
}
