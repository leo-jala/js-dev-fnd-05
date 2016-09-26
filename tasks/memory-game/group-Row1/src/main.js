//main.js
var memory;

var game = function(){
	var size = document.getElementById('size').value;
	memory = new MemoryGame(size);
}

/**
 * Get the id of the cell clicked and updates the table according the position
 */
function hitCell(obj) {
	var hit = obj.id;
	var res = hit.split(",");
	memory.hitCell(parseInt(res[0]), parseInt(res[1]));
}