export default (ctx,canvas, props) => {
    class Paddle {
        constructor(x) {
            this.x = x;
            this.y = canvas.height - 30;
            this.height = 20;
            this.width = props.width;
            this.colors = ["red", "#FFA62B"];
        }

        move() {
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = this.broke ? "white" : "red";
            ctx.strokeStyle = this.broke ? "white" : "red";
            ctx.lineWidth = 1;
            ctx.fillStyle = this.broke ? "white" : this.colors[1];
            ctx.shadowBlur = 0;
            ctx.shadowColor = "blue";
            ctx.strokeRect(this.x, this.y, this.width, this.height);
            ctx.fill();
        }
    }

    let paddle = new Paddle(props.x);
    paddle.move();
    if(props.x <= 0) {
        props.x = 0;
    }
    else if (props.x+props.width >= canvas.width) {
        props.x = canvas.width - props.width;
    }
}
