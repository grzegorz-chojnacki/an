'use strict';

const NewtonEvaluatorTests = (() => {
  const points = [
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
})()
