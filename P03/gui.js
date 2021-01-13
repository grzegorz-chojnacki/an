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
    if (!this.validN(input.n)) this.setError('Niepaprawna wartość n')
    if (!this.validB(input.b)) this.setError('Niepaprawna wartość b')

    if (this.validB(input.b) && this.validN(input.n)) {
      this.clearError()
      this.setResult(euler(input), this.output.euler)
      this.setResult(eulerModified(input), this.output.eulerModified)
      this.setResult(heun(input), this.output.heun)
    }
  }

  setResult = (result, handle) => {
    handle.getElementsByClassName('value')[0].innerText = result.value.toFixed(2)
    handle.getElementsByClassName('error')[0].innerText = result.error.toFixed(2)
  }

  setError   = e  => this.error.innerText  = e
  clearError = () => this.error.innerText  = ''

  update = debounce(() => this.refresh(), 10)

  getInput = () => ({
     n: Number.parseFloat(this.input.n.value),
     b: Number.parseFloat(this.input.b.value)
  })
})()
