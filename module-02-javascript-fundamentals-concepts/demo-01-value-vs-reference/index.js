const { deepStrictEqual } = require('node:assert')

let counter1 = 0
let counter2 = counter1
counter2++

// Primitive type creates a copy in memory
deepStrictEqual(counter1, 0)
deepStrictEqual(counter2, 1)

const item1 = { counter: 0 }
const item2 = item1

// Reference type copies the memory address and points to the same place
item2.counter++
deepStrictEqual(item1, { counter: 1 })
item1.counter++
deepStrictEqual(item2, { counter: 2 })
