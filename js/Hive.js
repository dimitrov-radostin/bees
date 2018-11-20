class Hive {
  constructor(previousBees) {
      if (previousBees){
      this.bees = previousBees.map(({turns}) => new Bee(turns))
    } else {
      this.bees = Array(HIVE_POPULATION).fill(0).map(_ => new RandomBee())
    }
  }

  static getNextBeeGeneration(bees) {
    const goodBees = bees
      .sort((b1, b2) => b1.score - b2.score)
      .slice(Math.round(bees.length / 2))
    return [...goodBees, ...goodBees]
  }

  releaseBees(ctx) {
    const draw = setInterval(() => {
      if(!this.bees.some(bee => bee.shouldMove)){
        clearInterval(draw)

        console.log(' all bees are done ');
        // const decisionsSortedByscore = this.bees.sort((b1, b2) => b1.score - b2.score).map(b => b.decisions.turns)

        // console.log(decisionsSortedByscore)
        const nextDecisions = Hive.getNextBeeGeneration(this.bees)
        const newHive = new Hive(nextDecisions)
        console.log(newHive)
        newHive.releaseBees(ctx)
        return
      }

      this.bees.forEach(bee => { 
        if (bee.shouldMove){
          bee.clearBee(ctx)
          bee.move()
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