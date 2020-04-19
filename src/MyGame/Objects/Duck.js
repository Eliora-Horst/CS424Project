"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Duck(spriteTexture, xCoord, yCoord) {
    this.fedFlag = false;
    this.mDuck = new SpriteAnimateRenderable(spriteTexture);
    this.mDuck.setColor([1, 1, 1, 0]);
    this.mDuck.getXform().setPosition(xCoord, yCoord);
    this.mDuck.getXform().setSize(5, 5);
    this.mDuck.setSpriteSequence(256, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
                            256, 256,       // widthxheight in pixels
                            6,              // number of elements in this sequence
                            0);         // horizontal padding in between
    this.mDuck.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mDuck.setAnimationSpeed(30);
                                // show each element for mAnimSpeed updates

    GameObject.call(this, this.mDuck);
}
gEngine.Core.inheritPrototype(Duck, GameObject);

Duck.prototype.update = function () {
    // remember to update this.mDuck's animation
    this.mDuck.updateAnimation();
};
Duck.prototype.isFed = function () {
    return this.fedFlag;
}
Duck.prototype.feedDuck = function () {
    this.fedFlag = true;
}