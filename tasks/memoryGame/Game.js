/**
 * Created by Mauricio on 25/09/2016.
 */
/**
 * Game class
 * @param boardSize: The size of the board
 * @constructor
 */
var Game = function(boardSize){
    var b;
    var p;
    var gameBoard =[];
    var played = [];
    this.boardSize = boardSize;
    /**
     * This function is to play, we have to select a piece of the board
     * @param e
     */
    this.play=function(e){

        if (e.target !== e.currentTarget) {

            // extract row and column # from the HTML element's id
            var row = e.target.id.substring(1,2);
            var col = e.target.id.substring(2,3);
            e.target.style.background = '#bbb';
            e.target.innerText=gameBoard[row][col];
            console.log('boaaard: '+ gameBoard[row][col]);
            played.push([e.target, gameBoard[row][col]]);
            var millisecondsToWait = 1000;
            setTimeout(function() {
                if(played.length==2){
                    p.numberAttemps++;
                    console.log("attemp   "+p.numberAttemps);
                    if(played[0][1]!=played[1][1]){
                        played[0][0].style.background = '#aaa';
                        played[0][0].innerText='';
                        played[1][0].style.background = '#aaa';
                        played[1][0].innerText='';
                    }else{
                        p.points++;
                        console.log("points   "+p.points);
                    }
                    played=[];
                }
                if(p.attemps==p.numberAttemps){
                    alert("You lose!");
                    location.reload();
                }
                if(p.points==(boardSize*boardSize)/2){
                    alert("You win!");
                    location.reload();
                }
            }, millisecondsToWait);

        }
        e.stopPropagation();
    }
    /**
     * This functions starts a game
     */
    this.startGame = function(){
        p = new Player(this.boardSize*this.boardSize);
        b = new Board(this.boardSize);
        b.gameBoardContainer.addEventListener("click", this.play, false);
        b.clear();
        b.draw();
        generateGameBoard();
        function generateGameBoard(){
            var value=1;
            var row=[];
            for(var i =0; i<(boardSize); i++){
                for(var j=0; j<boardSize;j++){
                    if(value==((boardSize*boardSize)/2)+1){
                        value=1;
                    }
                    row.push(value);
                    value++;

                }
                row = shuffleArray(row);
                gameBoard.push(row);
                row=[];
            }
            gameBoard = shuffleArray(gameBoard);
        }

        /**
         * This fuction shuffles a given array
         * @param arrayValues
         * @returns {*}
         */
        function shuffleArray(arrayValues){
            var i= arrayValues.length, j, temp;
            while(--i >0){
                j = Math.floor(Math.random() * (i+1));
                temp = arrayValues[j];
                arrayValues[j] = arrayValues[i];
                arrayValues[i] = temp;
            }
            return arrayValues;
        }

    }
}
