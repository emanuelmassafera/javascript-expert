9999999999999999
// 10000000000000000

true + 2
// 3

'21' + true
// '21true'

'21' - true
// 20

'21' - - 1
// 22

0.1 + 0.2 === 0.3
// false

3 > 2 > 1
// false

3 > 2 >= 1
// true

"B" + "a" + + "a" + "a"
// BaNaNa

'1' == 1
// true

'1' === 1
// false

console.assert(String(123) === '123', "Explicit conversion to string")
console.assert(123 + '' === '123', "Implicit conversion to string")

console.assert(('JS' || 123) === 'JS', "|| returns the first element when both are true")
console.assert(('JS' && 123) === 123, "&& returns the last element when both are true")

const item = {
  name: 'Emanuel',
  age: 23,

  toString() {
    return `Name: ${this.name}, Age: ${this.age}`
  },

  valueOf() {
    return { hey: 'dude' }
  },

  [Symbol.toPrimitive](coercionType) {
    const types = {
      string: JSON.stringify(this),
      number: '0007'
    }
    return types[coercionType] || types.string
  }
}

console.assert(item + 0 === '{"name":"Emanuel","age":23}0')

console.assert(!!item)

console.assert('JS'.concat(item) === 'JS{"name":"Emanuel","age":23}')

console.assert(item == String(item))

const item2 = { ...item, name: "John Doe", age: 20 }

console.assert(item2.name === "John Doe" && item2.age === 20)
