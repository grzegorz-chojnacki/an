'use strict'

const gui = new (class {
  input  = document.getElementById('input')
  result = document.getElementById('result')
  steps  = document.getElementById('steps')
  error  = document.getElementById('error')

  refresh() {
    const precision = this.getPrecision()
    if (0 < precision && precision < 1) {
      this.clearError()
      const answer = new SecantMethod(precision).calculate()
      this.result.innerText = answer.result
      this.steps.innerText  = answer.steps
    } else this.setError()
  }

  setError()   { this.error.innerText  = 'Wprowadzona wartość poza przedziałem (0, 1)' }
  clearError() { this.error.innerText  = '' }

  update = debounce(() => this.refresh(), 10)

  getPrecision = () => Number.parseFloat(this.input.value)

})()