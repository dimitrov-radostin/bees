const initalX = CANVAS_WIDTH / 10
const initalY = CANVAS_HEIGHT / 2

class RandomBee {
  constructor() {
    this.decisions = {
      initalAngle: Math.random() * 2 * Math.PI,
      turns: [],
    }
    this.bDate = Date.now()
    this.shouldMove = true
    this.x = initalX
    this.y = initalY
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
      const { turns, initalAngle } = this.decisions

      if (turns.length === 0){
        turns.push(initalAngle)
        return initalAngle
      }

      const lastAngle = turns[turns.length - 1]
      turns.push(lastAngle + (Math.random() - 0.5) * MAX_TURN_ANGLE)
      return turns[turns.length - 1]
    }

    detectCollision() {
      const y = Math.floor(this.y)
      const x = Math.floor(this.x)

      if (theMap[y][x] > 0){
        this.score =Math.round( 1000000 * (theMap[y][x] - 1.5) / (Date.now() - this.bDate))
        console.log(`bee ${theMap[y][x] === 2 ? 'WINS !' : 'dies'} ; score=${this.score}`)
        return true 
      }

      return false
    }

    // increments coordinates; returns !whether it has hit a wall
    flap() {
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
  constructor(initalAngle, turns){
    super()
    this.decisions = {
      initalAngle,
      turns
    }
    this.flaps = 0
  }

  getNextAngle() {
    console.log('getting next angle ', this.decisions);
    if(this.decisions.turns.length > this.flaps) {
      console.log('indeed')
      return this.decisions.turns[this.flaps++]
    }
    return 0
  }
}