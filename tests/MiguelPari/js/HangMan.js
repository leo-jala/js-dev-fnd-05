/**
 * Created by Miguel Pari on 10/8/2016.
 */


var HangMan = function() {
    this.Words = [];
    this.Result;

}

HangMan.prototype.main = function() {

    var option = this.displayMenu();
    if (option === '3') {
        return;
    } else if (option === '1') {
        var text = this.askWords();
        this.setWords(text);
    } else if (option === '2') {
        this.start();
    }
    this.main();
}

HangMan.prototype.displayMenu = function() {
    var options = "Enter an option:" +
        "\n 1. Feed Collection." +
        "\n 2. Play." +
        "\n 3. Exit.";

    return prompt(options);
}

HangMan.prototype.setWords = function(words) {
    this.Words = words.split(" ");
    return;
}

HangMan.prototype.start = function() {
    var randomOption = this.getRandomOption();
    var counter = 1;

    while(counter <= 10) {
        var letter = this.askLetter(counter);
        if (letter == randomOption) {
            this.Result = letter;
            confirm("You Win");
            break;
        }

        if (randomOption.includes(letter)) {
            var position = randomOption.indexOf(letter);

            var tempResult = "";
            for (var i = 0; i < randomOption.length; i++)
            {
                if (i == position)
                {
                    tempResult += letter;
                }
                else {
                    if (this.Result[i] == "_") {
                        tempResult += "_";
                    } else {
                        tempResult += randomOption[i];
                    }
                }
            }
            this.Result = tempResult;
        }
        if (randomOption == this.Result) {
            confirm("You Win");
            break;
        }
        counter++;
    }
    if (randomOption != this.Result) {
        confirm("You Lose");
    }
}


HangMan.prototype.askWords = function(){
    return prompt("Enter Words");
}

HangMan.prototype.askLetter = function(chanceNumber){
    var textToDisplay = "Word: " + this.Result +
                        "\nEnter a letter: (Chance: " + chanceNumber + ")";
    return prompt(textToDisplay);
}

HangMan.prototype.getRandomOption = function() {
    var randomNumber = parseInt(Math.random() * this.Words.length);
    var randomOption = this.Words[randomNumber];
    this.Result = "";
    for (i = 0; i < randomOption.length; i++) {
        this.Result += "_";
    }

    return randomOption;
}

var game = new HangMan();
game.main();

