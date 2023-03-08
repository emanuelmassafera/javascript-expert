const http = require('node:http')
const CarService = require('./service/car-service')

const DEFAULT_PORT = 3000
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
}

const defaultFactory = () => ({
  carService: new CarService({ cars: './../database/cars.json' })
})

class Api {
  constructor(dependencies = defaultFactory()) {
    this.carService = dependencies.carService
  }

  generateRoutes() {
    return {
      '/rent:post': async (request, response) => {
        for await (const data of request) {
          try {
            const { customer, carCategory, numberOfDays } = JSON.parse(data)

            const result = await this.carService.rent(customer, carCategory, numberOfDays)

            response.writeHead(200, DEFAULT_HEADERS)

            response.write(JSON.stringify({ result }))
            response.end()
          } catch (error) {
            console.log('error', error)
            response.writeHead(500, DEFAULT_HEADERS)
            response.write(JSON.stringify({ error: 'Server Internal Error' }))
            response.end()
          }
        }
      },
      '/calculate-final-price:post': async (request, response) => {
        for await (const data of request) {
          try {
            const { customer, carCategory, numberOfDays } = JSON.parse(data)

            const result = await this.carService.calculateFinalPrice(customer, carCategory, numberOfDays)

            response.writeHead(200, DEFAULT_HEADERS)

            response.write(JSON.stringify({ result }))
            response.end()
          } catch (error) {
            console.log('error', error)
            response.writeHead(500, DEFAULT_HEADERS)
            response.write(JSON.stringify({ error: 'Server Internal Error' }))
            response.end()
          }
        }
      },
      '/get-available-car:post': async (request, response) => {
        for await (const data of request) {
          try {
            const carCategory = JSON.parse(data)

            const result = await this.carService.getAvailableCar(carCategory)

            response.writeHead(200, DEFAULT_HEADERS)

            response.write(JSON.stringify({ result }))
            response.end()
          } catch (error) {
            console.log('error', error)
            response.writeHead(500, DEFAULT_HEADERS)
            response.write(JSON.stringify({ error: 'Server Internal Error' }))
            response.end()
          }
        }
      },
      default: (request, response) => {
        response.write(JSON.stringify({ success: 'JS Expert!' }))
        return response.end();
      }
    }
  }

  handler(request, response) {
    const { url, method } = request
    const routeKey = `${url}:${method.toLowerCase()}`

    const routes = this.generateRoutes()
    const chosen = routes[routeKey] || routes.default

    response.writeHead(200, DEFAULT_HEADERS)

    return chosen(request, response)
  }

  initialize(port = DEFAULT_PORT) {
    const app = http.createServer(this.handler.bind(this))
      .listen(port, _ => console.log('Server running at', port))

    return app
  }
}

if (process.env.NODE_ENV !== 'test') {
  const api = new Api()
  api.initialize()
}

module.exports = (dependencies) => new Api(dependencies)
