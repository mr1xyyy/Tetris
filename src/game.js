const { createBoard, WIDTH, HEIGHT } = require('./core/board');
const { collide, merge, clearLines, rotate, getGhostY } = require('./core/logic');
const { randomPiece, clonePiece } = require('./core/pieces');

class Game {
  constructor() {
    this.board = createBoard();
    this.piece = randomPiece();
    this.nextPiece = randomPiece();
    this.score = 0;
    this.lines = 0;
    this.level = 1;
    this.gameOver = false;
    this.paused = false;
    this.speed = 600;
  }

  move(dir) {
    if (this.gameOver || this.paused) return;
    
    this.piece.x += dir;

    if (collide(this.board, this.piece)) {
      this.piece.x -= dir;
    }
  }

  drop() {
    if (this.gameOver || this.paused) return;

    this.piece.y++;

    if (collide(this.board, this.piece)) {
      this.piece.y--;
      this.mergeAndNext();
    }
  }

  hardDrop() {
    if (this.gameOver || this.paused) return;

    const ghostY = getGhostY(this.board, this.piece);
    const dropDistance = ghostY - this.piece.y;
    this.score += dropDistance * 2;
    this.piece.y = ghostY;
    this.mergeAndNext();
  }

  mergeAndNext() {
    merge(this.board, this.piece);
    const result = clearLines(this.board);
    this.board = result.board;
    const linesCleared = result.lines;
    
    if (linesCleared > 0) {
      this.lines += linesCleared;
      this.score += this.getLineScore(linesCleared);
      this.level = Math.floor(this.lines / 10) + 1;
      this.speed = Math.max(50, 600 - (this.level - 1) * 50);
    }
    
    this.piece = this.nextPiece;
    this.nextPiece = randomPiece();

    if (collide(this.board, this.piece)) {
      this.gameOver = true;
    }
  }

  getLineScore(lines) {
    const scores = [0, 100, 300, 500, 800];
    return (scores[lines] || 800) * this.level;
  }

  rotate() {
    if (this.gameOver || this.paused) return;

    const kicks = [0, 1, -1, 2, -2];
    const oldX = this.piece.x;
    const oldShape = this.piece.shape.map(row => [...row]);
    
    rotate(this.piece);

    for (const kick of kicks) {
      this.piece.x = oldX + kick;
      if (!collide(this.board, this.piece)) return;
    }

    this.piece.x = oldX;
    this.piece.shape = oldShape;
  }

  togglePause() {
    if (this.gameOver) return;
    this.paused = !this.paused;
  }

  restart() {
    this.board = createBoard();
    this.piece = randomPiece();
    this.nextPiece = randomPiece();
    this.score = 0;
    this.lines = 0;
    this.level = 1;
    this.gameOver = false;
    this.paused = false;
    this.speed = 600;
  }

  tick() {
    if (this.gameOver || this.paused) return;
    this.drop();
  }

  getGhost() {
    const ghost = clonePiece(this.piece);
    ghost.y = getGhostY(this.board, ghost);
    return ghost;
  }
}

module.exports = Game;