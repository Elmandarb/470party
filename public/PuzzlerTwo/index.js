// Prelim
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 1024
c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)

// from https://www.delftstack.com/howto/javascript/javascript-random-number-between/#:~:text=Generate%20a%20Random%20Number%20Between%20Two%20Numbers%20in,is%20a%20random%20number%20between%20min%20and%20max.
function generateRandomInt(min,max){
    return Math.floor((Math.random() * (max-min)) +min);
}


// W and upArrow to rotate, a, d and leftArrow, rightArrow to move left and right


function drawBackground() {

	c.fillStyle = 'orange'
	c.fillRect(0, 0, 24, canvas.height)

	c.fillRect(canvas.width - 12, 0, 24, canvas.height)

	c.fillRect(0, 884, canvas.width, canvas.height)

	// should be good
	c.fillRect(canvas.width / 2 - 12, 0, 24, canvas.height)



	// 1st playspace
	c.fillStyle = 'white'
	c.fillRect(24, 0, canvas.width / 2 - 24, canvas.height - 140)
	c.fillRect(canvas.width /2 + 24, 0, canvas.width/2 - 48, canvas.height - 140)

	c.fillStyle = 'orange'
	c.globalAlpha = 0.3
	c.fillRect(0, 0, canvas.width, canvas.height)
	c.globalAlpha = 1




}
let score1 = 0
let score2 = 0

let timeFrames = 60 * 60
let pName = localStorage.getItem('current_name');
let pInd = Number(localStorage.getItem('pIndex'));
let oName = localStorage.getItem('opponent_name');
let oInd = Number(localStorage.getItem('oIndex'));

function statusScreen(state, score1, score2) {

	if (state == 'game over') {
		temp = c.fillStyle
		c.fillStyle = 'black'
		c.font = '40px arial'
		switch(pInd) {
			case 0: {
				localStorage.setItem('p1score',String(Number(localStorage.getItem('p1score'))+(score1*10)))
				break;
			}
			case 1: {
				localStorage.setItem('p2score',String(Number(localStorage.getItem('p2score'))+(score1*10)))
				break;
			}
			case 2: {
				localStorage.setItem('p3score',String(Number(localStorage.getItem('p3score'))+(score1*10)))
				break;
			}
			case 3: {
				localStorage.setItem('p4score',String(Number(localStorage.getItem('p4score'))+(score1*10)))
				break;
			}
		}
		switch(oInd) {
			case 0: {
				localStorage.setItem('p1score',String(Number(localStorage.getItem('p1score'))+(score2*10)))
				break;
			}
			case 1: {
				localStorage.setItem('p2score',String(Number(localStorage.getItem('p2score'))+(score2*10)))
				break;
			}
			case 2: {
				localStorage.setItem('p3score',String(Number(localStorage.getItem('p3score'))+(score2*10)))
				break;
			}
			case 3: {
				localStorage.setItem('p4score',String(Number(localStorage.getItem('p4score'))+(score2*10)))
				break;
			}
		}

		// GAME OVER
		// GAME OVER
		// GAME OVER
		// GAME OVER
		// GAME OVER
		// GAME OVER
		if (score1 > score2) {
			//Left Player
			c.fillText(`Game Over! ${pName} wins with ${score1 - score2} more points`, 20, 1000)
			localStorage.setItem('advance', '1');
			setTimeout(() => {  window.close(); }, 4000);
			return
		}

		if (score1 < score2) {
			c.fillText(`Game Over! ${oName} wins with ${score2 - score1} more points`, 20, 1000)
			localStorage.setItem('oAdvance', '1');
			setTimeout(() => {  window.close(); }, 4000);
			return
		}

		if (score1 == score2) {
			c.fillText(`Tie Game with a total of ${score1} points!`, 40, 1000)
			setTimeout(() => {  window.close(); }, 4000);
			return
		}







	}


	else {
		temp = c.fillStyle
		c.fillStyle = 'black'
		c.font = '50px arial'
		c.fillText(`${pName} `, 80, 940);
		c.fillText(`${oName} `, 600, 940);
		c.fillText(`Score: ${score1} ${'                    '} Score: ${score2}`, 160, 1000)
		c.fillStyle = temp
	}

}

let frames = 0
let seconds = 30


let boardL = new GameBoard('Left')
let boardR = new GameBoard('Right')

let pillL = new Pill('Left')
let pillR = new Pill('Right')


let dropletsL = []
let dropFramesL = 0

let dropletsR = []
let dropFramesR = 0

let state = 'playing'

// premade pieces. speeds the game up and is fair because both players start the same
boardL.array[8][4].typeFill = 'red'
boardL.array[7][3].typeFill = 'red'
boardL.array[9][0].typeFill = 'green'
boardL.array[9][4].typeFill = 'blue'
boardL.array[9][2].typeFill = 'green'
boardL.array[8][2].typeFill = 'green'
boardL.array[9][6].typeFill = 'blue'

boardR.array[8][4].typeFill = 'red'
boardR.array[7][3].typeFill = 'red'
boardR.array[9][0].typeFill = 'green'
boardR.array[9][4].typeFill = 'blue'
boardR.array[9][2].typeFill = 'green'
boardR.array[8][2].typeFill = 'green'
boardR.array[9][6].typeFill = 'blue'

let pillLContinue = true
let pillRContinue = true

