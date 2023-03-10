const { deepStrictEqual } = require('node:assert')
const { readFile, stat, readdir } = require('node:fs/promises')

function* calculation(arg1, arg2) {
  yield arg1 * arg2
}

function* main() {
  yield 'JS'
  yield '-'
  yield 'Expert'
  yield* calculation(20, 10)
}

const generator = main()
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())

deepStrictEqual(generator.next(), { value: 'JS', done: false })
deepStrictEqual(generator.next(), { value: '-', done: false })
deepStrictEqual(generator.next(), { value: 'Expert', done: false })
deepStrictEqual(generator.next(), { value: 200, done: false })
deepStrictEqual(generator.next(), { value: undefined, done: true })

deepStrictEqual(Array.from(main()), ['JS', '-', 'Expert', 200])
deepStrictEqual([...main()], ['JS', '-', 'Expert', 200])

function* promisified() {
  yield readFile(__filename)
  yield Promise.resolve('JS Expert')
}

async function* systemInfo() {
  const file = await readFile(__filename)
  yield { file: file.toString() }

  const { size } = await stat(__filename)
  yield { size }

  const dir = await readdir(__dirname)
  yield { dir }
}

// Promise.all([...promisified()]).then(results => console.log('promisified', results))

// ;(async () => {
//     for await (const item of promisified()) {
//         console.log('for await', item.toString())
//     }
// })()

; (async () => {
  for await (const item of systemInfo()) {
    console.log('systemInfo', item)
  }
})()
