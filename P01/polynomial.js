'use strict';

class Polynomial {
  terms = []
  constructor(terms) {
    if (terms.length === 0) throw new Error('Term list is empty')
    this.terms = terms
    this.trimZeros()
  }

  trimZeros() {
    const trimmed = (terms) => {
      if (terms.length === 0) return [0]
      else if (last(terms) !== 0) return terms
      else trimmed(tail(terms))
    }

    this.terms = trimmed(this.terms) || [0]
  }

  add(that) {
    const [longer, shorter] = (this.terms.length >= that.terms.length)
      ? [this, that]
      : [that, this]

    const addedTerms = zip(longer.terms, shorter.terms)
      .map(pair => pair[1] == undefined ? pair[0] : pair[0] + pair[1])

    return new Polynomial(addedTerms)
  }

  // ToDo: Polynomial multiplication
  multiply(that) {
    const padLeft = (arr, padding) => (new Array(padding)).fill(0).concat(arr)
    const multiplyByTerm = (term, power, that) => {
      const multiplied = that.terms.map(thatTerm => term * thatTerm)
      return padLeft(multiplied, power)
    }

    return this.terms
      .map((term, power) => multiplyByTerm(term, power, that))
      .map(terms => new Polynomial(terms))
      .reduce((acc, polynomial) => acc.add(polynomial))
  }

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
