'use strict';

class NewtonEvaluator {
  constructor(points) { this.points = points }

  setPoints(points) {
    // ToDo: If points are the same or only differ by one, use old Bs
    // to calculate new Bs

    if (!points.includes(point)) {
      points.push(point)
    }


    this.points = points
  }

  getPolynomials() {
    /**   x :  2, -1, 3, 1
     * f(x):  4, 1, 17, 1
     *
     *
     * P(x) = b0 * P0
     *      + b1 * P1
     *      + b2 * P2
     *      + b3 * P3
     *
     * P0 = f(x0) = 4
     *    => [4]
     *
     * P1 = (x - x0) = (x - 2)
     *    => [-2, 1]
     *
     * P2 = (x - x0)(x - x1) = (x - 2)(x + 1) => (x^2 - x - 2)
     *    => [-2, -1, 1]
     *
     * P3 = (x - x0)(x - x1)(x - x2) = (x - 2)(x + 1)(x - 3)
     *    = (x^3 - 4x^2 + x + 6)
     *    => [6, 1, -4, 1]
     *
     */
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
