export default function playerStats(ctx,player1,player2,canvas) {
    ctx.font = "20px Helvetica";
    ctx.fillStyle = "white";
    ctx.fillText(`Name: ${player1.name}`, 20, 30);

    ctx.font = "20px Helvetica";
    ctx.fillStyle = "red";
    let gap = 300;
    for(let i = 0; i< player1.lives; i++) {
        ctx.fillText("♥",gap,30);
        gap+=30;
    }
    ctx.font = "20px Helvetica";
    ctx.fillStyle = "white";
    let newGap = 420;
    ctx.fillText(`Name: ${player2.name}`, newGap, 30);
    newGap+=300;
    ctx.font = "20px Helvetica";
    ctx.fillStyle = "red";
    for(let i = 0; i< player2.lives; i++) {
        ctx.fillText("♥",newGap,30);
        newGap+=30;
    }
}