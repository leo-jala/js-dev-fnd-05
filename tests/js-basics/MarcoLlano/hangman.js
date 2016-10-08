var Hangman = function() {
}

//Global variables
var words = new Array();
var flag = 1;
var gameStatus = false;

/*Display main menu*/
Hangman.prototype.mainMenu = function() {
	var opt = "";
	while(opt != 3) {
		var opt = window.prompt("Welcome to Hangman game, please select an option: 1.- Feed collection. 2.- Play. 3.- Quit.");
		switch(opt) {
			case "1":
				var word = window.prompt("Insert a word.");
				this.feedWords(word);
				break;
			case "2":
				var size = this.getWord().length;
				//this.repla(this.getWord());
				for(var i = 0; i <= 10; i++) {
					if (gameStatus == false) {
						var word = window.prompt("Insert a letter or a word. Turn " + i);
						this.play(word);
					} else {
						console.log("Game is over, thank you for playing.");
						break;
					}
				}
				break;
			case '3':
				break;
		}
	}
}

/*Save words into game*/
Hangman.prototype.feedWords = function(word) {
	while (word.length < 3) {
		console.log("Word must have 3 letters at least, please try again.");
		var word = window.prompt("Insert a word.");
	}
	words[flag] = word;
	flag++;
}

/*Verify if word of letter match by calling verifyMatch() method*/
Hangman.prototype.play = function(word){
	var word = getWord();

	if (word == words[random]) {
		console.log("You win the game.");
		gameStatus = true;
	} 

	if (word.length == 1) {
		this.verifyMatch(word, words[random])
	}
}

/*Replace complete word with underscores, not working*/
Hangman.prototype.repla = function(word) {
	var res = word.split("");
	var repl = res.replace(/ /g,"_");
	return repl;
}

/*Gets the random selected word from array*/
Hangman.prototype.getWord = function() {
	var len = words.length - 1;
	var random = Math.floor((Math.random() * len) + 1);
	return words[random];
}

/*Verify if letter is in word*/
Hangman.prototype.verifyMatch = function(letter, word) {
		for (var i = 0; i <= word.length; i++) {
			var res = word.split("");
			if (res[i] == letter) {
				console.log(res[i]);
			} else {
				console.log("_");
			}
		}
		word.length--;
}