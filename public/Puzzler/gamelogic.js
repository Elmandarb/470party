
function newPosition(pos) {

    switch (pos) {
        case 'Right':
            return 'Down'
        case 'Down':
            return 'Left'
        case 'Left':
            return 'Up'
        case 'Up':
            return 'Right'
    }
    
}

function PushDown(pill, board) {

	if (pill.head.y == 12 || pill.tail.y == 12) {
		board.array[pill.head.y][pill.head.x].typeFill = pill.headColor
        board.array[pill.tail.y][pill.tail.x].typeFill = pill.tailColor

		BoardBreak(board)


        if (pillL == pill) {
            pillL = new Pill('Left')
        }
        else {
            pillR = new Pill('Right')
        }

		
		return
	}

    if (board.array[pill.head.y + 1][pill.head.x].typeFill == 'null' && board.array[pill.tail.y + 1][pill.tail.x].typeFill == 'null') {

		pill.head.y += 1
        pill.tail.y += 1
        
    }

	// FIX ON THE CHANGE POSITION SIDE TOO // done I think

    else {

		board.array[pill.head.y][pill.head.x].typeFill = pill.headColor
        board.array[pill.tail.y][pill.tail.x].typeFill = pill.tailColor

		BoardBreak(board)


		if (pillL == pill) {
            pillL = new Pill('Left')
        }
        else {
            pillR = new Pill('Right')
        }


    }
    
}


function BoardBreak(board) {

    let breakList = []

    // for every piece of the board
    for (let i = 0; i < board.array.length; ++i) {
        for (let j = 0; j < board.array[i].length; ++j) {

            typeFill = board.array[i][j].typeFill
            if (typeFill == 'null') {
                continue
            }

            arr1 = []
            for (let k = j; k < board.array[i].length; ++k) {

                if (board.array[i][k].typeFill == typeFill) {
                    arr1.push([i, k])
                }

                else {
                    break
                }

            }

            arr2 = []

            for (let k = i; k < board.array.length; ++k) {

                // maybe not k i but i k
                if (board.array[k][j].typeFill == typeFill) {
                    arr2.push([k, j])
                }

                else {
                    break
                }

            }

            breakList.push(arr1)
            breakList.push(arr2)

        }
    }


    // add a check to see if a piece has no flooring at all


    for (let i = 0; i < breakList.length; ++i) {

        if (breakList[i].length < 4) {
            continue
        }

        for (let j = 0; j < breakList[i].length; ++j) {

            if (board == boardL) {
                score1 += 1
            }
            else {
                score2 += 1
            }

            board.array[breakList[i][j][0]][breakList[i][j][1]].typeFill = 'null'

        }


        if (board == boardL) {
            console.log('test')
            DropLogic(board, dropletsL, dropFramesL)
        }
        else {
            DropLogic(board, dropletsR, dropFramesR)
        }
        // try adding
         // try adding

    }



}


function DropLogic(board, droplets, dropFrames) {

    // consider revese search but it probably doesnt really matter

    // GO THROUGH ALL 91 TOP TO BOTTOM INSTEAD

    // when a drop hits a pill its not becoming a board typefill fixed
    if (dropFrames == 10) {
        for (let i = board.array.length - 1; i >= 0; --i) {
            for (let j = 0; j < board.array[i].length; ++j) {


                for (let k = 0; k < droplets.length; ++k) {

                    if (droplets[k].x == j && droplets[k].y == i && droplets[k].active) {
                                
                        if (droplets[k].y + 1 >= board.array.length || board.array[droplets[k].y + 1][droplets[k].x].typeFill != 'null') {

                            board.array[droplets[k].y][droplets[k].x].typeFill = droplets[k].typeFill
                            droplets[k].active = false

                            // ADDED BOARD BREAK
                            BoardBreak(board)

                        }

                        else {
                            droplets[k].y += 1
                        }




                    }


                }

            }

        }

        return

    }
    // remove dead droplets







    /*
    if (dropFrames == 10) {
        for (let i = 0; i < droplets.length; ++i) {

            if (!droplets[i].active) {
                continue
            }

            if (droplets[i].y + 1 >= board.array.length || board.array[droplets[i].y + 1][droplets[i].x].typeFill != 'null') {

                board.array[droplets[i].y][droplets[i].x].typeFill = droplets[i].typeFill
                droplets[i].active = false

            }

            else {
                droplets[i].y += 1
            }
            

        }
        
    }
    */


    for (let i = 0; i < board.array.length; ++i) {
        for (let j = 0; j < board.array[i].length; ++j) {

            // leftmost block
            // leftmost droplogic should be working

            //middle check can be done only once
            // additionally for a if theres anything beneath it check

            // if at bottom
            if (i == board.array.length - 1) {
                continue
            }


                
            // if a floor is below it
            if (board.array[i + 1][j].typeFill != 'null') {
                continue
            }



            // if not even a pill

            if (board.array[i][j].typeFill == 'null') {
                continue
            }
            

            

            /*
            // the sides, just ignore for now 
            if (j == 0 || j == board.array.length[i] - 1) {
                continue
            }
            */
            
            if (j == 0 && board.array[i][j + 1].typeFill == 'null') {

                if (board == boardL) {
                    droplets.push(new Droplet(j, i, board.array[i][j].typeFill, 'Left'))
                }
                else {
                    droplets.push(new Droplet(j, i, board.array[i][j].typeFill, 'Right'))
                }
                



                board.array[i][j].typeFill = 'null'
                continue // changed to continues
            }

            else if (j == 0) {
                continue
            }


            if (j == 6 && board.array[i][j - 1].typeFill == 'null') {


                if (board == boardL) {
                    droplets.push(new Droplet(j, i, board.array[i][j].typeFill, 'Left'))
                }
                else {
                    droplets.push(new Droplet(j, i, board.array[i][j].typeFill, 'Right'))
                }


                
                board.array[i][j].typeFill = 'null'
                continue // changed to continues
            }

            else if (j == 6) {
                continue
            }


            if (board.array[i][j - 1].typeFill == 'null' && board.array[i][j + 1].typeFill == 'null') {
            
                if (board == boardL) {
                    droplets.push(new Droplet(j, i, board.array[i][j].typeFill, 'Left'))
                }
                else {
                    droplets.push(new Droplet(j, i, board.array[i][j].typeFill, 'Right'))
                }


                board.array[i][j].typeFill = 'null'
            }








        }
    }
}