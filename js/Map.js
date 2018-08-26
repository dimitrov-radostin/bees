const initMap = ctx => {
  console.log('initing map');
  drawGoal(ctx)
}

const drawGoal = ctx => {
  const size = CANVAS_HEIGHT / 10
  const sunFlower = new Image()
  
  sunFlower.onload = () => {
    ctx.drawImage(sunFlower, CANVAS_WIDTH * 0.8, (CANVAS_HEIGHT - size) / 2 , size, size)
  }
  sunFlower.src = 'assets/sunflower.png'
}