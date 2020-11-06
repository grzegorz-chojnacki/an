'use strict';

class Polynomial {
  terms = []

  constructor(terms) {
    const trimmed = terms => {
      if (terms.length === 0) return [0]
      else if (last(terms) !== 0) return terms
      else return trimmed(init(terms))
    }

    if (terms.length === 0) throw new Error('Term list is empty')
    this.terms = trimmed(terms)
  }

  add(that) {
    const [longer, shorter] = (this.terms.length >= that.terms.length)
      ? [this, that]
      : [that, this]

    // Shorter list has undefined elements at the end when zipped with longer list
    const addedTerms = zip(longer.terms, shorter.terms)
      .map(([first, second]) => second == undefined ? first : first + second)

    return new Polynomial(addedTerms)
  }

  multiply(that) {
    // When multiplying by x^n, each term is raised by power n => array shifts by n
    const padLeft = (arr, padding) => new Array(padding).fill(0).concat(arr)

    const multiplyByTerm = (thisTerm, power, that) => {
      const multiplied = that.terms
        .map(thatTerm => thatTerm * thisTerm)
      return padLeft(multiplied, power)
    }

    if (typeof that === "number") return this.multiply(new Polynomial([that]))
    else return this.terms
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

    const formatFreeTerm = term => format(term, 0, fullSign, saveOne)
    const formatHighestTerm = term =>
      format(term, this.terms.length - 1, minimalSign, simplifyOne)

    const formatPower = power => (power > 1)
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
