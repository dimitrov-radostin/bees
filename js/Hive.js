class Hive {
  constructor(context, map, previousBees) {
    this.ctx = context
    this.map = map
    const hive = this

    if (previousBees){
      this.bees = previousBees.map(({turns}) => new Bee(hive, turns))
    } else {
      this.bees = Array(HIVE_POPULATION).fill(0).map(_ => new RandomBee(hive))
    }
  }

  static getNextBeeGeneration(bees) {
    const goodBees = bees
      .sort((b1, b2) => b1.score - b2.score)
      .slice(Math.round(bees.length / 2))
    return [...goodBees, ...goodBees]
  }

  releaseBees() {
    const draw = setInterval(() => {
      if(!this.bees.some(bee => bee.shouldMove)){
        clearInterval(draw)

        console.log(' all bees are done ');
        // const decisionsSortedByscore = this.bees.sort((b1, b2) => b1.score - b2.score).map(b => b.decisions.turns)

        // console.log(decisionsSortedByscore)

        // -----recursion ---- felt wrong when rereading some time later
        // why a method would create a new instance
        const nextDecisions = Hive.getNextBeeGeneration(this.bees)
        const newHive = new Hive(this.ctx, this.map, nextDecisions)
        console.log(newHive)
        newHive.releaseBees()
        return
      }

      let self = this
      this.bees.forEach(bee => { 
        if (bee.shouldMove){
          bee.clearBee(self.ctx)
          bee.move()
        }
      })
        
      const callBack = () => this.bees.forEach(bee => {
        if (bee.shouldMove){
          bee.displayBee(self.ctx)
        } 
      })

      requestAnimationFrame(callBack)

    }, FRAME_TIME)
  }

}