import Http from 'node:http'
import { InjectHttpInterceptor } from './../index.js'

InjectHttpInterceptor()

function handleRequest(request, response) {
  response.end('JS Expert!')
}

const server = Http.createServer(handleRequest)
const port = 3000
server.listen(port, () => console.log('Server running at', server.address().port))
