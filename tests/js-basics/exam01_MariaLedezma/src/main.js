/**
* @author: Maria Ledezma
* 
*/

var menu;
var hangman;

/**
* Creates the menu of Options
*/
var displayMenu = function(){
	menu = new Menu();
	menu.displayOptions();
	document.getElementById("msg").innerHTML="";
};

/**
* Controls the option selected in the Menu
*/
var optionMenu = function(){
	var option = document.getElementById('opt_input').value;
	if(!isNaN(option) && parseInt(option)> 0 &&  parseInt(option)< 4){
		document.getElementById("msg").innerHTML="";
		menu.controlOption(parseInt(option));
		
	}
	else{
		document.getElementById("msg").innerHTML="INVALID OPTION!!!";
	}
}

/**
* Starts the game
*/

var play = function(){
	
	var letter = document.getElementById('letter_input').value;
	hangman = menu.hangman;
	hangman.controlLetter(letter.toLowerCase());
	hangman.displayGame();
}