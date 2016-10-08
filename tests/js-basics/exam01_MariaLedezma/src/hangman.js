var Menu = function (){
	this.hangman;
	this.words = [];
};

Menu.prototype.displayOptions = function(){
	var textMenu = "1. Feed Collection of Words <br> 2. Play <br> 3. Quit <br>";
    document.getElementById('menu').innerHTML = textMenu;
};

Menu.prototype.controlOption = function(option){
	var words = "hola,test,mundo,definicion,adivinanza";
    switch(option) {
        case 1:               
			   this.feedWords(words)
			   document.getElementById("msg").innerHTML="Your WORDS were feeded!!!";
            break;
        case 2:
			this.hideMenu();
            if(this.words.length==0){
				this.feedWords(words)
			}
			word = this.getRandomWord();
			this.hangman = new Hangman(word);
			this.hangman.displayGame();			
            break;
        default:
            document.getElementById("msg").innerHTML="GAME OVER!!!";
			//window.close();
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



var CellLetter = function (letter){
	this.value = letter;
	this.match = false;
   
};
/**
* Hangman class
* @params {string} word - the word to be used for guessing
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
	this.controlSolution();
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
	}
	
};
