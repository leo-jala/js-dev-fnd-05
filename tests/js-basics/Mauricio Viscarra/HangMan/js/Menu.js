/**
 * Created by jalatraining on 10/8/2016.
 */

var userInput;
var userParagraph="";
/**
 * This function starts the menu of the game
 */
(function selectOptionFromMenu() {
    userInput = prompt("Please enter your option, 1 to enter a paragraph, 2 to start the game, 3 to quit", "1");

    switch(userInput) {
        case "1":
            userInput = prompt("Please enter a paragraph", "");
            userParagraph = userInput;
            selectOptionFromMenu();
            break;
        case "2":
            if(userParagraph.length!=0){
                var g =  new Game();
                g.storeWords(userParagraph);
                g.startGame();
                for(var i=0; i<10;i++){
                    if(g.userPoints == g.wordToBeGuessed.length){
                        alert("You win!!!!");
                        break;
                    }
                    g.play();
                }
                if(g.userPoints < g.wordToBeGuessed.length){
                    alert("You lose!!!!");
                }
            }
            else{
                alert("Please enter a paragraph before starting the game;");
                selectOptionFromMenu();
            }
            break;

        case "3":
            window.close();
            break;
    }
})();