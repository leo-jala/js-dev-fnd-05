//main.js
var memory;

var game = function(){
	var size = document.getElementById('size').value;
	memory = new MemoryGame(size);
}