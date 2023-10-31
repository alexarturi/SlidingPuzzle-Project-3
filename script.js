const rows = 4;
const cols = 4;
const emptyCell = { row: rows - 1, col: cols - 1 };


function generatePuzzleBoard() {
    const table = document.getElementById("puzzle");
    table.innerHTML = '';

    for (let i = 0; i < rows; i++) {
        const row = table.insertRow(i);
        for (let j = 0; j < cols; j++) {
            const cell = row.insertCell(j);
            cell.textContent = i * cols + j + 1;
            cell.addEventListener("click", () => moveTile(i, j));
        }
    }

    table.rows[emptyCell.row].cells[emptyCell.col].textContent = '';
}

// Function to move a tile into the empty space
function moveTile(row, col) {
    const rowDiff = Math.abs(row - emptyCell.row);
    const colDiff = Math.abs(col - emptyCell.col);

    // Check if the clicked tile is adjacent to the empty space
    if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
        const table = document.querySelector("#puzzle");
        const clickedCell = table.rows[row].cells[col];
        const emptyCellElement = table.rows[emptyCell.row].cells[emptyCell.col];

        // Swap the tile and empty cell
        emptyCellElement.textContent = clickedCell.textContent;
        clickedCell.textContent = '';
        emptyCell.row = row;
        emptyCell.col = col;

        // Update the move count
        updateMoveCount();
    }

    // Check if the user has won (all tiles are in order)
    if (isPuzzleSolved()) {
        if(isImpressive(moveCount)){
            alert("Congratulations! You've solved the puzzle in very few moves!");
        } else {
            alert("Congratulations! You've solved the puzzle.");
        }
        stopCountingMoves();
    }
}

// Function to update the move count
let moveCount = 0;
function updateMoveCount() {
    moveCount++;
    document.getElementById("output").textContent = `Moves: ${moveCount}`;
}

// Function to check if the puzzle is solved
function isPuzzleSolved() {
    const table = document.getElementById("puzzle");
    let prevValue = 0;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = table.rows[i].cells[j];
            if (cell.textContent !== '') {
                const cellValue = parseInt(cell.textContent);
                if (cellValue !== prevValue + 1) {
                    return false;
                }
                prevValue = cellValue;
            }
        }
    }

    return true;
}

// Event listener for the "Start" button
document.getElementById("startButton").addEventListener("click", () => startCountingMoves());

// Event listener for the "Reset" button
document.getElementById("resetButton").addEventListener("click", () => resetGame());

// Initialize the puzzle board
generatePuzzleBoard();

// Function to start counting moves
function startCountingMoves() {
    moveCount = 0;
    document.getElementById("output").textContent = "Moves: 0";
}

// Function to reset the game
function resetGame() {
    generatePuzzleBoard();
    stopCountingMoves();
}

// Function to stop counting moves
function stopCountingMoves() {
    moveCount = 0;
    document.getElementById("output").textContent = "Moves: 0";
}

function isImpressive(moves) {
    return moves<100 ? true : false;
}