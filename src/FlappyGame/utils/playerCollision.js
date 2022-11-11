export default function playerCollision(player1, player2)  {

    let distX = Math.abs(player1.x+player1.centerX-(player2.x+player2.centerX));

    let distY = Math.abs(player1.y+player1.centerY-(player2.y+player2.centerY));

    //player non collision
    if(distX>player1.hitboxRad + player2.hitboxRad) {
        return {
            hit: false,
        };
    }

    //player non collision
    if(distY > player1.hitboxRad +player2.hitboxRad) {
        return {
            hit: false,
        };
    }

    //player Y collision
    if(distX<= player2.hitboxRad) {
        return {
            hit: true,
            axis: "Y",
        };
    }
    //player X collision
    if(distY <= player2.hitboxRad) {
        return {
            hit: true,
            axis: "X",
        };
    }
    let dx = distX - player2.hitboxRad;
    let dy = distY-player2.hitboxRad;
    return {
        hit: dx*dx + dy*dy <= player1.hitboxRad * player1.hitboxRad,
        axis: "X",
    };


}