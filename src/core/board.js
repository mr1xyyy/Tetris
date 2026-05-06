const WIDTH = 10;
const HEIGHT = 20;

function createBoard() {
  return Array.from({ length: HEIGHT }, () =>
    Array(WIDTH).fill(0)
  );
}

module.exports = { createBoard, WIDTH, HEIGHT };