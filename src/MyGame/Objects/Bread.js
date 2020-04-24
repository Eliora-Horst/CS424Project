"use strict";

function Bread(spriteTexture) {
	this.kDelta = 0.1;

    this.mBread = new SpriteAnimateRenderable(spriteTexture);
    this.mBread.setColor([1, 1, 1, 0]);
    this.mBread.getXform().setPosition(50, 40);
    this.mBread.getXform().setSize(5, 5);
    this.mBread.setSpriteSequence(256, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
                            256, 256,       // widthxheight in pixels
                            11,              // number of elements in this sequence
                            0);         // horizontal padding in between
    this.mBread.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mBread.setAnimationSpeed(20);

	GameObject.call(this, this.mBread);
}

gEngine.Core.inheritPrototype(Bread, GameObject);

Bread.prototype.update = function () {
    //Lets user manipulate this object with the arrow keys
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
    //Bread spins
    this.mBread.updateAnimation();
};