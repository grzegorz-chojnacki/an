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
      this.error.innerText  = 'Wprowadzona wartość poza przedziałem (0, 1)'
    }
  }

  update = debounce(() => this.recalculate(), 1000)

  getPrecision() {
    return Number.parseFloat(this.input.value)
  }
})()