const blessed = require('blessed');
const { WIDTH, HEIGHT } = require('../core/board');

class Screen {
  constructor() {
    this.screen = blessed.screen({ smartCSR: true });
    this.screen.title = 'TETRIS';
    this.screen.key(['q', 'Q', 'C-c'], () => process.exit(0));

    this.main = blessed.box({
      left: 'center',
      top: 'center',
      width: '100%',
      height: '100%'
    });

    this.gameBorder = blessed.box({
      parent: this.main,
      left: 0,
      top: 0,
      width: WIDTH * 2 + 4,
      height: HEIGHT + 2,
      border: { type: 'line', fg: 'cyan' }
    });

    this.gameArea = blessed.text({
      parent: this.main,
      left: 2,
      top: 1,
      width: WIDTH * 2 + 1,
      height: HEIGHT,
      tags: true
    });

    this.sideBorder = blessed.box({
      parent: this.main,
      left: WIDTH * 2 + 4,
      top: 0,
      width: 20,
      height: HEIGHT + 2,
      border: { type: 'line', fg: 'yellow' }
    });

    this.title = blessed.text({
      parent: this.main,
      left: WIDTH * 2 + 6,
      top: 1,
      content: 'TETRIS',
      style: { fg: 'cyan', bold: true }
    });

    this.scoreLbl = blessed.text({
      parent: this.main,
      left: WIDTH * 2 + 6,
      top: 3,
      content: 'Score: 0'
    });

    this.levelLbl = blessed.text({
      parent: this.main,
      left: WIDTH * 2 + 6,
      top: 5,
      content: 'Level: 1'
    });

    this.linesLbl = blessed.text({
      parent: this.main,
      left: WIDTH * 2 + 6,
      top: 7,
      content: 'Lines: 0'
    });

    this.nextLbl = blessed.text({
      parent: this.main,
      left: WIDTH * 2 + 6,
      top: 10,
      content: 'Next:'
    });

    this.nextArea = blessed.text({
      parent: this.main,
      left: WIDTH * 2 + 6,
      top: 11,
      width: 10,
      height: 6,
      tags: true
    });

    this.msgLbl = blessed.text({
      parent: this.main,
      left: WIDTH * 2 + 6,
      top: 18,
      content: '',
      style: { fg: 'red', bold: true }
    });

    this.controls = blessed.text({
      parent: this.main,
      left: 0,
      bottom: 1,
      content: 'Arrows: Move | SPACE: Drop | P: Pause | R: Restart | Q: Quit'
    });

    this.screen.append(this.main);
  }

  calcGhostY(board, piece) {
    let gy = piece.y;
    while (gy < HEIGHT - 1) {
      let collides = false;
      for (let py = 0; py < piece.shape.length; py++) {
        for (let px = 0; px < piece.shape[py].length; px++) {
          if (piece.shape[py][px]) {
            const ny = gy + py + 1;
            const nx = piece.x + px;
            if (ny >= HEIGHT || (board[ny] && board[ny][nx])) {
              collides = true;
            }
          }
        }
      }
      if (collides) break;
      gy++;
    }
    return gy;
  }

  draw(game) {
    let content = '';

    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        let filled = false;
        let color = null;

        if (game.board[y][x]) {
          filled = true;
          color = game.board[y][x];
        }

        const ghostY = this.calcGhostY(game.board, game.piece);
        
        for (let py = 0; py < game.piece.shape.length; py++) {
          for (let px = 0; px < game.piece.shape[py].length; px++) {
            if (game.piece.shape[py][px]) {
              const currentY = game.piece.y + py;
              const ghostCellY = ghostY + py;
              
              if (y === ghostCellY && x === game.piece.x + px && y < currentY) {
                filled = true;
                color = 'ghost';
              }
              if (y === currentY && x === game.piece.x + px) {
                filled = true;
                color = game.piece.color;
              }
            }
          }
        }

        if (filled && color) {
          const c = this.getColorName(color);
          content += '{' + c + '-bg}  {/}';
        } else {
          content += '  ';
        }
      }
      content += '\n';
    }

    this.gameArea.setContent(content);

    this.scoreLbl.setContent('Score: ' + game.score);
    this.levelLbl.setContent('Level: ' + game.level);
    this.linesLbl.setContent('Lines: ' + game.lines);

    let next = '';
    const p = game.nextPiece;
    for (let y = 0; y < p.shape.length; y++) {
      for (let x = 0; x < p.shape[y].length; x++) {
        if (p.shape[y][x]) {
          const c = this.getColorName(p.color);
          next += '{' + c + '-bg}  {/}';
        } else {
          next += '  ';
        }
      }
      next += '\n';
    }
    this.nextArea.setContent(next);

    if (game.gameOver) {
      this.msgLbl.setContent('GAME OVER!');
    } else if (game.paused) {
      this.msgLbl.setContent('PAUSED');
    } else {
      this.msgLbl.setContent('');
    }

    this.screen.render();
  }

  getColorName(c) {
    const map = {
      'I': 'cyan',
      'O': 'yellow',
      'T': 'magenta',
      'L': 'white',
      'J': 'blue',
      'S': 'green',
      'Z': 'red',
      'ghost': 'gray'
    };
    return map[c] || 'white';
  }

  setKeyHandler(handler) {
    this.screen.key(['left'], () => handler('left'));
    this.screen.key(['right'], () => handler('right'));
    this.screen.key(['down'], () => handler('down'));
    this.screen.key(['up'], () => handler('rotate'));
    this.screen.key(['space'], () => handler('hardDrop'));
    this.screen.key(['r', 'R'], () => handler('restart'));
    this.screen.key(['p', 'P'], () => handler('pause'));
  }
}

module.exports = Screen;