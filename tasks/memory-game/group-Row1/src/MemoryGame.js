/**
 * Created by chelo on 9/17/2016.
 */

 var MemoryGame = function (size){
	if ( size % 2 == 0){
		this.size = size;
		this.x = size;
		this.y = size;
		this.array = new Array();
	}
	else{
		this.size = NaN;
		this.x = NaN;
		this.y = NaN;
		this.array = NaN;
		console.error('The size of the array must be defined as even number.');
	}
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
 * Set array with 'x' values
 * @return {Array} array
 */
MemoryGame.prototype.suffleArray = function () {
	var limit = this.x*this.y/2;
	var startcode = 65;
	var par1 = new Array();
	var par2 = new Array();
	var stringIndex = 0;
	var stringArray = 1;

	for (var i = 0; i < limit; i++) {
		par1[i] = String.fromCharCode(i + startcode);
		par2[i] = String.fromCharCode(i + startcode);
	}

	for (var x = 0; x < this.size; x++) {
		for (var y = 0; y < this.size; y++) {

			stringArray = getRandom(1, 2);

			if (stringArray == 1){
				stringIndex = getRandom(0, par1.length-1);
				if (par1.length > 0){
					this.array[x][y] = par1[stringIndex];
					par1.splice(stringIndex,1);
				}
				else{
					this.array[x][y] = par2[stringIndex];
					par2.splice(stringIndex,1);
				}
			}
			else if(stringArray == 2){
				stringIndex = getRandom(0, par2.length-1);
				if (par2.length > 0){
					this.array[x][y] = par2[stringIndex];
					par2.splice(stringIndex,1);
				}
				else{
					this.array[x][y] = par1[stringIndex];
					par1.splice(stringIndex,1);
				}
			}
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

function getRandom(bottom, top) {
	return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
}