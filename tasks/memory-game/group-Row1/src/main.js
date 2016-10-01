//main.js
var memory;

/**
* Create the instance of Memory Game based on the values given in the HTML page
*/
var game = function(){
	var width = document.getElementById('width').value;
	var height = document.getElementById('height').value;
	var namePlayer1 = document.getElementById('player1').value;
	var namePlayer2 = document.getElementById('player2').value;
	memory = new MemoryGame(width, height, namePlayer1, namePlayer2);
	document.getElementById("msg").innerHTML="";
}

/**
 * Get the id of the cell clicked and updates the table according the position
 * @param {td} - cell in which the event ocurred
 */
function hitCell(obj) {
	var hit = obj.id;
	var res = hit.split(",");
	memory.hitCell(parseInt(res[0]), parseInt(res[1]));
}

/**
* Load dropdown webelememts
* @returns {dropdowns} loaded
*/
function loadDropdown(){
	var selectWidth = document.getElementById("width"); 
	fillValues(selectWidth, 2, 9);
	var selectHeight = document.getElementById("height"); 
	fillValues(selectHeight, 2, 13);
}

/**
* Fill values from 2-10 in a dropdown webelememt
* @param {select identifier}
* @returns {dropdown} filled
*/
function fillValues(select, min, max){
	for(var i = min; i <= max; i++) {
	    var opt = i;
	    var el = document.createElement("option");
	    el.textContent = opt;
	    el.value = opt;
	    select.appendChild(el);
	}
}