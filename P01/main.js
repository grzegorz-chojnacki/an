'use strict';

const view = new class {
  canvas    = document.getElementById('canvas')
  formula   = document.getElementById('formula')
  inputList = document.getElementById('inputList')
  dataItemTemplate = `
    <div class="data-item data-group">
      <input type="number" name="year" step="1" placeholder="Rok">
      <input type="number" name="delta" placeholder="Przyrost">
      <button class="remove-button" onClick="view.removeInput(this)">x</button>
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
    const formatCoef = (coef) =>
      (coef > 0) ? ` + ${coef}` : ` - ${-coef}`

    const formatPower = (power) =>
      (power !== 0) ? `x<sup>${power}</sup>` : ''

    const format = (coef, power) =>
      (coef !== 0) ? formatCoef(coef) + formatPower(power) : ''

    let monomials = polynomial
      .map((coef, power) => format(coef, power))
      .reverse()

    this.formula.innerHTML = monomials
      .reduce((acc, monomial) => acc + monomial)
  }

  // TODO: Implement
  // https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
  importData() { }
}()

view.printFormula([-5, 0, 10, 2])