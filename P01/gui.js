'use strict';

const gui = new (class {
  canvas    = document.getElementById('canvas')
  formula   = document.getElementById('formula')
  inputList = document.getElementById('inputList')
  dataItemTemplate = `
    <div class="data-item data-group">
      <input type="number" onkeyup="gui.update()" name="year" step="1" placeholder="Rok">
      <input type="number" onkeyup="gui.update()" name="delta" placeholder="Przyrost">
      <button class="remove-button" onclick="gui.removeInput(this)">x</button>
    </div>`

  recalculate() {
    const points = this.getPoints()
      .filter(point => point.x && point.y)

    const evaluator = new NewtonEvaluator(points)

    const polynomial = evaluator.getPolynomial()
    this.printFormula(polynomial)
  }

  update = debounce(() => this.recalculate(), 1000)

  spawnInput() {
    const newInput = new DOMParser()
      .parseFromString(this.dataItemTemplate, 'text/html').body.firstChild

    this.inputList.prepend(newInput)
  }

  removeInput(removeButton) {
    const container = removeButton.parentNode
    container.parentNode.removeChild(container)

    if (this.inputList.childElementCount === 0) { this.spawnInput() }

    this.recalculate()
  }

  removeAllInputs() {
    const inputs = [...this.inputList.childNodes]
    inputs.forEach(node => this.inputList.removeChild(node))

    this.spawnInput()
  }

  getPoints() {
    return [...gui.inputList.childNodes]
      .map(container => container.getElementsByTagName('input'))
      .map(container => ({
        x: parseFloat(container.year.value),
        y: parseFloat(container.delta.value)
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
})()