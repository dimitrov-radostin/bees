class Hive {
  constructor(decisions) {
    if (decisions){
      this.bees = decisions.map(d => new Bee (d))
    } else {
      this.bees = Array(HIVE_POPULATION).fill(0).map(_ => new RandomBee())
    }
  }

  static getNextDecisions(bees) {
    const goodBees = bees
      .sort((b1, b2) => b1.score - b2.score)
      .map(b => b.decisions.turns)
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
        const nextDecisions = Hive.getNextDecisions(this.bees)
        const newHive = new Hive(nextDecisions)
        console.log(newHive)
        newHive.releaseBees(ctx)
        return
      }

      this.bees.forEach(bee => { 
        if (bee.shouldMove){
          bee.clearBee(ctx)
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