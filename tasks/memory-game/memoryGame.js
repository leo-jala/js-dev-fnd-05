var Memory = function(player,size, turnLimit, move, configGame, turnLeft, gameStatus) {
	this.player = player;	
	this.size = size;
	this.configGame = function(){
		for (i=0;i<=size*size;i++){
			for(j=0;j<=size*size;j++) {
				
			}
		}
	};
	this.turnLimit = turnLimit;
	this.move = move;	
	this.turnLeft = turnLeft; 
	this.gameStatus = gameStatus;

}

