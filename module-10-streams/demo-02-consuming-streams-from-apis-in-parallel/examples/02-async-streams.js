import { setTimeout } from 'node:timers/promises'
import { pipeline } from 'node:stream/promises'

async function* myCustomReadable() {
  yield Buffer.from('JS Expert')
  await setTimeout(100)
  yield Buffer.from('Custom Readable')
}

async function* myCustomTransform(stream) {
  for await (const chunk of stream) {
    yield chunk.toString().replace(/\s/g, '_')
  }
}

async function* myCustomDuplex(stream) {
  let bytesRead = 0
  const wholeString = []
  for await (const chunk of stream) {
    console.log(`[Custom Duplex Writable]: ${chunk}`)
    bytesRead += chunk.length
    wholeString.push(chunk)
  }

  yield `wholeString ${wholeString.join()}`
  yield `bytesRead ${bytesRead}`
}

async function* myCustomWritable(stream) {
  for await (const chunk of stream) {
    console.log(`[Custom Writable]: ${chunk}`)
  }
}

try {
  const controller = new AbortController()

  setImmediate(() => controller.abort())

  await pipeline(
    myCustomReadable,
    myCustomTransform,
    myCustomDuplex,
    myCustomWritable,
    { signal: controller.signal }
  )

  console.log('The process has finished')
} catch (error) {
  console.error(error.message)
}
