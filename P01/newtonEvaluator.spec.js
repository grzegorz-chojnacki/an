'use strict';

const NewtonEvaluatorTests = (() => {
  let points = [
    { x:  2, y:  4 },
    { x: -1, y:  1 },
    { x:  3, y: 17 },
    { x:  1, y:  1 }
  ]
  const bs = new NewtonEvaluator(points).getBs()
  expect(bs[0]).toBe(4)
  expect(bs[1]).toBe(1)
  expect(bs[2]).toBe(3)
  expect(bs[3]).toBe(1)

  const polynomialFor = points => new NewtonEvaluator(points).getPolynomial()

  points = [{ x: 1, y: 2 }]
  expect(polynomialFor(points).terms).toEqual([2])

  points = [ // y = x
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 2 },
  ]
  expect(polynomialFor(points).terms).toEqual([0, 1])

  points = [ // y = x^2
    { x: -2, y: 4 },
    { x: -1, y: 1 },
    { x:  0, y: 0 },
    { x:  1, y: 1 },
    { x:  2, y: 4 },
  ]
  expect(polynomialFor(points).terms).toEqual([0, 0, 1])

  points = [ // x^3 - x^2 - x + 2
    { x:  2, y:  4 },
    { x: -1, y:  1 },
    { x:  3, y: 17 },
    { x:  1, y:  1 }
  ]
  expect(polynomialFor(points).terms).toEqual([2, -1, -1, 1])
})()
