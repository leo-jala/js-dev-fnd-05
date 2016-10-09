var hangman;

/**
* Initialize the Hangman game
*/
function loadGame(){
	hangman = new Hangman();
}

function loadMenu(){
	hangman.getOptionFromMenu();
}

function HitKey(word){
	hangman.hitWord(word);
	disableButton(word);
}

/**
* Method do disable a button
*/
function disableButton(id){
	document.getElementById(id).disabled = true;
}
