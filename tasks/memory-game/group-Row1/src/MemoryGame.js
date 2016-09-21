/**
 * Created by chelo on 9/17/2016.
 * Modified by mary on 9/20/2016.
 */

 var Cell = function (value){
		this.value = value;
		this.status = false;
};

 var MemoryGame = function (size){
	if ( size % 2 == 0){
		this.size = size;
		this.x = size;
		this.y = size;
		this.pairedCards = new Array();
		this.board = new Array();
	}
	else{
		this.size = NaN;
		this.x = NaN;
		this.y = NaN;
		this.board = NaN;
		console.error('The size of the array must be defined as even number.');
	}
};

/**
 * Returns array values
 * @return {Array} array
 */
MemoryGame.prototype.displayBoard = function () {
	for (var i = 0; i < this.x; i++){
		for (var j = 0; j < this.y; j++) {
			console.log(' ', this.board[i][j],' ');
		}
	}
	return this.board;
};

/**
 * Set array with 'x' values
 * @return {Array} array
 */
MemoryGame.prototype.initBoard = function () {
	for (var i = 0; i < this.x; i++){
		this.board[i] = new Array();
		for (var j = 0; j < this.y; j++) {
			this.board[i][j] = new Cell('X');
		}
	}
	//return this.board;
};

/**
 * Set array with 'x' values
 * @return {Array} array
 */
MemoryGame.prototype.suffleArray = function () {
	var stringIndex = 0;

	for (var x = 0; x < this.size; x++) {
		for (var y = 0; y < this.size; y++) {

			stringIndex = getRandom(0, this.pairedCards.length-1);
			this.board[x][y] = this.pairedCards[stringIndex];
			this.pairedCards.splice(stringIndex,1);
		}
	}
	return this.board;
};

/**
 * Returns size
 * @return {Number} size
 */
MemoryGame.prototype.getSize = function (){
	return this.size;
};

function getRandom(bottom, top) {
	return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
}

MemoryGame.prototype.startGame = function () {
	this.initPairedCards();
	this.initBoard();
};

MemoryGame.prototype.initPairedCards = function (){
	var startcode = 65;
	var limit = this.x*this.y;
	for (var i = 0; i < limit; i+=2) {
		this.pairedCards[i] = String.fromCharCode(startcode);
		this.pairedCards[i+1] = String.fromCharCode(startcode);
		startcode++;
	}
	return this.pairedCards;
}