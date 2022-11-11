export default function CreateBrick(level,bricks,canvas,brick) {
    brick.width = canvas.width/5-1;
    let newBricks = [];
    if(!bricks) {
        return [];
    }
    if(bricks.length >=5 * level) {
        return;
    }
    for(let i = 0; i< 5*level; i++) {
        let newBrick = new Brick(
            brick.x+brick.width,
            brick.y,
            brick.width,
            brick.height,
            brick.colors
        );
        newBricks.push(newBrick);
        brick.x += brick.width+1;
        if(brick.x +brick.width >= canvas.width) {
            brick.x = 0.5;
            brick.y += brick.height+1;
        }
    }
    return newBricks;
}
class Brick {
    constructor(x,y, width,height,color) {
        this.x = x-width;
        this.y = y;
        this.width = width;
        this.height = height;
        this.colors = color;
        this.density = 1;
        this.broken = false;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.width,this.height);
        ctx.fillStyle = this.broken ? "#000000" : this.colors[this.density];
        ctx.strokeStyle = this.broken ? "#000000" : "#000000";
        ctx.lineWidth = 5;
        ctx.fillStyle = this.broken ? "#000000" : this.colors[this.density];
        ctx.shadowBlur = 0;
        ctx.shadowColor = "black";
        ctx.strokeRect(this.x,this.y,this.width,this.height);
        ctx.fill();
    }
}