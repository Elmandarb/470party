// Prelim

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576
c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)
let winScore = 12;
// from https://www.delftstack.com/howto/javascript/javascript-random-number-between/#:~:text=Generate%20a%20Random%20Number%20Between%20Two%20Numbers%20in,is%20a%20random%20number%20between%20min%20and%20max.
function generateRandomInt(min,max){
    return Math.floor((Math.random() * (max-min)) +min);
}

function drawBackground() {

	c.drawImage(grass, 0, 0, canvas.width, canvas.height)
	c.drawImage(sky, 0, 0, canvas.width, canvas.height / 2 + 100)
	c.drawImage(field, 0, 476, canvas.width, 100)

}

function isAlpha(str) {
	return /^[a-zA-Z()]$/.test(str);
}

function drawStatus(state, score, inning) {

	let temp = c.fillStye
	c.fillStyle = 'beige'
	if (state == 'playing') {
		c.fillText(`Inning: ${inning} ${'                    '} Score: ${score}`, 150, 450)
	}

	else {

		let ind = Number(localStorage.getItem('pIndex'));

		if(score >= winScore) {
			c.fillText(`You Passed!  ${'                    '}  Score: ${score}`, 150, 450);
			localStorage.setItem('advance','1');
		}
		else {
			c.fillText(`Game Over!  ${'                    '}  Score: ${score}`, 150, 450);
			localStorage.setItem('advance','0');
		}

		if(ind === 0) {
			localStorage.setItem('p1score', String(Number(localStorage.getItem('p1score'))+score*10));
		}
		else if(ind === 1) {
			localStorage.setItem('p2score', String(Number(localStorage.getItem('p2score'))+score*10));
		}
		else if(ind === 2) {
			localStorage.setItem('p3score', String(Number(localStorage.getItem('p3score'))+score*10));
		}
		else if(ind === 3) {
			localStorage.setItem('p4score', String(Number(localStorage.getItem('p4score'))+score*10));
		}
		setTimeout(() => {  window.close(); }, 4000);

		// GAME OVER
		// GAME OVER
		// GAME OVER
		// GAME OVER
		// GAME OVER

		// score at this point is 'score' within the function


	}
	c.fillStyle = temp

}

let textField = new TextField

let tl = new Ball(getWord(3), 'tl')
let tm = new Ball(getWord(3), 'tm')
let tr = new Ball(getWord(3), 'tr')
let bl = new Ball(getWord(3), 'bl')
let bm = new Ball(getWord(3), 'bm')
let br = new Ball(getWord(3), 'br')

balls = [tl, tm, tr, bl, bm, br]

let frames = 0
let inning = 3
let inningFrames = 0
let state = 'playing'
let score = 0


function animate() {
	drawBackground()

	frames += 1
	textField.batFrames += 1
	inningFrames += 1
	console.log('frames')

	if (inningFrames == 800) {
		inningFrames = 0
		inning += 1
		console.log('new inning')
	}


	if (frames == 80) {
		frames = 0
	
		let contenders = []
		for (let i = 0; i < balls.length; ++i) {


			if (!balls.active) {
				contenders.push(balls[i])
			}
	
		}


		let contender = contenders[Math.floor(Math.random()*contenders.length)]

		contender.active = true


	}





	for (let i = 0; i < balls.length; ++i) {

		if (balls[i].active) {
			balls[i].size += 0.001
		}

		if (balls[i].active) {
			balls[i].draw()
		}

		if (balls[i].swung) {
			balls[i].swungFrames += 5
			balls[i].drawBat()
		}

	}


	drawStatus(state, score, inning)
	textField.draw()

	if (state != 'game over') {
		window.requestAnimationFrame(animate)
	}
	

}
animate()



window.addEventListener('keydown', (e) => {


	if (isAlpha(e.key)) {
		textField.letters += e.key
		textField.bat = true
		textField.batFrames = 180
	}

	if (e.key == 'Backspace') {
		textField.letters = textField.letters.slice(0, textField.letters.length - 1)
	}

	if (e.key == 'Enter') {

		for (let i = 0; i < balls.length; ++i) {
			if (textField.letters == balls[i].word) {

				// also can handle end of ball logic
				balls[i].swung = true
				textField.letters = ""
				score += 1

			}
		}

	}

})