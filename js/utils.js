'use strict'

function setMinesNegsCount(board) { // Called once after war zone was set. This func calls the countNegs func for each cell in the board
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            countNegs(i, j);
        }
    }
}

function countNegs(cellIdxI, cellIdxJ) {
    var rowSatrt = cellIdxI - 1;
    var rowEnd = cellIdxI + 1;
    var colStart = cellIdxJ - 1;
    var colEnd = cellIdxJ + 1;
    for (var i = rowSatrt; i <= rowEnd; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = colStart; j <= colEnd; j++) {
            if (j < 0 || j >= gBoard[0].length) continue;
            if (i === cellIdxI && j === cellIdxJ) continue;
            if (gBoard[i][j].isMine) {
                gBoard[cellIdxI][cellIdxJ].minesAroundCount++
            }
        }
    }
}

function getNegsCoords(cellIdxI, cellIdxJ) { // Just like 'countNegs' func, but only retrieving an array with coords of neighbors of the cell it's called for
    var negsArr = []
    var rowSatrt = cellIdxI - 1;
    var rowEnd = cellIdxI + 1;
    var colStart = cellIdxJ - 1;
    var colEnd = cellIdxJ + 1;
    for (var i = rowSatrt; i <= rowEnd; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = colStart; j <= colEnd; j++) {
            if (j < 0 || j >= gBoard[0].length) continue;
            if (i === cellIdxI && j === cellIdxJ) continue;
            negsArr.push([i,j]);
        }
    }
    return negsArr;
}

if (document.addEventListener) { // Preventing auto side-menu when mouse is right-clicked
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    }, false);
} else {
    document.attachEvent('oncontextmenu', function () {
        alert("You've tried to open context menu");
        window.event.returnValue = false;
    });
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showConsole(board) { // Cheaty cheaty bang bang :)
    var res = [];
    for (var i = 0; i < board.length; i++) {
        var row = [];
        for (var j = 0; j < board[i].length; j++) {
            var cell = board[i][j];
            cell = (cell.isMine) ? MINE : cell.minesAroundCount;
            row.push(cell);
        }
        res.push(row);
    }
    console.table(res);
}

function changeLevel(elButton) {
    gLevel.size = +elButton.getAttribute('data-size');
    gLevel.mines = +elButton.getAttribute('data-mines');
    gLevel.hints = +elButton.getAttribute('data-hint');
    init();
}


function getScore(secsPass, level, livesLeft) {
    debugger

    var extraForLevel = 0;
    var extraForTime = 0;
    var extraForLives = 0;
    var totalScore = 0;

    switch (level) {
        case 4:
            extraForLevel = 0;
            break;
        case 8:
            extraForLevel = 200;
            break;
        case 12:
            extraForLevel = 500;
            break;
        default:
            extraForLevel = 0; 
            break;           
    }

    switch (secsPass) {
        case secsPass < 150:
            extraForTime = 500;
            break;
        case secsPass < 200:
            extraForTime = 400;
            break;
        case secsPass < 250:
            extraForTime = 300;
            break;
        case secsPass < 300:
            extraForTime = 200;
            break;
        default:
            extraForTime = 0;
            break;         
    }

    switch (livesLeft) {
        case 3:
            extraForLives = 500;
            break;
        case 2:
            extraForLives = 300;
            break;
        case 1:
            extraForLives = 100;
        default:
            extraForLives = 0;
            break;            
    }

    totalScore = extraForLevel + extraForTime + extraForLives;
    gScore = totalScore;
    gElScore.innerText = 'Score: ' + gScore;
}

function hintMode() {

}











