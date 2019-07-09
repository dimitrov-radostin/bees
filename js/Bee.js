// const initalX = CANVAS_WIDTH / 10
// const initalY = CANVAS_HEIGHT / 2
// 
class RandomBee {
  constructor(hive) {
    this.hive = hive
    this.turns = [+(Math.random() * 2 * Math.PI).toFixed(2)]
    this.shouldMove = true
    this.x = hive.ctx.canvas.clientWidth / 10
    this.y = hive.ctx.canvas.clientHeight / 2 
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

      if (this.hive.map[y][x] > 0){
        // this.score = Math.round(10000 * (this.hive.map[y][x] - 1.5) / this.moves)
        this.score = 
          this.hive.map[y][x] === 2 ? 5000 / this.moves :
          this.hive.map[y][x] === 1 ? this.moves / 50 :
          'bee died unexplicably'
         

        console.log(`score=${this.score}; moves ${this.moves}`)
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

    // moved to the hive so that all bees are rendered at once

    // fly(ctx) {
    //   const draw = setInterval(() => {
    //     this.clearBee(ctx)
    //     this.move()
    //     if(!this.shouldMove){
    //       clearInterval(draw)
    //       return
    //     }
         
    //   const callBack = () => this.displayBee(ctx)
    //   requestAnimationFrame(callBack)

    //   }, FRAME_TIME)
    // }
  
}

class Bee extends RandomBee {
  constructor(hive, turns){
    super(hive)
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