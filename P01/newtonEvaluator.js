'use strict';

class NewtonEvaluator {
  constructor(points) { this.points = points }

  setPoints(points) {
    // ToDo: If points are the same or only differ by one, use old Bs
    // to calculate new Bs

    // if (!points.includes(point)) {
    //   points.push(point)
    // }

    this.points = points
  }

  getPolynomial() {
    if (this.points.length === 1) return new Polynomial([this.points[0].y])

    const steppedGroup = (polynomial, index, polynomials) =>
      polynomials.slice(0, index + 1)

    const multiplyAll = (acc, polynomial) => acc.multiply(polynomial)

    const [b0, ...bs] = this.getBs()
    const polynomials = init(this.points)
      .map(point => new Polynomial([-point.x, 1]))
      .map(steppedGroup)
      .map(group => group.reduce(multiplyAll))

    return polynomials
      .map((polynomial, index) => polynomial.multiply(bs[index]))
      .reduce((acc, polynomial) => acc.add(polynomial))
      .add(b0)
  }

  getBs() {
    // ToDo: Memoizing
    const xMult = (points, init = 1) => (x) =>
      points.reduce((acc, point) => acc * (x - point.x), init)

    const P = (points) => (x) => {
      if (points.length === 1) return points[0].y
      else return P(init(points))(x) + getB(points) * xMult(init(points))(x)
    }

    const getB = (points) => {
      if (points.length === 1) return points[0].y
      else return (last(points).y - P(init(points))(last(points).x))
                  / xMult(init(points))(last(points).x)
    }

    return this.points
      .map((point, index) => getB(this.points.slice(0, index + 1)))
  }
}
