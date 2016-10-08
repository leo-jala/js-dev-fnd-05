var menu;
var hangman;

/**
* Create the instance of Hangman Game based on the values given in the HTML page
*/


var displayMenu = function(){
	menu = new Menu();
	menu.displayOptions();
	document.getElementById("msg").innerHTML="";
};
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

var play = function(){
	
	var letter = document.getElementById('letter_input').value;
	hangman = menu.hangman;
	hangman.controlLetter(letter.toLowerCase());
	hangman.displayGame();
}