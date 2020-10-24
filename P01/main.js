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

  printFormula(polynomial) {
    const fullSign    = (coef) => coef >= 0 ? ' + ' : ' - '
    const minimalSign = (coef) => coef >= 0 ? ''    : '-'
    const simplifyOne = (coef) => Math.abs(coef) === 1 ? '' : coef
    const saveOne    = (coef) => coef
    const formatCoef = (coef, signFormat, oneSimplification) =>
      signFormat(coef) + oneSimplification(Math.abs(coef))

    const formatFreeTerm = (coef) => (coef !== 0)
      ? formatCoef(coef, fullSign, saveOne) : ''

    const formatHighestTerm = (coef) =>
      formatCoef(coef, minimalSign, simplifyOne)
      + formatPower(polynomial.length - 1)

    const format = (coef, power) => (coef !== 0)
      ? formatCoef(coef, fullSign, simplifyOne) + formatPower(power + 1) : ''

    const formatPower = (power) => (power > 1)
      ? `x<sup>${power}</sup>`
      : (power === 1) ? 'x' : ''

    if (polynomial.length > 1) {
      const [freeTerm, ...terms] = polynomial
      const highestTerm = terms.pop()

      this.formula.innerHTML =
        formatHighestTerm(highestTerm) +
        terms
          .map(format)
          .reduce((acc, term) => term + acc, formatFreeTerm(freeTerm))

    } else this.formula.innerHTML = polynomial[0]
  }

  // TODO: Implement
  // https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
  importData() { }
  // TODO: Implement function to draw polynomial on canvas
  printFunction(polynomial) {}
}()

// TODO: Remove
// 2x^3 + 10x^2 - 5
view.printFormula([-1, -2, -2])