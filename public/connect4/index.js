// Prelim
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d', {willReadFrequently: true})
//board is 7 hori 6 vert



canvas.width = 700
canvas.height = 900
c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)

// from https://www.delftstack.com/howto/javascript/javascript-random-number-between/#:~:text=Generate%20a%20Random%20Number%20Between%20Two%20Numbers%20in,is%20a%20random%20number%20between%20min%20and%20max.
function generateRandomInt(min,max){
    return Math.floor((Math.random() * (max-min)) +min);
}

let board = new Board(tempArr)
let dropTokens = new DropTokens()
let player = new Player()

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)
let pName = localStorage.getItem('current_name');
let pInd = Number(localStorage.getItem('pIndex'));
let state = 'playing'

function drawState(state) {

    c.fillStyle = 'white'
    c.fillRect(0, 700, canvas.width, 200)

    switch(state) {
        case 'playing':
            c.font = '40px arial'
            c.fillStyle = 'black'
            c.fillText(`Playing: ${pName}`, canvas.width/2 - c.measureText(`Playing: ${pName}`).width/2, 800)
            break

        // GAME OVER
        // GAME OVER
        // GAME OVER
        // GAME OVER
        // GAME OVER

        case 'blue wins':
            c.fillStyle = 'white'
            c.fillRect(0, 0, canvas.width, 100)
            c.font = '40px arial'
            c.fillStyle = 'black'
            c.fillText(`Blue Wins! ${pName} Won!`, canvas.width/2 - c.measureText(`Blue Wins! ${pName} Won!`).width/2, 800)
            switch(pInd) {
                case 0: {
                    localStorage.setItem('p1score',String(Number(localStorage.getItem('p1score'))+(200)))
                    break;
                }
                case 1: {
                    localStorage.setItem('p2score',String(Number(localStorage.getItem('p2score'))+(200)))
                    break;
                }
                case 2: {
                    localStorage.setItem('p3score',String(Number(localStorage.getItem('p3score'))+(200)))
                    break;
                }
                case 3: {
                    localStorage.setItem('p4score',String(Number(localStorage.getItem('p4score'))+(200)))
                    break;
                }
            }
            localStorage.setItem('advance', '1');
            setTimeout(() => {  window.close(); }, 4000);
            break
        case 'red wins':
            c.fillStyle = 'white'
            c.fillRect(0, 0, canvas.width, 100)
            c.font = '40px arial'
            c.fillStyle = 'black'
            c.fillText(`Red Wins! ${pName} Loses!`, canvas.width/2 - c.measureText(`Red Wins! ${pName} Loses!`).width/2, 800)
            localStorage.setItem('advance', '0');
            setTimeout(() => {  window.close(); }, 4000);
            break

    }



}

board.draw()
function animate() {

	window.requestAnimationFrame(animate)

}
animate()

onmousemove = function(e){

    if (state != 'playing') {
        return
    }

    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    board.draw()
    dropTokens.update(e.clientX, e.clientY)
    drawState(state)
}

onclick = () => {

    if (state != 'playing') {
        return
    }

    if (player.currentPiece == 'null') {
        return 
    }

    for (let i = 5; i >= 0; --i) {

        if (board.array[i][player.currentPiece] == 'white') {
            board.array[i][player.currentPiece] = 'blue'
            board.draw()

            if (checkWinner(board.array) == -100) {
                state = 'blue wins'
                drawState(state)
                return
            }
            minMax(board.array, true, -10000, 10000, 5)

            board.draw()

            if (checkWinner(board.array) == 100) {
                state = 'red wins'
                drawState(state)
                return
            }

            drawState(state)

            return

        }

    }

    board.draw()


}


function checkWinner(board1) {

    let connectedBlue = 0
    let connectedRed = 0
    // loop through all points

    for (let i = 0; i < board1.length; ++i) {
        for (let j = 0; j < board1[i].length; ++j) {

            let checkColor = board1[i][j]

            // if white or not cur just skip
            if (checkColor == 'white') {
                continue
            }

            // temp indexes
            let tempI = i
            let tempJ = j

            //check down (also checks up)
            let dCounter = 0
            while (tempI != 6) {

                if (board1[tempI][j] == checkColor) {
                    dCounter += 1
                    tempI += 1
                }

                else {
                    break
                }
            }

            if (checkColor == 'blue') {
                connectedBlue = Math.max(connectedBlue, dCounter)
            }
            else {
                connectedRed = Math.max(connectedRed, dCounter)
            }

        

            //check right (also checks left)
            let rCounter = 0
            while (tempJ != 7) {
                if (board1[i][tempJ] == checkColor) {
                    rCounter += 1
                    tempJ += 1
                }
                else {
                    break
                }
            }
            if (checkColor == 'blue') {
                connectedBlue = Math.max(connectedBlue, rCounter)
            }
            else {
                connectedRed = Math.max(connectedRed, rCounter)
            }


            //check right diagonal and left diagonal
            tempI = i
            tempJ = j

            let udCounter = 0
            while (tempJ != 7 && tempI != -1) {
                if (board1[tempI][tempJ] == checkColor) {
                    udCounter += 1
                    tempI -= 1
                    tempJ += 1
                }
                else {
                    break
                }
            }
            if (checkColor == 'blue') {
                connectedBlue = Math.max(connectedBlue, udCounter)
            }
            else {
                connectedRed = Math.max(connectedRed, udCounter)
            }

            //check right diagonal and left diagonal
            tempI = i
            tempJ = j

            let ddCounter = 0
            while (tempJ != 7 && tempI != 6) {
                if (board1[tempI][tempJ] == checkColor) {
                    ddCounter += 1
                    tempI += 1
                    tempJ += 1
                }
                else {
                    break
                }
            }
            if (checkColor == 'blue') {
                connectedBlue = Math.max(connectedBlue, ddCounter)
            }
            else {
                connectedRed = Math.max(connectedRed, ddCounter)
            }
        }
        
    }

    if (connectedBlue == 4) {
        return -100
    }
    if (connectedRed == 4) {
        return 100
    }

    if (connectedBlue > connectedRed) {
        return -50
    }

    if (connectedRed > connectedBlue) {
        return 50
    }

    //check if there's still a move to be made
    let full = true

    for (let i = 0; i < board1.length; ++i) {
        
        for (let j = 0; j < board1[i].length; ++j) {


            if (board1[i][j] == 'white') {
                
                full = false
            }

        }
    }

    




    if (full) {
        return 0
    }

    else {
        return -1
    }


}

