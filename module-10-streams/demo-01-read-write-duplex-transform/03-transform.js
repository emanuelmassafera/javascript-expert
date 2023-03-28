import { Readable, Writable, Transform } from 'node:stream'
import { createWriteStream } from 'node:fs'

const readable = new Readable({
  read() {
    for (let index = 0; index < 1e4; index++) {
      const person = {
        id: Date.now() + index,
        name: `Person-${index}`
      }
      const data = JSON.stringify(person)
      this.push(data)
    }

    // Informs that the data has run out
    this.push(null)
  }
})

const mapHeaders = new Transform({
  transform(chunk, encoding, cb) {
    this.counter = this.counter ?? 0
    if (this.counter) {
      return cb(null, chunk)
    }

    this.counter += 1
    cb(null, 'id,name\n'.concat(chunk))
  }
})

const mapFields = new Transform({
  transform(chunk, encoding, cb) {
    const data = JSON.parse(chunk)
    const result = `${data.id},${data.name.toUpperCase()}\n`

    cb(null, result)
  }
})

const writable = new Writable({
  write(chunk, encoding, cb) {
    console.log(chunk.toString())

    cb()
  }
})

const pipeline = readable
  .pipe(mapFields)
  .pipe(mapHeaders)
  .pipe(createWriteStream('my.csv'))

pipeline.on('end', () => console.log('Finished'))
