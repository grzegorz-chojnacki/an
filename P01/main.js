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
    const formatCoef = (coef) => {
      if (coef > 0) return ` + ${coef}`
      else return ` - ${-coef}`
    }

    const formatPower = (power) => {
      if (power > 1) return `x<sup>${power}</sup>`
      else if (power === 1) return 'x'
      else return ''
    }

    const format = (coef, power) => {
      if (coef !== 0) return formatCoef(coef) + formatPower(power)
      else return ''
    }

    let monomials = polynomial.map(format)

    this.formula.innerHTML = monomials
      .reduce((acc, monomial) => monomial + acc)
      .slice(3) // Remove leading '+' or '-' sign
  }

  // TODO: Implement
  // https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
  importData() { }
  // TODO: Implement function to draw polynomial on canvas
  printFunction(polynomial) {}
}()

// TODO: Remove
// 2x^3 + 10x^2 - 5
view.printFormula([-5, 0, 10, 2])