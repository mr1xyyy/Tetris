const blessed = require('blessed');
const { WIDTH, HEIGHT } = require('../core/board');

class Screen {
  constructor() {
    this.screen = blessed.screen({ smartCSR: true });
    this.screen.title = 'TETRIS';
    this.screen.key(['C-c'], () => process.exit(0));

    this.main = blessed.box({
      left: 'center',
      top: 'center',
      width: '100%',
      height: '100%'
    });

    this.showMenu();
    this.screen.append(this.main);
  }

  showMenu() {
    this.main.destroy();
    this.main = blessed.box({
      left: 'center',
      top: 'center',
      width: 100,
      height: 30
    });
    this.screen.append(this.main);

    const cx = 'center';

    this.menuTitle = blessed.text({
      parent: this.main,
      left: cx,
      top: 3,
      content: '███████╗███████╗████████╗██████╗ ██╗███████╗',
      style: { fg: 'cyan', bold: true }
    });

    this.menuTitle2 = blessed.text({
      parent: this.main,
      left: cx,
      top: 4,
      content: '╚══██╔══╝██╔════╝╚══██╔══╝██╔══██╗██║██╔════╝',
      style: { fg: 'cyan', bold: true }
    });

    this.menuTitle3 = blessed.text({
      parent: this.main,
      left: cx,
      top: 5,
      content: '   ██║   █████╗     ██║   ██████╔╝██║███████╗',
      style: { fg: 'cyan', bold: true }
    });

    this.menuTitle4 = blessed.text({
      parent: this.main,
      left: cx,
      top: 6,
      content: '   ██║   ██╔══╝     ██║   ██╔══██╗██║╚════██║',
      style: { fg: 'cyan', bold: true }
    });

    this.menuTitle5 = blessed.text({
      parent: this.main,
      left: cx,
      top: 7,
      content: '   ██║   ███████╗   ██║   ██║  ██║██║███████║',
      style: { fg: 'cyan', bold: true }
    });

    this.menuTitle6 = blessed.text({
      parent: this.main,
      left: cx,
      top: 8,
      content: '   ╚═╝   ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚══════╝',
      style: { fg: 'cyan', bold: true }
    });

    this.divider = blessed.text({
      parent: this.main,
      left: cx,
      top: 10,
      content: '========================================',
      style: { fg: 'grey' }
    });

    this.startBtn = blessed.text({
      parent: this.main,
      left: cx,
      top: 11,
      content: '[ S ] START GAME',
      style: { fg: 'green', bold: true }
    });

    this.controlsTitle = blessed.text({
      parent: this.main,
      left: cx,
      top: 14,
      content: '=== CONTROLS ===',
      style: { fg: 'grey' }
    });

    this.controlsInfo = blessed.text({
      parent: this.main,
      left: cx,
      top: 15,
      content: '< > v : Move | ^ : Rotate',
      style: { fg: 'white' }
    });

    this.controlsInfo2 = blessed.text({
      parent: this.main,
      left: cx,
      top: 16,
      content: 'SPACE : Hard Drop',
      style: { fg: 'white' }
    });

    this.controlsInfo3 = blessed.text({
      parent: this.main,
      left: cx,
      top: 17,
      content: 'P : Pause | R : Restart',
      style: { fg: 'white' }
    });

    this.quitBtn = blessed.text({
      parent: this.main,
      left: cx,
      top: 20,
      content: '[ Q ] QUIT',
      style: { fg: 'red' }
    });

    this.screen.key(['s', 'S'], () => {
      this.hideMenu();
      this.showGameUI();
      if (this.onStart) this.onStart();
    });

    this.screen.key(['q', 'Q'], () => process.exit(0));

    this.screen.render();
  }

  hideMenu() {
    this.screen.removeKey('s');
    this.screen.removeKey('S');
  }

