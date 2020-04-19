"use strict";

function Bread(spriteTexture) {
	this.kDelta = 0.1;

	this.mBread = new SpriteRenderable(spriteTexture);
    this.mBread.setColor([1, 1, 1, 0]);
    this.mBread.getXform().setPosition(25, 65);
    this.mBread.getXform().setSize(3, 3);
    this.mBread.setElementPixelPositions(1536, 1792, 0, 256);
	GameObject.call(this, this.mBread);
}

gEngine.Core.inheritPrototype(Bread, GameObject);

Bread.prototype.update = function () {
	var xform = this.mBread.getXform();

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
        xform.incYPosBy(this.kDelta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        xform.incYPosBy(-this.kDelta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        xform.incXPosBy(-this.kDelta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        xform.incXPosBy(this.kDelta);
    }
};