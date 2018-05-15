const loop = (screen, context) => {
  const scr = screen || document.getElementById('screen')
  const ctx = context || scr.getContext('2d')

  render(scr, ctx)

  setTimeout(
    loop,
    100,
    scr,
    ctx
  )
}

loop()