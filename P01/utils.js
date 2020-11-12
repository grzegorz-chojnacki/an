'use strict';

// Tests
const expect = result => ({
  toBe: expected => (result !== expected)
    ? console.error(`${result} !== ${expected}`)
    : undefined,

  toEqual: expected => (JSON.stringify(result) != JSON.stringify(expected))
    ? console.error(`${result} !== ${expected}`)
    : undefined
})

// Event handling
const debounce = (fn, delay) => {
  let timeout

  return (...args) => {
    const later = () => {
      clearTimeout(timeout)
      fn(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, delay)
  }
}

// Collections
const pairSum = ([first = 0, second = 0]) => first + second

const init = arr => arr.slice(0, arr.length - 1)
const last = arr => arr[arr.length - 1]

const getListSlicesFromStart = (_, index, arr) => arr.slice(0, index + 1)

const zip = (...rows) =>
  [...rows[0]].map((_, index) => rows.map(row => row[index]))
