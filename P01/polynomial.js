'use strict';

class Polynomial {
  terms = []
  constructor(terms) {
    if (terms.length === 0) throw new Error('Term list is empty')
    this.terms = terms
  }

  // ToDo: Polynomial multiplication and addition
  add(that) { }
  multiply(that) { }

  toString() {
    const fullSign    = n => n >= 0 ? ' + ' : ' - '
    const minimalSign = n => n >= 0 ? ''    : '-'
    const simplifyOne = n => Math.abs(n) === 1 ? '' : n
    const saveOne     = n => n

    const format = (term, power, signFormat, oneSimplification) => (term !== 0)
      ? formatTerm(term, signFormat, oneSimplification) + formatPower(power)
      : ''

    const formatTerm  = (term, signFormat, oneSimplification) =>
      signFormat(term) + oneSimplification(Math.abs(term))

    const formatFreeTerm = (term) => format(term, 0, fullSign, saveOne)
    const formatHighestTerm = (term) =>
      format(term, this.terms.length - 1, minimalSign, simplifyOne)

    const formatPower = (power) => (power > 1)
      ? `x^${power}`
      : (power === 1) ? 'x' : ''

    if (this.terms.length > 1) {
      const [freeTerm, ...terms] = this.terms
      const highestTerm = terms.pop()

      return formatHighestTerm(highestTerm) + terms
        .map((term, index) => format(term, index + 1, fullSign, simplifyOne))
        .reduce((acc, term) => term + acc, formatFreeTerm(freeTerm))
    } else return this.terms[0].toString()
  }
}
