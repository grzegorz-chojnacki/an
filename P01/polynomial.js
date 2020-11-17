'use strict';

class Polynomial {
  static one  = new Polynomial([1])
  static zero = new Polynomial([0])
  static point = (p) => new Polynomial([-p.x, 1])
  static product = (acc, polynomial) => acc.multiply(polynomial)
  static sum     = (acc, polynomial) => acc.add(polynomial)

  terms = []

  constructor(terms) {
    const trimmed = terms => {
      if (terms.length === 0) return [0]
      else if (last(terms) !== 0) return terms
      else return trimmed(init(terms))
    }

    if (terms.length === 0) throw new Error('Term list is empty')
    else this.terms = trimmed(terms)
  }

  at(x) {
    return this.terms.reduceRight((acc, term) => acc * x + term)
  }

  add(that) {
    if (typeof that == 'number') return this.addNumber(that)
    else return this.addPolynomial(that)
  }

  addNumber(that) {
    const [head, ...tail] = this.terms
    return new Polynomial([head + that, ...tail])
  }

  addPolynomial(that) {
    const [longer, shorter] = (this.terms.length >= that.terms.length)
    ? [this, that]
    : [that, this]

    // Zipping shorter list with longer will cut excesive elements
    // Order is important
    const addedTerms = zip(longer.terms, shorter.terms).map(pairSum)

    return new Polynomial(addedTerms)
  }

  multiply(that) {
    // When multiplying by x^n, each term is raised by power n => array shifts by n
    const padLeft = (arr, padding) => new Array(padding).fill(0).concat(arr)

    const multiplyByTerm = (thisTerm, power, that) => {
      const multiplied = that.terms.map(thatTerm => thatTerm * thisTerm)
      return padLeft(multiplied, power)
    }

    if (typeof that === "number") return this.multiply(new Polynomial([that]))
    else return this.terms
      .map((term, power) => multiplyByTerm(term, power, that))
      .map(terms => new Polynomial(terms))
      .reduce(Polynomial.sum)
  }

  toString() {
    const fullSign    = n => n >= 0 ? ' + ' : ' - '
    const minimalSign = n => n >= 0 ? ''    : '-'
    const toFixed2    = n => Math.floor(n * 100) / 100
    const withoutOne  = n => Math.abs(n) === 1 ? '' : Math.abs(toFixed2(n))
    const withOne     = n => Math.abs(toFixed2(n))

    const format = (term, power, signFormat, oneSimplification) => (term !== 0)
      ? formatTerm(term, signFormat, oneSimplification) + formatPower(power)
      : ''

    const formatTerm  = (term, signFormat, oneSimplification) =>
      signFormat(term) + oneSimplification(term)

    const formatFreeTerm = term => format(term, 0, fullSign, withOne)
    const formatHighestTerm = term =>
      format(term, this.terms.length - 1, minimalSign, withoutOne)

    const formatPower = power => (power > 1)
      ? `x^${power}`
      : (power === 1) ? 'x' : ''

    if (this.terms.length > 1) {
      const [freeTerm, ...terms] = this.terms
      const highestTerm = terms.pop()

      return formatHighestTerm(highestTerm) + terms
        .map((term, index) => format(term, index + 1, fullSign, withoutOne))
        .reduce((acc, term) => term + acc, formatFreeTerm(freeTerm))
    } else return this.terms[0].toString()
  }
}
