



var GameState = function() 
{
	this.prototype = BaseState;
}

GameState.prototype.load = function() 
{
	this.delay = 1;
}

GameState.prototype.unload = function() 
{
}

GameState.prototype.update = function(dt) 
{
	if( this.delay > 0 )
		this.delay -= dt;


	//if( this.delay <= 0 && keyboard.isKeyDown( keyboard.KEY_SPACE ) == true )
	//{
	//	stateManager.switchState( new GameOverState() );
	//}
	startTimer -= dt;
	speedTimer -= dt;
	if(MAXDX<=0){
		MAXDX = 0;
		deathTimer -= dt;
	}
	if(deathTimer<=0){
		stateManager.switchState(new GameOverState());
	}
	if(startTimer <=0){
		startTimer = 0;
				context.fillStyle = "#f00";
		context.font="24px Arial";
		if(goTimer >0){
			context.fillText("GO", (canvas.width/2), (canvas.height/2),100);
			goTimer -= dt;
		}	
		player.update(dt);
		for(var i=0; i<enemies.length; i++){
			enemies[i].update(dt);
					if(intersects(
    		enemies[i].position.x - enemies[i].width/2, enemies[i].position.y - enemies[i].height/2,
    		enemies[i].width, enemies[i].height,
    		player.position.x, player.position.y,
    		player.width, player.height) == true)
    	{
    		loseSpeed();
    		if(speedTimer <= 0)
    		{
    			var o = new createFlyingStarsEmitter("spddwn.png", enemies[i].position.x - worldOffsetX, enemies[i].position.y - worldOffsetY);
    			speedEmitters.push(o)
    		}
    	}
		}
	for(var i=0;i<speedEmitters.length;i++)
		speedEmmiters[i].update(dt);
	}
	else{
		context.fillStyle = "#f00";
		context.font="24px Arial";
		context.fillText(startTimer.toFixed(0), (canvas.width/2), (canvas.height/2),100);
	}
	if(startTimer ==0){
gametimer -= dt;
				context.font="24px Arial";
		context.fillText(gametimer.toFixed(0), (canvas.width/2),100);
		if(gametimer <= 0){
			gametimer = 0;
		stateManager.switchState( new GameOverState() );
	}
			CurrentTime = gametimer;
	if(player.position.x >= 20900)
		stateManager.switchState(new WinState());
}
if(player.position.y >= 1750){
	stateManager.switchState(new GameOverState());
}
}

GameState.prototype.draw = function() 
{

	var deltaTime = getDeltaTime();
	//drawMap();
	player.draw();

	for(var i=0; i<enemies.length; i++){
		enemies[i].draw();
		
	}
	for(var i=0;i<speedEmitters.length;i++)
		speedEmitters[i].draw();
	if(DEBUG == 1)
	{	
			// update the frame counter 
		fpsTime += deltaTime;
		fpsCount++;
		if(fpsTime >= 1)
		{
			fpsTime -= 1;
			fps = fpsCount;
			fpsCount = 0;
		}		
		
		// draw the FPS
		context.fillStyle = "#f00";
		context.font="14px Arial";
		context.fillText("FPS: " + fps, 5, 20, 100);
		context.fillText("X " + player.position.x, 5, 40, 100);
		context.fillText("Y " + player.position.y, 5, 60, 100);
		context.fillRect(player.position.x - worldOffsetX, player.position.y - worldOffsetY, player.width, player.height)
		for(var i=0; i<enemies.length;i++)
			context.fillRect(enemies[i].position.x - enemies[i].width/2 - worldOffsetX, enemies[i].position.y - enemies[i].height/2 - worldOffsetY, enemies[i].width, enemies[i].height);
	}



	//context.font="72px Verdana";	
	//context.fillStyle = "#FF0";	
	//var width = context.measureText("GAME STATE").width;
	//context.fillText("GAME STATE", SCREEN_WIDTH/2 - width/2, SCREEN_HEIGHT/2);		
	
	
	/*if( this.delay <= 0 )
	{
		context.font="18px Verdana";	
		context.fillStyle = "#000";	
		width = context.measureText("Press SPACE to Continue.").width;
		context.fillText("Press SPACE to Continue.", SCREEN_WIDTH/2 - width/2, 300);
	}
	else 
	{
		var time = Math.floor(this.delay);
		var decimal = Math.floor(this.delay * 10) - time*10;
	
		context.font="18px Verdana";	
		context.fillStyle = "#000";		
		width = context.measureText(time + "." + decimal).width;
		context.fillText(time + "." + decimal, SCREEN_WIDTH/2 - width/2, 300);
	}*/
}
