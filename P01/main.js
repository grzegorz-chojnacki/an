'use strict';

const view = new class {
  canvas    = document.getElementById('canvas')
  formula   = document.getElementById('formula')
  inputList = document.getElementById('inputList')
  dataItemTemplate = `
    <div class="data-item data-group">
      <input type="number" name="year" step="1" placeholder="Rok">
      <input type="number" name="delta" placeholder="Przyrost">
      <button class="remove-button" onclick="view.removeInput(this)">x</button>
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

  getFormula(polynomial) {
    const fullSign    = (coef) => coef >= 0 ? ' + ' : ' - '
    const minimalSign = (coef) => coef >= 0 ? ''    : '-'
    const simplifyOne = (coef) => Math.abs(coef) === 1 ? '' : coef
    const saveOne     = (coef) => coef

    const format = (coef, power, signFormat, oneSimplification) => (coef !== 0)
      ? formatCoef(coef, signFormat, oneSimplification) + formatPower(power)
      : ''

    const formatCoef  = (coef, signFormat, oneSimplification) =>
      signFormat(coef) + oneSimplification(Math.abs(coef))

    const formatFreeTerm = (coef) => format(coef, 0, fullSign, saveOne)
    const formatHighestTerm = (coef) =>
      format(coef, polynomial.length - 1, minimalSign, simplifyOne)

    const formatPower = (power) => (power > 1)
      ? `x<sup>${power}</sup>`
      : (power === 1) ? 'x' : ''

    if (polynomial.length > 1) {
      const [freeTerm, ...terms] = polynomial
      const highestTerm = terms.pop()

      return formatHighestTerm(highestTerm) + terms
        .map((coef, index) => format(coef, index + 1, fullSign, simplifyOne))
        .reduce((acc, term) => term + acc, formatFreeTerm(freeTerm))
    } else return polynomial[0]
  }

  printFormula(polynomial) {
    this.formula.innerHTML = this.getFormula(polynomial)
  }

  // TODO: Implement
  // https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
  importData() { }
  // TODO: Implement function to draw polynomial on canvas
  printFunction(polynomial) {}
}()

const assert = (result, expected) => {
  if (result != expected) console.error(`${result} != ${expected}`)
}

// Formula tests
assert(view.getFormula([0]), '0')
assert(view.getFormula([1]), '1')
assert(view.getFormula([-1]), '-1')
assert(view.getFormula([0,1]), 'x')
assert(view.getFormula([0,-1]), '-x')
assert(view.getFormula([0,2]), '2x')
assert(view.getFormula([0,-2]), '-2x')
assert(view.getFormula([1,1]), 'x + 1')
assert(view.getFormula([1,-4]), '-4x + 1')
assert(view.getFormula([0,0,1]), 'x<sup>2</sup>')
assert(view.getFormula([0,0,-1]), '-x<sup>2</sup>')
assert(view.getFormula([0,0,-8]), '-8x<sup>2</sup>')
assert(view.getFormula([1,0,1]), 'x<sup>2</sup> + 1')
assert(view.getFormula([2,-1,2,-2]), '-2x<sup>3</sup> + 2x<sup>2</sup> - x + 2')
assert(view.getFormula([0,0,0,0,0,4]), '4x<sup>5</sup>')
