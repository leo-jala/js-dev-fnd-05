var Hangman = function(){
	console.log('Starting Hangman');
	this.paragraph = new Array();
	this.attempt = 0;
	this.attemptLimit = 10;
	this.wordArray = new Array();
	this.doActions(this.getOptionFromMenu());
}

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
	            var paragraphText = prompt('PLEASE ENTER A PARAGRAPH', "1 t2 tr3 four fivee ssiiXx sseeven eeiiggth paragraph ...").toUpperCase();
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
			console.log(result[i] + ' ' + result[i].length);
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
	console.log('random:', random);
    return random;
};

/**
* Playing the game
*/
Hangman.prototype.play = function() {
	var selectedWord = this.paragraph[getRandomFromArray(this.paragraph)];
	this.initWordArray(selectedWord);

	console.info('Selected random word from array:',selectedWord);

	while (this.attempt < this.attemptLimit)
	{
		var guess = prompt('PLEASE ENTER A LETTER OR WORD:');

		this.replaceWord(guess);
		this.displayHTMLBoard();

		this.attempt++;


	}
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
        
            table += '<td id="' + i + '" align="center">' + this.controlDisplayState(this.wordArray[i]) + '</td>';
        
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

    return  (!cell.status)? " - " : cell.value;
};