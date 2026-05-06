const { WIDTH, HEIGHT } = require('./board');

function collide(board, piece) {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (!piece.shape[y][x]) continue;

      const newX = piece.x + x;
      const newY = piece.y + y;

      if (newX < 0 || newX >= WIDTH || newY >= HEIGHT) {
        return true;
      }

      if (newY >= 0 && board[newY][newX]) {
        return true;
      }
    }
  }
  return false;
}

function merge(board, piece) {
  piece.shape.forEach((row, y) => {
    row.forEach((val, x) => {
      if (val && y + piece.y >= 0) {
        board[y + piece.y][x + piece.x] = piece.color;
      }
    });
  });
}

function clearLines(board) {
  const newBoard = board.filter(row => row.some(cell => cell === 0));
  const linesCleared = HEIGHT - newBoard.length;
  
  for (let i = 0; i < linesCleared; i++) {
    newBoard.unshift(Array(WIDTH).fill(0));
  }
  
  return newBoard;
}

function rotate(piece) {
  const rotated = piece.shape[0].map((_, i) =>
    piece.shape.map(row => row[i]).reverse()
  );
  piece.shape = rotated;
}

function getGhostY(board, piece) {
  let ghostY = piece.y;
  const testPiece = { ...piece, y: ghostY + 1 };
  
  while (!collide(board, testPiece)) {
    ghostY++;
    testPiece.y = ghostY + 1;
  }
  
  return ghostY;
}

module.exports = { collide, merge, clearLines, rotate, getGhostY };