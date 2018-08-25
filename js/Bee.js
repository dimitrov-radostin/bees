class Bee {
  constructor() {
    this.decisions = {
      // speedX: Math.random(),
      // speedY: Math.random()
      initalAngle: Math.random() * 2 * Math.PI 
    }
    this.x = CANVAS_WIDTH / 10
    this.y = CANVAS_HEIGHT / 2

    this.flap = () => {
      const { initalAngle } = this.decisions
      const speedX = Math.cos(initalAngle) * STANDARD_BEE_SPEED
      const speedY = Math.sin(initalAngle) * STANDARD_BEE_SPEED

      if(
        this.x < 0 ||
        this.x > CANVAS_WIDTH ||
        this.y < 0 ||
        this.y > CANVAS_HEIGHT
      ){
        return false
      }

      this.x += speedX
      this.y += speedY
      return true
    }

    this.fly = ctx => {
      do {
        this.display(ctx)
        var shouldMove = this.flap()
      } while (shouldMove)      
      console.log('done');
    }

    this.display = ctx => {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI);
      ctx.stroke()      
    }
  }
}