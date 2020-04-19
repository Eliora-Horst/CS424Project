"use strict";  // Operate in Strict mode such that variables must be declared before used!

function SinkingDuck(spriteTexture, xCoord, yCoord) {
    this.mSinkingDuck = new SpriteAnimateRenderable(spriteTexture);
    this.mSinkingDuck.setColor([1, 1, 1, 0]);
    this.mSinkingDuck.getXform().setPosition(xCoord, yCoord);
    this.mSinkingDuck.getXform().setSize(5, 5);
    this.mSinkingDuck.setSpriteSequence(256, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
                            256, 256,       // widthxheight in pixels
                            19,              // number of elements in this sequence
                            0);         // horizontal padding in between
    this.mSinkingDuck.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mSinkingDuck.setAnimationSpeed(10);
                                // show each element for mAnimSpeed updates

    GameObject.call(this, this.mSinkingDuck);
}
gEngine.Core.inheritPrototype(SinkingDuck, GameObject);


SinkingDuck.prototype.update = function () {
    // remember to update this.mSinkingDuck's animation
    this.mSinkingDuck.updateAnimationOnce();
};
SinkingDuck.prototype.updateBeginning = function(){
    this.mSinkingDuck.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
}