//rocket

import {drawImageRot} from "./Flappy";

export function rocketMovement(ctx, rocket) {
    let data = new Rocket(rocket.x,rocket.y,rocket.width,rocket.height,rocket.rotation);
    if(rocket.active) {
        data.draw(ctx);
        rocket.x+=rocket.dx;
        rocket.y+=rocket.dy;
    }

    if(!rocket.active && rocket.expCount > 0) {
        //rocket.active = false;
        data.drawExp(ctx);
        rocket.expCount--;
    }
    if(rocket.expCount === 0) {
        //reset the rocket
        rocket.x = 900;
        rocket.expCount = 300;
        rocket.active = true;
        rocket.y = (Math.floor(Math.random() * 560) + 20);
    }
    if(rocket.x < -150) {
        rocket.x = 900;
        rocket.active = true;
        rocket.y = (Math.floor(Math.random() * 560) + 20);
    }

}
const exp = new Image();
exp.src = require('./assets/explosion0.png');
const ship = new Image();
ship.src = require('./assets/rocket.png');

class Rocket {
    constructor(x,y,width,height,rotation) {
        this.x = x;
        this.y=y;
        this.width = width;
        this.height = height;
        this.rotation = rotation;

    }
    draw(ctx) {
        //ctx.drawImage(ship, this.x, this.y, this.width,this.height);
        drawImageRot(ctx,ship,this.x,this.y,this.width,this.height,this.rotation);
    }
    drawExp(ctx){
        ctx.drawImage(exp, this.x, this.y);
    }
}