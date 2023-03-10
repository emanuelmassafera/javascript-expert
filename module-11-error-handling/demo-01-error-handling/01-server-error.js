import Http from 'node:http'

let count = 1
async function handler(request, response) {
  count++
  try {
    if (count % 2 === 0) {
      await Promise.reject('Handler error!')
    }

    for await (const data of request) {
      try {
        if (count % 2 !== 0) {
          await Promise.reject('Request error!')
        }
      } catch (error) {
        console.error('Server error:', error)
        response.writeHead(500)
        response.write(JSON.stringify({ message: 'Internal Server Error' }))
      } finally {
        response.end()
      }
    }
  } catch (error) {
    console.error('Server error:', error)
    response.writeHead(500)
    response.write(JSON.stringify({ message: 'Internal Server Error' }))
    response.end()
  }
}

Http.createServer(handler)
  .listen(3000, () => console.log('Server running at 3000'))
