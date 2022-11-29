import data from "./data";
import React, {useEffect, useRef} from "react";
import drawScores from "./scoreboard";
import drawTokens from "./tile";
import drawNext from "./playerUp";
import {useNavigate} from "react-router-dom";

const Board = () => {
    let {player1,player2,player3,player4,gameStuff,games} = data;
    const canvasRef3 = useRef(null);
    //const numPlayers = require('../SelectScreen/Select');
    //gameStuff.players = numPlayers;
    gameStuff.players = Number(localStorage.getItem("numPlayers"));
    player1.name = localStorage.getItem("p1name");
    player2.name = localStorage.getItem("p2name");
    player3.name = localStorage.getItem("p3name");
    player4.name = localStorage.getItem("p4name");
    const bg = new Image();
    bg.src = require('./Assets/board3.png');
    const tex = new Image();
    tex.src = require('./Assets/texture.png');
    const play = new Image();
    play.src = require('./Assets/play.png');
    const roll = new Image();
    roll.src = require('./Assets/roll.png');
    let players = [player1];
    //let positions = [player1.position];
    if(gameStuff.players > 1) {
        players.push(player2);
        //positions.push(player2.position);
    }
    if(gameStuff.players > 2) {
        players.push(player3);
        //positions.push(player3.position);
    }
    if(gameStuff.players > 3) {
        players.push(player4);
        //positions.push(player4.position);
    }
    let needRoll = true;
    let turn = 0;
    let timer = 0;
    const game = useRef('');
    let gamesArray = [...games.singleGames];
    if(gameStuff.players > 1) {
        gamesArray = [...gamesArray, ...games.multiGames];
    }
    let buttonOver = {
        x:0,
        y:0
    };
    let positions = [player1.position];
    localStorage.setItem('p1score', '0');
    if(gameStuff.players > 1) {
        positions.push(player2.position);
        localStorage.setItem('p2score', '0');
    }
    if(gameStuff.players > 2) {
        positions.push(player3.position);
        localStorage.setItem('p3score', '0');
    }
    if(gameStuff.players > 3) {
        positions.push(player4.position);
        localStorage.setItem('p4score', '0');
    }
    let num_roll = 0;
    const multiPlayer = useRef(0);
    useEffect(()=> {
        const render = () => {
            player1.score = Number(localStorage.getItem('p1score'));
            if(gameStuff.players > 1) {
                player2.score = Number(localStorage.getItem('p2score'));
            }
            if(gameStuff.players > 2) {
                player3.score = Number(localStorage.getItem('p3score'));
            }
            if(gameStuff.players > 3) {
                player4.score = Number(localStorage.getItem('p4score'));
            }
            const canvas = canvasRef3.current;
            const ctx = canvas.getContext('2d');
            const rect = canvas.getBoundingClientRect();
            //6by9 board drawn with wood texture and middle area for game buttons/stats
            ctx.clearRect(0,0,900,600);
            ctx.drawImage(bg,0,0);
            ctx.globalAlpha = 0.4;
            ctx.drawImage(tex,0,0);
            ctx.globalAlpha = 1;
            ctx.drawImage(bg,100,100,700,400,100,100,700,400);
            drawTokens(ctx,positions);
            //drawing the names in the board
            drawScores(gameStuff.players,players,canvas,ctx);
            //drawing next player up
            drawNext(gameStuff.players, players,turn,ctx);
            /*
            for(let ind in gamesArray) {
                ctx.fillText(gamesArray[ind],300,300+(ind*30));
            }
             */
            //need to have spinning animation
            //selection of minigame
            // random movement from 1-3 displayed
            //launch instruction page in new window.

            canvas.addEventListener('mousedown', function(e) {
                getCursorPosition(canvas, e);
            });
            function getCursorPosition(canvas, event) {
                const rect = canvas.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                if(x > 598 && x < 738 && y > 182 && y < 282 && needRoll) {
                    needRoll = false;
                    num_roll = Math.floor(Math.random()*3)+1;
                    //assigns number of movement spaces from 1 to 3
                    game.current = gamesArray[(Math.floor(Math.random()*gamesArray.length))];
                    if(games.multiGames.includes(game.current)) {
                        multiPlayer.current = Math.floor(Math.random()*gameStuff.players);
                        while(multiPlayer.current === turn+1) {
                            multiPlayer.current = Math.floor(Math.random()*gameStuff.players);
                        }
                    }

                }
                if(x > 598 && x < 738 && y > 332 && y < 432 && !needRoll) {
                    //let game = games[Math.floor(Math.random()*gamesArray.length)];
                    if(games.multiGames.includes(game.current)) {
                        //launch 2p game
                    }
                    else {
                        //launch 1p game
                        if(game.current === 'breakout') {
                            localStorage.setItem('current_name', players[turn].name);
                            localStorage.setItem('pIndex', String(turn));
                            turn++;
                            needRoll = true;
                            window.open('/breakout','_blank');
                        }
                        else if(game.current === 'breakout') {
                            window.open('/breakout','_blank');
                        }
                    }
                }
            }
            if(!needRoll) {
                ctx.fillText(`Game: ${game.current}`, 360, 350);
                ctx.fillText(`Roll: ${num_roll}`,360,300);
                if(games.multiGames.includes(game.current)) {
                    ctx.fillText(`Against: ${players[multiPlayer.current].name}`, 360, 250);
                }
            }
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.roundRect(600, 180, 140, 102, [30]);
            ctx.stroke();
            if(buttonOver.x-rect.left > 598 && buttonOver.x-rect.left < 738 && buttonOver.y-rect.top > 182 && buttonOver.y-rect.top < 282) {
                ctx.fillStyle = 'green';
            } else {
                ctx.fillStyle = 'gray';
            }
            ctx.fill();
            ctx.drawImage(roll, 610,210);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.roundRect(600, 330, 140, 102, [30]);
            ctx.stroke();

            if(buttonOver.x-rect.left > 598 && buttonOver.x-rect.left < 738 && buttonOver.y-rect.top > 332 && buttonOver.y-rect.top < 432) {
                ctx.fillStyle = 'green';
            } else {
                ctx.fillStyle = 'gray';
            }
            ctx.fill();
            ctx.drawImage(play, 610,360);




            timer++;
            requestAnimationFrame(render);
        }
        render();

    },[]);



    return (
        <canvas
            id="main_canvas"
            onMouseMove={(event)=> {
                buttonOver.x = event.clientX;
                buttonOver.y = event.clientY;
            }}
            ref={canvasRef3}
            height={"600px"}
            width={"900px"}/>

    );
};

export default Board;