const boardElement = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
const statusText = document.getElementById('status');
let boardState, currentPlayer, isGameActive;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function initGame() {
  boardState = Array(9).fill('');
  currentPlayer = 'x';
  isGameActive = true;
  statusText.textContent = \`Current Player: \${currentPlayer.toUpperCase()}\`;
  boardElement.querySelectorAll('.cell').forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.textContent = '';
    cell.addEventListener('click', onCellClick);
  });
}

function onCellClick(e) {
  const clickedCell = e.target;
  const index = clickedCell.getAttribute('data-cell-index');

  if (boardState[index] !== '' || !isGameActive) return;

  updateCell(clickedCell, index);
  checkResult();
}

function updateCell(cell, index) {
  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer.toUpperCase();
  cell.classList.add(currentPlayer);
}

function checkResult() {
  let roundWon = false;
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (
      boardState[a] === '' ||
      boardState[b] === '' ||
      boardState[c] === ''
    ) {
      continue;
    }
    if (
      boardState[a] === boardState[b] &&
      boardState[b] === boardState[c]
    ) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = \`\${currentPlayer.toUpperCase()} Wins!\`;
    isGameActive = false;
    return;
  }

  if (!boardState.includes('')) {
    statusText.textContent = "It's a Draw!";
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
  statusText.textContent = \`Current Player: \${currentPlayer.toUpperCase()}\`;
}

restartButton.addEventListener('click', initGame);

// Initialize on page load
initGame();
