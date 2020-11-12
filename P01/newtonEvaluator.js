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

    const [b0, ...bs] = this.getBs()
    const polynomials = init(this.points)
      .map(Polynomial.point)
      .map(getListSlicesFromStart)
      .map(group => group.reduce(Polynomial.product))

    return polynomials
      .map((polynomial, index) => polynomial.multiply(bs[index]))
      .reduce(Polynomial.sum)
      .add(b0)
  }

  getBs() {
    const pointProduct = (points) => points
      .map(Polynomial.point)
      .reduce(Polynomial.product)

    const P = (points) => {
      if (points.length === 1) return new Polynomial([points[0].y])
      else {
        const current = init(points)
        return P(current).add(pointProduct(current).multiply(getB(points)))
      }
    }

    const getB = (points) => {
      if (points.length === 1) return points[0].y
      else {
        const [current, rest] = [last(points), init(points)]
        return (current.y - P(rest).at(current.x)) / pointProduct(rest).at(current.x)
      }
    }

    return this.points.map(getListSlicesFromStart).map(getB)
  }
}
