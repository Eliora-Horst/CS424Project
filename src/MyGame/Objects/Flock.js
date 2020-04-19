"use strict";

class Flock {
    constructor(spriteTexture, flockSize) {
        this.xRange = 87;
        this.xStart = 5;
        this.yRange = 60;
        this.yStart = 10;
        //GameObject.call(this, this.mFlock);
        this.mFlock = new Array();
        var x, y;
        var i, p;
        var h = [];
        var duckReady = false;
        var tryCount = 0;
        for (i = 0; i < flockSize; i++) {
            duckReady = false;
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
            if(tryCount > 0){
                console.log("Not enough space for " + flockSize + " ducks. There are " + i + " ducks on the page.");
                break;
            }
       } //GameObject.call(this, this.mFlock);
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