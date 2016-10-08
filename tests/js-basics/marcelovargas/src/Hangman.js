var Hangman = function(){
	console.log('Starting Hangman');
	this.paragraph = new Array();
	this.attempt = 0;
	this.attemptLimit = 3;
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

Hangman.prototype.play = function() {
	var selectedWord = this.paragraph[getRandomFromArray(this.paragraph)];
	this.initWordArray(selectedWord);

	console.info('Selected random word from array:',selectedWord);

	while (this.attempt < this.attemptLimit)
	{
		var guess = prompt('PLEASE ENTER A LETTER OR WORD:, "A"');

		this.replaceWord(guess);
		this.showWordArray();
		this.displayHTMLBoard();

		this.attempt++;
	}
};

Hangman.prototype.initWordArray = function(selectedWord) {
	for (var i = 0; i < selectedWord.length; i++) {
		this.wordArray[i] = new Cell(selectedWord[i]);
	};
	return this.wordArray;
};

Hangman.prototype.replaceWord = function(attempt) {
	for (var i = 0; i < this.wordArray.length; i++) {
		if (attempt.toUpperCase() == this.wordArray[i]){
			this.wordArray[i].status = true;
		}
	};
	this.wordArray;
};

Hangman.prototype.showWordArray = function() {
	for (var i = 0; i < this.wordArray.length; i++) {
		document.getElementById("demo").innerHTML = this.wordArray[i];
	};
	return this.wordArray;
};


Hangman.prototype.displayHTMLBoard = function() {
    // Find a <table> element with id="myTable":
    var table = '<table border=1>';
   
    for (var i = 0; i < this.x; i++){
        table += '<tr>';
        
            table += '<td id="' + i + '" align="center">' + this.controlDisplayState(this.wordArray[i]) + '</td>';
        
        table += '</tr>';
    }
    table += '</table>';
    document.getElementById('inner').innerHTML = table;
};

/**
* Returns cell value based on the status
* @param {object} cell
* @returns {object} cell value
*/
Hangman.prototype.controlDisplayState = function(cell){

    return  (cell.status)? " - " : cell.value;
};