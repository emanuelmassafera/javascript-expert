import { pipeline } from 'node:stream/promises'
import { Writable } from 'node:stream'
import axios from 'axios'

const API_01 = 'http://localhost:3000'
const API_02 = 'http://localhost:4000'

const requests = await Promise.all([
  axios({
    method: 'get',
    url: API_01,
    responseType: 'stream'
  }),
  axios({
    method: 'get',
    url: API_02,
    responseType: 'stream'
  })
])

const results = requests.map(({ data }) => data)

async function* output(stream) {
  for await (const data of stream) {
    const name = data.match(/:"(?<name>.*)(?=-)/).groups.name

    console.log(`[${name.toLowerCase()}] ${data}`)
  }
}

async function* merge(streams) {
  for (const readable of streams) {
    readable.setEncoding('utf8')

    for await (const chunk of readable) {
      for (const line of chunk.trim().split(/\n/)) {
        yield line
      }
    }
  }
}

await pipeline(
  merge(results),
  output
)
