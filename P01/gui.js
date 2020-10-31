'use strict';

const gui = new class {
  canvas    = document.getElementById('canvas')
  formula   = document.getElementById('formula')
  inputList = document.getElementById('inputList')
  dataItemTemplate = `
    <div class="data-item data-group">
      <input type="number" onkeyup="gui.update()" name="year" step="1" placeholder="Rok">
      <input type="number" onkeyup="gui.update()" name="delta" placeholder="Przyrost">
      <button class="remove-button" onclick="gui.removeInput(this)">x</button>
    </div>`

  doStuff() {
    // ToDo: act when some inputs have NaN values
    const points = this.getPoints()
    const evaluator = new NewtonEvaluator(points)

    const bs = evaluator.getBs()
    // const polynomial = evaluator.getPolynomials()

    console.log(bs)
  }

  update = debounce(() => this.doStuff(), 1000)

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
      x: parseInt(container.year.value),
      y: parseInt(container.delta.value)
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