'use strict';

const expect = (result) => ({
  toBe: (expected) => (result !== expected)
    ? console.error(`${result} != ${expected}`)
    : undefined
})

const gui = new class {
  canvas    = document.getElementById('canvas')
  formula   = document.getElementById('formula')
  inputList = document.getElementById('inputList')
  dataItemTemplate = `
    <div class="data-item data-group">
      <input type="number" onchange="gui.calculate()" name="year" step="1" placeholder="Rok">
      <input type="number" onchange="gui.calculate()" name="delta" placeholder="Przyrost">
      <button class="remove-button" onclick="gui.removeInput(this)">x</button>
    </div>`

  debounce(func, wait) {
    let timeout

    return (...args) => {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }

      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  calculate = this.debounce(() => console.log('asdasd'), 1000)

  spawnInput() {
    const newInput = new DOMParser()
      .parseFromString(this.dataItemTemplate, 'text/html').body.firstChild

    this.inputList.prepend(newInput)
  }

  removeInput(removeButton) {
    const container = removeButton.parentNode
    container.parentNode.removeChild(container)

    if (this.inputList.childElementCount === 0) { this.spawnInput() }
  }

  removeAllInputs() {
    const inputs = [...this.inputList.childNodes]
    inputs.forEach(node => this.inputList.removeChild(node))

    this.spawnInput();
  }

  getPoints() {
    return [...gui.inputList.childNodes]
    .map(container => container.getElementsByTagName('input'))
    .map(container => ({
      x: container.year.value,
      y: container.delta.value
    }))
  }

  printFormula(polynomial) {
    const exponents = /\^(\d+)/g
    const pluses = /\+/g
    const minuses = /\-/g
    const exponentTemplate = '<span class="hidden">^</span><sup>$1</sup>'
    this.formula.innerHTML = polynomial
      .toString()
      .replaceAll(pluses, '&plus;')
      .replaceAll(minuses, '&minus;')
      .replaceAll(exponents, exponentTemplate)
  }

  // TODO: Implement
  // https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
  importData() { }
  // TODO: Implement function to draw polynomial on canvas
  printFunction(polynomial) { }
}()

class Polynomial {
  terms = []
  constructor(terms) {
    if (terms.length === 0) throw new Error('Term list is empty')
    this.terms = terms
  }

  toString() {
    const fullSign    = n => n >= 0 ? ' + ' : ' - '
    const minimalSign = n => n >= 0 ? ''    : '-'
    const simplifyOne = n => Math.abs(n) === 1 ? '' : n
    const saveOne     = n => n

    const format = (term, power, signFormat, oneSimplification) => (term !== 0)
      ? formatTerm(term, signFormat, oneSimplification) + formatPower(power)
      : ''

    const formatTerm  = (term, signFormat, oneSimplification) =>
      signFormat(term) + oneSimplification(Math.abs(term))

    const formatFreeTerm = (term) => format(term, 0, fullSign, saveOne)
    const formatHighestTerm = (term) =>
      format(term, this.terms.length - 1, minimalSign, simplifyOne)

    const formatPower = (power) => (power > 1)
      ? `x^${power}`
      : (power === 1) ? 'x' : ''

    if (this.terms.length > 1) {
      const [freeTerm, ...terms] = this.terms
      const highestTerm = terms.pop()

      return formatHighestTerm(highestTerm) + terms
        .map((term, index) => format(term, index + 1, fullSign, simplifyOne))
        .reduce((acc, term) => term + acc, formatFreeTerm(freeTerm))
    } else return this.terms[0].toString()
  }
}

const init = (arr) => arr.slice(0, arr.length - 1)
const last = (arr) => arr[arr.length - 1]

const xMult = (points, init = 1) => (x) =>
  points.reduce((acc, point) => acc * (x - point.x), init)

const B = (points) => {
  if (points.length === 1) return points[0].y
  else return (last(points).y - P(init(points))(last(points).x) )
              / xMult(init(points))(last(points).x)
}

const P = (points) => (x) => {
  if (points.length === 1) return points[0].y
  else return P(init(points))(x) + B(points) * xMult(init(points))(x)
}

let points = [{ x:  2, y:  4 }]
let fn = P(points)
expect(fn( 2)).toBe(4)

points = [...points, { x: -1, y:  1 }]
fn = P(points)
expect(fn( 2)).toBe(4)
expect(fn(-1)).toBe(1)

points = [...points, { x:  3, y: 17 }]
fn = P(points)
expect(fn( 2)).toBe(4)
expect(fn(-1)).toBe(1)
expect(fn( 3)).toBe(17)

points = [...points, { x:  1, y:  1 }]
fn = P(points)
expect(fn( 2)).toBe(4)
expect(fn(-1)).toBe(1)
expect(fn( 3)).toBe(17)
expect(fn( 1)).toBe(1)



// P(x[0]) = b[0]
// P(x[1]) = b[0] + b[1](x - x[0])



// const newFormula = (terms) => new Polynomial(terms).toString()

// expect(newFormula([0])).toBe('0')
// expect(newFormula([1])).toBe('1')
// expect(newFormula([-1])).toBe('-1')
// expect(newFormula([0,1])).toBe('x')
// expect(newFormula([0,-1])).toBe('-x')
// expect(newFormula([0,2])).toBe('2x')
// expect(newFormula([0,-2])).toBe('-2x')
// expect(newFormula([1,1])).toBe('x + 1')
// expect(newFormula([1,-4])).toBe('-4x + 1')
// expect(newFormula([0,0,1])).toBe('x^2')
// expect(newFormula([0,0,-1])).toBe('-x^2')
// expect(newFormula([0,0,-8])).toBe('-8x^2')
// expect(newFormula([1,0,1])).toBe('x^2 + 1')
// expect(newFormula([2,-1,2,-2])).toBe('-2x^3 + 2x^2 - x + 2')
// expect(newFormula([0,0,0,0,0,4])).toBe('4x^5')
