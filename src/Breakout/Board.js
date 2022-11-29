import React, {useEffect, useRef} from "react";
import {ballMovement} from "./ballMovement";
import data from "./data";
import wallCollision from "./utils/wallCollision";
import Paddle from "./paddle";
import CreateBrick from "./Brick";
import collisionDetect from "./utils/BrickCollision";
import paddleHit from "./utils/PaddleHit";
import playerStats from "./playerStats";
import allBroken from "./utils/AllBroken";
import resetBall from "./utils/reset";
//return
let x = 0;
let bricks = [];
let {ball,paddleProps,brick,player} = data;
let ins = true;
const initSpeed = 3;
player.name = localStorage.getItem('current_name');
export default function Board() {
    const canvasRef = useRef(null);

    //loop which renders a frame, clearing the board every time to draw
    //elements in their new positions
    useEffect(()=> {
        const render = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            canvas.addEventListener('mousedown', function(e) {
                getCursorPosition(canvas, e);
            });
            function getCursorPosition(canvas, event) {
                if(ins) {
                    ins = false;
                    ball.dy = initSpeed;
                    ball.dx = initSpeed;
                }
            }
            paddleProps.y = canvas.height-30;

            ctx.clearRect(0,0,canvas.width,canvas.height);
            //load ball

            playerStats(ctx,player,canvas);
            if(player.lives === 0) {
                alert(`Game over! Total score was ${player.score}`);
                bricks.length = 0;
                player.lives = 3;
                player.level = 2;
                //player.score = 0;
                brick.y = 50;
                let ind = Number(localStorage.getItem('pIndex'));
                //if(player.score >= )
                if(ind === 0) {
                    localStorage.setItem('p1score', String(Number(localStorage.getItem('p1score'))+player.score));
                }
                else if(ind === 1) {
                    localStorage.setItem('p2score', String(Number(localStorage.getItem('p2score'))+player.score));
                }
                else if(ind === 2) {
                    localStorage.setItem('p3score', String(Number(localStorage.getItem('p3score'))+player.score));
                }
                else if(ind === 3) {
                    localStorage.setItem('p4score', String(Number(localStorage.getItem('p4score'))+player.score));
                }
                resetBall(ball,canvas,paddleProps);
                window.close();

            }
            let newBrickSet = CreateBrick(player.level,bricks,canvas,brick);
            if(newBrickSet && newBrickSet.length > 0) {
                bricks = newBrickSet;
            }
            bricks.map((brick) => {
                return brick.draw(ctx);
            });
            ballMovement(ctx,ball);
            allBroken(bricks,player,canvas,ball);
            //check bounds of our canvas
            wallCollision(ball,canvas,player);
            let brickCollision;
            //iterate through all of our bricks and test for collision with ball
            for(let i = 0; i< bricks.length; i++) {
                brickCollision = collisionDetect(ball,bricks[i]);
                //choose a brick, test if balls hits and not already broken
                //handle density
                if(brickCollision.hit && !bricks[i].broken) {
                    if(brickCollision.axis === "X") {
                        if(bricks[i].density > 0) {
                            bricks[i].density--;
                            ball.dx*= -1;
                        }
                        else {
                            ball.dx*= -1;
                            bricks[i].broken = true;
                        }
                    }
                    else if(brickCollision.axis === "Y") {
                        if(bricks[i].density > 0) {
                            bricks[i].density--;
                            ball.dy*= -1;
                        }
                        else {
                            ball.dy *= -1;
                            bricks[i].broken = true;
                        }
                    }
                    player.score += 10;
                }
            }
            Paddle(ctx,canvas,paddleProps);
            paddleHit(ball,paddleProps);
            if(ins) {
                ctx.globalAlpha = 0.625;
                ctx.fillStyle = 'black';
                ctx.fillRect(0,0,900,600);
                ctx.fillStyle = 'yellow';
                let b = 30;
                ctx.fillText("Control Paddle with mouse cursor",240+b,150);
                ctx.fillText("Hit the ball with the paddle to break the bricks",200+b,200);
                ctx.fillText("don't let the ball hit the bottom",260+b,250);
                ctx.fillText("Click to start!",320+b,300);
                ctx.globalAlpha = 1;
            }
            requestAnimationFrame(render);
        }
        render();

    },[]);
    return (
        <canvas
            id = "canvas"
            ref = {canvasRef}
            onMouseMove={(event)=>paddleProps.x = event.clientX - paddleProps.width/2}
            height={"500px"}
            width={"900px"}/>
    )
}