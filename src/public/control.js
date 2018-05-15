let lastPoint = null

const click = x => {
  lastPoint = {
    x: x.x,
    y: x.y
  }
}

const getClick = () => {
  const y = lastPoint
  lastPoint = null
  return y
}