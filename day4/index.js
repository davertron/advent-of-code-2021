const fs = require("fs");
const path = require("path");

const lines = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .trim()
    .split("\n");

function parseInput(lines) {
    const numbers = lines[0].split(",").map((numStr) => parseInt(numStr));
    const boards = [];
    for (let line of lines.slice(1)) {
        if (!line) {
            boards.push([]);
        } else {
            boards[boards.length - 1].push(
                line
                    .trim()
                    .split(/\s+/)
                    .map((numStr) => parseInt(numStr))
            );
        }
    }

    return { numbers, boards };
}

const X = "x";

// Mutates board
function markBoard(board, number) {
    for (let row = 0; row < board.length; row++) {
        for (let column = 0; column < board[row].length; column++) {
            if (board[row][column] === number) {
                board[row][column] = X;
            }
        }
    }
}

function hasBingo(board) {
    for (let row = 0; row < board.length; row++) {
        if (board[row].every((n) => n === X)) return true;
    }

    for (let column = 0; column < board[0].length; column++) {
        let bingo = true;
        for (let row = 0; row < board.length; row++) {
            if (board[row][column] !== X) {
                bingo = false;
                break;
            }
        }
        if (bingo) return true;
    }

    return false;
}

function calculateResult(board, lastNum) {
    let boardSum = 0;
    for (let row of board) {
        row.forEach((value) => {
            if (value !== X) boardSum += value;
        });
    }

    return lastNum * boardSum;
}

function part1() {
    const { numbers, boards } = parseInput(lines);
    //console.log(numbers, boards);

    let bingo = false;
    let numIndex = 0;
    let bingoBoard = null;
    let currentNum;
    while (!bingo) {
        currentNum = numbers[numIndex];
        for (let board of boards) {
            markBoard(board, currentNum);
            if (hasBingo(board)) {
                bingo = true;
                bingoBoard = board;
                break;
            }
        }
        numIndex++;
    }
    console.log("Winning board: ", bingoBoard);
    const result = calculateResult(bingoBoard, currentNum);

    console.log("Part 1: ", result);
}

function part1Test() {
    const rowBingoBoard = [
        [22, 13, 17, 11, 0],
        [8, 2, 23, 4, 24],
        [X, X, X, X, X],
        [6, 10, 3, 18, 5],
        [1, 12, 20, 15, 19],
    ];
    const columnBingoBoard = [
        [22, 13, X, 11, 0],
        [8, 2, X, 4, 24],
        [21, 9, X, 16, 7],
        [6, 10, X, 18, 5],
        [1, 12, X, 15, 19],
    ];
    const noBingoBoard = [
        [22, 13, 17, 11, 0],
        [8, 2, 23, 4, 24],
        [21, 9, 14, 16, 7],
        [6, 10, 3, 18, 5],
        [1, 12, 20, 15, 19],
    ];
    console.log("Should be false: ", hasBingo(noBingoBoard));
    console.log("Should be true: ", hasBingo(rowBingoBoard));
    console.log("Should be true: ", hasBingo(columnBingoBoard));
}

function part2() {
    const { numbers, boards } = parseInput(lines);

    let boardsLeft = [...boards];
    let lastBoard = null;
    let numIndex = 0;
    let currentNum;
    while (!lastBoard) {
        currentNum = numbers[numIndex];
        for (let board of boardsLeft) {
            markBoard(board, currentNum);
            if (hasBingo(board)) {
                console.log("Bingo on board ", board);
                boardsLeft = boardsLeft.filter((b) => b !== board);
                if (boardsLeft.length === 0) {
                    lastBoard = board;
                }
            }
        }
        numIndex++;
    }
    console.log("Last winning board: ", lastBoard);
    const result = calculateResult(lastBoard, currentNum);

    console.log("Part 2: ", result);
}

//part1Test();
part1();
part2();
