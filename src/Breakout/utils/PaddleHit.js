export default function paddleHit(ball, paddleProps) {
    //check if ball hits paddle
    if (
        ball.x < paddleProps.x + paddleProps.width &&
        ball.x > paddleProps.x &&
        paddleProps.y < paddleProps.y + paddleProps.height &&
        ball.y+ball.rad > paddleProps.y - paddleProps.height/2
    ) {
        //reflect ball at angle dependent on hit location
        let collPoint = ball.x-(paddleProps.x+paddleProps.width/2);
        collPoint = collPoint/(paddleProps.width/2);
        let angle = (collPoint * Math.PI)/3

        ball.dx = ball.speed*Math.sin(angle);
        ball.dy = -ball.speed*Math.cos(angle);
    }
}