export default function drawScores(numPlayers, players, canvas, ctx) {

    let namePos = [150,200,250,300];

    ctx.lineWidth = 0.5;
    ctx.font = '22px sans-serif';
    ctx.strokeStyle = players[0].color;
    ctx.fillStyle = players[0].color;
    let offset = 60;
    ctx.fillText(players[0].name,130,namePos[players[0].place] + offset);
    ctx.strokeText(players[0].name,130,namePos[players[0].place]+ offset);
    ctx.fillText(players[0].score,130,namePos[players[0].place] + 25+ offset);
    ctx.strokeText(players[0].score,130,namePos[players[0].place] + 25+ offset);
    if(numPlayers > 1) {
        ctx.fillStyle = players[1].color;
        ctx.strokeStyle = players[1].color;
        ctx.fillText(players[1].name,130,namePos[players[1].place]+ offset);
        ctx.fillText(players[1].score,130,namePos[players[1].place] + 25+ offset);
        ctx.strokeText(players[1].name,130,namePos[players[1].place]+ offset);
        ctx.strokeText(players[1].score,130,namePos[players[1].place] + 25+ offset);
    }
    if(numPlayers > 2) {
        ctx.fillStyle = players[2].color;
        ctx.strokeStyle = players[2].color;
        ctx.fillText(players[2].name, 130, namePos[players[2].place]+ offset);
        ctx.strokeText(players[2].name, 130, namePos[players[2].place]+ offset);
        ctx.fillText(players[2].score,130,namePos[players[2].place] + 25+ offset);
        ctx.strokeText(players[2].score,130,namePos[players[2].place] + 25+ offset);
    }
    if(numPlayers > 3) {
        ctx.fillStyle = players[3].color;
        ctx.strokeStyle = players[3].color;
        ctx.fillText(players[3].name, 130, namePos[players[3].place]+ offset);
        ctx.fillText(players[3].score,130,namePos[players[3].place] + 25+ offset);
        ctx.strokeText(players[3].name, 130, namePos[players[3].place]+ offset);
        ctx.strokeText(players[3].score,130,namePos[players[3].place] + 25+ offset);
    }

    function compare(first,second) {
        if ( first.score < second.score ){
            return 1;
        }
        if ( first.score > second.score ){
            return -1;
        }
        return 0;
    }
    let dupPlayers = players;
    dupPlayers.sort(compare);
    for (let x in dupPlayers) {
        dupPlayers[x].place = x;
    }
}