  showGameUI() {
    this.main.destroy();
    this.main = blessed.box({
      left: 'center',
      top: 'center',
      width: 50,
      height: 25
    });
    this.screen.append(this.main);

    this.gameBorder = blessed.box({
      parent: this.main,
      left: 0,
      top: 0,
      width: 24,
      height: 22,
      border: { type: 'line', fg: 'cyan' }
    });

    this.gameArea = blessed.text({
      parent: this.main,
      left: 1,
      top: 1,
      width: 22,
      height: 20,
      tags: true
    });

    this.sideBorder = blessed.box({
      parent: this.main,
      left: 24,
      top: 0,
      width: 24,
      height: 22,
      border: { type: 'line', fg: 'yellow' }
    });

    this.title = blessed.text({
      parent: this.main,
      left: 26,
      top: 1,
      content: 'TETRIS',
      style: { fg: 'cyan', bold: true }
    });

    this.scoreLbl = blessed.text({
      parent: this.main,
      left: 26,
      top: 3,
      content: 'Score: 0'
    });

    this.levelLbl = blessed.text({
      parent: this.main,
      left: 26,
      top: 5,
      content: 'Level: 1'
    });

    this.linesLbl = blessed.text({
      parent: this.main,
      left: 26,
      top: 7,
      content: 'Lines: 0'
    });

    this.nextLbl = blessed.text({
      parent: this.main,
      left: 26,
      top: 10,
      content: 'Next:'
    });

    this.nextArea = blessed.text({
      parent: this.main,
      left: 26,
      top: 11,
      width: 10,
      height: 6,
      tags: true
    });

    this.msgLbl = blessed.text({
      parent: this.main,
      left: 26,
      top: 18,
      content: '',
      style: { fg: 'red', bold: true }
    });

    this.controls = blessed.text({
      parent: this.main,
      left: 0,
      bottom: 0,
      content: '< > ^ : Move | SPACE: Drop | P: Pause | R: Restart | Z: Menu'
    });

    this.screen.key(['z', 'Z'], () => {
      this.hideGameUI();
      this.showMenu();
    });

    this.screen.render();
  }

  hideGameUI() {
    this.main.remove(this.gameBorder);
    this.main.remove(this.gameArea);
    this.main.remove(this.sideBorder);
    this.main.remove(this.title);
    this.main.remove(this.scoreLbl);
    this.main.remove(this.levelLbl);
    this.main.remove(this.linesLbl);
    this.main.remove(this.nextLbl);
    this.main.remove(this.nextArea);
    this.main.remove(this.msgLbl);
    this.main.remove(this.controls);
    this.screen.removeKey('z');
    this.screen.removeKey('Z');
  }

