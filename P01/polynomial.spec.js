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
})()