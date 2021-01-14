'use strict'

const gui = new (class {
  input  = { n: document.getElementById('n'), b: document.getElementById('b') }
  output = document.getElementById('output')
  error  = document.getElementById('error')
  output = {
    euler:         document.getElementById('euler'),
    eulerModified: document.getElementById('eulerModified'),
    heun:          document.getElementById('heun')
  }

  validN = n => Number.isInteger(n) && n >= 1
  validB = b => Number.isFinite(b)  && b >= 1

  refresh() {
    const input = this.getInput()

    if (!this.validN(input.n)) return this.setError('Niepoprawna wartość n')
    if (!this.validB(input.b)) return this.setError('Niepaprawna wartość b')

    this.clearError()
    this.setResult(applyMethod(euler,         input), this.output.euler)
    this.setResult(applyMethod(eulerModified, input), this.output.eulerModified)
    this.setResult(applyMethod(heun,          input), this.output.heun)
  }

  setResult = ({value, error}, handle) => {
    if (Number.isNaN(value))
      return this.setError('Wystąpił błąd podczas obliczeń liczb zmiennoprzecinkowych')
    handle.getElementsByClassName('value')[0].innerText = value.toFixed(2)
    handle.getElementsByClassName('error')[0].innerText = error.toFixed(2)
  }

  setError   = e  => this.error.innerText = e
  clearError = () => this.error.innerText = ''

  update = debounce(() => this.refresh(), 10)

  getInput = () => ({
    n: Number.parseFloat(this.input.n.value),
    b: Number.parseFloat(this.input.b.value)
  })
})()
