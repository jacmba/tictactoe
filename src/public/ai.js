const findEmpty = xs =>
  xs.reduce((p, c, y) =>
    p.concat(c.reduce((p, c, x) =>
      c === 0 ? p.concat([{x: x, y: y}]) : p, [])), [])

const dumbSelect = (xs, [x]) => setValue(xs, x.x, x.y, 2)

const makeTree = (brd, empt, v) =>
  empt.map(x => { 
    const b = setValue(brd, x.x, x.y, v)
    const e = findEmpty(b)
    const w = checkWin(b)
    return {
      v: b,
      children: e.length > 0 && w === 0 ? 
        makeTree(b, e, v === 1 ? 2 : 1) : 
        null,
      val: w === 0 ? 0 : w === 1 ? -10 : 10
    }
  })

const sum = xs => xs.reduce((p, c) => c + p, 0)

const max = xs => xs.reduce((p, c) => c.val > p ? c.val : p, -10000)

const evalTree = t =>
  t.map(x => {
    const w = x.val === 0 ? checkWin(x.v) : x.val
    const v = w === 0
  })

const aiPlay = xs => {
  const empts = findEmpty(xs)
  const tree = makeTree(xs, empts, 2)
  console.log(tree)
  return dumbSelect(xs, empts)
}