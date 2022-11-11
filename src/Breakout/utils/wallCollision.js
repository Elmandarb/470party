import playerStats from "../playerStats";

export default function wallCollision(ball, canvas,player) {
    if(ball.y+ball.rad > canvas.height) {
        player.lives--;
        ball.dy *=-1;
    }
    if(ball.y - ball.rad <= 0) {
        ball.dy *=-1;
    }
    if(ball.x - ball.rad < 0 || ball.x+ball.rad > canvas.width) {
        ball.dx *=-1;
    }
}