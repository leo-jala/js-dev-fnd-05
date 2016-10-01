/**
* Created by chelo on 9/17/2016.
* Modified by mary on 9/24/2016.
*/

/**
* Player class
* @param {string} name - name of the player
*/ 
var Player =  function(name){

    this.matches = 0;
    this.turn = false;
    this.name = name;
};

/**
* Cell class
* @param {string} value
*/ 
var Cell = function (value){
    this.value = value;
    this.status = 0;
};
 
 
/**
* Memory Game class
* @params {number} width - Set the width
* @params {number} height - Set the height
* @params {string} player one name- Set the player one
* @params {string} player two name - Set the player2
*/ 
var MemoryGame = function (width, height, namePlayer1, namePlayer2){

    this.wildcard = (width*height % 2 != 0)? true : false;
    this.centerA = -1;namePlayer2
    this.centerB = -1;
    this.x = width;
    this.y = height;
    this.hits = 0;
    this.prevPosX = 0;
    this.prevPosY = 0;
    this.pairedCards = new Array();
    this.board = new Array();
    this.player1 = new Player(namePlayer1);
    this.player2 = new Player(namePlayer2);
    this.startGame();
};
 
 
/**
* Returns cell value based on the status
* @param {object} cell
* @returns {object} cell value
*/
MemoryGame.prototype.controlDisplayState = function(cell){

    return  (cell.status == 0 )? " X " : cell.value;
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

    if(this.wildcard){
        this.centerA = Math.round(this.x/2)-1;
        this.centerB = Math.round(this.y/2)-1;
    }
    for (var x = 0; x < this.x; x++) {
        for (var y = 0; y < this.y; y++) {
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

/**
* Initialize an array with paired values
*/
MemoryGame.prototype.initPairedCards = function (){
    var startcode = 65;
    var limit = -1;
    if(this.wildcard){
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
 
/**
* Starts the game by initializing primary functions
*/
MemoryGame.prototype.startGame = function () {
    this.initBoard();
    this.initPairedCards();
    this.shuffleArray();
    this.displayHTMLBoard();
    this.player1.turn = true;
    this.displayPlayerTurn();
};
 
/**
* @return {boolean}  true if the board is solved, otherwise false
*/
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
* Verifies if two cell values are the same
* @param {object} cell one
* @param {object} cell two
* @returns {boolean} true if two cell values match, otherwise false
*/
MemoryGame.prototype.isPair = function (cell1, cell2) {

    return (cell1.value == cell2.value)? true : false;
};

/**
* Validates if given coordenates are valid
* @param {number} posX
* @param {number} posY
*  @returns {boolean} true if the cell was not opened before or if it is not the wildcard
*/
MemoryGame.prototype.isValidHitInPosition = function(posX, posY){

    var valid = true;

    if((this.board[posX][posY].status == 1)|| (this.wildcard && posX == this.centerA && posY == this.centerB))
        valid = false;

    return valid;
};

/**
* Evaluates first and second hits
* @param {number} posX
* @param {number} posY
*/
MemoryGame.prototype.hitCell = function(posX, posY){
    if(!this.isValidHitInPosition(posX, posY)){
        return;
    }
    console.log('Hit(x:',posX,',y:',posY,')');
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
                    this.controlPlayerHits(0);
                }
                else{
                    this.controlPlayerHits(1);
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

    this.displayPlayerMsg();
};

/**
* Controls hit per player
* @param {object} match
*/
MemoryGame.prototype.controlPlayerHits = function(match) {

    switch(match) {
    case 0:
        if(this.player1.turn){
        this.player1.turn = false;
        this.player2.turn = true;
        }
        else{
        this.player2.turn = false;
        this.player1.turn = true;
        }
        break;
    case 1:
        if(this.player1.turn){
        this.player1.matches += match
        }
        else{
        this.player2.matches += match
        }
        break;
    default:
        console.log("Something unexpected happened");
    }
    
};

/**
* Displays player turn
*/
MemoryGame.prototype.displayPlayerTurn = function() {
    var name = (this.player1.turn)? this.player1.name : this.player2.name;
    document.getElementById("playerName").innerHTML = "It's your turn " + name;
};

/**
* Displays player message
*/
MemoryGame.prototype.displayPlayerMsg = function() {
    if (this.isBoardResolved()){
        if(this.player1.matches == this.player2.matches){
            document.getElementById("msg").innerHTML = "DRAW!  Congratulations!";
        }
        else{
            if(this.player1.matches > this.player2.matches){
                document.getElementById("msg").innerHTML = this.player1.name + " WON!  Congratulations!";
            }
            else{
                document.getElementById("msg").innerHTML = this.player2.name + " WON!  Congratulations!";
            }
        }
        document.getElementById("playerName").innerHTML = "";
        
    }
    else{

        var me = this;
        setTimeout(function(){
        me.displayPlayerTurn()
        }, 500);
    }
};
 
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