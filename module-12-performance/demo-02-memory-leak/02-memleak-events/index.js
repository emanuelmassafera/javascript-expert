import { createServer } from 'node:http'
import Events from 'node:events'
import { randomBytes } from 'node:crypto'

const myEvent = new Events()

function getBytes() {
  return randomBytes(10000)
}

function onData() {
  getBytes()
  const items = []
  setInterval(function myInterval() { items.push(Date.now()) })
}

createServer(function handle(request, response) {
  myEvent.on('data', onData)

  myEvent.emit('data', Date.now())

  response.end('Ok!')
}).listen(3000, () => console.log('Running at 3000'))
