'use strict';

const gui = new (class {
  canvas    = document.getElementById('canvas')
  chart     = new Chart(canvas.getContext('2d'), { type: 'line' })
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

    if (points.length === 0) return

    const xs = points.map(point => point.x)
    const moreXs = range(head(xs), last(xs))

    const isDuplicated = point =>
      xs.indexOf(point.x) !== xs.lastIndexOf(point.x)

    if (points.find(point => isDuplicated(point)) !== undefined) {
      this.formula.innerHTML = 'Wykryto powtarzające się lata'
      return
    }

    const polynomial = new NewtonEvaluator(points).getPolynomial()

    this.printFormula(polynomial)

    if (this.chart !== null) { this.chart.destroy() }

    this.chart = new Chart(canvas.getContext('2d'), {
      type: 'line',
      data: {
        labels: moreXs,
        datasets: [{
          label: `P(x) = ${polynomial.toString()}`,
          borderColor: "#9966ff",
          pointRadius: 0,
          data: moreXs.map(x => polynomial.at(x)),
          fill: false,
        }]
      }
    })
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