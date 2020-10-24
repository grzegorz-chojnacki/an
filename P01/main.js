'use strict';

const gui = new class {
  canvas    = document.getElementById('canvas')
  formula   = document.getElementById('formula')
  inputList = document.getElementById('inputList')
  dataItemTemplate = `
    <div class="data-item data-group">
      <input type="number" name="year" step="1" placeholder="Rok">
      <input type="number" name="delta" placeholder="Przyrost">
      <button class="remove-button" onclick="gui.removeInput(this)">x</button>
    </div>`

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

  printFormula(polynomial) {
    const exponents = /\^(\d+)/gi
    const exponentTemplate = '<span class="hidden">^</span><sup>$1</sup>'
    this.formula.innerHTML = polynomial
      .toString()
      .replaceAll(exponents, exponentTemplate)
  }

  // TODO: Implement
  // https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
  importData() { }
  // TODO: Implement function to draw polynomial on canvas
  printFunction(polynomial) {}
}()

class Polynomial {
  terms = []
  constructor(terms) { this.terms = terms }

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
    } else return this.terms[0]
  }
}

// Formula tests
// const assert = (result, expected) => {
//   if (result != expected) console.error(`${result} != ${expected}`)
// }

// const newFormula = (terms) => new Polynomial(terms).toString()

// assert(newFormula([0]), '0')
// assert(newFormula([1]), '1')
// assert(newFormula([-1]), '-1')
// assert(newFormula([0,1]), 'x')
// assert(newFormula([0,-1]), '-x')
// assert(newFormula([0,2]), '2x')
// assert(newFormula([0,-2]), '-2x')
// assert(newFormula([1,1]), 'x + 1')
// assert(newFormula([1,-4]), '-4x + 1')
// assert(newFormula([0,0,1]), 'x^2')
// assert(newFormula([0,0,-1]), '-x^2')
// assert(newFormula([0,0,-8]), '-8x^2')
// assert(newFormula([1,0,1]), 'x^2 + 1')
// assert(newFormula([2,-1,2,-2]), '-2x^3 + 2x^2 - x + 2')
// assert(newFormula([0,0,0,0,0,4]), '4x^5')
