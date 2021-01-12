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

  refresh() {
    const input = this.getInput()
    console.log(input)

    if (Number.isInteger(input.n) && Number.isFinite(input.b)) {
      const result = { value: 1.82378, error: 0.4247 }
      this.setResult(result, this.output.euler)
      this.setResult(result, this.output.eulerModified)
      this.setResult(result, this.output.heun)
    }
  }

  setResult = (result, handle) => {
    handle.getElementsByClassName('value')[0].innerText = result.value
    handle.getElementsByClassName('error')[0].innerText = result.error
  }

  setError   = e  => this.error.innerText  = e
  clearError = () => this.error.innerText  = ''

  update = debounce(() => this.refresh(), 10)

  getInput = () => ({
     n: Number.parseFloat(this.input.n.value),
     b: Number.parseFloat(this.input.b.value)
  })
})()
