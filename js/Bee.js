class Bee {
  constructor() {
    this.decisions = {
      initalAngle: Math.random() * 2 * Math.PI,
      turns: []
    }
    this.x = CANVAS_WIDTH / 10
    this.y = CANVAS_HEIGHT / 2

    this.clearBee = ctx => {
      ctx.clearRect(
        this.x - 2 * BEE_RADIUS,
        this.y - 2 * BEE_RADIUS,
        4 * BEE_RADIUS,
        4 * BEE_RADIUS
      )
      ctx.fillRect(this.x, this.y, 1, 1)
    }

    // draws a circle at (x, y)
    this.displayBee = ctx => {
      ctx.beginPath();
      ctx.fillStyle = BEE_COLOR
      ctx.arc(this.x, this.y, BEE_RADIUS, 0, 2 * Math.PI);
      ctx.fill()
    }

    this.getNextAngle = () => {
      const { turns, initalAngle } = this.decisions

      if (turns.length === 0){
        turns.push(initalAngle)
        return initalAngle
      }

      const lastAngle = turns[turns.length - 1]
      turns.push(lastAngle + (Math.random() - 0.5) * MAX_TURN_ANGLE)
      return turns[turns.length - 1]
    }

    this.detectCollision = () =>{
      const y = Math.floor(this.y) - STANDARD_BEE_SPEED
      const x = Math.floor(this.x) - STANDARD_BEE_SPEED

      if (theMap[y][x] > 0){
        console.log( x, y , theMap[y][x])
        return true
      }

      return false
    }

    // increments coordinates; returns !whether it has hit a wall
    this.flap = () => {
      const angle = this.getNextAngle()
      const speedX = Math.cos(angle) * STANDARD_BEE_SPEED
      const speedY = Math.sin(angle) * STANDARD_BEE_SPEED

      if(
        this.detectCollision()
      ){
        return false
      }

      this.x += speedX
      this.y += speedY
      return true
    }

    this.fly = ctx => {
      var shouldMove = true
      const draw = setInterval(() => {
        // this.clearBee(ctx)
        shouldMove = this.flap()
        if(!shouldMove){
          clearInterval(draw)
          return
        }
         
        this.displayBee(ctx)

      }, FRAME_TIME)
  }

  }
}