'use strict'

const a      = 1
const f      = (x, y) => -5*x**4 + 2*Math.sqrt(y + x**5 - 5) + 5
const yExact = x => -(x**5) + x**2 + 5
const step   = (n, b) => (b - a) / n

const calculate = (n, h, next, x = a, y = 5, error = 0) => {
  for (let k = 0; k < n; k++) {
    y = next(x, y)
    x = x + h
    error = Math.max(Math.abs(y - yExact(x)), error)
  }
  return { value: y, error: error }
}

const euler = ({n, b}) => {
  const h = step(n, b)
  const fn = (x, y) => y + h * f(x, y)
  return calculate(n, h, fn)
}

const eulerModified = ({n, b}) => {
  const h = step(n, b)
  const fn = (x, y) => y + h * f(x + h/2, y + h/2 * f(x, y))
  return calculate(n, h, fn)
}

const heun = ({n, b}) => {
  const h = step(n, b)
  const fn = (x, y) => y + h/2 * (f(x, y) + f(x + h, y + h * f(x, y)))
  return calculate(n, h, fn)
}
