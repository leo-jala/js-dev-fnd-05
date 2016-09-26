//main.js
var memory;

var game = function(){
	var size = document.getElementById('size').value;
	memory = new MemoryGame(size);
}

var hit =  function(){
	var strCoordinate = document.getElementById('coordinate').value;
	var posX = parseInt(strCoordinate.split(',')[0]);
	var posY = parseInt(strCoordinate.split(',')[1]);
	memory.hitCell(posX,posY);
}