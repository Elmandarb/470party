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
    let needRoll = useRef(true);
    let turn = useRef(0);
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
    let num_roll = useRef(0);
    let multiPlayer = useRef(0);
    useEffect(()=> {
        const render = () => {
            positions[0] = player1.position;
            if(positions[0] > 25) {
                //p1wins
                localStorage.setItem('p1score', String(Number(localStorage.getItem('p1score'))+1000));
                localStorage.setItem('winner', 'p1' );
                player1.position = 0;
                window.location.href='/End';
            }
            if(gameStuff.players > 1) {
                positions[1] = player2.position;
                if(positions[1] > 25) {
                    //p2wins
                    localStorage.setItem('p2score', String(Number(localStorage.getItem('p2score'))+1000));
                    localStorage.setItem('winner', 'p2' );
                    player2.position = 0;
                    window.location.href='/End';
                }
            }
            if(gameStuff.players > 2) {
                positions[2] = player3.position;
                if(positions[2] > 25) {
                    //p3wins
                    localStorage.setItem('p3score', String(Number(localStorage.getItem('p3score'))+1000));
                    localStorage.setItem('winner', 'p3' );
                    player3.position = 0;
                    window.location.href='/End';
                }
            }
            if(gameStuff.players > 3) {
                positions[3] = player4.position;
                if(positions[3] > 25) {
                    //p4wins
                    localStorage.setItem('p4score', String(Number(localStorage.getItem('p4score'))+1000));
                    localStorage.setItem('winner', 'p4' );
                    player4.position = 0;
                    window.location.href='/End';
                }
            }
            if(turn.current > gameStuff.players-1) {
                turn.current = 0;
                let copy = 0;
            }
            if(localStorage.getItem('oAdvance') === '1') {
                localStorage.setItem('oAdvance','0');
                let index = Number(localStorage.getItem('oIndex'));
                if(index === 0) {
                    player1.position+=num_roll.current;
                }
                else if(index === 1) {
                    player2.position+=num_roll.current;
                }
                else if(index === 2) {
                    player3.position+=num_roll.current;
                }
                else if(index === 3) {
                    player4.position+=num_roll.current;
                }
            }
            if(localStorage.getItem('advance') === '1') {
                localStorage.setItem('advance','0');
                let index = Number(localStorage.getItem('pIndex'));
                if(index === 0) {
                    player1.position+=num_roll.current;
                }
                else if(index === 1) {
                    player2.position+=num_roll.current;
                }
                else if(index === 2) {
                    player3.position+=num_roll.current;
                }
                else if(index === 3) {
                    player4.position+=num_roll.current;
                }
            }
            //Updating scores based on games
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
            drawNext(gameStuff.players, players,turn.current,ctx);
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
                if(x > 598 && x < 738 && y > 182 && y < 282 ) {
                    needRoll.current = false;
                    num_roll.current = Math.floor(Math.random()*3)+1;
                    //assigns number of movement spaces from 1 to 3
                    game.current = gamesArray[(Math.floor(Math.random()*gamesArray.length))];
                    if(games.multiGames.includes(game.current)) {
                        multiPlayer.current = Math.floor(Math.random()*gameStuff.players);
                        while(multiPlayer.current === turn.current) {
                            multiPlayer.current = Math.floor(Math.random()*gameStuff.players);
                        }
                    }

                }
                if(x > 598 && x < 738 && y > 332 && y < 432 && !needRoll.current) {
                    //let game = games[Math.floor(Math.random()*gamesArray.length)];
                    if(games.multiGames.includes(game.current)) {
                        localStorage.setItem('current_name', players[turn.current].name);
                        localStorage.setItem('opponent_name', players[multiPlayer.current].name);
                        localStorage.setItem('pIndex', String(turn.current));
                        localStorage.setItem('oIndex', String(multiPlayer.current));
                        turn.current++;
                        needRoll.current = true;
                        if(game.current === 'Flappy') {
                            window.open('/flappy','_blank');
                        }
                        else if(game.current === 'Pong') {
                            window.open('/pong','_blank');
                        }
                        else if(game.current === 'PuzzlerTwo') {
                            window.open('/puzzler','_blank');
                        }
                        else if(game.current === 'Puzzler2') {
                            window.open('/puzzler2','_blank');
                        }
                        //launch 2p game
                    }
                    else {
                        //launch 1p game
                        localStorage.setItem('current_name', players[turn.current].name);
                        localStorage.setItem('pIndex', String(turn.current));
                        turn.current++;
                        needRoll.current = true;
                        if(game.current === 'Breakout') {
                            window.open('/breakout','_blank');
                        }
                        else if(game.current === 'Baseball') {
                            window.open('/Baseball','_blank');
                        }
                        else if(game.current === 'snake') {
                            window.open('/snake','_blank');
                        }
                        else if(game.current === 'Tetris') {
                            window.open('/tetris','_blank');
                        }
                        else if(game.current === 'Connect Four') {
                            window.open('/connect4','_blank');
                        }
                    }
                }
            }
            if(!needRoll.current) {
                ctx.fillText(`Game: ${game.current}`, 350, 350);
                ctx.fillText(`Roll: ${num_roll.current}`,350,300);
                //ctx.fillText(`advance: ${localStorage.getItem('advance')}`,360,400);
                //ctx.fillText(`turn: ${turn.current}`,360,450);
                if(games.multiGames.includes(game.current)) {
                    ctx.fillText(`Against: ${players[multiPlayer.current].name}`, 350, 250);
                    //ctx.fillText(`Against: ${multiPlayer.current}`, 360, 220);
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