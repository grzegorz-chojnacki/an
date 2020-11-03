'use strict';

const PolynomialTests = (() => {
  const formulaOf = (terms) => new Polynomial(terms).toString()

  expect(formulaOf([0])).toBe('0')
  expect(formulaOf([1])).toBe('1')
  expect(formulaOf([-1])).toBe('-1')
  expect(formulaOf([0,1])).toBe('x')
  expect(formulaOf([0,-1])).toBe('-x')
  expect(formulaOf([0,2])).toBe('2x')
  expect(formulaOf([0,-2])).toBe('-2x')
  expect(formulaOf([1,1])).toBe('x + 1')
  expect(formulaOf([1,-4])).toBe('-4x + 1')
  expect(formulaOf([0,0,1])).toBe('x^2')
  expect(formulaOf([0,0,-1])).toBe('-x^2')
  expect(formulaOf([0,0,-8])).toBe('-8x^2')
  expect(formulaOf([1,0,1])).toBe('x^2 + 1')
  expect(formulaOf([2,-1,2,-2])).toBe('-2x^3 + 2x^2 - x + 2')
  expect(formulaOf([0,0,0,0,0,4])).toBe('4x^5')

  const additionOf = (termsA, termsB) =>
    (new Polynomial(termsA)).add(new Polynomial(termsB)).terms

  expect(additionOf([0], [0])).toEqual([0])
  expect(additionOf([5], [2])).toEqual([7])
  expect(additionOf([2], [5])).toEqual([7])
  expect(additionOf([4], [0])).toEqual([4])
  expect(additionOf([0], [4])).toEqual([4])
  expect(additionOf([1, 2], [4])).toEqual([5, 2])
  expect(additionOf([1, 2], [2, 1])).toEqual([3, 3])
  expect(additionOf([0, 0, 3], [1, 2, 0, 4])).toEqual([1, 2, 3, 4])
  expect(additionOf([0, 2, 0, 4], [1, 0, 3])).toEqual([1, 2, 3, 4])
})()