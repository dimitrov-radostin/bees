drawCircle = (ctx, x, y, radius, color) => {
    ctx.beginPath();
    ctx.fillStyle = color
    ctx.arc(x, y, radius , 0, 2 * Math.PI);
    ctx.fill()
}