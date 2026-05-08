const blessed = require('blessed');
const {
  GAME_CONTROLS,
  GAME_OVER_TITLE_LINES,
  MENU_CONTROLS,
  MENU_TITLE_LINES
} = require('./constants');

function createCenteredText(parent, top, content, style = {}) {
  return blessed.text({
    parent,
    left: 'center',
    top,
    content,
    style
  });
}

function buildMenu(main) {
  const elements = {};

  MENU_TITLE_LINES.forEach((line, index) => {
    createCenteredText(main, 3 + index, line, {
      fg: 'cyan',
      bold: true
    });
  });

  elements.divider = createCenteredText(main, 10, '========================================', {
    fg: 'grey'
  });

  elements.startBtn = createCenteredText(main, 11, '> START GAME', {
    fg: 'white',
    bold: true
  });
  elements.startBtn.label = ' START GAME ';
  elements.startBtn.selectedBg = 'cyan';

  elements.quitBtn = createCenteredText(main, 12, '  QUIT', {
    fg: 'white'
  });
  elements.quitBtn.label = '    QUIT    ';
  elements.quitBtn.selectedBg = 'cyan';

  elements.controlsTitle = createCenteredText(main, 15, '=== CONTROLS ===', {
    fg: 'grey'
  });

  elements.controlsInfo = blessed.text({
    parent: main,
    left: 'center',
    top: 16,
    width: 22,
    align: 'left',
    content: MENU_CONTROLS,
    style: { fg: 'white' }
  });

  return elements;
}

function buildGameUI(main) {
  return {
    gameBorder: blessed.box({
      parent: main,
      left: 0,
      top: 2,
      width: 24,
      height: 22,
      border: { type: 'line', fg: 'cyan' }
    }),
    gameArea: blessed.text({
      parent: main,
      left: 1,
      top: 3,
      width: 22,
      height: 20,
      tags: true
    }),
    sideBorder: blessed.box({
      parent: main,
      left: 24,
      top: 2,
      width: 24,
      height: 22,
      border: { type: 'line', fg: 'yellow' }
    }),
    title: blessed.text({
      parent: main,
      left: 26,
      top: 3,
      content: 'TETRIS',
      style: { fg: 'cyan', bold: true }
    }),
    scoreLbl: blessed.text({
      parent: main,
      left: 26,
      top: 5,
      content: 'Score: 0'
    }),
    levelLbl: blessed.text({
      parent: main,
      left: 26,
      top: 7,
      content: 'Level: 1'
    }),
    linesLbl: blessed.text({
      parent: main,
      left: 26,
      top: 9,
      content: 'Lines: 0'
    }),
    nextLbl: blessed.text({
      parent: main,
      left: 26,
      top: 12,
      content: 'Next:'
    }),
    nextArea: blessed.text({
      parent: main,
      left: 26,
      top: 13,
      width: 10,
      height: 6,
      tags: true
    }),
    controls: blessed.text({
      parent: main,
      left: 26,
      top: 16,
      width: 20,
      height: 6,
      content: GAME_CONTROLS,
      style: { fg: 'white' }
    }),
    msgLbl: blessed.text({
      parent: main,
      left: 21,
      top: 0,
      width: 14,
      align: 'center',
      content: '',
      style: { fg: 'red', bold: true }
    })
  };
}

function buildGameOver(main, game) {
  const elements = {};

  GAME_OVER_TITLE_LINES.forEach((line, index) => {
    createCenteredText(main, 3 + index, line, {
      fg: 'red'
    });
  });

  elements.divider = createCenteredText(main, 17, '========================================', {
    fg: 'grey'
  });
  elements.overScore = createCenteredText(main, 19, `Score: ${game.score}`, { fg: 'white' });
  elements.overLevel = createCenteredText(main, 20, `Level: ${game.level}`, { fg: 'white' });
  elements.overLines = createCenteredText(main, 21, `Lines: ${game.lines}`, { fg: 'white' });

  elements.overRestart = createCenteredText(main, 24, '> PLAY AGAIN', {
    fg: 'black',
    bold: true
  });
  elements.overRestart.label = '  PLAY AGAIN   ';
  elements.overRestart.selectedBg = 'red';

  elements.overMenu = createCenteredText(main, 25, '  BACK TO MENU', {
    fg: 'white'
  });
  elements.overMenu.label = ' BACK TO MENU  ';
  elements.overMenu.selectedBg = 'red';

  return elements;
}

module.exports = {
  buildGameOver,
  buildGameUI,
  buildMenu
};
