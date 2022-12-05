// Prelim
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 2500
canvas.height = 2900
c.fillStyle = 'maroon'
c.fillRect(0, 0, canvas.width, canvas.height)

const sBody = new Image()
sBody.src = './img/sBody.png'

const sHead = new Image()
sHead.src = './img/sHead.png'

const grass = new Image()
grass.src = './img/grass.png'

const fruit = new Image()
fruit.src ='./img/snack.png'

const rock = new Image()
rock.src = './img/rock.png'

const bird = new Image()
bird.src = './img/vulture.png'

const grass2 = new Image()
grass2.src = './img/grass2.png'

//const bg = new Image()
//bg.src = './img/background.jpg'
let winScore = 30;
let curKey = 'R'
let state = 'playing'
let pName = localStorage.getItem('current_name');
let pInd = Number(localStorage.getItem('pIndex'));
function drawStatus(score, state, timeFrames) {

	c.fillStyle = 'maroon'
	c.fillRect(0, 2500, canvas.width, canvas.height)

	c.font = "300px arial"
	c.fillStyle = 'black'
	c.fillText(`Score: ${score} Time: ${parseInt(timeFrames / 60)}`, 0, 2800)

	// GAME OVER
	// GAME OVER
	// GAME OVER
	// GAME OVER
	// GAME OVER

	if (state == 'game over') {
		c.fillStyle = 'maroon'
		c.fillRect(0, 2500, canvas.width, canvas.height)
		c.fillStyle = 'black'
		c.fillText(`Game Over!`, 450, 2800)
		if( score >= winScore) {
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
			localStorage.setItem('advance', '1');
		}
		c.fillStyle = 'maroon'
		setTimeout(() => {  window.close(); }, 4000);
		return
	}
	
}

// from https://www.delftstack.com/howto/javascript/javascript-random-number-between/#:~:text=Generate%20a%20Random%20Number%20Between%20Two%20Numbers%20in,is%20a%20random%20number%20between%20min%20and%20max.
function generateRandomInt(min,max){
    return Math.floor((Math.random() * (max-min)) +min);
}


// Classes
class Snake {
    constructor() {
		// change this or something use x and y
        this.x = 0
        this.y = 0
		this.actual = [[0, 0]]
        this.belly = 0
        this.q = [[0, 0]]
		this.score = 0
    }
	draw() {

		for (let i = 0; i < this.q.length; ++i) {

			if (i == this.q.length - 1) {
				c.drawImage(sHead, this.q[i][0] * 50, this.q[i][1] * 50, 50, 50)
				break
			}

			c.drawImage(sBody, this.q[i][0] * 50, this.q[i][1] * 50, 50, 50)
		}

	}
}

class Snack {

	constructor() {

		let contenders = []
		for (let i = 0; i < board.array.length; ++i) {
			
			for (let j = 0; j < board.array[i].length; ++j) {
				
				if (board.array[i][j].objOccupied == false && board.array[i][j].snakeOccupied == false) {
					contenders.push([i, j])
				}

			}
		}
		let contender = contenders[Math.floor(Math.random()*contenders.length)]

		this.x = contender[0]
		this.y = contender[1]

		this.value = generateRandomInt(1, 9)
	}

	checkEat() {

		if (snake.q[snake.q.length - 1][0] == this.x && snake.q[snake.q.length - 1][1] == this.y) {
			snake.belly += this.value

			let contenders = []
			for (let i = 0; i < board.array.length; ++i) {
				
				for (let j = 0; j < board.array[i].length; ++j) {
					
					if (board.array[i][j].objOccupied == false) {
						contenders.push([i, j])
					}
	
				}
			}
			let contender = contenders[Math.floor(Math.random()*contenders.length)]
	
			this.x = contender[0]
			this.y = contender[1]

			// just changed
			// if eaten, needs to be changed back
			board.array[this.x][this.y].food = true

			this.value = generateRandomInt(1, 9)
			snake.score += this.value
			console.log(snake.score)
		}



	}

	draw() {
		c.drawImage(fruit, this.x * 50, this.y * 50, 50, 50)
	}
}

class BoardPiece {
	constructor() {
		this.snakeOccupied = false
		this.objOccupied = false
		this.food = false
	}
}

class Vulture {
	constructor() {
		this.x = -1000
		this.y = -1000

		this.image = bird
		this.position = 'null'
		this.inFlight = false
		this.direction = 'null'
	}

