export default function collisionDetect(ball, rect)  {
    var distX = Math.abs(ball.x-rect.x-rect.width/2);
    var distY = Math.abs(ball.y-rect.y-rect.height/2);
    //ball non collision
    if(distX>rect.width/2 + ball.rad) {
        return {
            hit: false,
        };
    }
    //ball non collision
    if(distY > rect.height/2 +ball.rad) {
        return {
            hit: false,
        };
    }
    //ball Y collision
    if(distX<=rect.width/2) {
        return {
            hit: true,
            axis: "Y",
        };
    }
    //ball X collision
    if(distY <= rect.height/2) {
        return {
            hit: true,
            axis: "X",
        };
    }
    var dx = distX - rect.width/2;
    var dy = distY-rect.height/2;
    return {
        hit: dx*dx + dy*dy <= ball.rad * ball.rad,
        axis: "X",
    };


}