var Memory = function(size, turnLimit, move, configGame) {
	this.size = size;
	this.move = move;	
	var turnsLeft = 5;
	
	//This method receives players names
	this.savePlayers = function() {
		var player = window.prompt("Enter your name please.");
		console.log('Hello ', player);
		return(player);
	}

	
	var player = this.savePlayers();

	this.getPlayer = function() {
		var player = this.savePlayers
	}

	//This method calculates turns left of player.
	this.turnLeft = function() {		
		while(turnsLeft>0) {
			turnsLeft--;
			break;
		}
		return turnsLeft;
	}

	//This method calls turnLeft and calculate turns left for player, return boolean
	this.gameStatus = function() {
		var flag = true;		
		var turnsLeft = this.turnLeft();

		if (turnsLeft == 1) {
			console.log('Player ', player, 'has ', turnsLeft, ' turn left.');
		} else if (turnsLeft > 0){
			console.log('Player ', player, 'has ', turnsLeft, ' turns left.');
		}

		if (turnsLeft == 0) {
			flag = false;
			console.log('Game is over.');
			return flag;
		}
		return flag;
	}
}

