const { deepStrictEqual, ok, throws } = require('node:assert')

// Map
const myMap = new Map();

// Can have anything as a key. In Objects the key can only be string or symbol
myMap
  .set(1, 'one')
  .set('JS Expert', { text: 'two' })

// Using the constructor
const myMapWithConstructor = new Map([
  ['1', 'str1'],
  [1, 'num1'],
  [true, 'bool1'],
])

deepStrictEqual(myMap.get(1), 'one')
deepStrictEqual(myMap.get('JS Expert'), { text: 'two' })

// For complex keys, you need to pass the reference
const onlyReferenceWorks = { id: 1 }
myMap.set(onlyReferenceWorks, { name: 'JS Expert' })

deepStrictEqual(myMap.get({ id: 1 }), undefined)
deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'JS Expert' })

// In Objects it would be Object.keys({a: 1}).length
deepStrictEqual(myMap.size, 3)

// To check if an item exists in an Object:
// item.key => if it doesn't exist = undefined
// if() => implicit coercion to boolean and returns false
// The right way in Objects is ({ name: 'JS Expert' }).hasOwnProperty('name')
ok(myMap.has(onlyReferenceWorks))

// To remove an item from a Object:
//  delete item.id => not recommended
ok(myMap.delete(onlyReferenceWorks))

// You can't iterate over Objects directly 
// You have to transform with Object.entries(item)
deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([[1, 'one'], ['JS Expert', { 'text': 'two' }]]))

// Object is insecure, because depending on the key name, it can override some default behavior
// ({ }).toString() === '[object Object]'
// ({toString: () => 'JS Expert' }).toString()  === 'JS Expert'

// Any key can collide, with the inherited properties of the object, like constructor, toString, valueOf and etc.

const actor = {
  name: 'JS Expert',
  toString: 'String'
}

// Map has no key name restriction
myMap.set(actor)

ok(myMap.has(actor))
throws(() => myMap.get(actor).toString, TypeError)

// In Objects, it is not possible to clean it without reassigning it
myMap.clear()
deepStrictEqual([...myMap.keys()], [])

// WeakMap

// Can be collected after losing referrals
// Used in very specific cases

// It has most of the benefits of the Map
// But it is not iterable
// Only reference keys that you already know
// Lighter and prevents memory leaks, because after the instances leave memory, everything is cleaned up

const weakMap = new WeakMap()
const hero = { name: 'Flash' }

// weakMap.set(hero)
// weakMap.get(hero)
// weakMap.delete(hero)
// weakMap.has(hero)
