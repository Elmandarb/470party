class TextField {
    constructor() {
        this.letters = ''
        this.batFrames = 0
        this.bat = false
    }

    draw() {
        c.fillStyle = 'brown'
        // correct way c.fillRect(canvas.width / 2 - 80, 400, 160, 50)
        c.fillRect(canvas.width / 2 - (350/2), 500, 350, 50)

        c.fillStyle = 'khaki'

        c.font = '50px arial'
        c.fillText(this.letters, canvas.width / 2 - (350/2), 540, 350, 50)


        let val = canvas.width / 2 - (350/2)
        // when you type change the cursor

        // some time after input 
        if (this.batFrames == 200) {
            this.bat = false
            this.batFrames = 0
        }

        if (this.batFrames == 30) {

            if (this.bat) {
                this.bat = false
            }
            else {
                this.bat = true
            }
            this.batFrames = 0

        }
        
        if (this.bat) {
            c.drawImage(bat, val + c.measureText(this.letters).width, 500, 10, 50)
        }
    }


}

class Ball {
    constructor(word, position) {

        this.word = word
        this.position = position
        this.size = 0.1
        this.active = false
        this.swung = false
        this.swungFrames = 0

    }

    draw() {

        c.fillStyle = 'red'

        switch (this.position) {
            case 'tl':

                c.drawImage(ball30, 150, 0, 150 * this.size, 150 * this.size)
                c.fillText(this.word, 150, 75, 150 * this.size, 150 * this.size)

                if (this.size > 1) {
                    c.drawImage(ball30, 150, 0, 150 * this.size, 150 * this.size)
                    c.drawImage(crack, 150, 0, 150 * this.size, 150 * this.size)
                    state = 'game over'
                    drawStatus('game over', score, inning)
                }


                break
            case 'tm':
                c.drawImage(ball30, 512 - 75, 0, 150 * this.size, 150 * this.size)
                c.fillText(this.word, 512 - 75, 75, 150 * this.size, 150 * this.size)


                if (this.size > 1) {

                    c.drawImage(ball30, 512 - 75, 0, 150 * this.size, 150 * this.size)
                    c.drawImage(crack, 512 - 75, 0, 150 * this.size, 150 * this.size)
                    state = 'game over'
                    drawStatus('game over', score, inning)
                }



                break
            case 'tr':
                c.drawImage(ball30, canvas.width - 300, 0, 150 * this.size, 150 * this.size)
                c.fillText(this.word, canvas.width - 300, 75, 150 * this.size, 150 * this.size)

                if (this.size > 1) {

                    c.drawImage(ball30, canvas.width - 300, 0, 150 * this.size, 150 * this.size)
                    c.drawImage(crack, canvas.width - 300, 0, 150 * this.size, 150 * this.size)
                    state = 'game over'
                    drawStatus('game over', score, inning)

                }
                break
            case 'bl':
                c.drawImage(ball30, 150, 200, 150 * this.size, 150 * this.size)
                c.fillText(this.word, 150, 275, 150 * this.size, 150 * this.size)

                
                if (this.size > 1) {
                    c.drawImage(ball30, 150, 200, 150 * this.size, 150 * this.size)
                    c.drawImage(crack, 150, 200, 150 * this.size, 150 * this.size)

                    state = 'game over'
                    drawStatus('game over', score, inning)

                }


                break
            case 'bm':
                c.drawImage(ball30, 512 - 75, 200, 150 * this.size, 150 * this.size)
                c.fillText(this.word, 512 - 75, 275, 150 * this.size, 150 * this.size)

                if (this.size > 1) {
                    c.drawImage(ball30, 512 - 75, 200, 150 * this.size, 150 * this.size)
                    c.drawImage(crack, 512 - 75, 200, 150 * this.size, 150 * this.size)
                    state = 'game over'
                    drawStatus('game over', score, inning)

                }
                break


            case 'br':
                c.drawImage(ball30, canvas.width - 300, 200, 150 * this.size, 150 * this.size)
                c.fillText(this.word, canvas.width - 300, 275, 150 * this.size, 150 * this.size)

                
                if (this.size > 1) {
                    c.drawImage(ball30, canvas.width - 300, 200, 150 * this.size, 150 * this.size)
                    c.drawImage(crack, canvas.width - 300, 200, 150 * this.size, 150 * this.size)
                    state = 'game over'
                    drawStatus('game over', score, inning)

                }


                break

        }

    }


    drawBat() {

        if (this.swungFrames > 40) {
            this.active = false
            this.swung = false
            this.swungFrames = 0
            this.size = 0.1
            this.word = getWord(inning)
        }

        switch (this.position) {
            case 'tl':
                c.drawImage(batD, 150, 0, 150 * this.size, 150 * this.size)

                break
            case 'tm':
                c.drawImage(batD, 512 - 75, 0, 150 * this.size, 150 * this.size)

                break
            case 'tr':
                c.drawImage(batD, canvas.width - 300, 0, 150 * this.size, 150 * this.size)

                break
            case 'bl':
                c.drawImage(batD, 150, 200, 150 * this.size, 150 * this.size)

                break
            case 'bm':
                c.drawImage(batD, 512 - 75, 200, 150 * this.size, 150 * this.size)

                break
            case 'br':
                c.drawImage(batD, canvas.width - 300, 200, 150 * this.size, 150 * this.size)

                break

        }

    }

}