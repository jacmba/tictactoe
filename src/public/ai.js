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
      val: w === 0 ? 0 : w === 1 ? -10 : 10,
      x: x.x,
      y: x.y
    }
  })

const sum = xs => xs.reduce((p, c) => c.val + p, 0)

const maxValue = (xs, x) => xs.reduce((p, c) => c > p ? c : p, x)

const minValue = (xs, x) => xs.reduce((p, c) => c < p ? c : p, x)

const min = xs =>
  xs.reduce((p, c) =>{
    if(!c.children) return c.val
    const leafChildren = c.children.filter(x => x.children === null)
    if(leafChildren.length > 0) {
      c.val = c.val + sum(leafChildren)
      return c.val
    }
    const maxChildren = c.children.map(x => max([x]))
    c.val = c.val + minValue(maxChildren, p)
    return c.val
  }, 100)

const max = xs =>
  xs.reduce((p, c) =>{
    if(!c.children) return c.val
    const leafChildren = c.children.filter(x => x.children === null)
    if(leafChildren.length > 0) {
      c.val = c.val + sum(leafChildren)
      return c.val
    }
    const minChildren = c.children.filter(x => min([x]))
    c.val = c.val + maxValue(minChildren, p)
    return c.val
  }, -100)

const getCandidates = (xs, v) => xs.filter(x => x.val === v)

const aiPlay = xs => {
  const empts = findEmpty(xs)
  const tree = makeTree(xs, empts, 2)
  const m = max(tree)
  const picks = getCandidates(tree, m)
  console.log(m, picks)
  return randPick(xs, picks)
}