	draw() {
		c.drawImage(bird, this.x * 50, this.y * 50, 50, 50)
	}

	checkBite() {


		if (this.x < 0 || this.x > 49 || this.y < 0 || this.y > 49) {
			return
		}

		console.log(board.array[this.y][this.x].snakeOccupied)

		if (board.array[this.x][this.y].snakeOccupied) {

			state = 'game over'
			drawStatus(snake.score, state, timeFrames)
			return

		}


	}

}

class GameBoard {
    constructor() {

		let arr = []
		for (let i = 0; i < 50; ++i) {
			let row = []
			for (let j = 0; j < 50; ++j) {
				row.push(new BoardPiece)
			}
			arr.push(row)
		}

		this.array = arr

    }

    draw() {

		let alt = false 

		for (let i = 0; i < this.array.length; ++i) {


			if (alt) {
				alt = false
			}

			else {
				alt = true
			}


			for (let j = 0; j < this.array[i].length; ++j) {



				if (this.array[i][j].objOccupied) {
					c.drawImage(rock, i * 50, j * 50, 50, 50)
				}

				
				else {

					if (alt) {
						c.drawImage(grass2, i * 50, j * 50, 50, 50)
					}

					else {
						c.drawImage(grass, i * 50, j * 50, 50, 50)
					}

					
				



				}
				

				if (alt) {
					alt = false
				}
	
				else {
					alt = true
				}

			}
		}
    }
}

let snake = new Snake
let board = new GameBoard
let snack = new Snack
let vulture = new Vulture

function updateState(snake, board, curKey, vulture) {

	switch(curKey) {

		case 'U':
			snake.q.push([ snake.q[snake.q.length - 1][0], snake.q[snake.q.length - 1][1] - 1] )
			snake.y -= 1
			break;
		case 'D':
			snake.q.push([ snake.q[snake.q.length - 1][0], snake.q[snake.q.length - 1][1] + 1] )
			snake.y += 1
			break;

		case 'L':
			snake.q.push([ snake.q[snake.q.length - 1][0] - 1, snake.q[snake.q.length - 1][1]] )
			snake.x -= 1
			break;

		case 'R':
			snake.q.push([ snake.q[snake.q.length - 1][0] + 1, snake.q[snake.q.length - 1][1]] )
			snake.x += 1
			break;


		default: 
		break;

	}


	switch(vulture.direction) {
		case 'up':
			vulture.y -= 1
			break
		case 'down':
			vulture.y += 1
			break
		case 'left':
			vulture.x -= 1
			break
		case 'right':
			vulture.x += 1
			break
	}




	snack.checkEat()
	vulture.checkBite()
	snake.actual.push([snake.x, snake.y])

	



	if (snake.belly == 0) {
		last = snake.q.shift()
		snake.actual.shift()
	}
	else {
		snake.belly -= 1
	}

	board.array[last[0]][last[1]].snakeOccupied = false

	try {
		if (board.array[snake.x][snake.y].snakeOccupied) {
			state = 'game over'
			return
		}

		if (board.array[snake.x][snake.y].objOccupied) {
			state = 'game over'
			return
		}

	}

	catch(err) {
		state = 'game over'
		return
	}


	board.array[snake.x][snake.y].snakeOccupied = true


}

// not used anymoer
function addWall(wallAdded) {

	console.log('ADD WALL')
	add = true

	for (let i = 0; i < board.array.length; ++i) {

		// can take off all the == true
		// top
		if (board.array[0 + wallAdded][i].snakeOccupied || board.array[0 + wallAdded][i].food) {
			add = false
		}
		// bottom
		console.log(wallAdded)
		if (board.array[board.array.length - 1 - wallAdded][i].snakeOccupied || board.array[board.array.length - 1 - wallAdded][i].food) {
			add = false
		}

		// left side
		if (board.array[i][0 + wallAdded].snakeOccupied || board.array[i][0 + wallAdded].food) {
			add = false
		}

		// right side
		if (board.array[i][board.array.length - 1 - wallAdded].snakeOccupied || board.array[i][board.array.length - 1 - wallAdded].food) {
			add = false
		}

	}

	if (add) {

		for (let i = 0; i < board.array.length; ++i) {

			// can take off all the == true
			// top
			board.array[0 + wallAdded][i].objOccupied = true

			// bottom
			board.array[board.array.length - 1 - wallAdded][i].objOccupied = true
	
			// left side
			board.array[i][0 + wallAdded].objOccupied = true
	
			// right side
			board.array[i][board.array.length - 1 - wallAdded].objOccupied = true

		}
		return true
	}

	else {
		return
	}

}

