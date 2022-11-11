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
    useEffect(()=> {
        const render = () => {
            const canvas = canvasRef2.current;
            const ctx = canvas.getContext('2d');

            //Background animation start
            if(offset == 3) {
                scroll++;
                offset = 0;
            }else {
                offset++;
            }
            if(scroll == 1800) {
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
            ctx.rect();
            ctx.roundRect(3,3,3,3,3);
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
            height={"600px"}
            width={"900px"}/>

    );
}