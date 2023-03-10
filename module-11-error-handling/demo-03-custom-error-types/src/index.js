import { createServer } from 'node:http'
import BusinessError from './errors/business-error.js'
import { statusCodes } from './utils/http-status-codes.js'

function validateHero(hero) {
  if (hero.age <= 17) {
    throw new BusinessError('Age must be higher than 17')
  }

  if (hero.name.length <= 4) {
    throw new BusinessError('Name length must be higher than 4')
  }

  if (Reflect.has(hero, 'connectionError')) {
    throw new Error('Error connecting to database')
  }
}

async function handler(request, response) {
  for await (const data of request) {
    try {
      const hero = JSON.parse(data)
      validateHero(hero)
      console.log(hero)
      response.writeHead(statusCodes.OK)
      response.end()
    } catch (error) {
      if (error instanceof BusinessError) {
        response.writeHead(statusCodes.BAD_REQUEST)
        response.end(error.message)
        continue
      }

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
*/
