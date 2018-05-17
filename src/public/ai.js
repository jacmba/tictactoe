const findEmpty = xs =>
  xs.reduce((p, c, y) =>
    p.concat(c.reduce((p, c, x) =>
      c === 0 ? p.concat([{x: x, y: y}]) : p, [])), [])

const dumbSelect = (xs, [x]) => setValue(xs, x.x, x.y, 2)

const randPick = (xs, x) => {
  const i = new Date().getTime() % (x.length)
  const y = x[i]
  return setValue(xs, y.x, y.y, 2)
}

const minimax = (b, d = 0, x = -1, y = -1) => {
  const p = d === 0 || d % 2 === 0 ? 2 : 1
  const w = checkWin(b)
  const node = {
    b: b,
    d: d,
    children: w > 0 ? null : findEmpty(b).map(
      x => minimax((setValue(b, x.x, x.y, p)), d + 1, x.x, x.y)
    ),
    x: x,
    y: y
  }

  if(node.children === null) {
    node.val = w === 1 ? -10 + d : w === 2 ? 10 - d : 0
  } else {
    const f = p === 2 ? maxValue : minValue
    node.val = f(node.children)
  }

  return Object.freeze(node)
}

const sum = xs => xs.reduce((p, c) => c.val + p, 0)

const maxValue = xs => xs.reduce((p, c) => c.val > p ? c.val : p, xs[0] ? xs[0].val : 0)

const minValue = xs => xs.reduce((p, c) => c.val < p ? c.val : p, xs[0] ? xs[0].val : 0)

const getCandidates = (xs, v) => xs.filter(x => x.val === v)

const aiPlay = xs => {
  if(xs[1][1] === 0) return setValue(xs, 1, 1, 2)
  const m = minimax(xs)
  const picks = getCandidates(m.children, m.val)
  return randPick(xs, picks)
}