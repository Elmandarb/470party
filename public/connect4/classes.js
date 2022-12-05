
let tempArr = []
//board is 7 hori 6 vert
for (let i = 0; i < 6; ++i) {
    let slice = []
    for (let j = 0; j < 7; ++j) {

        slice.push('white')

    }
    tempArr.push(slice)
    
}

class Board {
    constructor(arr) {
        this.array = arr
    }


    draw() {
        c.fillStyle = 'khaki'
        c.fillRect(0, 100, 7 * 100, 6 * 100)

        // circle draws starting at the middle
        //drawCircle(c, 50, 50, 50, 'khaki', 'black', 2)


        for (let i = 0; i < board.array.length; ++i) {
            for (let j = 0; j < board.array[i].length; ++j) {

                drawCircle(c, j * 100 + 50, i * 100 + 50 + 100, 50, board.array[i][j], 'black', 2)





            }
        }



    }


}

class Player {


    constructor() {
        this.currentPiece = 'null'
    }



}

class DropTokens {
    
    constructor() {
        this.tokens = [
            {
                array: [10, 110],
                token: 0
            },
            {
                array: [110, 210],
                token: 1
            },
            {
                array: [210, 310],
                token: 2
            },
            {
                array: [310, 410],
                token: 3
            },
            {
                array: [410, 510],
                token: 4
            },
            {
                array: [510, 610],
                token: 5
            },
            {
                array: [610, 710],
                token: 6
            },
        ]
    }

    update(x, y) {

        let tokenFound = 'null'

        // if it's a section y wise
        if (y < 110 && y > 10) {



            for (let i = 0; i < this.tokens.length; ++i) {


                if (this.tokens[i].array[0] < x && this.tokens[i].array[1] > x) {
                    tokenFound = i
                }

            }

            if (tokenFound != 'null') {
                player.currentPiece = tokenFound

                drawCircle(c, tokenFound * 100 + 50, 0 + 50, 50, 'blue', 'black', 2)



                return 

            }

            else {
                player.currentPiece = 'null'
            }    
        
        }

        else {
            player.currentPiece = 'null'
            return
        }

    }


}