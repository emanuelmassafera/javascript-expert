const { deepStrictEqual, ok } = require('node:assert')

// Set
// Most often used for single item lists

const arr1 = ['0', '1', '2']
const arr2 = ['2', '0', '3']
const arr3 = arr1.concat(arr2)

deepStrictEqual(arr3.sort(), ['0', '0', '1', '2', '2', '3'])

const set = new Set()
arr1.map(item => set.add(item))
arr2.map(item => set.add(item))

deepStrictEqual(Array.from(set), ['0', '1', '2', '3'])
deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), ['0', '1', '2', '3'])


// In Arrays, to know if an item exists:
// [].indexOf('1') !== -1 ou [].includes('1')
ok(set.has('3'))

// Same theory as Map, but you always work with the whole list
// No get, so you can tell if the item is in the array or not and that's it

const users1 = new Set([
  'erick',
  'john',
  'marcus',
])

const users2 = new Set([
  'emanuel',
  'erick',
  'mary'
])

const intersection = new Set([...users1].filter(user => users2.has(user)))
deepStrictEqual(Array.from(intersection), ['erick'])

const difference = new Set([...users1].filter(user => !users2.has(user)))
deepStrictEqual(Array.from(difference), ['john', 'marcus'])


// WeakSet

// Same idea as WeakMap
// Is not enumerable (iterable)
// Only works with keys as a reference
// Only have simple methods

const user1 = { id: 123 }
const user2 = { id: 321 }

const weakSet = new WeakSet([user1])
// weakSet.add(user2)
// weakSet.delete(user1)
// weakSet.has(user1)
