/**
 * Created by Gretta on 25/09/2016.
 */

/* Class to manipulate the cells of the table */
 var Cell = function(symbol, status){
    // properties
    this.symbol = symbol;
    this.status = status;
}

/* Class to manipulate the board of game*/
var Board = function (n){
    // properties
    this.dim = n;
    this.size = n*n;
    this.table = [];
    this.lastCell = -1;

    // method to print the content of board ? for yet undiscovered elements
    this.printTable = function(){
        var cad = "", col = 1;
        for (i = 0; i < this.size; i++) {
            if (this.table[i].status == "false"){
                cad = cad + "?   "
            }
            else
            {
                cad = cad + this.table[i].symbol + "  "
            }
            col++;
            if (col > this.dim){
                cad = cad + " \n";
                col = 1;
            }
        }
        return cad;
    }

    // Method to fill the board  with dupliacted elements to be discovered
    this.fillTable = function(){
        //fill the array with initial data
        var j = 0;
        for (i = 0; i < this.size; i = i + 2) {
            this.table[i] = new Cell(String.fromCharCode(65 + j) ,"false");
            this.table[i+1] = new Cell(String.fromCharCode(65 + j) ,"false");
            j++;
           }
        //shuffle the data in the table
        var i = this.size, j, temp;
        while ( --i ){
             j = Math.floor( Math.random() * (i - 1) );
             temp = this.table[i];
             this.table[i] = this.table[j];
             this.table[j] = temp;
            }
    }
    // Method to know if all elements were discovered
    this.isSuccess = function(){
        for (i = 0; i < this.size; i++) {
            if (this.table[i].status == "false")
                return false;
        }
        return true;
    }
    // Method to know that the last two discovered elements are equal
    this.compareCells = function(i){
        var last = this.lastCell;
        var current = i;
        if (this.lastCell == -1){
            this.lastCell = current;
            return true;
        }
        else {
            if (this.table[this.lastCell].symbol == this.table[current].symbol){
                this.lastCell = -1;
                return true;
            }
            else{
                this.table[this.lastCell].status = "false";
                this.table[current].status = "false";
                this.lastCell = -1;
                return false;
            }
        }

    }
    // method to  change the status of elements to board to see the discovered elements
    this.enableSelectedCell = function(i){
        this.table[i].status = "true";
    }
}

// auxiliar function to simulate the sleep
function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}