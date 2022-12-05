// Prelim
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
// possibly change to 576 or whatever
canvas.width = 50 * 10 * 2
canvas.height = 50 * 20 + 120

// W to rotate
// A and D to move left and right

c.fillStyle = 'maroon'
c.fillRect(0, 0, canvas.width, canvas.height)

// from https://www.delftstack.com/howto/javascript/javascript-random-number-between/#:~:text=Generate%20a%20Random%20Number%20Between%20Two%20Numbers%20in,is%20a%20random%20number%20between%20min%20and%20max.
function generateRandomInt(min,max){
    return Math.floor((Math.random() * (max-min)) +min);

}


// board is 10x20
let board = new Board()
let tetronimo = new Tetronimo(tetronimos[0])

let frame = 0
let timeFrame = 60 * 60 // game is a minute long

let score = 0
let winScore = 6
let state = 'playing'
let pName = localStorage.getItem('current_name');
let pInd = Number(localStorage.getItem('pIndex'));
function drawStatus(state, score) {

	c.font = '100px Arial'
	c.fillStyle = 'white'

	c.fillText(`Time`,  64 * 10, 300)
	c.fillText(`${parseInt(timeFrame / 60)}`,  72 * 10, 400)

	c.fillText(`Score: ${score}`, 20, 108 * 10)
	c.font = '50px Arial'
	c.fillText(`${pName}`, 600,100);
	c.fillText(`Next Piece`, 64 * 10, 600)

	
	if (state == 'game over') {
		c.fillText(`Game Over`,  62 * 10, 175);
		if(score >= winScore) {
			c.fillText(`You win!`,  65 * 10, 500);
			localStorage.setItem('advance', '1');
		}
		else {
			c.fillText(`You lose!`,  65 * 10, 500);
		}
		switch(pInd) {
			case 0: {
				localStorage.setItem('p1score',String(Number(localStorage.getItem('p1score'))+(score*10)))
				break;
			}
			case 1: {
				localStorage.setItem('p2score',String(Number(localStorage.getItem('p2score'))+(score*10)))
				break;
			}
			case 2: {
				localStorage.setItem('p3score',String(Number(localStorage.getItem('p3score'))+(score*10)))
				break;
			}
			case 3: {
				localStorage.setItem('p4score',String(Number(localStorage.getItem('p4score'))+(score*10)))
				break;
			}
		}
		setTimeout(() => {  window.close(); }, 4000);
		return
	}


	tetronimo.drawNext()

}

function animate() {
	frame += 1





	c.fillStyle = 'maroon'
	c.fillRect(0, 0, canvas.width, canvas.height)

	c.fillStyle = 'white'
	c.fillRect(0, 0, 50 * 10, 50 * 20)


	tetronimo.draw()

	if (frame == 30) {
		timeFrame -= 10
		frame = 0;
		update();
	}

	board.draw()

	if (timeFrame == 0) {
		state = 'game over'
	}

	drawStatus(state, score)


	// GAME OVER
	// GAME OVER
	// GAME OVER
	// GAME OVER
	// GAME OVER

	// SCORE is score
	// SCORE is score
	// SCORE is score
	// SCORE is score
	// SCORE is score

	if (state != 'game over') {
		window.requestAnimationFrame(animate)
	}

	
}
animate()




window.addEventListener('keydown', (e) => {


	switch(e.key) {

		case 'a':

			tetronimo.move('left')
			break

		case 'd':
			tetronimo.move('right')
			break

		case 'w':

			tempArray = JSON.parse(JSON.stringify(tetronimo.arr))

			tetronimo.rotate()
			tetronimo.rotate()

			let allowed = true
			for (let i = 0; i < tetronimo.arr.length; ++i) {
				if (board.array[tetronimo.arr[i][0]][tetronimo.arr[i][1]] != 'null') {
					allowed = false
				}

			}

			if (!allowed) {
				tetronimo.arr = tempArray
				return
			}
			else {
				tetronimo.spinAmount += 1
				return
			}
			
	}


})