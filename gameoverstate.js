
var GameOverState = function() 
{
	this.prototype = BaseState;
	this.img = document.createElement("img");
	this.img.src = "loseImage.png";
}

GameOverState.prototype.load = function() 
{
}

GameOverState.prototype.unload = function() 
{
}

GameOverState.prototype.update = function(dt) 
{
	  if (keyboard.isKeyDown(keyboard.KEY_SPACE))
   {
    //Reset all values for restart
	player.position.set(5*TILE,45*TILE);
	player.velocity.set(0,0);
	player.falling = true;
	player.jumping = false;
	player.cooldownTimer =0; 
	player.isAlive = true;
	speedTimer = 0;
    deathTimer = 1;
    goTimer = 1.5;
    CurrentTime = 0;
    stateManager.switchState(new GameState());
    gametimer = 45;
    startTimer = 3;
    enemies.splice(0,enemies.length);
    initialise();

   }
music.stop();
}

GameOverState.prototype.draw = function() 
{
	context.drawImage(this.img,0,0,SCREEN_WIDTH,SCREEN_HEIGHT);

	context.fillText("[Press Space To Retry]",300,40)
}