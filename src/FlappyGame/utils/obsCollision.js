export default function obsCollision(player, rocket)  {
    let distX = Math.abs(player.x+player.centerX-(rocket.x+rocket.height/2));
    //var distY = Math.abs(ball.y-rect.y-rect.height/2);
    let distY = Math.abs(player.y+player.centerY-(rocket.y+rocket.width/2));

    //ball non collision
    if(distX>player.hitboxRad + rocket.height/2) {
        return {
            hit: false,
        };
    }
    //ball non collision
    if(distY > player.hitboxRad +rocket.width/2) {
        return {
            hit: false,
        };
    }
    //ball Y collision
    if(distX<= player.hitboxRad) {
        return {
            hit: true,
            axis: "Y",
        };
    }
    //ball X collision
    if(distY <= player.hitboxRad) {
        return {
            hit: true,
            axis: "X",
        };
    }
    let dx = distX - player.hitboxRad;
    let dy = distY-player.hitboxRad;
    return {
        hit: dx*dx + dy*dy <= player.hitboxRad * player.hitboxRad,
        axis: "X",
    };


}