'use strict'

// Tests
const expect = result => ({
  toBe: expected => (result !== expected)
    ? console.error(`${result} !== ${expected}`)
    : undefined,

  toEqual: expected => (JSON.stringify(result) !== JSON.stringify(expected))
    ? console.error(`${result} !== ${expected}`)
    : undefined
})

// Generalization
const memoized = (fn, memory = new Map()) => (...args) => {
  const key = JSON.stringify(args)

  if (!memory.has(key)) { memory.set(key, fn(...args)) }
  return memory.get(key)
}


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

const range = (a, b, step = 1) => {
  const rangeHelper = (head, tail) => head > b
    ? tail
    : rangeHelper(head + step, [head, ...tail])

  return rangeHelper(a, []).reverse()
}
