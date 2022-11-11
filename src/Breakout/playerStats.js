export default function playerStats(ctx,player,canvas) {
    ctx.font = "20px Helvetica";
    ctx.fillStyle = "white";
    ctx.fillText(`Name: ${player.name}`, 20, 30);

    ctx.font = "20px Helvetica";
    ctx.fillStyle = "red";
    let gap = 0;
    for(let i = 0; i< player.lives; i++) {
        ctx.fillText("♥",canvas.width/2 + gap,30);
        gap+=30;
    }
    ctx.font = "20px Helvetica";
    if(player.score < player.winScore) {
        ctx.fillStyle = "red";
    }
    else {
        ctx.fillStyle = "green";
    }
    ctx.fillText(`Score: ${player.score}`, canvas.width - 140,30);
}