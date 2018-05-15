const getCell = (x, l) => Math.ceil(x / l * 3) - 1

const getPos = (x, w, h) => ({
  x: getCell(x.x, w),
  y: getCell(x.y, h)
})

const loop = (screen, context) => {
  const scr = screen || document.getElementById('screen')
  const ctx = context || scr.getContext('2d')

  scr.onclick = click

  const pos = getClick()
  const cell = pos === null ? null : getPos(pos, scr.width, scr.height)
  if(cell !== null) console.log(cell)

  render(scr, ctx)

  setTimeout(
    loop,
    100,
    scr,
    ctx
  )
}

loop()