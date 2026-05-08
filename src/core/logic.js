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
  const fullRows = [];
  for (let y = 0; y < HEIGHT; y++) {
    if (board[y].every(cell => cell !== 0)) {
      fullRows.push(y);
    }
  }
  
  const newBoard = board.filter((_, i) => !fullRows.includes(i));
  const linesCleared = fullRows.length;
  
  for (let i = 0; i < linesCleared; i++) {
    newBoard.unshift(Array(WIDTH).fill(0));
  }
  
  return { board: newBoard, lines: linesCleared };
}

function rotate(piece) {
  const rotated = piece.shape[0].map((_, i) =>
    piece.shape.map(row => row[i]).reverse()
  );
  piece.shape = rotated;
}

function getGhostY(board, piece) {
  let gy = piece.y;
  while (true) {
    const testPiece = { ...piece, y: gy + 1 };
    if (collide(board, testPiece)) {
      return gy;
    }
    gy++;
  }
}

module.exports = { collide, merge, clearLines, rotate, getGhostY };