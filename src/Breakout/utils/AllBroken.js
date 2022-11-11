import data from "../data";
export default function allBroken(bricks, player,canvas,ball) {
    let total = 0;
    let {brick} = data;
    for (let i = 0; i < bricks.length; i++) {
        if(bricks[i].broken === true) {
            total++;
        }
    }
    //check if all bricks are broken, if yes increment
    // level set up new board and put ball in middle
    if(total === bricks.length) {
        player.level++;
        ball.y = canvas.height-100;
        brick.y = 50;
    }
}