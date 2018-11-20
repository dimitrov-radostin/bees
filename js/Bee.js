const initalX = CANVAS_WIDTH / 10
const initalY = CANVAS_HEIGHT / 2

class RandomBee {
  constructor() {
    this.turns = [+(Math.random() * 2 * Math.PI).toFixed(2)]
    this.shouldMove = true
    this.x = initalX
    this.y = initalY
    this.moves = 0
  }

    displayBee(ctx) {
      drawCircle(ctx, this.x, this.y, BEE_RADIUS, BEE_COLOR)
    }

    clearBee(ctx) {
      drawCircle(ctx, this.x, this.y, BEE_RADIUS, BACK_GROUND_COLOR)
    }

    getNextAngle() {
      const { turns } = this
      const lastAngle = turns[turns.length - 1]

      turns.push(+(lastAngle + (Math.random() - 0.5) * MAX_TURN_ANGLE).toFixed(2))

      return turns[turns.length - 1]
    }

    detectCollision() {
      const y = Math.floor(this.y)
      const x = Math.floor(this.x)

      if (theMap[y][x] > 0){
        this.score = Math.round(10000 * (theMap[y][x] - 1.5) / this.moves)
        console.log(`bee ${theMap[y][x] === 2 ? 'WINS !' : 'dies'} ; score=${this.score}; moves ${this.moves}`)
        return true 
      }

      return false
    }

    // increments coordinates; returns !whether it has hit a wall
    move() {
      this.moves++
      const angle = this.getNextAngle()
      const speedX = Math.cos(angle) * STANDARD_BEE_SPEED
      const speedY = Math.sin(angle) * STANDARD_BEE_SPEED

      if(this.detectCollision()){
        this.shouldMove = false
        return false
      }

      this.x += speedX
      this.y += speedY
    }

    fly(ctx) {
      const draw = setInterval(() => {
        this.clearBee(ctx)
        this.move()
        if(!this.shouldMove){
          clearInterval(draw)
          return
        }
         
      const callBack = () => this.displayBee(ctx)
      requestAnimationFrame(callBack)

      }, FRAME_TIME)
    }
  
}

class Bee extends RandomBee {
  constructor(turns){
    super()
    this.turns = turns
      .map(angle => angle + (Math.random() - 0.5) * MAX_ANGLE_MUTATION) 
    this.moves = 0
  }

  getNextAngle() {
    const { turns, moves } = this

    if(turns.length > moves) {
      return turns[moves]
    } else {
      const lastAngle = turns[turns.length - 1]
  
      turns.push(+(lastAngle + (Math.random() - 0.5) * MAX_TURN_ANGLE).toFixed(2))
      return turns[turns.length - 1]
    }
  }
}