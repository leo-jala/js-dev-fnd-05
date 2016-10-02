/**
 * Created by Mauricio on 25/09/2016.
 */
/**
 * Class board
 * @param size: the size to draw the board
 * @constructor
 */
var Board = function(size){
    this.gameBoardContainer = document.getElementById("gameboard");
    var squareSize = 50;
    this.size = size;
    this.draw = function(){
        console.log(this.size);
        for (i = 0; i < size; i++) {
            for (j = 0; j < size; j++) {
                // create a new div HTML element for each grid square and make it the right size
                var square = document.createElement("div");
                this.gameBoardContainer.appendChild(square);
                // give each div element a unique id based on its row and column, like "s00"
                square.id = 's' + j + i;
                // set each grid square's coordinates: multiples of the current row or column number
                var topPosition = j * squareSize;
                var leftPosition = i * squareSize;
                // use CSS absolute positioning to place each grid square on the page
                square.style.top = topPosition + 'px';
                square.style.left = leftPosition + 'px';
                square.style.background = '#aaa';
            }
        }
    }
    /**
     * Clears the board to start a new game
     */
    this.clear = function(){
        while (this.gameBoardContainer.firstChild) {
            this.gameBoardContainer.removeChild(this.gameBoardContainer.firstChild);
        }
    }
}
