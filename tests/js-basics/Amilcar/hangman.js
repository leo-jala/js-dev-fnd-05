/**
 * Created by AmilcarMaida on 10/8/2016.
 */

console.log("Welcome to the Hangman game");

/**
 * @param word global
 * @param global keyWord
*/
var word = '';
var keyWord = 'friday';
/**
 * @param charX
 * @param CharValidation
 * @param numbers
 * @returns {*}
 */
var enterChar = function() {
    var charX = prompt("Hangman Game: Enter a char: ");
    var charValidation = new RegExp(charX);
    var numbers = '123456789';
    if (charValidation.test(numbers)) {
        return false;
    }
    else{
        //console.log(addToWord(charX));
        word = word + charX;
        return word;
        //console.log(word);
    }
}
/**
 * @param newWord
 * @returns {newWord}
 */
var validateChar = function(){
    var newWord = enterChar();
    if(newWord!=false){
        var charValidation = new RegExp(newWord);
        if(charValidation.test(keyWord)){
            console.log(newWord);
        }
        else{
            console.log('Incorrect word');
            return false
        }
    }
    else{
        console.log("It is not a char");
    }
}
/**
 * @param tries
 */
var mainGame = function(){
    var tries = 3;
    while(tries>0){
        if(validateChar()==false){
            tries = tries -1;
            if(tries == 0){
                console.log("You lost the game");
            }
        }
        else if(word==keyWord){
            console.log("You find the word!"+keyWord);
            tries = 0;
        }

    }
}

mainGame();

