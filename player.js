var LEFT = 0;
var RIGHT = 1;
var ANIM_IDLE_RIGHT = 0;
var ANIM_JUMP_RIGHT = 1;
var ANIM_WALK_RIGHT = 2;
var ANIM_MAX = 3;


var Player = function()
{

	this.sprite = new Sprite("p1_spritesheet.png");
	this.sprite.buildAnimation(7, 3, 73, 92, 0.05, [0]);
	this.sprite.buildAnimation(7, 3, 73, 92, 0.05, [13]);
	this.sprite.buildAnimation(7, 3, 73, 97, 0.05, [1,2,3,4,5,7,8,9,10]);
	this.offset = new Vector2();
	this.offset.set(1, 12);
	for(var i=0; i<ANIM_MAX; i++)
	{
		this.sprite.setAnimationOffset(i, this.offset.x, this.offset.y);
	}
	this.sprite.setAnimationOffset(0, 1, 12);
	this.width = 73;
	this.height = 92;
	this.position = new Vector2();
	this.position.set(5*TILE,45*TILE);
	this.velocity = new Vector2();
	this.velocity.set(0,0);
	this.falling = true;
	this.jumping = false;
	this.cooldownTimer =0; 
	this.isAlive = true;
}

Player.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);
	var left = false;
	var right = false;
	var jump = false;
	// check keypress events
	/*if(keyboard.isKeyDown(keyboard.KEY_LEFT) == true) {
	left = true;
	this.direction = LEFT;
	if(this.sprite.currentAnimation != ANIM_WALK_LEFT)
		this.sprite.setAnimation(ANIM_WALK_LEFT);

	}*/

	if(keyboard.isKeyDown(keyboard.KEY_RIGHT) == true) {
	right = true;
	this.direction = RIGHT;
	if(this.sprite.currentAnimation != ANIM_WALK_RIGHT && this.jumping == false )
		this.sprite.setAnimation(ANIM_WALK_RIGHT);
	}
	else {
			if(this.jumping == false && this.falling == false){
 				this.sprite.setAnimation(ANIM_IDLE_RIGHT);
			}
		}
	/*else
	{
		if(this.jumping == false && this.falling == false)
		{
			if(this.direction == LEFT)
			{
				if(this.sprite.currentAnimation != ANIM_IDLE_LEFT &&
				this.jumping == false)
				this.sprite.setAnimation(ANIM_IDLE_LEFT);
			}
			else
			{
				if(this.sprite.currentAnimation != ANIM_IDLE_RIGHT &&
				this.jumping == false)
				this.sprite.setAnimation(ANIM_IDLE_RIGHT);
			}
		}
	}*/
this.cooldownTimer -= deltaTime;
if(keyboard.isKeyDown(keyboard.KEY_UP) == true && this.cooldownTimer <= 0){
	this.cooldownTimer = 0.5;
	jump = true;
}
	if(this.falling){

		this.sprite.setAnimation(ANIM_JUMP_RIGHT)
}
	var wasleft = this.velocity.x < 0;
	var wasright = this.velocity.x > 0;
	var falling = this.falling;
	var ddx = 0; // acceleration
	var ddy = GRAVITY;
	if (left)
	ddx = ddx - ACCEL; // player wants to go left
	else if (wasleft)
	ddx = ddx + FRICTION; // player was going left, but not any more
	if (right)
	ddx = ddx + ACCEL; // player wants to go right
	else if (wasright)
	ddx = ddx - FRICTION; // player was going right, but not any more
	if (jump && !this.jumping && !falling)
	{
		// apply an instantaneous (large) vertical impulse
		ddy = ddy - JUMP;
		this.jumping = true;
	if(this.direction == RIGHT)
			this.sprite.setAnimation(ANIM_JUMP_RIGHT);
	}
	// calculate the new position and velocity:
	this.position.y = Math.floor(this.position.y + (deltaTime * this.velocity.y));
	this.position.x = Math.floor(this.position.x + (deltaTime * this.velocity.x));
	this.velocity.x = bound(this.velocity.x + (deltaTime * ddx), -MAXDX, MAXDX);
	this.velocity.y = bound(this.velocity.y + (deltaTime * ddy), -MAXDY, MAXDY);
	if ((wasleft && (this.velocity.x > 0)) ||
	(wasright && (this.velocity.x < 0)))
	{
	// clamp at zero to prevent friction from making us jiggle side to side
	this.velocity.x = 0;
	}

	// collision detection
	// Our collision detection logic is greatly simplified by the fact that the player is a rectangle
	// and is exactly the same size as a single tile. So we know that the player can only ever
	// occupy 1, 2 or 4 cells.
	// This means we can short-circuit and avoid building a general purpose collision detection
	// engine by simply looking at the 1 to 4 cells that the player occupies:
	var tx = pixelToTile(this.position.x);
	var ty = pixelToTile(this.position.y);
	var nx = (this.position.x)%TILE; // true if player overlaps right
	var ny = (this.position.y)%TILE; // true if player overlaps below
	var cell = cellAtTileCoord(LAYER_PLATFORMS, tx, ty);
	var cellright = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty);
	var celldown = cellAtTileCoord(LAYER_PLATFORMS, tx, ty + 1);
	var celldiag = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty + 1);
	// If the player has vertical velocity, then check to see if they have hit a platform
// below or above, in which case, stop their vertical velocity, and clamp their
// y position:
	if (this.velocity.y > 0) {
		this.falling = true;
		if ((celldown && !cell) || (celldiag && !cellright && nx)) {
		// clamp the y position to avoid falling into platform below
		this.position.y = tileToPixel(ty);
		this.velocity.y = 0; // stop downward velocity
		this.falling = false; // no longer falling
		this.jumping = false; // (or jumping)
		ny = 0; // no longer overlaps the cells below
		}
	}
	else if (this.velocity.y < 0) {
		if ((cell && !celldown) || (cellright && !celldiag && nx)) {
			// clamp the y position to avoid jumping into platform above
			this.position.y = tileToPixel(ty + 1);
			this.velocity.y = 0; // stop upward velocity
			// player is no longer really in that cell, we clamped them to the cell below
			cell = celldown;
			cellright = celldiag; // (ditto)
			ny = 0; // player no longer overlaps the cells below
		}
	}
	if (this.velocity.x > 0) {
		if ((cellright && !cell) || (celldiag && !celldown && ny)) {
			// clamp the x position to avoid moving into the platform we just hit
			this.position.x = tileToPixel(tx);
			this.velocity.x = 0; // stop horizontal velocity
		}
	}
	else if (this.velocity.x < 0) {
		if ((cell && !cellright) || (celldown && !celldiag && ny)) {
			// clamp the x position to avoid moving into the platform we just hit
			this.position.x = tileToPixel(tx + 1);
			this.velocity.x = 0; // stop horizontal velocity
		}
	
	}

  if (this.position.x > 21000) {stateManager.switchState(new WinState());}
  

}

Player.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x - worldOffsetX, this.position.y - worldOffsetY);
}