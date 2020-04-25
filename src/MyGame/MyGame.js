"use strict";

function MyGame() {
    this.kDuckSprite = "assets/Ducks_Bobbing.png";
    this.kSinkingDucks = "assets/Sinking_Ducks.png";
    this.kBackgroundImage = "assets/pond.png";
    this.kBreadSpin = "assets/Bread_Spin.png";

    this.mCamera = null;

    this.mMsg = null;
    this.mTime = null;

    this.score = 0;
    this.timeUp = false;
    this.mBread = null;
    this.mDuck = null;
    this.mFlock = null;
    this.mDuckHit = null;
    this.mBackground = null; 
    this.didScore = false;

    this.mcountDownDate = null;
    this.mInterval = null;
    this.time = null;
}

gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kDuckSprite);
    gEngine.Textures.loadTexture(this.kSinkingDucks);
    gEngine.Textures.loadTexture(this.kBackgroundImage);
    gEngine.Textures.loadTexture(this.kBreadSpin);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kDuckSprite);
    gEngine.Textures.unloadTexture(this.kSinkingDucks);
    gEngine.Textures.unloadTexture(this.kBackgroundImage);
    gEngine.Textures.unloadTexture(this.kBreadSpin);

    var nextLevel = new GameOver();
    gEngine.Core.startScene(nextLevel);
};

MyGame.prototype.initialize = function () {
    this.mCamera = new Camera(
        vec2.fromValues(50, 37.5),
        100,
        [0, 0, 640, 480]
    );
    this.mCamera.setBackgroundColor([0.31, 0.7, 0.29, 1]);
   
    //Adds pond to background
    this.mBackground = new SpriteRenderable(this.kBackgroundImage);
    this.mBackground.setColor([1, 1, 1, 0]);
    this.mBackground.getXform().setPosition(50, 37);
    this.mBackground.getXform().setSize(85, 65);
    this.mBackground.setElementPixelPositions(0, 1024, 0, 574);

    //Sets up spinning bread moveable object
    this.mBread = new Bread(this.kBreadSpin);

    //Sets up single sinking duck that will move around when triggered
    this.mDuckHit = new SinkingDuck(this.kSinkingDucks, 35, 45);
    this.mDuckHit.setVisibility(false);

    //Makes raft of ducks in random positions
    this.mFlock = new Flock(this.kDuckSprite, 15);

    //Sets up the text for the score and time
    this.mMsg = new FontRenderable("Score: 0");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(3, 73);
    this.mMsg.setTextHeight(3);

    this.mTime = new FontRenderable("Time: 0");
    this.mTime.setColor([0, 0, 0, 1]);
    this.mTime.getXform().setPosition(84, 73);
    this.mTime.setTextHeight(3);

    this.mcountDownDate = new Date().getTime();
}

//The draw function is the place where all the objects are actually rendered in the canvas.
MyGame.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

    this.mCamera.setupViewProjection();
    this.mBackground.draw(this.mCamera);

    this.mMsg.draw(this.mCamera);
    this.mTime.draw(this.mCamera);
    
    this.mFlock.draw(this.mCamera);

    this.mDuckHit.draw(this.mCamera);
    this.mBread.draw(this.mCamera);

    this.mInterval = setInterval(this.timer(), 1000);
}

//Game loop that continuously updates in the canvas until specifically switched out of.
MyGame.prototype.update = function () {
    //If user gets all ducks or time runs out, end the game
    if((this.timeUp == true)||(this.score == 15)){
        gEngine.GameLoop.stop();
    }
    //Else, game continues
    else{
        //If user clicks on canvas, move mouse to that position
        if (gEngine.Input.isButtonPressed(gEngine.Input.mouseButton.Left)) {
                this.mBread.getXform().setXPos(this.mCamera.mouseWCX());
                this.mBread.getXform().setYPos(this.mCamera.mouseWCY());  
        }

        var h = [];
        var touchedDuck = this.mFlock.isTouched(this.mBread,h);

        //If bread touches a duck, and either there is a mouse click or space button pressed
        if((touchedDuck != null)
            &&(gEngine.Input.isButtonPressed(gEngine.Input.mouseButton.Left)
            ||gEngine.Input.isKeyPressed(gEngine.Input.keys.Space))){
            this.mDuckHit.getXform().setPosition(touchedDuck.getXform().getXPos(), touchedDuck.getXform().getYPos()); //There is only one sinking duck on the page that moves to the position of the touched duck before it is made visable. 
            //This can cause animation glitches if the user drags the bread around or clicks on a new duck before the previous sinking animation is completed
            touchedDuck.setVisibility(false);         //Makes regular bobbing duck dissapear
            this.mDuckHit.setVisibility(true);        //Makes sinking duck appear
            this.mDuckHit.updateBeginning();          //Restarts sinking duck animation to appear properly
            touchedDuck.feedDuck();
            this.score++;                             
            this.mMsg.setText("Score: "+ this.score); //Display updated score
        }
        this.mDuckHit.update();
        this.mBread.update();
        this.mFlock.update();
    }
}
//This is the time function that creates the countdown clock and is modified from the w3schools countdown clock code https://www.w3schools.com/howto/howto_js_countdown.asp
MyGame.prototype.timer = function() {
    //this compares the time when the game started to the time now then converts that from counting up to counting down only 30 seconds
    var now = new Date().getTime();

    var distance = (now - this.mcountDownDate);

    var seconds = 30 - (Math.floor((distance % (1000 * 60)) / 1000));

    this.mTime.setText("Time: " + seconds);
    //When the time is over this sets the flag boolean to let the main game loop know to execute game over
    if(seconds <=0){
        this.timeUp = true;
    }

  }