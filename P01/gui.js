'use strict';

const gui = new (class {
  canvas    = document.getElementById('canvas')
  formula   = document.getElementById('formula')
  inputList = document.getElementById('inputList')
  fileInput = document.getElementById('fileInput')
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

  spawnInput(point) {
    const newInput = new DOMParser()
      .parseFromString(this.dataItemTemplate, 'text/html').body.firstChild

    if (point !== undefined) {
      const inputs = newInput.getElementsByTagName('input')
      inputs.year.value  = point.x
      inputs.delta.value = point.y
    }

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

  showFileDialog() { this.fileInput.click() }

  async importData(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files.item(0)
      const points = this.parsePoints(await file.text())
      this.fillInputs(points)
    }
  }

  parsePoints(fileContents) {
    try {
      // ToDo: Check if property x, y exists, not null
      return JSON.parse(fileContents)
    } catch (err) { this.formula.innerHTML = "Błąd wczytywania pliku" }
    return []
  }

  fillInputs(points) {
    this.removeAllInputs()

    points.reverse().forEach(this.spawnInput)
    this.recalculate()

    this.inputList.lastChild.remove()
  }

  // TODO: Implement function to draw polynomial on canvas
  drawFunction(polynomial) { }
})()