  showGameOver(game, callback) {
    this.main.destroy();
    this.main = blessed.box({
      left: 'center',
      top: 'center',
      width: 90,
      height: 35
    });
    this.screen.append(this.main);

    const cx = 'center';

    this.overTitle = blessed.text({
      parent: this.main,
      left: cx,
      top: 3,
      content: '  ██████╗  █████╗ ███╗   ███╗███████╗',
      style: { fg: 'red' }
    });

    this.overTitle2 = blessed.text({
      parent: this.main,
      left: cx,
      top: 4,
      content: ' ██╔════╝ ██╔══██╗████╗ ████║██╔════╝',
      style: { fg: 'red' }
    });

    this.overTitle3 = blessed.text({
      parent: this.main,
      left: cx,
      top: 5,
      content: '██║  ███╗███████║██╔████╔██║█████╗',
      style: { fg: 'red' }
    });

    this.overTitle4 = blessed.text({
      parent: this.main,
      left: cx,
      top: 6,
      content: '██║   ██║██╔══██║██║╚██╔╝██║██╔══╝',
      style: { fg: 'red' }
    });

    this.overTitle5 = blessed.text({
      parent: this.main,
      left: cx,
      top: 7,
      content: ' ╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗',
      style: { fg: 'red' }
    });

    this.overTitle6 = blessed.text({
      parent: this.main,
      left: cx,
      top: 8,
      content: '  ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝',
      style: { fg: 'red' }
    });

    this.overTitle7 = blessed.text({
      parent: this.main,
      left: cx,
      top: 10,
      content: '██████╗ ██╗   ██╗███████╗██████╗',
      style: { fg: 'red' }
    });

    this.overTitle8 = blessed.text({
      parent: this.main,
      left: cx,
      top: 11,
      content: '██╔═══██╗██║   ██║██╔════╝██╔══██╗',
      style: { fg: 'red' }
    });

    this.overTitle9 = blessed.text({
      parent: this.main,
      left: cx,
      top: 12,
      content: '██║   ██║██║   ██║█████╗  ██████╔╝',
      style: { fg: 'red' }
    });

    this.overTitle10 = blessed.text({
      parent: this.main,
      left: cx,
      top: 13,
      content: '██║   ██║╚██╗ ██╔╝██╔══╝  ██╔══██╗',
      style: { fg: 'red' }
    });

    this.overTitle11 = blessed.text({
      parent: this.main,
      left: cx,
      top: 14,
      content: '╚██████╔╝ ╚████╔╝ ███████╗██║  ██║',
      style: { fg: 'red' }
    });

    this.overTitle12 = blessed.text({
      parent: this.main,
      left: cx,
      top: 15,
      content: ' ╚═════╝   ╚═══╝  ╚══════╝╚═╝  ╚═╝',
      style: { fg: 'red' }
    });

    this.divider = blessed.text({
      parent: this.main,
      left: cx,
      top: 17,
      content: '========================================',
      style: { fg: 'grey' }
    });

    this.overScore = blessed.text({
      parent: this.main,
      left: cx,
      top: 19,
      content: 'Score: ' + game.score,
      style: { fg: 'white' }
    });

    this.overLevel = blessed.text({
      parent: this.main,
      left: cx,
      top: 20,
      content: 'Level: ' + game.level,
      style: { fg: 'white' }
    });

    this.overLines = blessed.text({
      parent: this.main,
      left: cx,
      top: 21,
      content: 'Lines: ' + game.lines,
      style: { fg: 'white' }
    });

    this.overRestart = blessed.text({
      parent: this.main,
      left: cx,
      top: 24,
      content: '[ R ] PLAY AGAIN',
      style: { fg: 'green', bold: true }
    });

    this.overMenu = blessed.text({
      parent: this.main,
      left: cx,
      top: 26,
      content: '[ Z ] BACK TO MENU',
      style: { fg: 'red' }
    });

    this.screen.key(['r', 'R'], () => {
      this.hideGameOver();
      callback();
    });

    this.screen.key(['z', 'Z'], () => {
      this.hideGameOver();
      this.showMenu();
    });

    this.screen.render();
  }

  hideGameOver() {
    this.screen.removeKey('r');
    this.screen.removeKey('R');
    this.screen.removeKey('z');
    this.screen.removeKey('Z');
  }

  setOnStart(callback) {
    this.onStart = callback;
  }

  calcGhostY(board, piece) {
    let gy = piece.y;
    while (gy < HEIGHT - piece.shape.length) {
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

        for (let py = 0; py < game.piece.shape.length; py++) {
          for (let px = 0; px < game.piece.shape[py].length; px++) {
            if (game.piece.shape[py][px]) {
              const gy = game.getGhost().y + py;
              const gx = game.piece.x + px;
              if (y === gy && x === gx) {
                filled = true;
                color = 'ghost';
              }
            }
          }
        }
        
        for (let py = 0; py < game.piece.shape.length; py++) {
          for (let px = 0; px < game.piece.shape[py].length; px++) {
            if (game.piece.shape[py][px]) {
              const cy = game.piece.y + py;
              const cx = game.piece.x + px;
              if (y === cy && x === cx) {
                filled = true;
                color = game.piece.color;
              }
            }
          }
        }

        if (filled && color) {
          if (color === 'ghost') {
            content += '{cyan-bg}  {/}';
          } else {
            const c = this.getColorName(color);
            content += '{' + c + '-bg}  {/}';
          }
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
      'ghost': 'white'
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