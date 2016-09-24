/**
 * Created by Ariel Mattos on 20/09/2016.
 */

var Board = function (size) {
    this.size = size % 2 === 0 ? size : size + 1;
    this.items = Math.pow(this.size, 2);
    this.controlBoard = [];
    this.gameBoard = [];
    this.cell = (this.items - 1).toString().replace(/./g,' ');
    this.gameBoardHiddenCell = this.cell.replace(/./g,'-');
};

Board.prototype.generateBoard = function() {
    for (var i = 0; i < this.items / 2; i++) {
        this.controlBoard.push(i, i);
        this.gameBoard.push(this.gameBoardHiddenCell, this.gameBoardHiddenCell);
    }
};

Board.prototype.mixControlBoard = function() {
    var sourceIndex;
    var destinationIndex;
    var swap;

    for (var count = 0; count < this.items; count++) {
        sourceIndex = Math.round(Math.random() * (this.items - 1));
        destinationIndex = Math.round(Math.random() * (this.items - 1));

        swap = this.controlBoard[sourceIndex];
        this.controlBoard[sourceIndex] = this.controlBoard[destinationIndex];
        this.controlBoard[destinationIndex] = swap;
    }
};

Board.prototype.initialize = function() {
    this.generateBoard();
    this.mixControlBoard();
};

Board.prototype.formatCell = function(number) {
    var label = this.cell + number.toString();
    return label.slice(label.length - this.cell.length);
};

Board.prototype.printGameBoard = function() {
    var row;
    var i;

    // Print column labels
    row = '  ' + this.cell;
    for (i = 0; i < this.size; i++) {
        row += this.formatCell(i + 1) + ' ';
    }
    console.log(row);

    for (i = 0; i < this.size; i++) {
        row = this.formatCell(i + 1) + '  ';
        for (var j = 0; j < this.size; j++) {
            row += this.formatCell(this.gameBoard[i * this.size + j]) + ' ';
        }
        console.log(row);
    }
};


Board.prototype.printControlBoard = function() {
    var row;
    var i;

    // Print column labels
    row = '  ' + this.cell;
    for (i = 0; i < this.size; i++) {
        row += this.formatCell(i + 1) + ' ';
    }
    console.log(row);

    for (i = 0; i < this.size; i++) {
        row = this.formatCell(i + 1) + '  ';
        for (var j = 0; j < this.size; j++) {
            row += this.formatCell(this.controlBoard[i * this.size + j]) + ' ';
        }
        console.log(row);
    }
};


Board.prototype.revealItemAt = function (row, col) {
    var index = (row - 1) * this.size + (col - 1);
    this.gameBoard[index] = this.formatCell(this.controlBoard[index]);
};

Board.prototype.hideItemAt = function (row, col) {
    var index = (row - 1) * this.size + (col - 1);
    this.gameBoard[index] = this.gameBoardHiddenCell;
};

Board.prototype.getItemAt = function (row, col) {
    var index = (row - 1) * this.size + (col - 1);
    return this.controlBoard[index];
};

function toInt(s) { 
    return parseInt(s.trim());
}

function promptCell(message) {
    var itemCoordinatesString = prompt(message);
    itemCoordinatesString = itemCoordinatesString.split(',')
    return (itemCoordinatesString.map(toInt)).slice(0,2);
}

var board = new Board(5);
board.initialize();
board.printControlBoard();
board.printGameBoard();

var firstItemCoordinates = promptCell('Select an item specifying a row and column.\nExample: 1,2');
var firstItemValue = board.getItemAt(firstItemCoordinates[0], firstItemCoordinates[1]);
board.revealItemAt(firstItemCoordinates[0], firstItemCoordinates[1]);
board.printGameBoard();

var secondItemCoordinates = promptCell('Now select the matching item.');
var secondItemValue = board.getItemAt(secondItemCoordinates[0], secondItemCoordinates[1]);
board.revealItemAt(secondItemCoordinates[0], secondItemCoordinates[1]);
board.printGameBoard();

var delay = setTimeout(function(){

    if (firstItemValue != secondItemValue) {
        board.hideItemAt(firstItemCoordinates[0], firstItemCoordinates[1]);
        board.hideItemAt(secondItemCoordinates[0], secondItemCoordinates[1]);
    }
    board.printGameBoard();

},10000);

clearTimeout(delay);


