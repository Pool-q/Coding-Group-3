
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

}

Player.prototype.update = function(deltaTime)
{

}
Player.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x - worldOffsetX, this.position.y);
}