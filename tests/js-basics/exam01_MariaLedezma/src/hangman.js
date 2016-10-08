/**
* @author: Maria Ledezma
* 
*/

/**
* Menu class
* 
*/ 
var Menu = function (){
	this.hangman;
	this.words = [];
};

/**
* Displays the available options of the game
* 
*/
Menu.prototype.displayOptions = function(){
	var textMenu = "1. Feed Collection of Words <br> 2. Play <br> 3. Quit <br>";
    document.getElementById('menu').innerHTML = textMenu;
	document.getElementById("letter").innerHTML="";
	document.getElementById("content").innerHTML="";
};

/**
* Controls the option introduced by the player and executes the corrresponding behavior
* @param {int} option -  the valid option for the game 1,2,3
*                        1 - feeds the word with a fixed array
*						 2 - play the game with a random word
*                        3 - quits the game
*/
Menu.prototype.controlOption = function(option){
	var words = "hola,test,mundo,definicion,adivinanza";
    switch(option) {
        case 1:               
			   this.feedWords(words)
			   document.getElementById("msg").innerHTML="Your WORDS were feeded!!!";
			   document.getElementById("content").innerHTML="";
            break;
        case 2:
            if(this.words.length==0){
				this.feedWords(words)
			}
			word = this.getRandomWord();
			this.hangman = new Hangman(word);
			this.hangman.displayGame();	
            break;
        default:
            document.getElementById("msg").innerHTML="GAME OVER!!!";
			document.getElementById("letter").innerHTML="";
	}
};

Menu.prototype.hideMenu = function(){
	document.getElementById('menu').innerHTML= "";
};

Menu.prototype.feedWords = function(words){
	this.words = words.split(',');
};

Menu.prototype.getRandomWord = function(){
	var index = getRandom(this.words.length-1);
	return this.words[index];
};


function getRandom(limit) {
    return Math.floor( Math.random() * ( 1 + limit - 0 ) );
};


/**
* CellLetter class
* 
*/ 
var CellLetter = function (letter){
	this.value = letter;
	this.match = false;
   
};
/**
* Hangman class
* @params {string} word - the word to be used for the game
*/ 
var Hangman = function (word){
	this.arrLetters = new Array();
	this.setCellLetters(word.split(''));
   
};
Hangman.prototype.setCellLetters = function(letters){
	for(i = 0; i < letters.length; i++){
		this.arrLetters[i] = new CellLetter(letters[i]);
	}
}

Hangman.prototype.controlLetter = function(letter){
	var valid = false;
	for(i = 0; i < this.arrLetters.length; i++){
		console.log(letter + "  " + this.arrLetters[i].value)
		if(this.arrLetters[i].value==letter){
			this.arrLetters[i].match= true;
		}
	}
};

Hangman.prototype.displayGame = function(){
	var contentGame = "";
	for(i = 0; i < this.arrLetters.length; i++){
		if(this.arrLetters[i].match){
			contentGame += this.arrLetters[i].value + "  ";
		}
		else{
			 contentGame += "*  "
		}
	}
	document.getElementById("content").innerHTML=contentGame;
	this.displayHTMLControllers();
	this.controlSolution();
};

Hangman.prototype.displayHTMLControllers = function(){
	var contentController= "Enter your letter<input id='letter_input' type='text' value=''><button type='button' onClick='play()'>OK</button>";
	document.getElementById("letter").innerHTML=contentController;
};
Hangman.prototype.isSolved = function(){
	var valid = true;
	for(i = 0; i < this.arrLetters.length; i++){
		if(!this.arrLetters[i].match){
			valid = false;
			break;
		}
	}
	return valid;
};
Hangman.prototype.controlSolution = function(){
	if(this.isSolved()){
		document.getElementById("msg").innerHTML="YOU WON.......GAME OVER!!!";
		document.getElementById("letter").innerHTML="";
	}
	
};
