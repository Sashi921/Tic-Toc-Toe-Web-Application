const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const twoPlayerBtn = document.getElementById("twoPlayer");
const vsAIBtn = document.getElementById("vsAI");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let vsAI = false;

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== "" || !gameActive) return;

  makeMove(index, currentPlayer);

  if (vsAI && currentPlayer === "O" && gameActive) {
    setTimeout(aiMove, 500);
  }
}

function makeMove(index, player) {
  board[index] = player;
  cells[index].textContent = player;
  cells[index].classList.add("taken");

  if (checkWin(player)) {
    statusText.textContent = `Player ${player} Wins!`;
    gameActive = false;
  } else if (board.every(cell => cell !== "")) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
  } else {
    currentPlayer = player === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin(player) {
  return winningConditions.some(condition => {
    return condition.every(index => board[index] === player);
  });
}

// Simple AI: pick a random empty cell
function aiMove() {
  const emptyCells = board.map((val, idx) => (val === "" ? idx : null)).filter(v => v !== null);
  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  makeMove(randomIndex, "O");
}

function resetGame() {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  statusText.textContent = "Player X's turn";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
resetBtn.addEventListener("click", resetGame);
twoPlayerBtn.addEventListener("click", () => { vsAI = false; resetGame(); });
vsAIBtn.addEventListener("click", () => { vsAI = true; resetGame(); });
