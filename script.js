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

function moveTile(row, col) {
    const rowDiff = Math.abs(row - emptyCell.row);
    const colDiff = Math.abs(col - emptyCell.col);

    if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
        const table = document.querySelector("#puzzle");
        const clickedCell = table.rows[row].cells[col];
        const emptyCellElement = table.rows[emptyCell.row].cells[emptyCell.col];

        emptyCellElement.textContent = clickedCell.textContent;
        clickedCell.textContent = '';
        emptyCell.row = row;
        emptyCell.col = col;

        updateMoveCount();
    }

    if (isPuzzleSolved()) {
        if(isImpressive(moveCount)){
            alert("Congratulations! You've solved the puzzle in very few moves!");
        } else {
            alert("Congratulations! You've solved the puzzle.");
        }
        stopCountingMoves();
    }
}

let moveCount = 0;
function updateMoveCount() {
    moveCount++;
    document.getElementById("output").textContent = `Moves: ${moveCount}`;
}

//win condition
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

document.getElementById("startButton").addEventListener("click", () => startCountingMoves());

document.getElementById("resetButton").addEventListener("click", () => resetGame());

// Init board
generatePuzzleBoard();

function startCountingMoves() {
    moveCount = 0;
    document.getElementById("output").textContent = "Moves: 0";
}

// resets game
function resetGame() {
    generatePuzzleBoard();
    stopCountingMoves();
}

//resets move count and sets move count to 0
function stopCountingMoves() {
    moveCount = 0;
    document.getElementById("output").textContent = "Moves: 0";
}

function isImpressive(moves) {
    return moves<100 ? true : false;
}