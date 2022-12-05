function drawSquare(j, i, color) {



    if (color == 'null') {
        
        return
    }


    let blockColor = undefined
    let outlineColor = undefined

    

    switch(color) {
        
        case 'blue':
            blockColor = '#ADD8E6'
            outlineColor = 'blue'
            break

        case 'orange':
            blockColor = '#FFD580'
            outlineColor = 'orange'
            break

        case 'red':
            
            blockColor = '#FFC0CB'
            outlineColor = 'red'
            break

        case 'green':
            blockColor = '#90EE90'
            outlineColor = 'green'
            break
        
        case 'purple':
            blockColor = '#D8BFD8'
            outlineColor = 'purple'
            break


        case 'yellow':
           
            blockColor = '#FFFFE0' // change to light gray
            outlineColor = 'gray'
            break

        case 'brown':
            blockColor = '#C4A484'
            outlineColor = 'brown'
            break
    }

    c.fillStyle = blockColor
    c.fillRect(j * 50, i * 50, 50, 50)

    c.fillStyle = outlineColor

    // outlines

    // hori
    c.fillRect(j * 50, i * 50, 50, 10)
    c.fillRect(j * 50, i * 50 + 40, 50, 10)

    //vert
    c.fillRect(j * 50, i * 50, 10, 50)
    c.fillRect(j * 50 + 40, i * 50, 10, 50)


}

function drawSquareNext(j, i, color) {



    if (color == 'null') {
        
        return
    }


    let blockColor = undefined
    let outlineColor = undefined

    

    switch(color) {
        
        case 'blue':
            blockColor = '#ADD8E6'
            outlineColor = 'blue'
            break

        case 'orange':
            blockColor = '#FFD580'
            outlineColor = 'orange'
            break

        case 'red':
            
            blockColor = '#FFC0CB'
            outlineColor = 'red'
            break

        case 'green':
            blockColor = '#90EE90'
            outlineColor = 'green'
            break
        
        case 'purple':
            blockColor = '#D8BFD8'
            outlineColor = 'purple'
            break


        case 'yellow':
           
            blockColor = '#FFFFE0' // change to light gray
            outlineColor = 'gray'
            break

        case 'brown':
            blockColor = '#C4A484'
            outlineColor = 'brown'
            break
    }

    c.fillStyle = blockColor
    c.fillRect(j * 50+ 500, i * 50+ 500 + 200, 50, 50)

    c.fillStyle = outlineColor

    // outlines

    // hori
    c.fillRect(j * 50 + 500, i * 50 + 500 + 200, 50, 10)
    c.fillRect(j * 50 + 500, i * 50 + 40 + 500 + 200, 50, 10)

    //vert
    c.fillRect(j * 50 + 500, i * 50 + 500 + 200, 10, 50)
    c.fillRect(j * 50 + 40 + 500, i * 50 + 500 + 200, 10, 50)


}
// not sure if this goes before or after break
function update() {

    let testDrop = true
    for (let i = 0; i < tetronimo.arr.length; ++i) {
        
        if ( (tetronimo.arr[i][0] + 1 != 20) && (board.array[tetronimo.arr[i][0] + 1][tetronimo.arr[i][1]] != 'null') ) {
            testDrop = false
        }

        if (tetronimo.arr[i][0] + 1 == 20) {
            testDrop = false
        }


    }


    if (testDrop) {
        for (let i = 0; i < tetronimo.arr.length; ++i) {
            tetronimo.arr[i][0] += 1

        }
    }

    else {

        
        for (let i = 0; i < tetronimo.arr.length; ++i) {

  

            board.array[tetronimo.arr[i][0]][tetronimo.arr[i][1]] = tetronimo.color
        }

        tetronimo = new Tetronimo(tetronimo.nextTetronimo)
        // check to see if we can't place it
        //game will be over

        for (let i = 0; i< tetronimo.arr.length; ++i) {
            if (board.array[tetronimo.arr[i][0]][tetronimo.arr[i][1]] != 'null') {

                state ='game over'
                drawStatus(state, score)
                return
            }
        }




        return
    }

    lineBreak()

}

function lineBreak() {

    // get a line break of 2
    // move all lines together on top of that line break down 2 lines

    let breakLines = []


    for (let i = 19; i >= 0; --i) {

        let completed = true
        for (let j = 0; j < board.array[i].length; ++j) {

            if (board.array[i][j] == 'null') {
                completed = false
            }


        }

        if (completed) {
            breakLines.push(i)
        }

    }

    

    let counter = 0
    for (let i = 19; i >= 0; --i) {

        if (breakLines.includes(i)) {
            for (let j = 0; j < board.array[i].length; ++j) {
                board.array[i][j] = 'null'
                
            }
            counter += 1
        }

        else {

            for (let j = 0; j < board.array[i].length; ++j) {
                board.array[i + counter][j] = board.array[i][j]
            }
            
        }

    }
    

    /*
    for (let i = 0; i < breakLines.length; ++i) {
        
        for (let j = 0; j < board.array[0].length; ++j) {

            board.array[breakLines[i]][j] = 'null'

            // this = blah blah blah counter + 1 = 
        }
    }
    */

    if (breakLines.length < 4) {
        score += breakLines.length
    }
    //double score if tetris
    else {
        score += 8
    }

}