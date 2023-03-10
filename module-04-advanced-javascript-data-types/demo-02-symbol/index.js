const { deepStrictEqual, throws } = require('node:assert')

// Keys
const uniqueKey = Symbol('userName')
const user = {}

user['userName'] = 'value for normal Objects'
user[uniqueKey] = 'value for symbol'

deepStrictEqual(user.userName, 'value for normal Objects')

// Always unique at memory address level
deepStrictEqual(user[Symbol('userName')], undefined)
deepStrictEqual(user[uniqueKey], 'value for symbol')

// It's harder to catch, but it's not private
deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey)

// byPass - bad practice (not even in the node codebase)
user[Symbol.for('password')] = 123
deepStrictEqual(user[Symbol.for('password')], 123)

// Well Known Symbols
const obj = {
  [Symbol.iterator]: () => ({
    items: ['c', 'b', 'a'],
    next() {
      return {
        done: this.items.length === 0,
        value: this.items.pop()
      }
    }
  })
}

deepStrictEqual([...obj], ['a', 'b', 'c'])

const kItems = Symbol('kItems')
class MyDate {
  constructor(...args) {
    this[kItems] = args.map(arg => new Date(...arg))
  }

  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== 'string') throw new TypeError()

    const items = this[kItems]
      .map(item =>
        new Intl
          .DateTimeFormat('pt-BR', { month: 'long', day: '2-digit', year: 'numeric' })
          .format(item)
      )

    return new Intl.ListFormat('pt-BR', { style: 'long', type: 'conjunction' }).format(items)
  }

  *[Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item
    }
  }

  async *[Symbol.asyncIterator]() {
    const timeout = ms => new Promise(r => setTimeout(r, ms))
    for (const item of this[kItems]) {
      await timeout(100)
      yield item.toISOString()
    }
  }

  get [Symbol.toStringTag]() {
    return 'JS Expert'
  }
}

const myDate = new MyDate(
  [2020, 03, 01],
  [2018, 02, 02]
)

const expectedDates = [
  new Date(2020, 03, 01),
  new Date(2018, 02, 02),
]

deepStrictEqual(Object.prototype.toString.call(myDate), '[object JS Expert]')
throws(() => myDate + 1, TypeError)

// Explicit coercion to call toPrimitive
deepStrictEqual(String(myDate), '01 de abril de 2020 e 02 de março de 2018')

deepStrictEqual([...myDate], expectedDates)

  // ;(async() => {
  //     for await(const item of myDate) {
  //         console.log('asyncIterator', item)
  //     }
  // })()

  ; (async () => {
    const dates = await Promise.all([...myDate])
    deepStrictEqual(dates, expectedDates)
  })()
