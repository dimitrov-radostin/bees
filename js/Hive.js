class Hive {
  constructor() {
    this.bees = Array(HIVE_POPULATION).fill(0).map(_ => new RandomBee())
    this.releaseBees = ctx => {
      const draw = setInterval(() => {
        if(!this.bees.some(bee => bee.shouldMove)){
          clearInterval(draw)
          console.log(' all bees are done ');
          return
        }
        this.bees.forEach(bee => { 
          if (bee.shouldMove){
            // bee.clearBee(ctx)
            bee.flap()
          }
        })
          
        const callBack = () => this.bees.forEach(bee => {
            if (bee.shouldMove){
              bee.displayBee(ctx)
            } 
          })
        requestAnimationFrame(callBack)

      }, FRAME_TIME)
    }
  }
}