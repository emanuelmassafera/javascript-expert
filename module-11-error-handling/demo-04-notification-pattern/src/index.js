import { createServer } from 'node:http'
import { statusCodes } from './utils/http-status-codes.js'
import HeroEntity from './hero.js'

async function handler(request, response) {
  for await (const data of request) {
    try {
      const parsedData = JSON.parse(data)

      if (Reflect.has(parsedData, 'connectionError')) {
        throw new Error('Error connecting to database')
      }

      const hero = new HeroEntity(parsedData)
      if (!hero.isValid()) {
        response.writeHead(statusCodes.BAD_REQUEST)
        response.end(hero.notifications.join('\n'))
        continue
      }

      response.writeHead(statusCodes.OK)
      response.end()
    } catch (error) {
      response.writeHead(statusCodes.INTERNAL_SERVER_ERROR)
      response.end()
    }
  }
}

createServer(handler).listen(3000, () => console.log('Server running at 3000'))

/*
  curl -i localhost:3000 -X POST --data '{"name": "Emanuel", "age": "23"}' => Valid
  curl -i localhost:3000 -X POST --data '{"name": "Emanuel", "age": "10"}' => Invalid
  curl -i localhost:3000 -X POST --data '{"name": "Ab", "age": "23"}' => Invalid
  curl -i localhost:3000 -X POST --data '{"name": "Emanuel", "age": "23", "connectionError": "true" }' => Invalid
  curl -i localhost:3000 -X POST --data '{"name": "Ab", "age": "10" }' => Invalid
*/
