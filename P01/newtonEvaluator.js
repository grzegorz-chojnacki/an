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

    const multiplyAll = (acc, polynomial) => acc.multiply(polynomial)

    const [b0, ...bs] = this.getBs()
    const polynomials = init(this.points)
      .map(point => Polynomial.point(point))
      .map(getListSlicesFromStart)
      .map(group => group.reduce(multiplyAll))

    return polynomials
      .map((polynomial, index) => polynomial.multiply(bs[index]))
      .reduce((acc, polynomial) => acc.add(polynomial))
      .add(b0)
  }

  getBs() {
    const xMult = (points) => points
      .reduce((acc, point) => acc.multiply(Polynomial.point(point)), Polynomial.one)

    // const xMult = (points, init = 1) => (x) =>
    //   points.reduce((acc, point) => acc * (x - point.x), init)

    const P = (points) => (x) => {
      if (points.length === 1) return points[0].y
      else return P(init(points))(x) + getB(points) * xMult(init(points)).at(x)
    }

    const getB = (points) => {
      if (points.length === 1) return points[0].y
      else return (last(points).y - P(init(points))(last(points).x))
                  / xMult(init(points)).at(last(points).x)
    }

    return this.points.map(getListSlicesFromStart).map(getB)
  }
}
