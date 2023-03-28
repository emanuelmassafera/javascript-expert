import { Readable, Writable } from 'node:stream'

const readable = new Readable({
  read() {
    this.push('JS Expert 1')
    this.push('JS Expert 2')
    this.push('JS Expert 3')

    // Informs that the data has run out
    this.push(null)
  }
})

const writable = new Writable({
  write(chunk, encoding, cb) {
    console.log('message', chunk.toString())

    cb()
  }
})

readable
  .pipe(writable)
