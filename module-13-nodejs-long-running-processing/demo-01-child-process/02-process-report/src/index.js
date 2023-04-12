import { fork } from 'node:child_process'
import { createReadStream } from 'node:fs'
import { pipeline } from 'node:stream/promises';
import { Writable } from 'node:stream'
import csvtojson from 'csvtojson'

const PROCESS_COUNT = 30;
const database = './data/All_Pokemon.csv'
const backgroundTaskFile = './src/background-task.js'
const replications = []
const processes = new Map()

for (let index = 0; index < PROCESS_COUNT; index++) {
  const child = fork(backgroundTaskFile, [database])

  child.on('exit', () => {
    console.log(`Process ${child.pid} exited`)
    processes.delete(child.pid)
  })
  child.on('error', error => {
    console.log(`Process ${child.pid} has an error`, error)
    process.exit(1)
  })
  child.on('message', msg => {
    if (replications.includes(msg)) return;
    console.log(`${msg} is replicated!`)
    replications.push(msg)
  })

  processes.set(child.pid, child)
}

function roundRobin(array, index = 0) {
  return function () {
    if (index >= array.length) index = 0

    return array[index++]
  }
}

const getProcess = roundRobin([...processes.values()])

console.log(`Starting with ${processes.size} processes`)

await pipeline(
  createReadStream(database),
  csvtojson(),
  Writable({
    write(chunk, enc, cb) {
      const chosenProcess = getProcess()
      chosenProcess.send(JSON.parse(chunk))
      cb()
    }
  })
)
