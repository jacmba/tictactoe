const getCell = (x, l) => Math.ceil(x / l * 3) - 1

const getPos = (x, w, h) => ({
  x: getCell(x.x, w),
  y: getCell(x.y, h)
})

const loop = (screen, context, board, turn = 1) => {
  const scr = screen || document.getElementById('screen')
  const ctx = context || scr.getContext('2d')
  const brd = board || makeBoard(3, 3)

  const win = checkWin(brd)
  if(win > 0) {
    drawWin(ctx, screen.width, screen.height, win)
    return
  }

  if (findEmpty(brd).length === 0) {
    drawWin(ctx, screen.width, screen.height, 0)
    return
  }

  scr.onclick = click

  const pos = getClick()
  const cell = pos === null || turn !== 1 ? null : getPos(pos, scr.width, scr.height)

  const y = turn === 1 ? (cell ? setValue(brd, cell.x, cell.y, 1) : brd) : aiPlay(brd)

  const t = cell ? 2 : 1

  render(scr, ctx, y)

  setTimeout(
    loop,
    100,
    scr,
    ctx,
    y,
    t
  )
}

loop()