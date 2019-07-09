const initMap = ctx => {
  const CANVAS_HEIGHT = ctx.canvas.clientHeight
  const CANVAS_WIDTH = ctx.canvas.clientWidth

  // use canvas data directly ???? 
  let theMap = Array(CANVAS_HEIGHT).fill(0).map(r => Array(CANVAS_WIDTH).fill(0))
  
  drawBackground(ctx)
  drawGoal(ctx)
  addBorderToTheMap()
  
  return theMap

  // map legend: 2 = the goal
  //             1 = obstacle | border 
  //             0 = empty space

  function addGoalToTheMap(x_left, y_top, size){
    for(let row = y_top; row <= y_top + size; row++) {
      for (let col = x_left; col <= x_left + size; col++) {
        theMap[row][col] = 2
      }
    }
  }

  function addBorderToTheMap(){
    for (let i = 0; i < BEE_RADIUS + STANDARD_BEE_SPEED; i++){
      theMap[i].fill(1)
      theMap[theMap.length - 1 - i].fill(1)
    }
    theMap.forEach(row => {
      row.fill(1, 0, BEE_RADIUS + STANDARD_BEE_SPEED)
      row.fill(1, theMap[0].length - 1 - BEE_RADIUS - STANDARD_BEE_SPEED)
    })
  }

  function drawBackground(ctx){
    ctx.fillStyle = BACK_GROUND_COLOR
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT,)
  }
  
  function drawGoal(ctx){
    const size = CANVAS_HEIGHT / 8
    const sunFlower = new Image()
    
    sunFlower.onload = () => {
      ctx.drawImage(sunFlower, CANVAS_WIDTH * 0.8, (CANVAS_HEIGHT - size) / 2 , size, size)
      addGoalToTheMap(Math.round(CANVAS_WIDTH * 0.8), Math.round((CANVAS_HEIGHT - size) / 2) , Math.round(size))
    }
    sunFlower.src = 'assets/sunflower.png'
  }
  
}