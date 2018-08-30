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
      const y = Math.max(Math.floor(this.y) , 0)
      const x = Math.max(Math.floor(this.x) , 0)

      if (theMap[y][x] > 0){
        console.log( theMap[y][x] == 2 ? 'bee wins' : 'bee dies')
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
        this.clearBee(ctx)
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