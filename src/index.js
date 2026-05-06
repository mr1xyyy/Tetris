const Game = require('./game');
const Screen = require('./ui/screen');

let game = new Game();
const ui = new Screen();

ui.setKeyHandler((action) => {
  if (game.gameOver && action !== 'restart') return;
  
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
      game = new Game();
      break;
  }
});

let lastSpeed = game.speed;

function gameLoop() {
  if (!game.paused && !game.gameOver) {
    game.tick();
    ui.draw(game);
  }
}

setInterval(gameLoop, game.speed);

setInterval(() => {
  if (game.speed !== lastSpeed) {
    lastSpeed = game.speed;
  }
}, 1000);

ui.draw(game);