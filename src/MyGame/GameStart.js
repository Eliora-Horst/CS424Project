"use strict";

function GameStart() {
    this.mCamera = null;
    this.mTitle = null;
    this.mLine1 - null;
    this.mLine2 - null;
    this.mLine3 - null;
    this.mLine4 - null;
    this.mLine5 - null;

    this.mStartGame = null;
}

gEngine.Core.inheritPrototype(GameStart, Scene);

GameStart.prototype.unloadScene = function () {
    var nextLevel = new MyGame();
    gEngine.Core.startScene(nextLevel);
}

GameStart.prototype.initialize = function () {

    this.mCamera = new Camera(
        vec2.fromValues(50, 37.5), 
        100,                      
        [0, 0, 640, 480]          
    );

    this.mCamera.setBackgroundColor([0.31, 0.7, 0.29, 1]);

    this.mTitle = new FontRenderable("Welcome to Lucky Ducks");
    this.mTitle.setColor([0, 0, 0, 1]);
    this.mTitle.getXform().setPosition(13, 60);
    this.mTitle.setTextHeight(6);

    this.mLine1 = new FontRenderable("The goal of the game is to feed all the ducks on the");
    this.mLine1.setColor([0, 0, 0, 1]);
    this.mLine1.getXform().setPosition(11, 53);
    this.mLine1.setTextHeight(2.5);

    this.mLine2 = new FontRenderable("screen by bringing them bread. You can move the bread");
    this.mLine2.setColor([0, 0, 0, 1]);
    this.mLine2.getXform().setPosition(11, 48);
    this.mLine2.setTextHeight(2.5);

    this.mLine3 = new FontRenderable("by clicking on the duck, dragging the bread to the");
    this.mLine3.setColor([0, 0, 0, 1]);
    this.mLine3.getXform().setPosition(11, 43);
    this.mLine3.setTextHeight(2.5);

    this.mLine4 = new FontRenderable("duck, or moving the bread with the arrow keys and");
    this.mLine4.setColor([0, 0, 0, 1]);
    this.mLine4.getXform().setPosition(11, 38);
    this.mLine4.setTextHeight(2.5);

    this.mLine5 = new FontRenderable("throwing it with the space bar.");
    this.mLine5.setColor([0, 0, 0, 1]);
    this.mLine5.getXform().setPosition(11, 33);
    this.mLine5.setTextHeight(2.5);

    this.mStartGame = new FontRenderable("PRESS SPACE TO START THE GAME");
    this.mStartGame.setColor([0, 0, 0, 1]);
    this.mStartGame.getXform().setPosition(24, 20);
    this.mStartGame.setTextHeight(3);

}

GameStart.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.31, 0.7, 0.29, 1]);
    this.mCamera.setupViewProjection();
    this.mTitle.draw(this.mCamera);
    this.mLine1.draw(this.mCamera);
    this.mLine2.draw(this.mCamera);
    this.mLine3.draw(this.mCamera);
    this.mLine4.draw(this.mCamera);
    this.mLine5.draw(this.mCamera);

    this.mStartGame.draw(this.mCamera);
}

GameStart.prototype.update = function () {
    //Press SPACE to go to main game
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Space)){
        gEngine.GameLoop.stop();
    }
}