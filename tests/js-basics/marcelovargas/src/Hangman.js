/**
* Hangman class
*/ 
var Hangman = function(){
	console.log('Starting Hangman');
	this.initValues();
	this.doActions(this.getOptionFromMenu());
}

Hangman.prototype.initValues = function() {
	this.paragraph = new Array();
	this.attempt = 1;
	this.attemptLimit = 10;
	this.selectedWord = "";
	this.wordArray = new Array();
	document.getElementById('turn').innerHTML = '';	
	document.getElementById('status').innerHTML = '';
};

/**
* Cell class
* @param {string} value
*/ 
var Cell = function (value){
    this.value = value;
    this.status = false;
};

/**
* Shows the prompt menu once the page is loaded 
*/
Hangman.prototype.getOptionFromMenu = function() {
	var option = prompt('PLEASE CHOOSE AN OPTION:\n1. Feed collection of WORDs\n2. Play\n3. Quit', "1");
	return option;
};

/**
* From the choosed option do the actions
*/
Hangman.prototype.doActions = function(option) {
	if (option != null) {
		switch(parseInt(option)) {
	        case 1:
	            var paragraphText = prompt('PLEASE ENTER A PARAGRAPH', "Adult education is essential for Democracy of India The number of grown up illiterates is great All college and senior School students should come forward to visit villages in the summer vacation. Each one will teach one there. This will remove illiteracy and strengthen our democracy").toUpperCase();
	            this.paragraph = getArrayFromParagraph(paragraphText);
	            this.doActions(this.getOptionFromMenu());
	            break;
	        case 2:
	        	this.play();
	        	break;
            case 3:
	            window.close();
	            break;
        }	    
	}
};

/**
* Returns an array of only words which have more than 3 letters from 
* a given paragraph
*/
function getArrayFromParagraph(paragraph){
	var arrayResult = new Array();
	var result = paragraph.split(' ');
	for (var i = 0; i < result.length; i++) {
		if (result[i].length > 3) {
			// console.log(result[i] + ' ' + result[i].length);
			arrayResult.push(result[i]);
		}
	}
	return arrayResult;
}

/**
* Returns a random value between two numbers
*/
function getRandomFromArray(arrayParagraph) {
	var random = Math.floor( Math.random() * ( 0 + arrayParagraph.length - 0 ));
    return random;
};

/**
* Playing the game
*/
Hangman.prototype.play = function() {
	this.selectedWord = this.paragraph[getRandomFromArray(this.paragraph)];
	this.initWordArray(this.selectedWord);
	this.buildKeyboard();
	console.info('Selected random word from array:',this.selectedWord);
	this.displayHTMLBoard();
};

/**
* Method to click in a char, view if that matches with the word and display
* @param {char}
*/
Hangman.prototype.hitWord = function(wordPressed) {
	this.replaceWord(wordPressed);
	this.displayHTMLBoard();
	document.getElementById('turn').innerHTML = "Try #" + this.attempt;	
	if(this.attempt < this.attemptLimit){
		if(this.IsWordDiscovered()){
		this.disableKeyboard();
		document.getElementById('status').innerHTML = "Congratulations! you won the game.";	
		}
		else{
			this.attempt++;		
		}
	}
	else{
		this.disableKeyboard();
		document.getElementById('status').innerHTML = "Sorry you lost the game :( <br> The word was '" + this.selectedWord + "'";
	}
};

Hangman.prototype.IsWordDiscovered = function(first_argument) {
	var flag = true;
	for (var i = 0; i < this.wordArray.length; i++) {
		if(this.wordArray[i].status == false){
			flag = false;
			break;
		}
	};
	return flag;	
};

/**
* Init a array containing the selected word as values
*/
Hangman.prototype.initWordArray = function(selectedWord) {
	for (var i = 0; i < selectedWord.length; i++) {
		this.wordArray[i] = new Cell(selectedWord[i].toUpperCase());
	};
	return this.wordArray;
};

/**
* Replacing the cell status if the given word matched with any value inside the array
* @param {attempt} - word pressed
*/
Hangman.prototype.replaceWord = function(attempt) {
	for (var i = 0; i < this.wordArray.length; i++) {
		if (attempt.toUpperCase() == this.wordArray[i].value){
			this.wordArray[i].status = true;
		}
	};
	this.wordArray;
};

/**
* Displays the word array in HTML view
*/
Hangman.prototype.displayHTMLBoard = function() {
    document.getElementById('inner').innerHTML = '';
    var table = '<table border=1><tr>';
   
    for (var i = 0; i < this.wordArray.length; i++){
        
            table += '<td class="myTd" id="' + i + '" align="center">' + this.controlDisplayState(this.wordArray[i]) + '</td>';
        
    }
    table += '</tr></table>';
    document.getElementById('inner').innerHTML = table;
};

/**
* Returns cell value based on the status
* @param {object} cell
* @returns {object} cell value
*/
Hangman.prototype.controlDisplayState = function(cell){

    return  (!cell.status)? " _ " : cell.value;
};

/**
* Method to build a keyboard buttons and display them inside a table
*/
Hangman.prototype.buildKeyboard = function() {
	var startcode = 65;
	var limit = startcode + 26;
	var table = '<table border=0><tr>';

	for (var i = startcode; i < limit; i++){
		if(i == (limit-13)){
			table += '</tr><tr>';
		}
        table += '<td align="center" width=50 id="' + i + '">' + '<input type="button" value=" '+ String.fromCharCode(i) +' " id="' + String.fromCharCode(i) + '" onClick="HitKey(\''+ String.fromCharCode(i) + '\')">' + '</td>';
    }
    table += '</tr></table>';
    document.getElementById('keyboard').innerHTML = table;
};

/**
* Method disable all buttons from the keyboard
*/
Hangman.prototype.disableKeyboard = function() {
	var startcode = 65;
	var limit = startcode + 26;

	for (var i = startcode; i < limit; i++){
    document.getElementById(String.fromCharCode(i)).disabled = true;
    }
};