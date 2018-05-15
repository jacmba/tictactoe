const findEmpty = xs =>
  xs.reduce((p, c, y) =>
    p.concat(c.reduce((p, c, x) =>
      c === 0 ? p.concat([{x: x, y: y}]) : p, [])), [])

const dumbSelect = (xs, [x]) => setValue(xs, x.x, x.y, 2)

const aiPlay = xs => dumbSelect(xs, findEmpty(xs))