/**
 * Created by chelo on 9/17/2016.
 */

 var MemoryGame = function (size){
	this.size = size;
	this.x = size;
	this.y = size;
	this.array = new Array();
};

/**
 * Returns array values
 * @return {Array} array
 */
MemoryGame.prototype.getArray = function () {
	for (var i = 0; i < this.x; i++){
		for (var j = 0; j < this.y; j++) {
			console.log(' ', this.array[i][j],' ');
		}
	}
	return this.array;
};

/**
 * Set array with 'x' values
 * @return {Array} array
 */
MemoryGame.prototype.setArray = function () {
	for (var i = 0; i < this.x; i++){
		this.array[i] = new Array();
		for (var j = 0; j < this.y; j++) {
			this.array[i][j] = 'x';
		}
	}
	return this.array;
};

/**
 * Returns size
 * @return {Number} size
 */
MemoryGame.prototype.getSize = function (){
	return this.size;
};