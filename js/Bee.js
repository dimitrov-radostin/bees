const initalX = CANVAS_WIDTH / 10
const initalY = CANVAS_HEIGHT / 2

class RandomBee {
  constructor() {
    this.decisions = {
      turns: [+(Math.random() * 2 * Math.PI).toFixed(2)],
    }
    this.shouldMove = true
    this.x = initalX
    this.y = initalY
    this.flaps = 0
  }

    // draws a circle at (x, y)
    displayBee(ctx) {
      ctx.beginPath();
      ctx.fillStyle = BEE_COLOR
      ctx.arc(this.x, this.y, BEE_RADIUS, 0, 2 * Math.PI);
      ctx.fill()
    }

    clearBee(ctx) {
      ctx.beginPath();
      ctx.fillStyle = BACK_GROUND_COLOR
      ctx.arc(this.x, this.y, BEE_RADIUS + 1 , 0, 2 * Math.PI);
      ctx.fill()
    }

    getNextAngle() {
      const { turns } = this.decisions
      const lastAngle = turns[turns.length - 1]

      turns.push(+(lastAngle + (Math.random() - 0.5) * MAX_TURN_ANGLE).toFixed(2))

      return turns[turns.length - 1]
    }

    detectCollision() {
      const y = Math.floor(this.y)
      const x = Math.floor(this.x)

      if (theMap[y][x] > 0){
        this.score =Math.round( 10000 * (theMap[y][x] - 1.5) / this.flaps)
        console.log(`bee ${theMap[y][x] === 2 ? 'WINS !' : 'dies'} ; score=${this.score}; flaps ${this.flaps}`)
        return true 
      }

      return false
    }

    // increments coordinates; returns !whether it has hit a wall
    flap() {
      this.flaps++
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
        this.flap()
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
    this.decisions = { turns: turns.map(angle => angle + (Math.random() - 0.5) * MAX_ANGLE_MUTATION) }
    this.flaps = 0
  }

  getNextAngle() {
    const { turns } = this.decisions
    const flaps = this.flaps

    if(turns.length > this.flaps) {
      return turns[this.flaps]
    } else {
      const lastAngle = turns[turns.length - 1]
  
      turns.push(+(lastAngle + (Math.random() - 0.5) * MAX_TURN_ANGLE).toFixed(2))
      return turns[turns.length - 1]
    }
  }
}