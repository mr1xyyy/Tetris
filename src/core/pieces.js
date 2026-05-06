const PIECES = [
  { shape: [[1, 1, 1, 1]], color: 'I', name: 'I' },
  { shape: [[1, 1], [1, 1]], color: 'O', name: 'O' },
  { shape: [[0, 1, 0], [1, 1, 1]], color: 'T', name: 'T' },
  { shape: [[1, 0, 0], [1, 1, 1]], color: 'L', name: 'L' },
  { shape: [[0, 0, 1], [1, 1, 1]], color: 'J', name: 'J' },
  { shape: [[0, 1, 1], [1, 1, 0]], color: 'S', name: 'S' },
  { shape: [[1, 1, 0], [0, 1, 1]], color: 'Z', name: 'Z' }
];

function randomPiece() {
  const piece = PIECES[Math.floor(Math.random() * PIECES.length)];
  return {
    shape: piece.shape.map(row => [...row]),
    color: piece.color,
    x: 3,
    y: 0
  };
}

function clonePiece(piece) {
  return {
    shape: piece.shape.map(row => [...row]),
    color: piece.color,
    x: piece.x,
    y: piece.y
  };
}

module.exports = { PIECES, randomPiece, clonePiece };