function addRock() {
	let contenders = []
	for (let i = 0; i < board.array.length; ++i) {
		for (let j = 0; j < board.array[i].length; ++j) {
			// needs two other checks
			if (!board.array[i][j].objOccupied) {
				contenders.push([i, j])
			}

		}
	}

	let contender = contenders[Math.floor(Math.random()*contenders.length)]

	console.log(contender)
	
	board.array[contender[0]][contender[1]].objOccupied = true


}

function vulturePath(snake) {

	console.log('reached 1')

	let contenders = []

	for (let i = 0; i < board.array.length; ++i) {
		for (let j = 0; j < board.array[i].length; ++j) {
			contenders.push([i, j])
		}
	}

	console.log('reached 2')

	// could maybe change to only loop around the snake if it's too slow
	for (let i = 0; i < board.array.length; ++i) {
		for (let j = 0; j < board.array[i].length; ++j) {

			if (board.array[i][j].snakeOccupied) {
				for (let k = 0; k < contenders.length; ++k) {

					if (contenders[k][0] == i) {
						contenders[k] = 'null'
					}

					if (contenders[k][1] == j) {
						contenders[k] = 'null'
					}

				}
			}

		}
	}

	let newContenders = []
	for (let i = 0; i < contenders.length; ++i) {
		if (contenders[i] != 'null'){
			newContenders.push(contenders[i])
		}
	}

	if (newContenders.length == 0) {
		return 'null'
	}

	let contender = newContenders[Math.floor(Math.random()*newContenders.length)]
	
	return contender

}

function addVulture() {
	
	if ( (vulture.x > 50 || vulture.y > 50 || vulture.x < -1 || vulture.y < -1) && vulture.inFlight) {
		vulture.inFlight = false
	}

	if (vulture.inFlight) {
		return
	}

	// find which direction to go in 
	let x = generateRandomInt(1,5)
	let cord = vulturePath(snake)
	console.log(cord)




	switch (x) {
		//going down
		case 1:
			//all should check the same index so make a function
			vulture.x = cord[0]
			vulture.y = 0
			vulture.inFlight = true
			vulture.direction = 'down'
			break

		//going up
		case 2:
			vulture.x = cord[0]
			// idk this exact value
			vulture.y = 50
			vulture.inFlight = true
			vulture.direction = 'up'
			break


		case 3:
			vulture.x = 0
			vulture.y = cord[1]
			vulture.inFlight = true
			vulture.direction = 'right'
			break

		case 4:
			vulture.x = 50
			vulture.y = cord[1]
			vulture.inFlight = true
			vulture.direction = 'left'
			break
		
	}

}


let frames = 0
speed = 60
wallAdded = 0

let timeFrames = 60 * 60

function animate() {

	frames += 10

	timeFrames -= 1

	board.draw()

	// change 300 to make it go faster
	if (frames > 500) {
		frames = 0

		// gives 1. 2, or 3
		let x = generateRandomInt(1,4)

		switch(x) {

			// make it so speed just goes up automatically
			case 1:

				addRock()

			break

			case 2:

				addVulture()

				break

			case 3:
				//addRock()
				break
		}
	}

	else {
		// change
		if (frames % speed == 0)
			updateState(snake, board, curKey, vulture)
			console.log('here')
	}

	snake.draw()

	snack.draw()

	vulture.draw()

	if (timeFrames == 0) {
		state = 'game over'
	}


	drawStatus(snake.score, state, timeFrames)

	if (state == 'game over') {
		return
	}

	if (state != 'game over') {
		window.requestAnimationFrame(animate)
	}


	

}
animate()


window.addEventListener('keydown', (e) => {

	switch(e.key) {
		case 'ArrowUp':
		if (curKey == 'D') {
			break
		}
		curKey = 'U'
		break

		case 'q':
			console.log(snake.q)
			break



		case 'ArrowLeft':
		if (curKey == 'R') {
			break
		}
		curKey = 'L'
		break

		case 'ArrowDown':
		if (curKey == 'U') {
			break
		}
		curKey = 'D'
		break




		case 'ArrowRight':
		if (curKey == 'L') {
			break
		}
		curKey = 'R'
		break


		default:
		break
	}
})