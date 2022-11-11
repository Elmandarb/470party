export default (ctx,canvas, props) => {
    class Plane {
        constructor(x,y) {
            this.x = x;
            this.y = y;
            this.height = 20;
            this.width = props.width;
            this.colors = ["black", "#FFA62B"];
        }

        move() {
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);


            /*ctx.fillStyle = this.broke ? "white" : "red";
            ctx.strokeStyle = this.broke ? "white" : "red";
            ctx.lineWidth = 1;
            ctx.fillStyle = this.broke ? "white" : this.colors[1];
            ctx.shadowBlur = 0;
            ctx.shadowColor = "blue"; */
            ctx.strokeRect(this.x, this.y, this.width, this.height);
            ctx.fill();
        }
    }

    let plane = new Plane(props.x,props.y,);
    plane.move();
    if(props.x <= 0) {
        props.x = 0;
    }
    else if (props.x+props.width >= canvas.width) {
        props.x = canvas.width - props.width;
    }
    else if(props.y+props.height >= canvas.height) {
        props.y = canvas.height - props.height;
    }
    else if(props.y <= 0) {
        props.y = 0;
    }
}
