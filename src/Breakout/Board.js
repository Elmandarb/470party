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
export default function Board() {
    const canvasRef = useRef(null);

    //loop which renders a frame, clearing the board every time to draw
    //elements in their new positions
    useEffect(()=> {
        const render = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            paddleProps.y = canvas.height-30;

            ctx.clearRect(0,0,canvas.width,canvas.height);
            //load ball

            playerStats(ctx,player,canvas);
            if(player.lives === 0) {
                alert(`Game over! Total score was ${player.score}`);
                bricks.length = 0;
                player.lives = 3;
                player.level = 2;
                player.score = 0;
                brick.y = 50;
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