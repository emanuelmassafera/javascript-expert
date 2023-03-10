import timers from 'node:timers/promises'

process.on('unhandledRejection', (e) => {
  console.error('unhandledRejection:', e.message || e)
})

const timeoutAsync = timers.setTimeout

setTimeout(async () => {
  console.log('Starting process...')
  await timeoutAsync(100)
  console.count('Debug')
  console.log(await Promise.resolve('Timeout order'))
  await timeoutAsync(100)
  console.count('Debug')

  // unhandledRejection
  await Promise.reject('Promise rejected')
}, 1000)

process.on('uncaughtException', (e) => {
  console.error('uncaughtException:', e.message || e)
})

const throwError = (message) => { throw new Error(message) }

try {
  console.log('JS Expert')
  throwError('Error inside try/catch')
} catch (error) {
  console.error('Caught error:', error.message)
} finally {
  console.log('Executed after all')
}

Promise.reject('Promise rejected')

// if Promise.reject is inside another context, the error is caught by unhandledRejection
setTimeout(async () => {
  await Promise.reject('Promise async/await rejected inside another context')
})

// if Promise.reject is in global context, the error is caught by uncaughtException
// await Promise.reject('Promise async/await rejected in global context')

// uncaughtException
setTimeout(() => {
  throwError('Error outside try/catch')
})
