
var WinState = function() 
{
	this.prototype = BaseState;
	this.img = document.createElement("img");
	this.img.src = "winImage.png";

	if (CurrentTime.toFixed(0) > highscore)
	 {
      highscore = CurrentTime.toFixed(0);
	 }
}

WinState.prototype.load = function() 
{
}

WinState.prototype.unload = function() 
{
}

WinState.prototype.update = function(dt) 
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
}

WinState.prototype.draw = function() 
{   
	context.drawImage(this.img,0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
	context.fillStyle = "#f00";
	context.font="44px Arial";
	context.fillText("[Press Space To Retry]",300,40)
	context.fillText("Current Time:" + CurrentTime.toFixed(0), 400,450,100);
	context.fillText("Best Time:"+highscore, 550,450,100);
}