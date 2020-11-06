'use strict';

const PolynomialTests = (() => {
  const trimmed = (terms) => (new Polynomial(terms)).terms

  expect(trimmed([0, 0, 0])).toEqual([0])
  expect(trimmed([0, 0, 1])).toEqual([0, 0, 1])
  expect(trimmed([0, 0, 1, 0, 0])).toEqual([0, 0, 1])

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
  expect(additionOf([0], [-4])).toEqual([-4])
  expect(additionOf([-5], [-4])).toEqual([-9])
  expect(additionOf([1, 2], [4])).toEqual([5, 2])
  expect(additionOf([1, 2], [2, 1])).toEqual([3, 3])
  expect(additionOf([0, 0, 3], [1, 2, 0, 4])).toEqual([1, 2, 3, 4])
  expect(additionOf([0, 2, 0, 4], [1, 0, 3])).toEqual([1, 2, 3, 4])

  const productOf = (termsA, termsB) =>
    (new Polynomial(termsA)).multiply(new Polynomial(termsB)).terms

  const productOfN = (termsA, n) =>
    (new Polynomial(termsA)).multiply(n).terms

  expect(productOf([3], [4])).toEqual([12])
  expect(productOfN([3], 4)).toEqual([12])
  expect(productOf([1, 2, 3], [0])).toEqual([0])
  expect(productOfN([1, 2, 3], 0)).toEqual([0])
  expect(productOf([0], [1, 2, 3])).toEqual([0])
  expect(productOf([1, 2, 3], [1])).toEqual([1, 2, 3])
  expect(productOf([1], [1, 2, 3])).toEqual([1, 2, 3])
  expect(productOf([2], [1, 2, 3])).toEqual([2, 4, 6])
  expect(productOfN([1, 2, 3], 2)).toEqual([2, 4, 6])
  expect(productOf([-1], [1, -2, 3])).toEqual([-1, 2, -3])
  // (3x + 3)(3x - 3) = 9x^2 - 9
  expect(productOf([3, 3], [-3, 3])).toEqual([-9, 0, 9])
  // (2x + 3)(2x + 3) = 4x^2 + 12x + 9
  expect(productOf([3, 2], [3, 2])).toEqual([9, 12, 4])
  expect(productOf([-3, 2], [-3, 2])).toEqual([9, -12, 4])
  // (3x + 2)(2x^2 - 3x + 3) = 6x^2 - 5x^2 + 3x + 6
  expect(productOf([2, 3], [3, -3, 2])).toEqual([6, 3, -5, 6])
})()