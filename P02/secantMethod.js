'use strict'

class SecantMethod {
  f = x => 4*x**3 + 5*x**2 + 6*x - 7
  interval = [0, 1]

  constructor(precision) { this.precision = precision }

  // a = x_{k-1}, b = x_{k}
  getNext = (a, b) => b - (this.f(b) * (b - a)) / (this.f(b) - this.f(a))
  isGoodEnough = (next, prev) => Math.abs(next - prev) < this.precision

  calculate() {
    const g = (a, b, steps = 2) => {
      const next = this.getNext(a, b)
      return this.isGoodEnough(next, b)
        ? ({ result: next, steps })
        : g(b, next, steps + 1)
    }
    return g(this.interval[0], this.interval[1])
  }
}
