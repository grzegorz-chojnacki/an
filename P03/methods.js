'use strict'

const f = (x, y) => -5*x**4 + 2*Math.sqrt(y + x**5 - 5) + 5
const h = (n, b) => (b - 1) / n

// Expected return type: { value: number, error: number }
const euler         = ({n, b}) => { return { value: n, error: b }}
const eulerModified = ({n, b}) => { return { value: n, error: b }}
const heun          = ({n, b}) => { return { value: n, error: b }}
