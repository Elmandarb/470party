export default function wallHit(canvas,player) {
    if(player.y+player.centerY+player.hitboxRad > canvas.height) {

        //player.lives--;
        player.dy *= -.5
        player.y -= 5;
        //player.dy *=-1;
    }
    if(player.y +player.centerY-player.hitboxRad <= 0) {
        player.dy *=-.5;
        player.y += 5;
    }
    if(player.x +player.centerX- player.hitboxRad < 0) {
        player.dx *=-.5;
        player.x += 5;
    }
    if(player.x+player.centerX+player.hitboxRad > canvas.width) {
        player.dx *=-.5;
        player.x -= 5;
    }
}