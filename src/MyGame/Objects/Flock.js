"use strict";
//changed this to a class rather than a true object as it was not allowing me to create all the functions I needed
class Flock {
    constructor(spriteTexture, flockSize) {
    //variables created through trial and error to create the bounds of the random within the pond shape
        this.xRange = 53;
        this.xStart = 23;
        this.yRange = 35;
        this.yStart = 21;

        //variables to set up the flock
        this.mFlock = new Array();
        var x, y;
        var i, p;
        var h = [];
        var duckReady = false;
        var tryCount = 0;

        for (i = 0; i < flockSize; i++) {
            duckReady = false;
            //This loop creates a new duck, checks to see if it will overlap with another duck and makes a new duck if the two are overlapping
            //To prevent a neverending loop if there is no space left there will only be 20 attempts at creating a non-oeverlapping duck
            while((!duckReady)&&(tryCount < 20)){
                tryCount++;
                x = Math.floor(Math.random() * this.xRange + this.xStart);
                y = Math.floor(Math.random() * this.yRange + this.yStart);
                var newDucky = new Duck(spriteTexture, x, y);
                duckReady = true;
                for(p = 0; p < this.mFlock.length; p++){
                    if(this.mFlock[p].pixelTouches(newDucky, h)){
                        duckReady = false;
                    }
                }

                if(duckReady){
                    this.mFlock.push(newDucky);
                    tryCount = 0;
                }
                newDucky = null;
            }
            //This lets the user know that there are not enough unique spaces in the pond for an excessively large amount of ducks
            if(tryCount > 0){
                console.log("Not enough space for " + flockSize + " ducks. There are " + i + " ducks on the page.");
                break;
            }
       } 
    }
    update() {
        var i = 0;
        for (i; i < this.mFlock.length; i++) {
            if((this.mFlock[i].isFed() == false)){
                this.mFlock[i].update();
            }
        }
    }
    draw(camera){
        var i = 0; 
        for(i; i < this.mFlock.length; i++){
            if((this.mFlock[i].isFed() == false)){
                this.mFlock[i].draw(camera);
            }
        }
    }
    //checks to make sure the user is not touching an already fed duck as they are not visable, but still drawn in the scene
    isTouched(bread, h){
        var i = 0;
        var touchedDuck = null;
        for(i; i < this.mFlock.length; i++){
            if((this.mFlock[i].pixelTouches(bread, h))&& (this.mFlock[i].isFed() == false)){
                touchedDuck = this.mFlock[i];
            }
        }
        return touchedDuck;
    }

}