function animate() {
	drawBackground()

	frames += 1
	dropFramesL += 1
	dropFramesR += 1
	


	if (dropFramesL == 11) {
		dropFramesL = 0
	}
	if (dropFramesR == 11) {
		dropFramesR = 0
	}




	if (frames == 75) {
		frames = 0

		if (pillLContinue) {
			PushDown(pillL, boardL)
		}

		if (pillRContinue) {
			PushDown(pillR, boardR)
		}
		timeFrames -= 30;

	}

	c.fillStyle = 'black'
	c.fillText(`${parseInt(timeFrames / 60)}`, canvas.width/2 - 10, 920)

	

	boardL.draw()
	pillL.draw()

	console.log(pillL)

	boardR.draw()
	pillR.draw()


	DropLogic(boardL, dropletsL, dropFramesL)
	DropLogic(boardR, dropletsR, dropFramesR)


	for (let i = 0; i < dropletsL.length; ++i) {

		if (dropletsL[i].active) {
			dropletsL[i].draw()
		}
			
	}

	for (let i = 0; i < dropletsR.length; ++i) {

		if (dropletsR[i].active) {
			dropletsR[i].draw()
		}
			
	}




	if (timeFrames == 0) {
		state = 'game over'
	}

	//statusScreen(state, score1, score2)

	if (!pillRContinue) {
		c.fillStyle = 'black'
		c.font = '30px arial'
		c.fillText(`Game Over. Wait for other player`, 10 + 550, 950)
	}

	if (!pillLContinue) {
		c.fillStyle = 'black'
		c.font = '30px arial'
		c.fillText(`Game Over. Wait for other player`, 20, 950)
	}

	if (!pillLContinue && !pillRContinue) {
		state = 'game over'
	}

	statusScreen(state, score1, score2)

	if (state != 'game over') {
		window.requestAnimationFrame(animate)
	}
		

}
animate()


window.addEventListener('keydown', (e) => {

	switch(e.key) {

		case 'w':

			newPos = newPosition(pillL.position)


			switch (newPos) {
				case 'Down':

					if (boardL.array[pillL.head.y + 1][pillL.head.x].typeFill == 'null') {
						pillL.tail.x = pillL.head.x
						pillL.tail.y = pillL.head.y + 1
						pillL.position = 'Down'
					}
					break


				case 'Left':

					if (boardL.array[pillL.head.y][pillL.head.x - 1].typeFill == 'null') {

						pillL.tail.x = pillL.head.x - 1
						pillL.tail.y = pillL.head.y
						pillL.position = 'Left'
					}
					break





				case 'Up':

					if (boardL.array[pillL.head.y - 1][pillL.head.x].typeFill == 'null') {

						pillL.tail.x = pillL.head.x
						pillL.tail.y = pillL.head.y - 1
						pillL.position = 'Up'
					}
					break

				case 'Right':

					if (boardL.array[pillL.head.y][pillL.head.x + 1].typeFill == 'null') {

						pillL.tail.x = pillL.head.x + 1
						pillL.tail.y = pillL.head.y
						pillL.position = 'Right'
					}
					break

			}






		break

		case 'a':
			if (pillL.head.x == 0 || pillL.tail.x == 0) {
				break
			}

			if ( (boardL.array[pillL.head.y][pillL.head.x - 1].typeFill == 'null') && (boardL.array[pillL.tail.y][pillL.tail.x - 1].typeFill == 'null')) {
				pillL.head.x -= 1
				pillL.tail.x -= 1

			}
		break






		case 'd':
			if (pillL.head.x == 6 || pillL.tail.x == 6) {
				break
			}

			if ( (boardL.array[pillL.head.y][pillL.head.x + 1].typeFill == 'null') && (boardL.array[pillL.tail.y][pillL.tail.x + 1].typeFill == 'null')) {
				pillL.head.x += 1
				pillL.tail.x += 1
			}
		break




		case 'ArrowUp':

			newPos = newPosition(pillR.position)


			switch (newPos) {
				case 'Down':

					if (boardR.array[pillR.head.y + 1][pillR.head.x].image == 'null') {
						pillR.tail.x = pillR.head.x
						pillR.tail.y = pillR.head.y + 1
						pillR.position = 'Down'
					}
					break


				case 'Left':

					if (boardR.array[pillR.head.y][pillR.head.x - 1].image == 'null') {

						pillR.tail.x = pillR.head.x - 1
						pillR.tail.y = pillR.head.y
						pillR.position = 'Left'
					}
					break





				case 'Up':

					if (boardR.array[pillR.head.y - 1][pillR.head.x].image == 'null') {

						pillR.tail.x = pillR.head.x
						pillR.tail.y = pillR.head.y - 1
						pillR.position = 'Up'
					}
					break

				case 'Right':

					if (boardR.array[pillR.head.y][pillR.head.x + 1].image == 'null') {

						pillR.tail.x = pillR.head.x + 1
						pillR.tail.y = pillR.head.y
						pillR.position = 'Right'
					}
					break

			}






			break




		case 'ArrowLeft':
			if (pillR.head.x == 0 || pillR.tail.x == 0) {
				break
			}

			if ( (boardR.array[pillR.head.y][pillR.head.x - 1].typeFill == 'null') && (boardR.array[pillR.tail.y][pillR.tail.x - 1].typeFill == 'null')) {
				pillR.head.x -= 1
				pillR.tail.x -= 1

			}
		break






		case 'ArrowRight':
			if (pillR.head.x == 6 || pillR.tail.x == 6) {
				break
			}

			if ( (boardR.array[pillR.head.y][pillR.head.x + 1].typeFill == 'null') && (boardR.array[pillR.tail.y][pillR.tail.x + 1].typeFill == 'null')) {
				pillR.head.x += 1
				pillR.tail.x += 1
			}
		break



	}


})