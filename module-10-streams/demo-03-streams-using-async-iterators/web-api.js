import http from 'node:http'
import { Readable } from 'node:stream'

function api1(request, response) {
  let count = 0
  const MAX_ITEMS = 99

  const readable = new Readable({
    read() {
      const everySecond = (intervalContext) => {
        if (count++ <= MAX_ITEMS) {
          this.push(JSON.stringify({
            id: Date.now() + count,
            name: `JS Expert-${count}`
          }) + '\n')
          return
        }

        clearInterval(intervalContext)
        this.push(null)
      }

      setInterval(function () {
        everySecond(this)
      })
    },
  })

  readable.pipe(response)
}

function api2(request, response) {
  let count = 0
  const MAX_ITEMS = 99

  const readable = new Readable({
    read() {
      const everySecond = (intervalContext) => {
        if (count++ <= MAX_ITEMS) {
          this.push(JSON.stringify({
            id: Date.now() + count,
            name: `Streams-${count}`
          }) + '\n')
          return
        }

        clearInterval(intervalContext)
        this.push(null)
      }

      setInterval(function () {
        everySecond(this)
      })
    },
  })

  readable.pipe(response)
}

http
  .createServer(api1)
  .listen(3000, () => console.log('Server running at 3000'))
http
  .createServer(api2)
  .listen(4000, () => console.log('Server running at 4000'))
