'use strict'

const f             = (x, y) => -5*x**4 + 2*Math.sqrt(y + x**5 - 5) + 5
const step          = (n, b) => (b - 1) / n
const yExact        = x => -(x**5) + x**2 + 5

// Methods
const euler         = h => (x, y) => y + h * f(x, y)
const eulerModified = h => (x, y) => y + h * f(x + h/2, y + h/2 * f(x, y))
const heun          = h => (x, y) => y + h/2 * (f(x, y) + f(x + h, y + h * f(x, y)))

const applyMethod = (method, {n, b}) => {
  const h = step(n, b)
  return calculate(n, h, method(h))
}

const calculate = (n, h, method, x = 1, y = 5, error = 0, acc = []) => {
  for (let k = 0; k < n; k++) {
    y = method(x, y)
    acc.push(y)
    x = x + h
    error = Math.max(Math.abs(y - yExact(x)), error)
  }
  return { value: acc, error }
}
