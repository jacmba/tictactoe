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

const checkLineWin = x => x[0] === x[1] && x[0] === x[2] ? x[0] : 0

const getColumn = (xs, x) => xs.reduce((p, c) => p.concat([c[x]]), [])

const getColumns = xs => ([getColumn(xs, 0), getColumn(xs, 1), getColumn(xs, 2)])

const getRDiag = xs => ([xs[0][0], xs[1][1], xs[2][2]])

const getLDiag = xs => ([xs[0][2], xs[1][1], xs[2][0]])

const checkWin = xs => {
  const lines = xs => xs.reduce((p, c) => {
    const l = checkLineWin(c)
    if(l > 0) return l
    return p
  }, 0)

  const rows = lines(xs)
  if(rows > 0) return rows

  const columns = lines(getColumns(xs))
  if(columns > 0) return columns

  const lDiag = checkLineWin(getLDiag(xs))
  if(lDiag > 0) return lDiag

  const rDiag = checkLineWin(getRDiag(xs))
  if(rDiag > 0) return rDiag

  return 0
}