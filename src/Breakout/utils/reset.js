export default function resetBall(ball,canvas,paddleProps) {
    ball.x = paddleProps.x-canvas.width/2 +paddleProps.width - 30;
    ball.y = paddleProps.y-10;
    ball.dx = 3;
    ball.dy = -3;
}