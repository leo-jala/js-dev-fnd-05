/*
* @Author Marco Llano
*/
var Memory = function() {		
}
var player = '';

Memory.prototype.savePlayers = function(){
	var player = window.prompt("Welcome to Memory Game. Please enter your name.");
	return(player);
}

Memory.prototype.getPlayer = function() {
	return player;
}

Memory.prototype.turnsLeft = function(turnsLeft) {
	this.left = parseInt(turnsLeft);

	while(this.left > 0) {
			this.left--;
			break;
	}
	return this.left;
}

Memory.prototype.gameStatus = function(player, limit) {
	var flag = true;		
	this.player = player;
	memory = new Memory();

	if (limit == 1) {
		console.log('Player ', player, 'has ', limit, ' turn left.');
	} else if (limit > 0){
		console.log('Player ', player, 'has ', limit, ' turns left.');
	}

	if (limit == 0) {
		flag = false;
		console.log('Game is over.');
		return flag;
	}
	return flag;
}