
class Paddle {
    constructor(side) {

        this.side = side

        this.y = [100, 250]
        if (side == 'left') {
            this.x = 50
        }

        else {
            this.x = canvas.width - 50
        }

    }

    draw() {
        if (this.side == 'left') {
            c.fillStyle = 'white'
            c.fillRect(this.x, this.y[0], 20, 150)
        }
        else {
            c.fillStyle = 'white'
            c.fillRect(this.x - 20, this.y[0], 20, 150)
        }

    }

    move(direction) {

        if (direction == 'u') {
            this.y[0] -= 12
            this.y[1] -= 12
        }

        if (direction == 'd') {
            this.y[0] += 12
            this.y[1] += 12
        }

    }


}

class Ball {
    constructor() {

        if (generateRandomInt(1,3) == 1) {

            if (generateRandomInt(1,3) == 1) {
                this.direction = 'NE'
            }
            else {
                this.direction = 'NW'
            }

        }
        else {
            if (generateRandomInt(1,3) == 1) {
                this.direction = 'SE'
            }
            else {
                this.direction = 'SW'
            }
        }


        this.y = generateRandomInt(50, 500)
        this.x = canvas.width/2 - 10



    }

    draw() {
        c.fillStyle = 'white'
        c.fillRect(this.x, this.y, 20, 20)
    }


    // pl pr is paddle left and paddle right
    update(pL, pR) {


        // out of bounds / point scored
        if (this.x < -20) {
            score2 += 1
            ball = new Ball()
            return
        }
        if (this.x > 1024) {
            score1 += 1
            ball = new Ball()
            return
        }



        // covers left
        if ( (this.x >= 50 && this.x <= 70) && (this.y >= pL.y[0] && this.y + 20 <= pL.y[1]) ) {

            if (this.direction == 'NW') {
                this.direction = 'NE'
                this.x += 10
                
            }

            else {
                this.direction = 'SE'
                this.x += 10
                
            }


        }

        // covers right
        if ( (this.x >= pR.x - 20 - 20 && this.x <= pR.x) && (this.y >= pR.y[0] && this.y + 20 <= pR.y[1]) ) {

            if (this.direction == 'NE') {
                this.direction = 'NW'
                this.x -= 10
                
            }

            else {
                this.direction = 'SW'
                this.x -= 10
                
            }



        }

        // covers the walls
        if (this.y <= 0) {
            if (this.direction == 'NE') {
                this.direction = 'SE'
                this.y += 8
                
            }
            else {
                this.direction = 'SW'
                this.y += 8
                
            }
        }
        if (this.y >= 576 - 20) {
            if (this.direction == 'SE') {
                this.direction = 'NE'
                this.y -= 8
                
            }
            else {
                this.direction = 'NW'
                this.y -= 8
                
            }
        }

        
        switch (this.direction) {

            case 'NE':
                this.y -= 4
                this.x += 4
                break
                
            case 'NW':
                this.y -= 4
                this.x -= 4
                break
            case 'SE':
                this.y += 4
                this.x += 4
                break
            case 'SW':
                this.y += 4
                this.x -= 4
                break
        }
    }
}