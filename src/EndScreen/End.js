import React, {useEffect, useRef} from "react";

export default function End() {
    const canvasRef4 = useRef(null);
    let buttonOver = {
        x: 0,
        y: 0
    };
    let bg = new Image();
    bg.src = require('./Assets/clouds2.1Large.png');
    let backButton = new Image();
    backButton.src = require('./Assets/back2.png');
    let winner = localStorage.getItem('winner');
    let numPlayers = Number(localStorage.getItem('numPlayers'));
    let p1 = {
        name : localStorage.getItem('p1name'),
        score : Number(localStorage.getItem('p1score')),
        winner: winner === 'p1'
    }
    let players = [p1];
    if(numPlayers > 1) {
        let p2 = {
            name : localStorage.getItem('p2name'),
            score : Number(localStorage.getItem('p2score')),
            winner: winner === 'p2'
        }
        players.push(p2);
    }
    if (numPlayers > 2) {
        let p3 = {
            name : localStorage.getItem('p3name'),
            score : Number(localStorage.getItem('p3score')),
            winner: winner === 'p3'
        }
        players.push(p3);
    }
    if(numPlayers > 3) {
        let p4 = {
            name : localStorage.getItem('p4name'),
            score : Number(localStorage.getItem('p4score')),
            winner: winner === 'p4'
        }
        players.push(p4);
    }
    function compare(first,second) {

        if (second.winner || first.score < second.score ){
            return 1;
        }
        if ( first.winner || first.score > second.score ){
            return -1;
        }
        return 0;
    }
    let titles = ['Winner:', 'Second Place:', 'Third Place:', 'Fourth Place:'];
    let colors = ['red','cyan','green','yellow'];
    let offset = 0.03125;
    let bgGlobal = 1;
    let timer = 0;
    players.sort(compare);
    useEffect(()=> {
        const render = () => {
            timer++;
            const canvas = canvasRef4.current;
            const ctx = canvas.getContext('2d');
            const rect = canvas.getBoundingClientRect();
            ctx.clearRect(0, 0, 900, 600);

            ctx.globalAlpha = bgGlobal;
            ctx.drawImage(bg,0,0,900,600);
            ctx.globalAlpha = 1;
            ctx.font = '34px Sans Serif';
            for(let ind in players) {
                ctx.fillStyle = colors[ind];
                ctx.fillText( `${titles[ind]} ${players[ind].name}   ${String(players[ind].score)} Points`, 180, 100 + 100*ind);
                ctx.fillText(``, 200, 100 + 100*ind);
            }
            canvas.addEventListener('mousedown', function (e) {
                getCursorPosition(canvas, e);
            });


            function getCursorPosition(canvas, event) {
                //const rect = canvas.getBoundingClientRect();
                const x = event.clientX-rect.left;
                const y = event.clientY-rect.top;
                if(x > 390 && x < 391+138 && y > 451 && y < 451+100) {
                    window.location.href='/';
                }
            }
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.roundRect(390, 450, 140, 102, [30]);
            ctx.stroke();
            if(buttonOver.x-rect.left > 390 && buttonOver.x-rect.left < 391+138 && buttonOver.y-rect.top > 451 && buttonOver.y-rect.top < 451+100) {
                ctx.fillStyle = 'green';
            } else {
                ctx.fillStyle = 'gray';
            }
            ctx.fill();
            ctx.drawImage(backButton, 400, 480,123,36);
            requestAnimationFrame(render);
        }
        render();

    },[]);


    return (
        <canvas
            id="end_canvas"
            ref={canvasRef4}
            onMouseMove={(event) => {
                buttonOver.x = event.clientX;
                buttonOver.y = event.clientY;
            }}
            height={"600px"}
            width={"900px"}/>

    );
}