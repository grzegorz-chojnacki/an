'use strict';

const gui = new (class {
  input  = document.getElementById('input')
  result = document.getElementById('result')
  steps  = document.getElementById('steps')
  error  = document.getElementById('error')

  recalculate() {
    const precision = this.getPrecision()
    if (0 < precision && precision < 1) {
      const answer = new SecantMethod(precision).calculate()
      this.result.innerText = answer.result
      this.steps.innerText  = answer.steps
    } else {
      this.error.innerText = 'Wprowadzona wartość poza przedziałem (0, 1)'
    }
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

  getPrecision() {
    return Number.parseFloat(this.input.value)
  }

  getPoints() {
    return [...gui.inputList.childNodes]
      .map(container => container.getElementsByTagName('input'))
      .map(container => ({
        x: parseFloat(container.year.value),
        y: parseFloat(container.delta.value)
      }))
      .filter(point => Number.isFinite(point.x) && Number.isFinite(point.y))
      .sort((a, b) => a.x - b.x)
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
      return JSON.parse(fileContents)
    } catch (err) { this.formula.innerHTML = "Błąd wczytywania pliku" }
    return []
  }

  fillInputs(points) {
    this.removeAllInputs()

    if (points.length > 0) {
      points.reverse().forEach(point => this.spawnInput(point))
      this.recalculate()

      this.inputList.lastChild.remove()
    }
  }
})()