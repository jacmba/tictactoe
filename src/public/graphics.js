const render = (scr, ctx) => {
  const W = scr.width
  const H = scr.height

  ctx.fillStyle = 'black'
  ctx.strokeStyle = 'white'
  ctx.fillRect(0, 0, W, H)

  const hRule = drawHRule(ctx, 0, W)
  hRule(c1(H))
  hRule(c2(H))

  const vRule = drawVRule(ctx, H, 0)
  vRule(c1(W))
  vRule(c2(W))
}

const drawLine = (ctx, x1, y1, x2, y2) => {
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
}

const drawHRule = (ctx, x1, x2) => y => drawLine(ctx, x1, y, x2, y)

const drawVRule = (ctx, y1, y2) => x => drawLine(ctx, x, y1, x, y2)

const c1 = x => Math.floor(x / 3)

const c2 = x => x - c1(x)