import React, {useEffect, useRef} from "react";



export default function Home() {
    const canvasRef2 = useRef(null);
    const bg = new Image();
    bg.src = require('./Assets/sky1.png');
    const bg2 = new Image();
    bg2.src = require('./Assets/sky2.png');
    const title = new Image();
    title.src = require('./Assets/title.png');
    const play = new Image();
    play.src = require('./Assets/play.png');
    const highScores = new Image();
    highScores.src = require('./Assets/scores.png');
    let scroll = 0;
    let offset = 0;
    let buttonOver = {
        x:0,
        y:0
    };



    useEffect(()=> {
        const render = () => {
            const canvas = canvasRef2.current;
            const ctx = canvas.getContext('2d');
            canvas.addEventListener('mousedown', function(e) {
                getCursorPosition(canvas, e);
            });
            function getCursorPosition(canvas, event) {
                //const rect = canvas.getBoundingClientRect();
                const x = event.clientX;
                const y = event.clientY;
                if(x > 315 && x < 590 && y > 370 && y < 480) {
                    window.location.href='/select';
                }
                if(x > 250 && x < 660 && y > 520 && y < 635) {
                    window.location.href='/Scores';
                }
                console.log("x: " + x + " y: " + y);
            }

            //Background animation start
            if(offset === 3) {
                scroll++;
                offset = 0;
            }else {
                offset++;
            }
            if(scroll === 1800) {
                scroll = 0;
            }
            if(scroll > 900) {
                ctx.drawImage(bg,1800-scroll,0,canvas.width,canvas.height);

            }
            else {
                ctx.drawImage(bg,0-scroll,0,canvas.width,canvas.height);
            }
            ctx.drawImage(bg2,900-scroll,0,canvas.width,canvas.height);
            //end background animation

            ctx.drawImage(title,1,100);
            //ctx.rect();
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.roundRect(312, 285, 276, 102, [30]);
            ctx.stroke();
            if(buttonOver.x > 315 && buttonOver.x < 590 && buttonOver.y > 370 && buttonOver.y < 480) { //384
                ctx.fillStyle = 'green';
            } else {
                ctx.fillStyle = 'gray';
            }
            ctx.fill();
            ctx.beginPath();
            ctx.roundRect(247.5, 435, 405, 102, [30]);
            ctx.stroke();
            if(buttonOver.x > 250 && buttonOver.x < 660 && buttonOver.y > 520 && buttonOver.y < 635) { //384
                ctx.fillStyle = 'green';
            } else {
                ctx.fillStyle = 'gray';
            }
            ctx.fill();

            ctx.drawImage(play,327,300);
            ctx.drawImage(highScores,262.5,450);

            requestAnimationFrame(render);
        }
        render();

    },[]);

    return (
        <canvas
            id="home_canvas"
            ref={canvasRef2}
            onMouseMove={(event)=> {
                buttonOver.x = event.clientX;
                buttonOver.y = event.clientY;
            }}
            height={"600px"}
            width={"900px"}/>

    );
}