function sEval(board1) { 

    let connectedBlueTotal = 0
    let connectedRedTotal = 0
    // loop through all points

    for (let i = 0; i < board1.length; ++i) {
        for (let j = 0; j < board1[i].length; ++j) {

            let checkColor = board1[i][j]

            // if white or not cur just skip
            if (checkColor == 'white') {
                continue
            }

            // temp indexes
            let tempI = i
            let tempJ = j

            //check down (also checks up)
            let dCounter = 0
            while (tempI != 6) {

                if (board1[tempI][j] == checkColor) {
                    dCounter += 1
                    tempI += 1
                }

                else {
                    break
                }
            }

            if (checkColor == 'blue') {
                connectedBlueTotal += dCounter
            }
            else {
                connectedRedTotal += dCounter
            }

        

            //check right (also checks left)
            let rCounter = 0
            while (tempJ != 7) {
                if (board1[i][tempJ] == checkColor) {
                    rCounter += 1
                    tempJ += 1
                }
                else {
                    break
                }
            }
            if (checkColor == 'blue') {
                connectedBlueTotal += rCounter
            }
            else {
                connectedRedTotal += rCounter
            }

            //check right diagonal and left diagonal
            tempI = i
            tempJ = j

            let udCounter = 0
            while (tempJ != 7 && tempI != -1) {
                if (board1[tempI][tempJ] == checkColor) {
                    udCounter += 1
                    tempI -= 1
                    tempJ += 1
                }
                else {
                    break
                }
            }
            if (checkColor == 'blue') {
                connectedBlueTotal += udCounter
            }
            else {
                connectedRedTotal += udCounter
            }

            //check right diagonal and left diagonal
            tempI = i
            tempJ = j

            let ddCounter = 0
            while (tempJ != 7 && tempI != 6) {
                if (board1[tempI][tempJ] == checkColor) {
                    ddCounter += 1
                    tempI += 1
                    tempJ += 1
                }
                else {
                    break
                }
            }
            if (checkColor == 'blue') {
                connectedBlueTotal += ddCounter
            }
            else {
                connectedRedTotal += ddCounter
            }
        }
        
    }

    return connectedRedTotal - connectedBlueTotal

}

function successorBoards(board1, player) {

    let sux = []
    
    for (let j = 0; j < board1[0].length; ++j) {

        let foundInCol = false
        for (let i = 5; i >= 0; --i) {

            if (foundInCol) {
                break
            }

            if (board1[i][j] == 'white') {
                
                let tempBoard1 = JSON.parse(JSON.stringify(board1))
                tempBoard1[i][j] = player

                sux.push(tempBoard1)
                foundInCol = true

            }

        }

    }

    return sux

}



//maximizing - red ///// minimizing - blue




function minMax(board1, maximizing, a, b, depth) {



    let bestMove = [-1, -1]


    if (depth == 0) {

        return sEval(board1)
    }

    let tempVal = checkWinner(board1)

    

    switch(tempVal) {
        case 100:
            return 100
        //case 50:
            //return 50
        //case -50:
            //return -50

        case -100:
            return -100
        case 0:
            return 0
    }

    let res = 123 // bs

    if (maximizing) {
        
        let bestVal = -10000
        res = a
        let sux = successorBoards(board1, 'red')

        for (let i = 0; i < sux.length; ++i) {
            let val = minMax(sux[i], false, res, b, depth - 1)
            res = Math.max(res, val)

            if (val > bestVal) {
                bestMove = sux[i]
                bestVal = val
            }

            if (res >= b) {
                return res
            }

        }


    }

    else {
        let bestVal = 10000
        res = b
        let sux = successorBoards(board1, 'blue')

        for (let i = 0; i < sux.length; ++i) {

            let val = minMax(sux[i], true, a, res, depth - 1)
            res = Math.min(res, val)

            if (val < bestVal) {
                bestMove = sux[i]
                bestVal = val
            }

            if (res <= a) {
                return res
            }

        }
    }

    if (depth == 5) {
        console.log(bestMove)
        console.log(board.array)
        board.array = JSON.parse(JSON.stringify(bestMove))
        console.log(board.array)
    }



    return res

}

