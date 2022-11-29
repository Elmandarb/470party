export default function drawNext(numPlayers, players, turn, ctx) {
    if(turn === players[0].turnOrder) {
        ctx.fillStyle = players[0].color;
        ctx.strokeStyle = players[0].color;
        ctx.fillText(`Player Up: ${players[0].name}`,340, 150);
        ctx.strokeText(`Player Up: ${players[0].name}`,340, 150);
    }
    else if(numPlayers > 1 && turn === players[1].turnOrder) {
        ctx.fillStyle = players[1].color;
        ctx.strokeStyle = players[1].color;
        ctx.fillText(`Player Up: ${players[1].name}`,340, 150);
        ctx.strokeText(`Player Up: ${players[1].name}`,340, 150);
    }
    else if(numPlayers > 2 && turn === players[2].turnOrder) {
        ctx.fillStyle = players[2].color;
        ctx.strokeStyle = players[2].color;
        ctx.fillText(`Player Up: ${players[2].name}`,340, 150);
        ctx.strokeText(`Player Up: ${players[2].name}`,340, 150);
    }
    else if(numPlayers > 3 && turn === players[3].turnOrder) {
        ctx.fillStyle = players[3].color;
        ctx.strokeStyle = players[3].color;
        ctx.fillText(`Player Up: ${players[3].name}`,340, 150);
        ctx.strokeText(`Player Up: ${players[3].name}`,340, 150);
    }
}