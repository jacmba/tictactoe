const makeBoard = (rows, columns) => {
  const makeColumns = x =>
    x.length === columns ? x : makeColumns(x.concat([0]))

  const makeRows = x =>
    x.length === rows ? x : makeRows(x.concat([makeColumns([])]))
  
  return Object.freeze(makeRows([]))
}

const setValue = (brd, vX, vY, v) =>
  Object.freeze(brd.reduce((p, c, y) =>
    p.concat([c.reduce((p, c, x) =>
      p.concat([x === vX && y === vY && c === 0 ? v : c]), [])]), []))