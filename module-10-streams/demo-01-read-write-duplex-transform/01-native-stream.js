// process.stdin
//   .pipe(process.stdout)
//   .on('data', message => console.log('data', message.toString()))
//   .on('error', message => console.log('error', message.toString()))
//   .on('end', _ => console.log('end'))
//   .on('close', _ => console.log('close'))

// Terminal 1 
// node -e "require('net').createServer(socket => socket.pipe(process.stdout)).listen(1338)"

// Terminal 2 
// node -e "process.stdin.pipe((require('net').connect(1338)))"

// To generate a big file
// node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file

import http from 'node:http'
import { createReadStream, readFileSync } from 'node:fs'

http
  .createServer((req, res) => {
    // Wrong
    // const file = readFileSync('big.file').toString()
    // res.write(file)
    // res.end()

    createReadStream('big.file')
      .pipe(res)
  })
  .listen(3000, () => console.log('Server running at 3000'))

// curl localhost:3000 -o output.txt
