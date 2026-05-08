const { HEIGHT, WIDTH } = require('../core/board');

function getColorName(color) {
  const map = {
    I: 'cyan',
    O: 'yellow',
    T: 'magenta',
    L: 'white',
    J: 'blue',
    S: 'green',
    Z: 'red',
    ghost: 'white'
  };

  return map[color] || 'white';
}

function renderBoard(game) {
  const ghost = game.getGhost();
  let content = '';

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let filled = false;
      let color = null;

      if (game.board[y][x]) {
        filled = true;
        color = game.board[y][x];
      }

      for (let py = 0; py < game.piece.shape.length; py++) {
        for (let px = 0; px < game.piece.shape[py].length; px++) {
          if (!game.piece.shape[py][px]) continue;

          const gy = ghost.y + py;
          const gx = game.piece.x + px;
          if (y === gy && x === gx) {
            filled = true;
            color = 'ghost';
          }
        }
      }

      for (let py = 0; py < game.piece.shape.length; py++) {
        for (let px = 0; px < game.piece.shape[py].length; px++) {
          if (!game.piece.shape[py][px]) continue;

          const cy = game.piece.y + py;
          const cx = game.piece.x + px;
          if (y === cy && x === cx) {
            filled = true;
            color = game.piece.color;
          }
        }
      }

      if (filled && color) {
        content += color === 'ghost'
          ? '{cyan-bg}  {/}'
          : `{${getColorName(color)}-bg}  {/}`;
      } else {
        content += '  ';
      }
    }

    content += '\n';
  }

  return content;
}

function renderNextPiece(piece) {
  let next = '';

  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        next += `{${getColorName(piece.color)}-bg}  {/}`;
      } else {
        next += '  ';
      }
    }

    next += '\n';
  }

  return next;
}

module.exports = {
  getColorName,
  renderBoard,
  renderNextPiece
};
