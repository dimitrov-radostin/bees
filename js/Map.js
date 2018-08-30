let theMap = Array(CANVAS_HEIGHT).fill(0).map(r => Array(CANVAS_WIDTH).fill(0))

const addGoalToTheMap = (x_left, y_top, size) => {
  for(let row = y_top; row <= y_top + size; row++) {
    for (let col = x_left; col <= x_left + size; col++) {
      theMap[row][col] = 2
    }
  }
}

const addBorderToTheMap = () => {
  for (let i = 0; i < BEE_RADIUS + STANDARD_BEE_SPEED; i++){
    theMap[i].fill(1)
    theMap[theMap.length - 1 - i].fill(1)
  }
  theMap.forEach(row => {
    row.fill(1, 0, BEE_RADIUS + STANDARD_BEE_SPEED)
    row.fill(1, theMap[0].length - 1 - BEE_RADIUS - STANDARD_BEE_SPEED)
  })
}

const initMap = ctx => {
  drawGoal(ctx)
  addBorderToTheMap()
  console.log(theMap);
}

const drawGoal = ctx => {
  const size = CANVAS_HEIGHT / 8
  const sunFlower = new Image()
  
  sunFlower.onload = () => {
    ctx.drawImage(sunFlower, CANVAS_WIDTH * 0.8, (CANVAS_HEIGHT - size) / 2 , size, size)
    addGoalToTheMap(Math.round(CANVAS_WIDTH * 0.8), Math.round((CANVAS_HEIGHT - size) / 2) , Math.round(size))
  }
  sunFlower.src = 'assets/sunflower.png'
}
