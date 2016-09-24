/**
 * Created by chelo on 9/17/2016.
 * Modified by mary on 9/24/2016.
 */

 var Cell = function (value){
		this.value = value;
		this.status = 0;
};

 var MemoryGame = function (size){
	if ( size % 2 != 0){
		console.error('The size of the array must be defined as even number.');
		return;
	}
	this.size = size;
	this.x = size;
	this.y = size;
	this.hits = 0;
	this.prevPosX = 0;
	this.prevPosY = 0;
	this.pairedCards = new Array();
	this.board = new Array();
	this.startGame();
};

MemoryGame.prototype.controlDisplayState = function(cell){

	if (cell.status == 0 ) {
		document.write(" X ");
	}
	else{
		document.write(' '+cell.value+' ');
	}

};

/**
 * Returns array values
 * @return {Array} array
 */
MemoryGame.prototype.displayBoard = function () {

	document.body.innerHTML = '';

	for (var i = 0; i < this.x; i++){
		for (var j = 0; j < this.y; j++) {
			this.controlDisplayState(this.board[i][j])
		}
		document.write("<br>");
	}
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
};

/**
 * Set array with 'x' values
 * @return {Array} array
 */
MemoryGame.prototype.shuffleArray = function () {
	var stringIndex = 0;

	for (var x = 0; x < this.size; x++) {
		for (var y = 0; y < this.size; y++) {

			stringIndex = getRandom(0, this.pairedCards.length-1);
			this.board[x][y].value = this.pairedCards[stringIndex];
			this.pairedCards.splice(stringIndex,1);
		}
	}
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
};

MemoryGame.prototype.initPairedCards = function (){
	var startcode = 65;
	var limit = this.x*this.y;
	for (var i = 0; i < limit; i+=2) {
		this.pairedCards[i] = String.fromCharCode(startcode);
		this.pairedCards[i+1] = String.fromCharCode(startcode);
		startcode++;
	}
};

MemoryGame.prototype.startGame = function () {
	this.initBoard();
	this.initPairedCards();
	this.shuffleArray();
	this.displayBoard();
};

MemoryGame.prototype.isBoardResolved = function () {
	var solved = true;
	for (var i = 0; i < this.x; i++){
		for (var j = 0; j < this.y; j++) {
			if(this.board[i][j].status == 0){
				solved = false;
				break;
			}
		}
	}
	return solved;
};

MemoryGame.prototype.isPair = function (cell1, cell2) {

	return (cell1.value == cell2.value)? true : false;
};

MemoryGame.prototype.hitCell = function (posX, posY) {

	switch(this.hits) {
    case 0:
        this.board[posX][posY].status = 1
        this.prevPosX = posX;
        this.prevPosY = posY;
        this.hits++;
        break;
    case 1:
    	this.board[posX][posY].status = 1
    	if(!this.isPair(this.board[this.prevPosX][this.prevPosY], this.board[posX][posY])){
    		this.displayBoard();
			sleep();
    		setTimeout(function(){ alert("NOT A MATCH!!!"); }, 500);
    		this.board[this.prevPosX][this.prevPosY].status = 0;
    		this.board[posX][posY].status = 0;
    		
    	}
        this.hits=0;
        break;
    default:
        console.log("Something unexpected happened");
        this.hits=0;
	}
	var me = this;
	setTimeout(function(){
		me.displayBoard()
	}, 2500);

	if (this.isBoardResolved()){
		console.log("Congrats!!! Solved!!!");
	}

};
var sleep = function (){
	for (var i = 0; i < 300000; i++){
	}
};


