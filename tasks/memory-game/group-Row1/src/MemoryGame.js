/**
 * Created by chelo on 9/17/2016.
 * Modified by mary on 9/24/2016.
 */

 var Cell = function (value){
		this.value = value;
		this.status = 0;
};

 var MemoryGame = function (size){
	if (size*size % 2 != 0){
		this.comodin = true;
		this.centerA = -1;
		this.centerB = -1;
	}
	else{
		this.comodin = false;
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

/**
 * Returns cell value based on the status
 * @param {cell}
 * @returns {value}
 */
MemoryGame.prototype.controlDisplayState = function(cell){
	if (cell.status == 0 ) {
		return " X ";
	}
	else{
		return cell.value;
	}
};

/**
 * Returns board values
 * @returns {Array} board
 */
MemoryGame.prototype.displayBoard = function() {

	for (var i = 0; i < this.x; i++){
		for (var j = 0; j < this.y; j++) {
			this.controlDisplayState(this.board[i][j]);
		}
	}
	return this.board;
};

/**
 * Sets board array with 'x' values
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
 * Sets board array with suffle values based on the declared size
 */
MemoryGame.prototype.shuffleArray = function () {
	var stringIndex = 0;

	if(this.comodin){
		this.centerA = Math.round(this.x/2)-1;
		this.centerB = Math.round(this.y/2)-1;
	}

	for (var x = 0; x < this.size; x++) {
		for (var y = 0; y < this.size; y++) {
			if(x == this.centerA && y == this.centerB){
				this.board[x][y].value = '☺';
				this.board[x][y].status = 1;
			}
			else{
				stringIndex = getRandom(this.pairedCards.length-1);
				this.board[x][y].value = this.pairedCards[stringIndex];
				this.pairedCards.splice(stringIndex,1);
			}
		}
	}
};

/**
* Returns a random value between two numbers
*/
function getRandom(top) {
	return Math.floor( Math.random() * ( 1 + top - 0 ) );
};

MemoryGame.prototype.initPairedCards = function (){
	var startcode = 65;
	var limit = -1;
	if(this.comodin){
		limit = this.x*this.y-1
	}
	else{
		limit = this.x*this.y;
	}
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
	this.displayHTMLBoard();
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

/**
* Returns if two cell values match
* @returns {match status}
*/
MemoryGame.prototype.isPair = function (cell1, cell2) {
	return (cell1.value == cell2.value)? true : false;
};

/**
* Evaluates the hit cell in the board
*/
MemoryGame.prototype.hitCell = function (posX, posY) {
	console.log('Hit(x:',posX,',y:',posY,')');
	if(this.comodin){
		if(posX == this.centerA && posY == this.centerB){
			console.log('Click center');
		}
		else{
			this.hitCellBasic(posX, posY);
		}
	}
	else{
		this.hitCellBasic(posX, posY);
	}
};

MemoryGame.prototype.hitCellBasic = function(posX, posY){
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
    		this.displayHTMLBoard();
    		setTimeout(function(){ alert("NOT A MATCH!!!"); }, 500);
    		this.board[this.prevPosX][this.prevPosY].status = 0;
    		this.board[posX][posY].status = 0;    		
    	}
    	else{
    		console.log('Match!');
    	}
        this.hits=0;
        break;
    default:
        console.log("Something unexpected happened");
        this.hits=0;
	}
	var me = this;
	setTimeout(function(){
		me.displayHTMLBoard()
	}, 1500);

	if (this.isBoardResolved()){
		console.log("Congrats!!! Solved!!!");
	}
}

/**
 * Displays the array in HTML view
 */
MemoryGame.prototype.displayHTMLBoard = function() {
	// Find a <table> element with id="myTable":
	var table = '<table border=1>';
	
	for (var i = 0; i < this.x; i++){
		table += '<tr>';
		for (var j = 0; j < this.y; j++) {
			
			table += '<td id="' + i + ',' + j + '" onclick="hitCell(this);" align="center">' + this.controlDisplayState(this.board[i][j]) + '</td>';
		}
		table += '</tr>';
	}
	table += '</table>';
	document.getElementById('inner').innerHTML = table;
};