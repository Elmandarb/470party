// Prelim
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576
c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)

// from https://www.delftstack.com/howto/javascript/javascript-random-number-between/#:~:text=Generate%20a%20Random%20Number%20Between%20Two%20Numbers%20in,is%20a%20random%20number%20between%20min%20and%20max.
function generateRandomInt(min,max){
    return Math.floor((Math.random() * (max-min)) +min);
}

let wPressed = false
let sPressed = false
let upPressed = false
let downPressed = false

let leftPaddle = new Paddle('left')
let rightPaddle = new Paddle('right')

let ball = new Ball()



// SCORE VARIABLES
// SCORE VARIABLES
// SCORE VARIABLES
// SCORE VARIABLES
// SCORE VARIABLES
let score1 = 0
let score2 = 0
let p1 = localStorage.getItem('current_name');
let p2 = localStorage.getItem('opponent_name');


let state = 'playing'

function drawStatus(state, score1, score2) {

	c.font = '50px Arial'

	if (state == 'playing') {
		
		c.fillText(`${score1}`, canvas.width/4, 100);
		c.fillText(`${p1}`, canvas.width/8, 50);

		c.fillText(`${score2}`, canvas.width/4 + canvas.width/2, 100);
		c.fillText(`${p2}`, canvas.width/8+ canvas.width/2, 50);
	}

	else {
		c.fillStyle = 'maroon'
		c.fillRect(0, 0, canvas.width, canvas.height)

		c.fillStyle = 'white'

		if (score1 > score2) {
			console.log('reached123')
			c.fillText(`${p1} wins with ${score1 - score2} more points!`, canvas.width/2 - c.measureText(`${p1} wins with ${score1 - score2} more points!`).width/2, 100);
			let ind = Number(localStorage.getItem('pIndex'));
			localStorage.setItem('advance','1');
			if(ind === 0) {
				localStorage.setItem('p1score', String(Number(localStorage.getItem('p1score'))+((score1-score2)*100)));
			}
			else if(ind === 1) {
				localStorage.setItem('p2score', String(Number(localStorage.getItem('p2score'))+((score1-score2)*100)));
			}
			else if(ind === 2) {
				localStorage.setItem('p3score', String(Number(localStorage.getItem('p3score'))+((score1-score2)*100)));
			}
			else if(ind === 3) {
				localStorage.setItem('p4score', String(Number(localStorage.getItem('p4score'))+((score1-score2)*100)));
			}
			setTimeout(() => {  window.close(); }, 3000);

		}

		else {
			c.fillText(`${p2} wins with ${score2 - score1} more points!`, canvas.width/2 - c.measureText(`${p2} wins with ${score2 - score1} more points!`).width/2, 100);
			console.log('321')
			let ind = Number(localStorage.getItem('oIndex'));
			localStorage.setItem('oAdvance','1');
			if(ind === 0) {
				localStorage.setItem('p1score', String(Number(localStorage.getItem('p1score'))+((score2-score1)*100)));
			}
			else if(ind === 1) {
				localStorage.setItem('p2score', String(Number(localStorage.getItem('p2score'))+((score2-score1)*100)));
			}
			else if(ind === 2) {
				localStorage.setItem('p3score', String(Number(localStorage.getItem('p3score'))+((score2-score1)*100)));
			}
			else if(ind === 3) {
				localStorage.setItem('p4score', String(Number(localStorage.getItem('p4score'))+((score2-score1)*100)));
			}
			setTimeout(() => {  window.close(); }, 3000);

		}

		// GAME OVER
		// GAME OVER
		// GAME OVER
		// GAME OVER
		// GAME OVER

		return
	}

}

function animate() {
	c.fillStyle = 'maroon'
	c.fillRect(0, 0, canvas.width, canvas.height)

	c.fillStyle = 'white'

	let tempY = 0
	for (let i = 0; i < 15; ++i) {
		c.fillRect(canvas.width/2 - 2, tempY, 4, 20)

		tempY += 40
	}
	


	if (score1 >= 3 || score2 >= 3) {
		drawStatus('game over', score1, score2)
		return
	}



	if (wPressed) {
		leftPaddle.move('u')
	}
	if (sPressed) {
		leftPaddle.move('d')
	}

	if (upPressed) {
		rightPaddle.move('u')
	}
	if (downPressed) {
		rightPaddle.move('d')
	}

	ball.update(leftPaddle, rightPaddle)

	leftPaddle.draw()
	rightPaddle.draw()

	console.log(ball.direction)

	ball.draw()




	drawStatus(state, score1, score2)
	window.requestAnimationFrame(animate)

}
animate()


window.addEventListener('keydown', (e) => {

	switch(e.key) {

		case 'w':
			if (sPressed) {
				break
			}
			wPressed = true
			break

		
		case 's':
			if (wPressed) {
				break
			}
			sPressed = true
			break


		case 'ArrowUp':
			if (downPressed) {
				break
			}
			upPressed = true
			break

	
		case 'ArrowDown':
			if (upPressed) {
				break
			}
			downPressed = true
			break

	}

})


window.addEventListener('keyup', (e) => {

	switch(e.key) {

		case 'w':

			wPressed = false
			break

		
		case 's':

			sPressed = false
			break


		case 'ArrowUp':

			upPressed = false
			break

	
		case 'ArrowDown':

			downPressed = false
			break

	}


})