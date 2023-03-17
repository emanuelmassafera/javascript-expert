import Http from 'node:http'

async function InjectHttpInterceptor() {
  const oldEmit = Http.Server.prototype.emit

  Http.Server.prototype.emit = function (...args) {
    const [type, request, response] = args

    if (type === 'request') {
      response.setHeader('X-Instrumented-By', 'Emanuel')
    }

    return oldEmit.apply(this, args)
  }
}

export {
  InjectHttpInterceptor
}
