

class Player {
    constructor() {
        this.score = 0
        this.pieceOut = false

    }

}

class Droplet {
    constructor(x, y, typeFill, player) {
        this.x = x
        this.y = y
        this.typeFill = typeFill
        this.active = true

        this.player = player


    }

    draw() {

        if (this.player == 'Left') {
            switch (this.typeFill) {


                case 'green':
                    c.drawImage(greenB, 24 + 68 * this.x, 68 * this.y, 68, 68)
                    break
                case 'blue':
                    c.drawImage(blueB, 24 + 68 * this.x, 68 * this.y, 68, 68)
                    break
                case 'red':
                    c.drawImage(redB, 24 + 68 * this.x, 68 * this.y, 68, 68)
                    break
            }
        }

        else {
            switch (this.typeFill) {


                case 'green':
                    c.drawImage(greenB, 24 + 68 * this.x + 520, 68 * this.y, 68, 68)
                    break
                case 'blue':
                    c.drawImage(blueB, 24 + 68 * this.x + 520, 68 * this.y, 68, 68)
                    break
                case 'red':
                    c.drawImage(redB, 24 + 68 * this.x + 520, 68 * this.y, 68, 68)
                    break
            }
        }

    }
}

class GameBoard {
    // player most likely denoted as just LEFT or RIGHT
    constructor(player) {

        this.player = player

        let boardPiece = {
            typeFill: 'null', // most likely just a plain color like green, red etc
            image: 'null' // will hold the exact image in memory
        }

        let col = []
        for (let i = 0; i < 13; ++i) {
            let row = []
            for (let j = 0; j < 7; ++j) {
                row.push({...boardPiece})
            }
            col.push(row)
        }

        this.array = col
        
    }

    draw() {
        if (this.player == 'Left') { // possible just change a single variable and then add it to both
            
            for (let i = 0; i < this.array.length; ++i) {
                for (let j = 0; j < this.array[i].length; ++j) {

                    if (this.array[i][j].typeFill == 'null') {
                        continue
                    }


                    else {

                        let colorIMG = undefined

                        switch (this.array[i][j].typeFill) {
                            case 'green':
                                colorIMG = greenB
                                break
                            case 'red':
                                colorIMG = redB
                                break
                            case 'blue':
                                colorIMG = blueB
                                break

                        }

                        c.drawImage(colorIMG, 24 + 68 * j, 68 * i, 68, 68)
                    }
                    
                }
            }
        }

        else {

            for (let i = 0; i < this.array.length; ++i) {
                for (let j = 0; j < this.array[i].length; ++j) {

                    if (this.array[i][j].typeFill == 'null') {
                        continue
                    }


                    else {

                        let colorIMG = undefined

                        switch (this.array[i][j].typeFill) {
                            case 'green':
                                colorIMG = greenB
                                break
                            case 'red':
                                colorIMG = redB
                                break
                            case 'blue':
                                colorIMG = blueB
                                break

                        }

                        c.drawImage(colorIMG, (24 + 68 * j) + 520, 68 * i, 68, 68)
                    }
                    
                }
            }






        }

    }
}

class Pill {
    // there will be two players
    constructor(player) {

        this.player = player
        //change thse for defaults depending on which player is playing    
        this.head = {x: 3, y: 0}
        this.tail = {x: 4, y: 0}

        // change these to not be capitalized
        this.position = 'Right' // positions can include up (main down) left right and down

        let randL = generateRandomInt(1, 4)
        let randR = generateRandomInt(1, 4)
        switch (randL) {
            case 1:
                this.headColor = 'green'
                break
            case 2:
                this.headColor = 'blue'
                break
            case 3:
                this.headColor = 'red'
                break
        }
        switch (randR) {
            case 1:
                this.tailColor = 'green'
                break
            case 2:
                this.tailColor = 'blue'
                break
            case 3:
                this.tailColor = 'red'
                break
        }
    }

