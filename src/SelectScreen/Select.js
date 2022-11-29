import React, {useEffect, useRef, useState} from "react";
import data from "./data";
import mainData from '../MainBoard/data'

export default function Select() {
    const canvasRef3 = useRef(null);
    //let timer = 0;
    //let offset = 180;
    let iters = 25;
    let alphaTracker = 0.6;
    //let {gameStuff} = mainData;
    let {star1,star2,star3,star4,star5,star6,star7,star8,star9,star10,star11,star12,entry_1} = data;
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
    const hasInput1 = useRef(false);
    //let name_1 = document.getElementById("name_one");
    const openInput = useRef(0);
    const nameText1 = useRef('');
    const nameText2 = useRef('');
    const nameText3 = useRef('');
    const nameText4 = useRef('');

    let numPlayers = 0;
    let passData = {numPlayers};

    useEffect(()=> {
        const canvas = canvasRef3.current;
        const ctx = canvas.getContext("2d");

        const render = () => {

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
            //functions to handle clicks
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
                //textbox for first name input
                if(numPlayers > 0 && x > 70 && y > 300 && x < 820 && y < 350) {
                    if (hasInput1.current) {
                        return;
                    }
                    openInput.current = 1;
                    addInput(rect.left+ 300,rect.top+320);
                    //addInput(event.clientX, event.clientY);
                }
                //textbox for second name input
                if(numPlayers > 1 && x > 70 && y > 370 && x < 820 && y < 420) {
                    if (hasInput1.current) {
                        return;
                    }
                    openInput.current = 2;
                    addInput(rect.left+ 300,rect.top+392);
                    //addInput(event.clientX, event.clientY);
                }
                //textbox for third name input
                if(numPlayers > 2 && x > 70 && y > 440 && x < 820 && y < 490) {
                    if (hasInput1.current) {
                        return;
                    }
                    openInput.current = 3;
                    addInput(rect.left+ 300,rect.top+460);
                    //addInput(event.clientX, event.clientY);
                }
                //textbox for fourth name input
                if(numPlayers > 3 && x > 70 && y > 510 && x < 820 && y < 560) {
                    if (hasInput1.current) {
                        return;
                    }
                    openInput.current = 4;
                    addInput(rect.left+ 300,rect.top+530);
                    //addInput(event.clientX, event.clientY);
                }
                //play button link
                //stores important values in local storage as string types
                if(numPlayers>0 && x > 671 && x < 671+139 && y > 31 && y < 132) {
                    //gameStuff.players = numPlayers;
                    localStorage.setItem("numPlayers", numPlayers);
                    if(nameText1.current.length > 0) {
                        localStorage.setItem("p1name", nameText1.current);
                    }
                    else {
                        localStorage.setItem("p1name", "PLAYER ONE");
                    }

                    if(numPlayers > 1) {
                        if(nameText2.current.length > 0) {
                            localStorage.setItem("p2name", nameText2.current);
                        }
                        else {
                            localStorage.setItem("p2name", "PLAYER TWO");
                        }
                    }
                    if(numPlayers > 2) {
                        if(nameText3.current.length > 0) {
                            localStorage.setItem("p3name", nameText3.current);
                        }
                        else {
                            localStorage.setItem("p3name", "PLAYER THREE");
                        }
                    }
                    if(numPlayers > 3) {
                        if(nameText4.current.length > 0) {
                            localStorage.setItem("p4name", nameText4.current);
                        }
                        else {
                            localStorage.setItem("p4name", "PLAYER FOUR");
                        }
                    }
                    window.location.href='/Board';
                }
            }
            ctx.drawImage(bg,0,0,canvas.width,canvas.height);
            ctx.fillStyle = "seashell";
            ctx.moveTo(100,100);

            //ctx.fillRect(10,10,200,200);
            function addInput(x, y) {

                let input = document.createElement('input');

                input.type = 'text';
                input.style.position = 'fixed';
                input.style.left = (x - 4) + 'px';
                input.style.top = (y - 4) + 'px';
                input.maxLength = 15;

                input.onkeydown = handleEnter;

                document.body.appendChild(input);

                input.focus();

                hasInput1.current = true;
            }
            function handleEnter(e) {
                let keyCode = e.keyCode;
                if (keyCode === 13) {
                    switch(openInput.current) {
                        case 1:
                            nameText1.current = this.value;
                            document.body.removeChild(this);
                            hasInput1.current = false;
                            openInput.current = 0;
                            break;
                        case 2:
                            nameText2.current = this.value;
                            document.body.removeChild(this);
                            hasInput1.current = false;
                            openInput.current = 0;
                            break;
                        case 3:
                            nameText3.current = this.value;
                            document.body.removeChild(this);
                            hasInput1.current = false;
                            openInput.current = 0;
                            break;
                        case 4:
                            nameText4.current = this.value;
                            document.body.removeChild(this);
                            hasInput1.current = false;
                            openInput.current = 0;
                            break;
                        default:
                            break;
                    }

                }
            }
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

            // draw stars and rerender once they go off screen
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
            //drawing inputted text
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 5;
            ctx.fillStyle = 'orange';
            ctx.font = '44px serif';
            if(numPlayers > 0) {
                ctx.strokeText(nameText1.current,300, 338);
                ctx.fillText(nameText1.current,300, 338);
            }
            if(numPlayers > 1) {
                ctx.strokeText(nameText2.current,300, 410);
                ctx.fillText(nameText2.current,300, 410);
            }
            if(numPlayers > 2) {
                ctx.strokeText(nameText3.current,300, 480);
                ctx.fillText(nameText3.current,300, 480);
            }
            if(numPlayers > 3) {
                ctx.strokeText(nameText4.current,300, 550);
                ctx.fillText(nameText4.current,300, 550);
            }
            requestAnimationFrame(render);
        }
        render();

    },[]);


    return (
        <div id="wrapper">
            <canvas
                id="select_canvas"
                onMouseMove={(event)=> {
                    buttonOver.x = event.clientX;
                    buttonOver.y = event.clientY;
                }}
                ref={canvasRef3}
                height={"600px"}
                width={"900px"}/>
                <div id="myname">
                    <input type="text" id="name" />
                    <button id="submitName">OK</button>
                </div>
        </div>);
}
