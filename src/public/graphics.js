const render = (scr, ctx, brd) => {
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

  drawBoard(brd, W, H, ctx)
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

const getCoord = (x, l) => {
  const s = Math.floor(l / 3)
  const m = Math.floor(s / 2)
  return (x * s) + m
}

const drawVal = (x, y, w, h, v, ctx) => {
  if(v === 0) return
  ctx.font = '36px sans'
  ctx.textAlign = 'center'
  ctx.fillStyle = ctx.strokeStyle
  ctx.fillText(v === 1 ? 'O' : 'X', getCoord(x, w), getCoord(y, h))
}

const drawWin = (ctx, w, h, v) => {
  const txt = v > 0 ? `Player ${v} wins !!` : 'Draw !!'
  console.log(txt)
  ctx.font = 'italic bold 36px Courier New'
  ctx.fillStyle = 'yellow'
  ctx.strokeStyle = 'black'
  ctx.textAlign = 'center'
  ctx.lineWidth = 6
  ctx.strokeText(txt, Math.floor(w / 2), Math.floor(h / 2))
  ctx.fillText(txt, Math.floor(w / 2), Math.floor(h / 2))
}

const drawBoard = (b, w, h, ctx) =>
  b.reduce((p, c, y) =>
    c.reduce((p, c, x) => drawVal(x, y, w, h, c, ctx), 0), 0)