    draw() { 
        if (this.player == "Left") {

            let imgH = redU
            let imgT = redU

            if (this.headColor == 'green') {

                switch (this.position) {
                    case 'Right':
                        imgH = greenL
                        break
                    case 'Left':
                        imgH = greenR
                        break
                    case 'Up':
                        imgH = greenD
                        break
                    case 'Down':
                        imgH = greenU
                        break
                }
            }
            if (this.headColor == 'blue') {

                switch (this.position) {
                    case 'Right':
                        imgH = blueL
                        break
                    case 'Left':
                        imgH = blueR
                        break
                    case 'Up':
                        imgH = blueD
                        break
                    case 'Down':
                        imgH = blueU
                        break
                }
            }
            if (this.headColor == 'red') {

                switch (this.position) {
                    case 'Right':
                        imgH = redL
                        break
                    case 'Left':
                        imgH = redR
                        break
                    case 'Up':
                        imgH = redD
                        break
                    case 'Down':
                        imgH = redU
                        break
                }
            }









            if (this.tailColor == 'green') {

                switch (this.position) {
                    case 'Right':
                        imgT = greenR
                        break
                    case 'Left':
                        imgT = greenL
                        break
                    case 'Up':
                        imgT = greenU
                        break
                    case 'Down':
                        imgT = greenD
                        break
                }
            }
            if (this.tailColor == 'blue') {

                switch (this.position) {
                    case 'Right':
                        imgT = blueR
                        break
                    case 'Left':
                        imgT = blueL
                        break
                    case 'Up':
                        imgT = blueU
                        break
                    case 'Down':
                        imgT = blueD
                        break
                }
            }

            if (this.tailColor == 'red') {

                switch (this.position) {
                    case 'Right':
                        imgT = redR
                        break
                    case 'Left':
                        imgT = redL
                        break
                    case 'Up':
                        imgT = redU
                        break
                    case 'Down':
                        imgT = redD
                        break
                }
            }

            c.drawImage(imgH, 24 + 68 * this.head.x, 68 * this.head.y, 68, 68)
            c.drawImage(imgT, 24 + 68 * this.tail.x, 68 * this.tail.y, 68, 68)


        }


        else {
            
            let imgH = redU
            let imgT = redU

            if (this.headColor == 'green') {

                switch (this.position) {
                    case 'Right':
                        imgH = greenL
                        break
                    case 'Left':
                        imgH = greenR
                        break
                    case 'Up':
                        imgH = greenD
                        break
                    case 'Down':
                        imgH = greenU
                        break
                }
            }
            if (this.headColor == 'blue') {

                switch (this.position) {
                    case 'Right':
                        imgH = blueL
                        break
                    case 'Left':
                        imgH = blueR
                        break
                    case 'Up':
                        imgH = blueD
                        break
                    case 'Down':
                        imgH = blueU
                        break
                }
            }
            if (this.headColor == 'red') {

                switch (this.position) {
                    case 'Right':
                        imgH = redL
                        break
                    case 'Left':
                        imgH = redR
                        break
                    case 'Up':
                        imgH = redD
                        break
                    case 'Down':
                        imgH = redU
                        break
                }
            }






            if (this.tailColor == 'green') {

                switch (this.position) {
                    case 'Right':
                        imgT = greenR
                        break
                    case 'Left':
                        imgT = greenL
                        break
                    case 'Up':
                        imgT = greenU
                        break
                    case 'Down':
                        imgT = greenD
                        break
                }
            }
            if (this.tailColor == 'blue') {

                switch (this.position) {
                    case 'Right':
                        imgT = blueR
                        break
                    case 'Left':
                        imgT = blueL
                        break
                    case 'Up':
                        imgT = blueU
                        break
                    case 'Down':
                        imgT = blueD
                        break
                }
            }

            if (this.tailColor == 'red') {

                switch (this.position) {
                    case 'Right':
                        imgT = redR
                        break
                    case 'Left':
                        imgT = redL
                        break
                    case 'Up':
                        imgT = redU
                        break
                    case 'Down':
                        imgT = redD
                        break
                }
            }

            c.drawImage(imgH, 24 + 68 * this.head.x+ 520, 68 * this.head.y, 68, 68)
            c.drawImage(imgT, 24 + 68 * this.tail.x+ 520, 68 * this.tail.y, 68, 68)

        }
        
        return
    }
    
}