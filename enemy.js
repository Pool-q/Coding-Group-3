var Enemy = function(x, y) {
	this.sprite = new Sprite("enemymockup.png");
	this.sprite.buildAnimation(1, 1, 72, 36, -1, [0]);
	this.sprite.setAnimationOffset(0, -36, -18);
	this.position = new Vector2();
	this.position.set(x, y);
	this.width = 72;
	this.height = 36;

	this.velocity = new Vector2();
	this.velocity.set(0, 0);
	this.moveRight = false;
	this.pause = 0;
};
Enemy.prototype.update = function(dt)
{
	this.sprite.update(dt);
	if(this.pause > 0)
	{
		this.pause -= dt;
	}
	else
	{
		var ddx = 0; // acceleration
		var tx = pixelToTile(this.position.x);
		var ty = pixelToTile(this.position.y);
		var nx = (this.position.x)%TILE; // true if enemy overlaps right
		var ny = (this.position.y)%TILE; // true if enemy overlaps below
		var cell = cellAtTileCoord(LAYER_PLATFORMS, tx, ty);
		var cellright = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty);
		var celldown = cellAtTileCoord(LAYER_PLATFORMS, tx, ty + 1);
		var celldiag = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty + 1);
		if(this.moveRight)
		{
			if(celldiag && !cellright) {
				ddx = ddx + ENEMY_ACCEL; // enemy wants to go right
			}
			else {
				this.velocity.x = 0;
				this.moveRight = false;
				this.pause = 0.5;
			}
		}
		if(!this.moveRight)
		{
			if(celldown && !cell) {
			ddx = ddx - ENEMY_ACCEL; // enemy wants to go left
		}
		else {
			this.velocity.x = 0;
			this.moveRight = true;
			this.pause = 0.5;
		}
		}
		this.position.x = Math.floor(this.position.x + (dt * this.velocity.x));
		this.velocity.x = bound(this.velocity.x + (dt * ddx),
		-ENEMY_MAXDX, ENEMY_MAXDX);
	}

}

Enemy.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x - worldOffsetX, this.position.y -worldOffsetY);
/*	context.save();
		context.translate(this.position.x, this.position.y);
		context.rotate(this.rotation);
		context.drawImage(this.image, -this.width/2, -this.height/2);
	context.restore();*/
}