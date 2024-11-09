// Constants to define the players and winning combinations
const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
];

// Select elements
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
const statusText = document.getElementById('status');

// Variable to track whose turn it is
let oTurn;

// Initialize the game
startGame();

// Restart game on button click
restartButton.addEventListener('click', startGame);

// Function to start or restart the game
function startGame() {
    oTurn = false;  // X starts first
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS, O_CLASS);  // Clear any previous marks
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });  // Allow one click per cell
    });
    setStatusText('');
}

// Function to handle cell click
function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);  // Place the mark (X or O)

    if (checkWin(currentClass)) {
        setStatusText(`${currentClass.toUpperCase()} Wins!`);  // Show winner
        endGame();  // End the game
    } else if (isDraw()) {
        setStatusText("Draw!");  // Show draw message
        endGame();
    } else {
        swapTurns();  // Switch turns
    }
}

// Function to end the game (no more moves can be made)
function endGame() {
    cellElements.forEach(cell => {
        cell.removeEventListener('click', handleClick);  // Disable further clicks
    });
}

// Function to update status text (winner or draw)
function setStatusText(message) {
    statusText.innerText = message;
}

// Function to check if the game is a draw
function isDraw() {
    return [...cellElements].every(cell => cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS));
}

// Function to place the mark (X or O) on the cell
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

// Function to swap turns between X and O
function swapTurns() {
    oTurn = !oTurn;
}

// Function to check if a player has won
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}