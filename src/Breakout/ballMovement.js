
export function ballMovement(ctx, ball) {
    let data = new Ball(ball.x,ball.y,ball.rad);
    data.draw(ctx);
    ball.x+=ball.dx;
    ball.y+=ball.dy;
}


class Ball {
    constructor(x,y,rad) {
        this.x=x;
        this.y=y;
        this.rad=rad;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "orange";
        ctx.arc(this.x,this.y,this.rad,0,2*Math.PI);
        ctx.strokeStyle = "black";
        ctx.strokeWidth = 2;
        ctx.fill();
        ctx.stroke();

    }

}