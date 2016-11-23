/**
 * Created by Mauricio on 25/09/2016.
 */
var startButton=document.getElementById("start");
startButton.addEventListener("click", startGame, false);
/**
 * Starts a game
 */
function startGame(){
    var boardSize = document.getElementById("bsize").value;
    var g= new Game(boardSize);
    g.startGame();
}
