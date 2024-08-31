const cells = document.querySelectorAll('[data-cell]');
const statusMessage = document.getElementById('statusMessage');
const restartButton = document.getElementById('restartButton');
const startGameButton = document.getElementById('startGame');
const namePopup = document.getElementById('namePopup');
const winnerPopup = document.getElementById('winnerPopup');
const winnerMessage = document.getElementById('winnerMessage');
const closeWinnerPopupButton = document.getElementById('closeWinnerPopup');

let player1Name = '';
let player2Name = '';
let currentPlayer = 'X';
let gameActive = false;
let gameState = Array(9).fill('');

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function startGame() {
    player1Name = document.getElementById('player1').value || 'Player 1';
    player2Name = document.getElementById('player2').value || 'Player 2';
    currentPlayer = 'X';
    gameState.fill('');
    gameActive = true;
    statusMessage.textContent = `${player1Name} (X)'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winner');
    });
    namePopup.style.display = 'none';
}

function handleCellClick(e) {
    const clickedCell = e.target;
    const cellIndex = Array.from(cells).indexOf(clickedCell);

    if (gameState[cellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (checkWinner()) {
        gameActive = false;
        winnerMessage.textContent = `${currentPlayer === 'X' ? player1Name : player2Name} wins!`;
        winnerPopup.style.display = 'flex';
        return;
    }

    if (gameState.every(cell => cell !== '')) {
        gameActive = false;
        winnerMessage.textContent = 'It\'s a draw!';
        winnerPopup.style.display = 'flex';
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusMessage.textContent = `${currentPlayer === 'X' ? player1Name : player2Name} (${currentPlayer})'s turn`;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            cells[a].classList.add('winner');
            cells[b].classList.add('winner');
            cells[c].classList.add('winner');
            roundWon = true;
            break;
        }
    }
    return roundWon;
}

function restartGame() {
    namePopup.style.display = 'flex';
    startGame();
}

function closeWinnerPopup() {
    winnerPopup.style.display = 'none';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
startGameButton.addEventListener('click', startGame);
closeWinnerPopupButton.addEventListener('click', closeWinnerPopup);

namePopup.style.display = 'flex';
