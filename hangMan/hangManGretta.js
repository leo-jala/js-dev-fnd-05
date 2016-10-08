
/**
 * Created by jalatraining on 10/8/2016.
 */

//class to define the game
var Game = function () {
    // properties
    this.availableWords = [];
    this.guessWord = "";
    this.currentWord = "";
    this.attempts = 10;

    // method feed the collection of available words
    this.feedCollection = function() {
        this.availableWords = cad.split(' ');
    }

    // method to start the game
    this.startPlay = function(){
        this.selectWordAleatory();
        this.initGuessWord(this.guessWord.length());
        while (this.attempts > 0){
            var cad = "";
            cad = window.prompt("Enter a letter or the guessed word");
            this.attempts = this.attempts - 1;
            if (cad.length() == 1) {
                // the user entered only a letter
                if(this.guessWord.indexOf(cad) != -1){
                    // the entered letter is in the guessed word
                    this.replaceLetter(cad);
                    console.log(this.guessWord);
                }
            }
            else {
                // the user entered the guessed word
                if (cad == this.guessWord){
                    console.log("Congratulations!!! you guessed the word");
                }
                else{
                    console.log("Sorry!!! you failed");
                }

            }
        }
        if (this.attempts < 0){
            console.log("Game Over");
        }

    }

    // method to init the guess word with '-' character
    this.initGuessWord = function(len){
        var i;
        var cad = "";
        for( i=0; i<len; i++)
            cad = cad[i] +"-";
        this.guessWord = cad;
    }

    // method to replace the word in the guessed word
    this.replaceLetter = function (cad){
        var n = this.currentWord.length();
        var i;
        for( i=0; i<n; i++)
            if (this.currentWord[i] == cad){
                this.guessWord[i] = cad;
            }
    }

    // method to select a word which will be guessed, this will be selected aleatory
    this.selectWordAleatory   = function(){
        var i, j;
        i = this.availableWords.length();
        j = Math.floor( Math.random() * (i - 1) );
        this.currentWord = this.availableWords[j];
    }

    // method to display the menu and get the selected option by user
    this.displayMenu = function(){
        console.log("HANGMAN GAME");
        console.log("select option:");
        console.log("1.- Feed Collection");
        console.log("2.- Play");
        console.log("3.- Quit");

    }
}

var game = new Game();
game.displayMenu();
option = window.prompt("Enter option:");
while (option != 3) {
    switch (option) {
        case 1:
            var cad = window.prompt("Enter the words to feed the game");
            game.feedCollection(cad);
        case 2:
            game.startPlay();
            game.displayMenu();
            option = window.prompt("Enter option:");
    }
}
