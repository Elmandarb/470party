import React, {Component, useEffect, useRef} from 'react';
import data from "./data";
import {rocketMovement} from "./obstacle";
import wallHit from "./utils/wallHit";
import playerCollision from "./utils/playerCollision";
import playerStats from "./playerStats";
import obsCollision from "./utils/obsCollision";

let {player1,player2,rocket,rocket2,rocket3,rocket4,rocket5} = data;
export default function Flappy() {
        const canvasRef = useRef(null);
        //const ship = new Image();
        const bg = new Image();
        bg.src = require('./assets/tilesetOpenGameBackground.png');
        const ship2 = new Image();
        ship2.src = require('./assets/enemyHeavy.png');
        const ship3 = new Image();
        ship3.src = require('./assets/enemyNimble.png');
        let timer = 0;
        //ship.src = require('./assets/rocket.png');
        let i = 0;
        let i2 = 50;
        let ship2FrameWidth = 81;
        let ship2FrameHeight = 84;
        let ship3FrameWidth = 83;
        let ship3FrameHeight = 84;
        let rowShip2 = 0;
        let colShip2 = 0;
        let dir = 1;
        let deltaX = 0;
        let deltaY = 0;
        let timerOffset = 60;
        let keys = [];
        let round = 1;
        //localStorage.setItem('pIndex', String(turn.current));
        //localStorage.setItem('oIndex', String(multiPlayer.current));
        player1.name = localStorage.getItem('current_name');
        player2.name = localStorage.getItem('opponent_name');

        function moveSomething(e) {
                keys[e.keyCode] = true;

                // left
                if (keys[37]) {
                        deltaX -= 2;
                        if(player1.dx > -player1.maxSpeed) {
                                player1.dx -= 1;
                        }
                }
                //a is 65
                if (keys[65]) {
                        deltaX -= 2;
                        if(player2.dx > -player2.maxSpeed) {
                                player2.dx -= 1;
                        }
                }

                // right
                if (keys[39]) {
                        deltaX += 2;
                        if(player1.dx < player1.maxSpeed) {
                                player1.dx += 1;
                        }
                }
                //d is 68
                if (keys[68]) {
                        deltaX += 2;
                        if(player2.dx < player2.maxSpeed) {
                                player2.dx += 1;
                        }
                }

                // down
                if (keys[38]) {
                        deltaY -= 2;
                        if(player1.dy > -player1.maxSpeed) {
                                player1.dy -= 1;
                        }
                }
                //s is 83
                if (keys[83]) {
                        deltaY -= 2;
                        if(player2.dy < player2.maxSpeed) {
                                player2.dy += 1;
                        }
                }
                // up
                if (keys[40]) {
                        deltaY += 2;
                        if(player1.dy < player1.maxSpeed) {
                                player1.dy += 1;
                        }
                }
                //w is 87
                if (keys[87]) {
                        deltaY += 2;
                        if(player2.dy > -player2.maxSpeed) {
                                player2.dy -= 1;
                        }
                }
                e.preventDefault();

        }
        function keysReleased(e) {
                // mark keys that were released
                keys[e.keyCode] = false;
        }
        useEffect(()=> {
                const render = () => {
                        const canvas = canvasRef.current;
                        const ctx = canvas.getContext('2d');
                        ctx.clearRect(0,0,canvas.width,canvas.height);
                        ctx.drawImage(bg,0,0,canvas.width,canvas.height);
                        window.addEventListener("keydown", moveSomething, false);
                        window.addEventListener("keyup", keysReleased, false);
                        wallHit(canvas,player1);
                        wallHit(canvas,player2);
                        player1.x+=player1.dx;
                        player1.y+=player1.dy;
                        player2.x+=player2.dx;
                        player2.y+=player2.dy;
                        playerStats(ctx,player1,player2,canvas);
                        let playerCollide = playerCollision(player1,player2);

                        if(playerCollide.hit) {
                                let temp = 0;
                                if(playerCollide.axis === "X") {
                                        temp = player1.dx;
                                        player1.dx = player2.dx;
                                        player2.dx = temp;
                                }
                                else if(playerCollide.axis === "Y") {
                                        temp = player1.dy;
                                        player1.dy = player2.dy;
                                        player2.dy = temp;
                                }
                        }

                        ctx.drawImage(ship2,colShip2*ship2FrameWidth,rowShip2*ship2FrameHeight,ship2FrameWidth,ship2FrameHeight,player1.x,player1.y,ship2FrameWidth,ship2FrameHeight);
                        ctx.drawImage(ship3,colShip2*ship3FrameWidth,rowShip2*ship3FrameHeight,ship3FrameWidth,ship3FrameHeight,player2.x,player2.y,ship3FrameWidth,ship3FrameHeight);
                        //ctx.drawImage(ship2,colShip2*ship2FrameWidth,rowShip2*ship2FrameHeight,ship2FrameWidth,ship2FrameHeight,300,300,ship2FrameWidth,ship2FrameHeight);
                        //drawImageRot2(ctx,ship2,colShip2,rowShip2,ship2FrameWidth,ship2FrameHeight,player1.x,player1.y,player1.dx,player1.dy);

                        //Rockets launching
                        rocketMovement(ctx,rocket2);
                        if((timer/timerOffset) > 100) {

                                rocketMovement(ctx,rocket);
                        }
                        if((timer/timerOffset) > 300) {
                                rocketMovement(ctx,rocket3);
                        }if((timer/timerOffset) > 800) {
                                rocketMovement(ctx,rocket4);
                        }/*if((timer/timerOffset) > 400) {
                                rocketMovement(ctx,rocket5);
                        }*/
                        //rocket collisions
                        let obsColl1 = obsCollision(player1,rocket);
                        if(obsColl1.hit && rocket.active) {
                                player1.lives--;
                                rocket.active = false;
                        }
                        let obsColl2 = obsCollision(player2,rocket);
                        if(obsColl2.hit && rocket.active) {
                                player2.lives--;
                                rocket.active = false;
                        }
                        let obsColl3 = obsCollision(player1,rocket2);
                        if(obsColl3.hit && rocket2.active) {
                                player1.lives--;
                                rocket2.active = false;
                        }
                        let obsColl4 = obsCollision(player2,rocket2);
                        if(obsColl4.hit && rocket2.active) {
                                player2.lives--;
                                rocket2.active = false;
                        }
                        let obsColl5 = obsCollision(player1,rocket3);
                        if(obsColl5.hit && rocket3.active) {
                                player1.lives--;
                                rocket3.active = false;
                        }
                        let obsColl6 = obsCollision(player2,rocket3);
                        if(obsColl6.hit && rocket3.active) {
                                player2.lives--;
                                rocket3.active = false;
                        }
                        let obsColl7 = obsCollision(player1,rocket4);
                        if(obsColl7.hit && rocket4.active) {
                                player1.lives--;
                                rocket4.active = false;
                        }
                        let obsColl8 = obsCollision(player2,rocket4);
                        if(obsColl8.hit && rocket4.active) {
                                player2.lives--;
                                rocket4.active = false;
                        }
                        /*
                        let obsColl9 = obsCollision(player1,rocket5);
                        if(obsColl9.hit && rocket5.active) {
                                player1.lives--;
                                rocket5.active = false;
                        }
                        let obsColl10 = obsCollision(player2,rocket5);
                        if(obsColl10.hit && rocket5.active) {
                                player2.lives--;
                                rocket5.active = false;
                        }

                         */
                        //winner checking
                        if(player1.lives === 0) {
                                //alert(`Game over! ${player2.name} wins! Score is: ${player2.lives*100}`);
                                localStorage.setItem('oAdvance','1');
                                let ind = Number(localStorage.getItem('oIndex'));
                                if(ind === 0) {
                                        localStorage.setItem('p1score', String(Number(localStorage.getItem('p1score'))+player2.lives*100));
                                }
                                else if(ind === 1) {
                                        localStorage.setItem('p2score', String(Number(localStorage.getItem('p2score'))+player2.lives*100));
                                }
                                else if(ind === 2) {
                                        localStorage.setItem('p3score', String(Number(localStorage.getItem('p3score'))+player2.lives*100));
                                }
                                else if(ind === 3) {
                                        localStorage.setItem('p4score', String(Number(localStorage.getItem('p4score'))+player2.lives*100));
                                }
                                alert(`Game over! ${player2.name} wins! Score is: ${player2.lives*100}`);
                                player2.lives = 4;
                                player1.lives = 4;
                                window.close();
                        }
                        if(player2.lives === 0) {
                                //alert(`Game over! ${player1.name} wins! Score is: ${player1.lives*100}`);
                                let ind = Number(localStorage.getItem('pIndex'));
                                localStorage.setItem('advance','1');
                                if(ind === 0) {
                                        localStorage.setItem('p1score', String(Number(localStorage.getItem('p1score'))+player1.lives*100));
                                }
                                else if(ind === 1) {
                                        localStorage.setItem('p2score', String(Number(localStorage.getItem('p2score'))+player1.lives*100));
                                }
                                else if(ind === 2) {
                                        localStorage.setItem('p3score', String(Number(localStorage.getItem('p3score'))+player1.lives*100));
                                }
                                else if(ind === 3) {
                                        localStorage.setItem('p4score', String(Number(localStorage.getItem('p4score'))+player1.lives*100));
                                }
                                alert(`Game over! ${player1.name} wins! Score is: ${player1.lives*100}`);
                                player2.lives = 4;
                                player1.lives = 4;
                                window.close();
                        }


                        requestAnimationFrame(render);
                        timer++;
                }
                render();
            },[]);
        return (
            <canvas
                id = "flappy_canvas"
                ref = {canvasRef}
                height={"600px"}
                width={"900px"}/>

        );

}
export function drawImageRot(ctx,img,x,y,width,height,deg){
        // Store the current context state (i.e. rotation, translation etc..)
        ctx.save()

        //Convert degrees to radian
        let rad = deg * Math.PI / 180;

        //Set the origin to the center of the image
        ctx.translate(x + width / 2, y + height / 2);

        //Rotate the canvas around the origin
        ctx.rotate(rad);

        //draw the image
        ctx.drawImage(img,width / 2 * (-1),height / 2 * (-1),width,height);

        // Restore canvas state as saved from above
        ctx.restore();
}

export function drawImageRot2(ctx,img,col,row,fWidth,fHeight,x,y,dx,dy){
        // need to improve this function
        // Store the current context state (i.e. rotation, translation etc..)
        ctx.save()

        //Convert degrees to radian
        let rad = Math.atan2(dy,dx);
//* Math.PI / 180
        //Set the origin to the center of the image
        ctx.translate((x + (fWidth)/2), (y + (fHeight)/2));

        //Rotate the canvas around the origin
        ctx.rotate(rad);

        //draw the image
        ctx.drawImage(img,(col*fWidth),(row*fHeight),fWidth,fHeight,x,y,fWidth,fHeight);

        //ctx.drawImage()
        //ctx.drawImage(img,width / 2 * (-1),height / 2 * (-1),width,height);

        // Restore canvas state as saved from above
        ctx.restore();
}


