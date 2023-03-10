import { createServer } from 'node:http'
import { promisify } from 'node:util'
import { MongoClient } from 'mongodb'

async function dbConnect() {
  const client = new MongoClient('mongodb://root:docker@localhost:25015')

  await client.connect()
  console.log('MongoDB is connected')

  const db = client.db('comics')

  return {
    collections: {
      heroes: db.collection('heroes'),
    },
    client: client
  }
}

const { collections, client } = await dbConnect()

async function handler(request, response) {
  for await (const data of request) {
    try {
      const hero = JSON.parse(data)
      await collections.heroes.insertOne({
        ...hero,
        updatedAt: new Date().toISOString(),
      })

      const heroes = await collections.heroes.find().toArray()
      response.writeHead(200)
      response.write(JSON.stringify(heroes))
    } catch (error) {
      console.error('Request error')
      response.writeHead(500)
      response.end(JSON.stringify({ message: 'Internal Server Error' }))
    } finally {
      response.end()
    }
  }
}

const server = createServer(handler)
  .listen(3000, () => console.log('Http Server running at 3000 and process', process.pid))

const onStop = async (signal) => {
  console.log(`\n${signal} signal received`)

  console.log('Closing Http Server')
  await promisify(server.close.bind(server))()
  console.log('Http Server has closed')

  await client.close()
  console.log('MongoDB connection has closed')

  process.exit(0)
}

['SIGINT', 'SIGTERM'].forEach((event) => process.on(event, onStop))

// SIGINT => Ctrl + C
// SIGTERM => Kill

// process.exit: 
// 0 => finished without error
// 1 => finished with error
