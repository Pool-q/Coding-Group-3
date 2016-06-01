var LEFT = 0;
var RIGHT = 1;
var ANIM_IDLE_LEFT = 0;
var ANIM_JUMP_LEFT = 1;
var ANIM_WALK_LEFT = 2;
var ANIM_IDLE_RIGHT = 3;
var ANIM_JUMP_RIGHT = 4;
var ANIM_WALK_RIGHT = 5;
var ANIM_MAX = 6;
var Player = function()
{
	this.sprite = new Sprite("PlayerMockup.png");
	this.sprite.buildAnimation(1, 1, 120, 170, -1, [0]);
	this.sprite.setAnimationOffset(0, 0, 0);
	this.sprite.setLoop(0, false);
	this.width = 120;
	this.height = 170;
	this.position = new Vector2();
	this.position.set(512 - this.width/2,300 - this.height/2);
	this.velocity = new Vector2();
	this.velocity.set(0,0);
	this.falling = true;
	this.jumping = false;
	this.cooldownTimer = 0;
	this.isAlive = true;
}

Player.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);
	var left = false;
	var right = false;
	var jump = false;
}
Player.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x - worldOffsetX, this.position.y);
}