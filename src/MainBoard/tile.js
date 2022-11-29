export default function drawTokens(ctx, playerPos) {
    let tiles = [];
    let startTile = new tile(0,0);
    startTile.endTile = true;
    if(playerPos.includes(0)) {
        startTile.occupied = true;
        let i = 0;
        if(playerPos[i] === 0) {
            startTile.playerColors.push("red");
            startTile.players++;
        }
        i++;
        if(playerPos[i] === 0) {
            startTile.playerColors.push("cyan");
            startTile.players++;
        }
        i++
        if(playerPos[i] === 0) {
            startTile.playerColors.push("green");
            startTile.players++;
        }
        i++
        if(playerPos[i] === 0) {
            startTile.playerColors.push("yellow");
            startTile.players++;
        }
    }
    tiles.push(startTile);
    let tileNum = 1;
    //startTile.draw(ctx);
    let xPos = 0;
    let yPos = 100;
    while(yPos < 600) {
        let midTile = new tile(xPos,yPos);
        if(playerPos.includes(tileNum)) {
            midTile.occupied = true;
            let i = 0;
            if(playerPos[i] === tileNum) {
                midTile.playerColors.push("red");
                midTile.players++;
            }
            i++;
            if(playerPos[i] === tileNum) {
                midTile.playerColors.push("cyan");
                midTile.players++;
            }
            i++
            if(playerPos[i] === tileNum) {
                midTile.playerColors.push("green");
                midTile.players++;
            }
            i++
            if(playerPos[i] === tileNum) {
                midTile.playerColors.push("yellow");
                midTile.players++;
            }
        }
        tiles.push(midTile);
        tileNum++;
        yPos+=100;
    }
    yPos = 500;
    while (xPos < 900) {
        let edgeTile = new tile(xPos,yPos);
        if(playerPos.includes(tileNum)) {
            edgeTile.occupied = true;
            let i = 0;
            if(playerPos[i] === tileNum) {
                edgeTile.playerColors.push("red");
                edgeTile.players++;
            }
            i++;
            if(playerPos[i] === tileNum) {
                edgeTile.playerColors.push("cyan");
                edgeTile.players++;
            }
            i++
            if(playerPos[i] === tileNum) {
                edgeTile.playerColors.push("green");
                edgeTile.players++;
            }
            i++
            if(playerPos[i] === tileNum) {
                edgeTile.playerColors.push("yellow");
                edgeTile.players++;
            }
        }
        tiles.push(edgeTile);
        tileNum++;
        xPos+=100;
    }
    xPos = 800;
    while(yPos >= 0) {
        let rightTile = new tile(xPos,yPos);
        if(playerPos.includes(tileNum)) {
            rightTile.occupied = true;
            let i = 0;
            if(playerPos[i] === tileNum) {
                rightTile.playerColors.push("red");
                rightTile.players++;
            }
            i++;
            if(playerPos[i] === tileNum) {
                rightTile.playerColors.push("cyan");
                rightTile.players++;
            }
            i++
            if(playerPos[i] === tileNum) {
                rightTile.playerColors.push("green");
                rightTile.players++;
            }
            i++
            if(playerPos[i] === tileNum) {
                rightTile.playerColors.push("yellow");
                rightTile.players++;
            }
        }
        tiles.push(rightTile);
        tileNum++;
        yPos-=100;
    }
    yPos = 0;
    while (xPos > 0) {
        let topTile = new tile(xPos,yPos);
        if(playerPos.includes(tileNum)) {
            topTile.occupied = true;
            let i = 0;
            if(playerPos[i] === tileNum) {
                topTile.playerColors.push("red");
                topTile.players++;
            }
            i++;
            if(playerPos[i] === tileNum) {
                topTile.playerColors.push("cyan");
                topTile.players++;
            }
            i++
            if(playerPos[i] === tileNum) {
                topTile.playerColors.push("green");
                topTile.players++;
            }
            i++
            if(playerPos[i] === tileNum) {
                topTile.playerColors.push("yellow");
                topTile.players++;
            }
        }
        tiles.push(topTile);
        tileNum++;
        xPos-=100;
    }

    for(let drawtile in tiles) {
        tiles[drawtile].draw(ctx);
    }


}
class tile {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.players = 0;
        this.playerColors = [];
        this.occupied = false;
        this.endTile = false;
    }

    draw(ctx) {
        ctx.beginPath();
        if(this.players > 0) {
            if(this.playerColors.includes("red")) {
                ctx.beginPath();
                ctx.fillStyle = "red";
                ctx.arc(this.x+25,this.y+25,20,0,2*Math.PI);
                ctx.strokeStyle = "black";
                ctx.lineWidth = 2;
                ctx.fill();
                ctx.stroke();
            }
            if(this.playerColors.includes("cyan")) {
                ctx.beginPath();
                ctx.fillStyle = "cyan";
                ctx.arc(this.x+75,this.y+25,20,0,2*Math.PI);
                ctx.strokeStyle = "black";
                ctx.lineWidth = 2;
                ctx.fill();
                ctx.stroke();
            }
            if(this.playerColors.includes("green")) {
                ctx.beginPath();
                ctx.fillStyle = "green";
                ctx.arc(this.x+75,this.y+75,20,0,2*Math.PI);
                ctx.strokeStyle = "black";
                ctx.lineWidth = 2;
                ctx.fill();
                ctx.stroke();
            }
            if(this.playerColors.includes("yellow")) {
                ctx.beginPath();
                ctx.fillStyle = "yellow";
                ctx.arc(this.x+25,this.y+75,20,0,2*Math.PI);
                ctx.strokeStyle = "black";
                ctx.lineWidth = 2;
                ctx.fill();
                ctx.stroke();
            }
        }
    }
}