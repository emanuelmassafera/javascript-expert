'use strict';

const Event = require('node:events')

const event = new Event()
const eventName = 'counter'
event.on(eventName, message => console.log('Counter updated', message))

const myCounter = {
  counter: 0
}

const proxy = new Proxy(myCounter, {
  set: (target, propertyKey, newValue) => {
    event.emit(eventName, { newValue, key: target[propertyKey] })
    target[propertyKey] = newValue
    return true
  },

  get: (object, prop) => {
    return object[prop]
  }
})

setInterval(function () {
  console.log('[3]: setInterval')
  proxy.counter += 1
  if (proxy.counter === 10) clearInterval(this)
}, 200)

setTimeout(() => {
  console.log('[2]: setTimeout')
  proxy.counter = 4
}, 100)

setImmediate(() => {
  console.log('[1]: setImmediate')
  proxy.counter = 7
})

process.nextTick(() => {
  console.log('[0]: nextTick')
  proxy.counter = 2
})
