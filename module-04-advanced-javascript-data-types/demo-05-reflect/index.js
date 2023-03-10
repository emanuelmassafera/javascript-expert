'use strict'

const { deepStrictEqual, ok, throws } = require('node:assert')

// Reflect is used to ensure semantics and security in objects

// apply
const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue
  }
}

deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130)

// Manipulating the behavior
myObj.add.apply = function () { throw new TypeError('Error!') }

throws(
  () => myObj.add.apply({}, []),
  {
    name: 'TypeError',
    message: 'Error!'
  }
)

// Using Reflect:
const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [200])
deepStrictEqual(result, 260)

// defineProperty
function MyDate() { }

Object.defineProperty(MyDate, 'withObject', { value: () => 'Hello' })

Reflect.defineProperty(MyDate, 'withReflection', { value: () => 'Hey' })

deepStrictEqual(MyDate.withObject(), 'Hello')
deepStrictEqual(MyDate.withReflection(), 'Hey')

// deleteProperty
const withDelete = { user: 'JS Expert' }
delete withDelete.user

deepStrictEqual(withDelete.hasOwnProperty('user'), false)

const withReflection = { user: 'JS Expert' }
Reflect.deleteProperty(withReflection, 'user')
deepStrictEqual(withReflection.hasOwnProperty('user'), false)

// get
deepStrictEqual(1['userName'], undefined)

// Using reflection, an exception is thrown
throws(() => Reflect.get(1, 'userName'), TypeError)

// has
ok('superman' in { superman: '' })
ok(Reflect.has({ batman: '' }, 'batman'))

// ownKeys
const user = Symbol('user')
const databaseUser = {
  id: 1,
  [Symbol.for('password')]: 123,
  [user]: 'emanuel'
}

// In Objects, it's necessary to make two separate requests
const objectKeys = [
  ...Object.getOwnPropertyNames(databaseUser),
  ...Object.getOwnPropertySymbols(databaseUser),
]
deepStrictEqual(objectKeys, ['id', Symbol.for('password'), user])

deepStrictEqual(Reflect.ownKeys(databaseUser), ['id', Symbol.for('password'), user])
