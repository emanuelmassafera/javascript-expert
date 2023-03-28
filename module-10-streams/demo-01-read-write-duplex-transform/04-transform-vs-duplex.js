import { Duplex, Transform } from 'node:stream'

let count = 0

// read and write are separate channels and they are triggered separately
const server = new Duplex({
  objectMode: true,
  encoding: 'utf-8',
  read() {
    const everySecond = (intervalContext) => {
      if (count++ <= 5) {
        this.push(`[Readable] JS Expert ${count}\n`)
        return
      }

      clearInterval(intervalContext)
      this.push(null)
    }

    setInterval(function () {
      everySecond(this)
    })
  },
  write(chunk, encoding, cb) {
    console.log(`[Writable]`, chunk)
    cb()
  }
})

// Triggers writable stream
// server.write('JS Expert\n')

// Triggers readable stream
// server.pipe(process.stdout)

// It is also Duplex, but does not have independent channels
const transformToUpperCase = new Transform({
  objectMode: true,
  transform(chunk, encoding, cb) {
    cb(null, chunk.toUpperCase())
  }
})

// Triggers both streams, readable and writable
server
  .pipe(transformToUpperCase)
  .pipe(server)
