import React, {useEffect, useRef} from "react";
import data from "./data";
export default function Select() {
    const canvasRef3 = useRef(null);
    //let timer = 0;
    //let offset = 180;
    let iters = 25;
    let alphaTracker = 0.6;
    let {star1,star2,star3,star4,star5,star6,star7,star8,star9,star10,star11,star12} = data;
    let stars = [star1,star2,star3,star4,star5,star6,star7,star8,star9,star10,star11,star12];
    let bg = new Image();
    bg.src = require('./assets/nightskycolor.png');
    let playerSelect = new Image();
    playerSelect.src = require('./assets/playerselect.png');
    let player1 = new Image();
    player1.src = require('./assets/1p.png');
    let player2 = new Image();
    player2.src = require('./assets/2p.png');
    let player3 = new Image();
    player3.src = require('./assets/3p.png');
    let player4 = new Image();
    player4.src = require('./assets/4p.png');
    let name1 = new Image();
    name1.src = require('./assets/p1name.png');
    let name2 = new Image();
    name2.src = require('./assets/p2name.png');
    let name3 = new Image();
    name3.src = require('./assets/p3name.png');
    let name4 = new Image();
    name4.src = require('./assets/p4name.png');
    let playButton = new Image();
    playButton.src = require('../HomeScreen/Assets/play.png');
    let buttonOver = {
        x:0,
        y:0
    };
    let numPlayers = 0;
    useEffect(()=> {
        const render = () => {
            const canvas = canvasRef3.current;
            const ctx = canvas.getContext("2d");
            ctx.globalAlpha = 1;
            const rect = canvas.getBoundingClientRect();
            const gradient = ctx.createRadialGradient(450, 700, 150, 450, 700, 800);
            gradient.addColorStop(0, "midnightblue");
            //gradient.addColorStop(0.2,"midnightblue");
            gradient.addColorStop(1, "black");

            ctx.fillStyle = gradient;
            ctx.clearRect(0,0,900,600);
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = alphaTracker;
            canvas.addEventListener('mousedown', function(e) {
                getCursorPosition(canvas, e);
            });
            function getCursorPosition(canvas, event) {
                const rect = canvas.getBoundingClientRect();
                const x = event.clientX-rect.left;
                const y = event.clientY-rect.top;
                if(x > 73 && x < 212 && y > 166 && y < 266) {
                    numPlayers = 1;
                }
                if(x > 273 && x < 273+139 && y > 166 && y < 267) {
                    numPlayers = 2;
                }
                if(x > 473 && x < 473+139 && y > 166 && y < 267) {
                    numPlayers = 3;
                }
                if(x > 673 && x < 673+139 && y > 166 && y < 267) {
                    numPlayers = 4;
                }
                if(numPlayers>1 && x > 671 && x < 671+139 && y > 31 && y < 132) {
                    window.location.href='/Board';
                }
            }
            ctx.drawImage(bg,0,0,canvas.width,canvas.height);
            ctx.fillStyle = "seashell";
            ctx.moveTo(100,100);

            //ctx.fillRect(10,10,200,200);

            for(let i = iters; i > 0; i--) {
                if(i === 25) {
                    ctx.globalAlpha = 1;
                }
                else if(i > 20) {
                    ctx.globalAlpha = 0.75;
                }
                else if(i > 15) {
                    ctx.globalAlpha = 0.5;
                }
                else if(i > 10) {
                    ctx.globalAlpha = 0.25;
                }
                else if(i > 5) {
                    ctx.globalAlpha = 0.125;
                }
                else {
                    ctx.globalAlpha = 0.0625
                }
                //ctx.globalAlpha = i/iters;
                //stars.forEach(draw_star());
                for(const element of stars) {

                    ctx.beginPath();
                    ctx.arc(element.starX+i*element.dx,element.starY+i*element.dy,element.star_rad,0,2 * Math.PI);
                    ctx.fill();
                }

            }

            ctx.stroke();
            //timer++;

            let element;
            for(element of stars) {
                element.starX+=element.dx;
                element.starY+=element.dy;
                if(element.starX > canvas.width+50 || element.starY > canvas.height+70 || element.starX < -80 || element.starY < -50) {
                    //element.starX = Math.random()*900;
                    if(Math.random() > 0.5) {
                        element.starX = Math.random()*900;
                        if(Math.random() > 0.5) {
                            element.starY = 0;
                            element.star_rad = Math.random()*2;
                            element.dy = Math.random()*0.5 + 0.5;
                            if(Math.random() > 0.5) {
                                element.dx = Math.random()*1.4;
                            } else {
                                element.dx = -Math.random()*1.4;
                            }
                        }
                        else {
                            element.starY = 600;
                            element.star_rad = Math.random()*2;
                            element.dy = -Math.random()*0.5 - 0.5;
                            if(Math.random() > 0.5) {
                                element.dx = Math.random()*1.4;
                            } else {
                                element.dx = -Math.random()*1.4;
                            }
                        }
                    }
                    else {
                        element.starY = Math.random()*600;
                        if(Math.random() > 0.5) {
                            element.starX = 0;
                            element.star_rad = Math.random()*2;
                            element.dx = Math.random()*0.5 + 0.5;
                            if(Math.random() > 0.5) {
                                element.dy = Math.random()*1.4;
                            } else {
                                element.dy = -Math.random()*1.4;
                            }
                        }
                        else {
                            element.starX = 900;
                            element.star_rad = Math.random()*2;
                            element.dx = -Math.random()*0.5 - 0.5;
                            if(Math.random() > 0.5) {
                                element.dy = Math.random()*1.4;
                            } else {
                                element.dy = -Math.random()*1.4;
                            }
                        }
                    }
                }
            }
            ctx.globalAlpha = 1;
            ctx.drawImage(playerSelect, 78.5,50,557.25,54);
            if(numPlayers !== 0) {
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 10;
                ctx.beginPath();
                ctx.roundRect(670, 30, 140, 102, [30]);
                ctx.stroke();
                if(buttonOver.x-rect.left > 671 && buttonOver.x-rect.left < 671+139 && buttonOver.y-rect.top > 31 && buttonOver.y-rect.top < 132) {
                    ctx.fillStyle = 'green';
                } else {
                    ctx.fillStyle = 'gray';
                }
                ctx.fill();
                ctx.drawImage(playButton, 680, 60,123,36);

            }
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.roundRect(72, 165, 140, 102, [30]);
            ctx.stroke();

            //buttonOver.x-=rect.left;
            //buttonOver.y-=rect.top;
            if((buttonOver.x-rect.left > 73 && buttonOver.x-rect.left < 212 && buttonOver.y-rect.top > 166 && buttonOver.y-rect.top < 266) || numPlayers === 1) { //384
                ctx.fillStyle = 'green';
            } else {
                ctx.fillStyle = 'gray';
            }
            ctx.fill();
            ctx.drawImage(player1, 78.5, 180);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.roundRect(272, 165, 140, 102, [30]);
            ctx.stroke();
            if((buttonOver.x-rect.left > 273 && buttonOver.x-rect.left < 273+139 && buttonOver.y-rect.top > 166 && buttonOver.y-rect.top < 267)|| numPlayers === 2) { //384
                ctx.fillStyle = 'green';
            } else {
                ctx.fillStyle = 'gray';
            }
            ctx.fill();
            ctx.drawImage(player2, 278.5, 180);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.roundRect(472, 165, 140, 102, [30]);
            ctx.stroke();
            if((buttonOver.x-rect.left > 473 && buttonOver.x-rect.left < 473+139 && buttonOver.y-rect.top > 166 && buttonOver.y-rect.top < 267)|| numPlayers === 3) { //384
                ctx.fillStyle = 'green';
            } else {
                ctx.fillStyle = 'gray';
            }
            ctx.fill();
            ctx.drawImage(player3, 482.5, 180);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.roundRect(672, 165, 140, 102, [30]);
            ctx.stroke();
            if((buttonOver.x-rect.left > 673 && buttonOver.x-rect.left < 673+139 && buttonOver.y-rect.top > 166 && buttonOver.y-rect.top < 267)|| numPlayers === 4) { //384
                ctx.fillStyle = 'green';
            } else {
                ctx.fillStyle = 'gray';
            }
            ctx.fill();
            ctx.drawImage(player4, 678.5, 180);

            //name boxes
            if(numPlayers>0) {
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 10;
                ctx.beginPath();
                ctx.roundRect(70, 300, 750, 50, [20]);
                ctx.stroke();
                ctx.fillStyle = 'gray';
                ctx.fill();
                ctx.drawImage(name1,78.5,310, 188.4,28.4);
            }
            if(numPlayers > 1) {
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 10;
                ctx.beginPath();
                ctx.roundRect(70, 370, 750, 50, [20]);
                ctx.stroke();
                ctx.fillStyle = 'gray';
                ctx.fill();
                ctx.drawImage(name2,78.5,380, 188.4,28.4);
            }
            if(numPlayers > 2) {
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 10;
                ctx.beginPath();
                ctx.roundRect(70, 440, 750, 50, [20]);
                ctx.stroke();
                ctx.fillStyle = 'gray';
                ctx.fill();
                ctx.drawImage(name3,78.5,450, 188.4,28.4);
            }
            if(numPlayers > 3) {
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 10;
                ctx.beginPath();
                ctx.roundRect(70, 510, 750, 50, [20]);
                ctx.stroke();
                ctx.fillStyle = 'gray';
                ctx.fill();
                ctx.drawImage(name4,78.5,520, 188.4,28.4);
            }

            requestAnimationFrame(render);
        }
        render();

    },[]);


    return (<canvas
        id="select_canvas"
        onMouseMove={(event)=> {
            buttonOver.x = event.clientX;
            buttonOver.y = event.clientY;
        }}
        ref={canvasRef3}
        height={"600px"}
        width={"900px"}/>);
}