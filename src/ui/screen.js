const blessed = require('blessed');
const { renderBoard, renderNextPiece } = require('./render-utils');
const { buildGameOver, buildGameUI, buildMenu } = require('./view-builders');

class Screen {
  constructor() {
    this.screen = blessed.screen({ smartCSR: true });
    this.screen.title = 'TETRIS';
    this.screen.key(['C-c'], () => process.exit(0));

    this.menuIndex = 0;
    this.menuItems = [];
    this.onStart = null;

    this.main = blessed.box({
      left: 'center',
      top: 'center',
      width: '100%',
      height: '100%'
    });

    this.screen.append(this.main);
    this.showMenu();
  }

  createMainBox(width, height) {
    if (this.main) {
      this.main.destroy();
    }

    this.main = blessed.box({
      left: 'center',
      top: 'center',
      width,
      height
    });

    this.screen.append(this.main);
  }

  updateSelection(selectedBg, selectedFg = 'white') {
    this.menuItems.forEach((item, index) => {
      const selected = index === this.menuIndex;
      item.setContent(`${selected ? '>' : ' '} ${item.label}`);
      item.style.bg = selected ? selectedBg : '';
      item.style.fg = selected ? selectedFg : 'white';
      item.style.bold = selected;
    });

    this.screen.render();
  }

  updateMenuSelection() {
    this.updateSelection('cyan');
  }

  updateGameOverSelection() {
    this.updateSelection('red', 'black');
  }

  hideMenu() {
    this.screen.removeKey('tab');
    this.screen.removeKey('enter');
    this.menuIndex = 0;
  }

  hideGameOver() {
    this.screen.removeKey('tab');
    this.screen.removeKey('enter');
    this.menuIndex = 0;
  }

  showMenu() {
    this.hideMenu();
    this.createMainBox(100, 30);

    Object.assign(this, buildMenu(this.main));

    this.menuItems = [this.startBtn, this.quitBtn];
    this.menuIndex = 0;
    this.updateMenuSelection();

    this.screen.key(['tab'], () => {
      this.menuIndex = (this.menuIndex + 1) % this.menuItems.length;
      this.updateMenuSelection();
    });

    this.screen.key(['enter'], () => {
      if (this.menuIndex === 0) {
        this.hideMenu();
        this.showGameUI();
        if (this.onStart) this.onStart();
        return;
      }

      process.exit(0);
    });

    this.screen.render();
  }

  showGameUI() {
    this.createMainBox(50, 25);
    Object.assign(this, buildGameUI(this.main));

    this.screen.key(['escape', 'Escape'], () => {
      this.hideGameUI();
      this.showMenu();
    });

    this.screen.render();
  }

  hideGameUI() {
    this.screen.removeKey('escape');
    this.screen.removeKey('Escape');
  }

  showGameOver(game, onRestart, onMenu) {
    this.hideGameOver();
    this.createMainBox(90, 35);

    Object.assign(this, buildGameOver(this.main, game));

    this.menuItems = [this.overRestart, this.overMenu];
    this.menuIndex = 0;
    this.updateGameOverSelection();

    this.screen.key(['tab'], () => {
      this.menuIndex = (this.menuIndex + 1) % this.menuItems.length;
      this.updateGameOverSelection();
    });

    this.screen.key(['enter'], () => {
      const selectedIndex = this.menuIndex;
      this.hideGameOver();

      if (selectedIndex === 0) {
        onRestart();
      } else {
        if (onMenu) {
          onMenu();
        } else {
          this.showMenu();
        }
      }
    });

    this.screen.render();
  }

  setOnStart(callback) {
    this.onStart = callback;
  }

  draw(game) {
    this.gameArea.setContent(renderBoard(game));
    this.scoreLbl.setContent(`Score: ${game.score}`);
    this.levelLbl.setContent(`Level: ${game.level}`);
    this.linesLbl.setContent(`Lines: ${game.lines}`);
    this.nextArea.setContent(renderNextPiece(game.nextPiece));
    this.msgLbl.setContent(game.paused ? 'PAUSED' : '');

    this.screen.render();
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
