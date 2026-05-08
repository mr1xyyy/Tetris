module.exports = function bindKeys(screen, game) {
  screen.key(['left'], () => game.move(-1));
  screen.key(['right'], () => game.move(1));
  screen.key(['down'], () => game.drop());
  screen.key(['up'], () => game.rotate());
  screen.key(['C-c'], () => process.exit(0));
};
