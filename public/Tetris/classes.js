
let arrowArr = [ [0, 4], [0, 5], [0, 6], [1, 5] ]



let tetronimos = [

    
    {
        type: 'arrow',
        arr: [ [0, 4], [0, 5], [0, 6], [1, 5] ],
        midpoint: 1, // relating to [0, 5] (the point that stays constant upon rotation)
        color: 'orange'
    },
    
    
    {
        type: 'block',
        arr: [ [0, 4], [0, 5], [1, 4], [1, 5] ],
        midpoint: -1, 
        color: 'yellow'
    },

    {
        type: 'S',
        arr: [ [0, 4], [0, 5], [1, 3], [1, 4] ],
        midpoint: 2, 
        color: 'green'
    },

    {
        type: 'Z',
        arr: [ [0, 4], [0, 5], [1, 5], [1, 6] ],
        midpoint: 2,
        color: 'red'
    },

    {
        type: 'L',
        arr: [ [0, 4], [1, 4], [2, 4], [2, 5] ],
        midpoint: 1, 
        color: 'purple'
    },


    {
        type: 'J',
        arr: [ [0, 5], [1, 5], [2, 5], [2, 4] ],
        midpoint: 1,
        color: 'brown'
    },

    {
        type: 'line',
        arr: [ [0, 5], [1, 5], [2, 5], [3, 5] ],
        midpoint: 2,
        color: 'blue'
    },


]

class Tetronimo {
    constructor(tetronimo) {

        this.tetronimo = tetronimo

        this.nextTetronimo = tetronimos[Math.floor(Math.random()*tetronimos.length)]

        this.staticArr = JSON.parse(JSON.stringify(this.tetronimo.arr))
        this.arr = JSON.parse(JSON.stringify(this.tetronimo.arr))
        
        this.type = this.tetronimo.type
        this.color = this.tetronimo.color
        this.midpoint = this.tetronimo.midpoint

        this.spinAmount = 0

    }


    move(dir) {
        switch(dir) {

            

            case 'left':
                let ableL = true
                for (let i = 0; i < this.arr.length; ++i) {
                    if (this.arr[i][1] == 0) {
                        ableL = false
                    }

                    
                    if (this.arr[i][1] != 0 &&  board.array[this.arr[i][0]][this.arr[i][1] - 1] != 'null') {
                        ableL = false
                    }


                }

                if (ableL) {
                    for (let i = 0; i < this.arr.length; ++i) {
                        this.arr[i][1] -= 1
                    }
                }
                break

            
            case 'right':
                let ableR = true
                for (let i = 0; i < this.arr.length; ++i) {
                    if (this.arr[i][1] == 9) {
                        ableR = false
                    }
                    
                    if (this.arr[i][1] != 9 && board.array[this.arr[i][0]][this.arr[i][1] + 1] != 'null') {
                        ableR = false
                    }

                }

                if (ableR) {
                    for (let i = 0; i < this.arr.length; ++i) {
                        this.arr[i][1] += 1
                    }
                }
                break





        }
    }


    rotate() {

        if (this.type == 'block') {
            return
        }

        let arrCopy = JSON.parse(JSON.stringify(this.arr))

        if (this.spinAmount == 4) {
            this.spinAmount = 0
        }

        if (this.spinAmount == 0) {
            for (let i = 0; i < 4; ++i) {
                this.arr[i][1] = this.staticArr[i][0] - arrCopy[1][1]
                this.arr[i][0] = -1 * this.staticArr[i][1] - arrCopy[1][0]
            }
        }

        else if (this.spinAmount == 1) {
            for (let i = 0; i < 4; ++i) {
                this.arr[i][1] = -1 * this.staticArr[i][1] - arrCopy[1][1]
                this.arr[i][0] = -1 * this.staticArr[i][0] - arrCopy[1][0]
            }
        }

        else if (this.spinAmount == 2) {
            for (let i = 0; i < 4; ++i) {
                this.arr[i][1] = -1 * this.staticArr[i][0] - arrCopy[1][1]
                this.arr[i][0] = this.staticArr[i][1] - arrCopy[1][0]
            }
        }
        else if (this.spinAmount == 3) {
            for (let i = 0; i < 4; ++i) {
                this.arr[i][1] = this.staticArr[i][1] - arrCopy[1][1]
                this.arr[i][0] = this.staticArr[i][0] - arrCopy[1][0]
            }
        }

        // do the rotation check after both rotations have been completed

        /*
        let allowed = true
        console.log(board.array)
        for (let i = 0; i < this.arr.length; ++i) {

            if (board.array[this.arr[i][0]][this.arr[i][1]] != 'null') {
                allowed = false
            }


        }

        if (!allowed) {
            this.arr = JSON.parse(JSON.stringify(this.arrCopy))
        }
        */

    }







    draw() {
        for (let i = 0; i < this.arr.length; ++i) {

            drawSquare(this.arr[i][1], this.arr[i][0], this.color)
        }
    }


    drawNext() {

        

        for (let i = 0; i < this.arr.length; ++i) {
            drawSquareNext(this.nextTetronimo.arr[i][1], this.nextTetronimo.arr[i][0], this.nextTetronimo.color)
        }
    }

}




class Board {
    constructor() {

        this.array = []

        
        for (let i = 0; i < 20; ++i) {
            let slice = []
            for (let j = 0; j < 10; ++j) {
                slice.push('null')
            }
            this.array.push(slice)
        }
        
    }

    draw() {

        for (let i = 0; i < this.array.length; ++i) {
            for (let j = 0; j < this.array[i].length; ++j) {



                drawSquare(j, i, this.array[i][j])

                



            }
        }


    }




}