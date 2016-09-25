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
	startGame();
};

function controlDisplayState(cell){

	if (cell.status == 0 ) {
		return " X ";
	}
	else{
		return cell.value;
	}

};

/**
 * Returns array values
 * @return {Array} array
 */
function displayBoard() {

	for (var i = 0; i < x; i++){
		for (var j = 0; j < y; j++) {
			controlDisplayState(board[i][j]);
		}
	}
	return board;
};


/**
 * Set array with 'x' values
 * @return {Array} array
 */
function initBoard() {
	for (var i = 0; i < x; i++){
		board[i] = new Array();
		for (var j = 0; j < y; j++) {
			board[i][j] = new Cell('X');
		}
	}
};

/**
 * Set array with suffle values
 * @return {Array} array
 */
function shuffleArray() {
	var stringIndex = 0;

	for (var x = 0; x < this.size; x++) {
		for (var y = 0; y < this.size; y++) {

			stringIndex = getRandom(0, pairedCards.length-1);
			board[x][y].value = pairedCards[stringIndex];
			pairedCards.splice(stringIndex,1);
		}
	}
};

function getRandom(bottom, top) {
	return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
};

/**
 * Set an array with paired values from A until 'N' values
 */
function initPairedCards(){
	var startcode = 65;
	var limit = x*y;
	for (var i = 0; i < limit; i+=2) {
		pairedCards[i] = String.fromCharCode(startcode);
		pairedCards[i+1] = String.fromCharCode(startcode);
		startcode++;
	}
};

function startGame() {
	initBoard();
	initPairedCards();
	shuffleArray();
	displayHTMLBoard();
};

function isBoardResolved() {
	var solved = true;
	for (var i = 0; i < x; i++){
		for (var j = 0; j < y; j++) {
			if(board[i][j].status == 0){
				solved = false;
				break;
			}
		}
	}
	return solved;
};

function isPair(cell1, cell2) {

	return (cell1.value == cell2.value)? true : false;
};

function hitCell(posX, posY) {

	switch(hits) {
    case 0:
        board[posX][posY].status = 1
        prevPosX = posX;
        prevPosY = posY;
        hits++;
        break;
    case 1:
    	board[posX][posY].status = 1
    	if(!isPair(board[prevPosX][prevPosY], board[posX][posY])){
    		displayHTMLBoard();
			sleep();
    		setTimeout(function(){ console.log("NOT A MATCH!!!"); }, 100);
    		board[prevPosX][prevPosY].status = 0;
    		board[posX][posY].status = 0;
    		
    	}
        hits=0;
        break;
    default:
        console.log("Something unexpected happened");
        hits=0;
	}
	var me = this;
	setTimeout(function(){
		me.displayHTMLBoard()
	}, 2500);

	if (isBoardResolved()){
		console.log("Congrats!!! Solved!!!"); // TODO: set an alert and wait until the card is discovered
	}

};
var sleep = function (){
	for (var i = 0; i < 300000; i++){
	}
};

/**
 * Updates the table according the position hit
 */
function getId(obj) {
	var hit = obj.id;
	var res = hit.split(",");

	console.log('Hit(x:',res[0],',y:',res[1],')');

	hitCell(parseInt(res[0]), parseInt(res[1]));
	// return hit.split(",");
}

/**
 * Displays the array in HTML view
 */
function displayHTMLBoard() {
	// Find a <table> element with id="myTable":
	var table = '<table border=1>';
	
	for (var i = 0; i < x; i++){
		table += '<tr>';
		for (var j = 0; j < y; j++) {
			
			table += '<td id="' + i + ',' + j + '" onclick="getId(this);">' + controlDisplayState(board[i][j]) + '</td>';
		}
		table += '</tr>';
	}
	table += '</table>';
	document.getElementById('inner').innerHTML = table;
};

/**
 * Initialize the game by clicking start button
 */
function Game(){
	var size = document.getElementById('size').value;
	var a = MemoryGame(size);
}