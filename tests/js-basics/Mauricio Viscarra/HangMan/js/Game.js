/**
 * Created by jalatraining on 10/8/2016.
 */
/**
 * This is the Game class
 * @constructor
 */
var Game = function(){
    var words;
    this.wordToBeGuessed="";
    var userProgress = [];
    this.userPoints = 0;
    /**
     * This function stores the words of a given paragraph
     * @param paragraph: An string
     */
    this.storeWords = function(paragraph){
        var arrayOfWords = paragraph.split(" ");
        var arrayOfValidWords=[];
        for(var i=0; i<arrayOfWords.length;i++){
            if(arrayOfWords[i].length>=3){
                arrayOfValidWords.push(arrayOfWords[i]);
            }
        }
        words = arrayOfValidWords;
    }
    /**
     * This function starts the game getting a random string to be guessed
     */
    this.startGame = function(){
        var randomWordIndex = Math.floor((Math.random() * words.length));
        this.wordToBeGuessed = words[randomWordIndex];
        for(var i=0; i< this.wordToBeGuessed.length; i++){
            userProgress[i]="*";
        }
        showUserProgress();

    }
    /**
     * This function shows in console the progres of the user in the game
     */
    var showUserProgress = function(){
        var progress="";
        for(var i=0; i<userProgress.length; i++){
            progress = progress + userProgress[i];
        }
        console.log(progress);
    }
    /**
     * This function ask for a letter and allow to the user to play
     */
    this.play =  function(){
        letter = prompt("Please enter a letter", "");
        if(letter.length==1){
            for(var i=0; i<this.wordToBeGuessed.length; i++){
                if(this.wordToBeGuessed.charAt(i)==letter){
                    userProgress[i] = letter
                    this.userPoints ++;
                }
            }
        }
        else{
            if(letter.length == this.wordToBeGuessed.length){
                if(letter = this.wordToBeGuessed){
                    for(var j=0; j<this.wordToBeGuessed.length; j++){
                        userProgress[j] = this.wordToBeGuessed.charAt(j);
                        this.userPoints = this.wordToBeGuessed.length;
                    }
                }
            }
        }

        showUserProgress();
    }
}
