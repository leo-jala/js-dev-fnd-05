/*
* @Author Marco Llano, Ariel Mattos
*/
var Play = function() {
}
    
Play.prototype.start = function() {
    
    //Initializing variables
    var limit = window.prompt("Insert turns limit.");
    memory = new Memory();
    board = new Board(5);
    var gamePlayer = memory.savePlayers();    
    board = new Board(5);
    board.initialize();
    board.printControlBoard();
    board.printGameBoard();
    var flag = 36;

    while(limit > 0) {
        var firstItemCoordinates = promptCell('Select an item specifying a row and column.\nExample: 1,2');
        var firstItemValue = board.getItemAt(firstItemCoordinates[0], firstItemCoordinates[1]);
        board.revealItemAt(firstItemCoordinates[0], firstItemCoordinates[1]);
        board.printGameBoard();

        var secondItemCoordinates = promptCell('Now select the matching item.');
        var secondItemValue = board.getItemAt(secondItemCoordinates[0], secondItemCoordinates[1]);
        board.revealItemAt(secondItemCoordinates[0], secondItemCoordinates[1]);
        board.printGameBoard();

        //Verify if match
        if (firstItemValue != secondItemValue) {
            board.hideItemAt(firstItemCoordinates[0], firstItemCoordinates[1]);
            board.hideItemAt(secondItemCoordinates[0], secondItemCoordinates[1]);
            limit--;
        } else {
            flag = flag -2
            board.printGameBoard();
            memory.gameStatus(gamePlayer, limit);
        }
        
        if (flag == 0) {
            console.log('Your win the game,  thank you for playing!')
            break;
        }
    }    
}

