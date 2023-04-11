import os from 'node:os'
import cluster from 'node:cluster'
import { initializeServer } from './server.js'

(() => {
  if (!cluster.isPrimary) {
    initializeServer()
    return
  }

  const cpus = os.cpus().length
  console.log(`Primary ${process.pid} is running`)
  console.log(`Forking server for ${cpus} CPU\n`)

  for (let index = 0; index < cpus; index++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.process.pid} died`)
      cluster.fork()
    }
  })
})()
