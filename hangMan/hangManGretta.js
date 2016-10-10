
/**
 * Created by jalatraining on 10/8/2016.
 */

//class to define the game
var Game = function () {
    // properties
    this.availableWords = [];
    this.guessWord = "";
    this.currentWord = "";
    this.attempts = 0;
    // method feed the collection of available words
    this.feedCollection = function(cad) {
        this.availableWords = cad.split(' ');
    }

    // method to start the game
    this.startPlay = function(){
        this.attempts = 10;
        this.selectWordAleatory();
        window.alert(this.currentWord);
        this.initGuessWord(this.currentWord.length);
        window.alert(this.guessWord);
        while ((this.attempts > 0) && (this.currentWord != this.guessWord)){
            var cadRead = "";
            cadRead = window.prompt("Enter a letter or the guessed word :  " + this.guessWord + "\n available attempts: " + this.attempts).trim().toUpperCase();
            if (cadRead.length == 1) {
                // the user entered only a letter
                if(this.currentWord.indexOf(cadRead) != -1){
                    // the entered letter is in the current word
                    this.replaceLetter(cadRead);
                }
            }
            else {
                // the user entered a word
                if (cadRead == this.currentWord){
                    this.guessWord = this.currentWord;
                }
            }
            this.attempts = this.attempts - 1;
        }
        if (this.currentWord != this.guessWord){
            window.alert("Game Over");
        }
        if (this.currentWord == this.guessWord) {
            window.alert("Congratulations!!! You guessed the word");
        }
    }

    // method to init the guess word with '-' character
    this.initGuessWord = function(len){
        var i;
        var mask = "";
        for( i=0; i<len; i++){
            mask = mask + "_";
        }
        this.guessWord = mask;
    }

    // method to replace the word in the guessed word
    this.replaceLetter = function (cad){
        var n = this.currentWord.length;
        window.alert("replacing  " + cad );
        var i;
        for( i=0; i<n; i++)
            if (this.currentWord[i] == cad){
                this.guessWord = this.guessWord.substr(0,i) + cad + this.guessWord.substr(i+1);
            }
    }

    // method to select a word which will be guessed, this will be selected aleatory
    this.selectWordAleatory   = function(){
        var i, j;
        i = this.availableWords.length;
        j = Math.floor( Math.random() * (i - 1) );
        this.currentWord = this.availableWords[j].toUpperCase();
    }
}

var menuMessage;
var game = new Game();
menuMessage = "\nHANGMAN GAME \n\n select option:\n\n 1.- Feed Collection\n 2.- Play\n 3.- Quit \n";
option = parseInt(prompt(menuMessage));
while (option != 3)
{
    switch (option) {
        case 1:
            var cad;
            cad = window.prompt("Enter the words separated by spaces to feed the game").trim();
            if (cad != null){
                game.feedCollection(cad);
            }
            window.alert("Total words saved: " + game.availableWords.length);
            break;
        case 2:
            game.startPlay();
            break;
    }
    option = parseInt(prompt(menuMessage));
}
