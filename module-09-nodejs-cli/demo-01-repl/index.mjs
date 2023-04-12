// curl "localhost:3000?salary=3000&discount=15"
import { createServer } from 'node:http'

function netSalary({ discount, salary }) {
  const percent = discount / 100
  const cost = salary * percent
  const result = salary - cost

  return result
}

createServer((req, res) => {
  const url = req.url.replace('/', '')
  const params = new URLSearchParams(url)
  const data = Object.fromEntries(params)
  const result = netSalary(data)

  res.end(`The final salary is ${result}`)
})
  .listen(3000, () => console.log('Running at 3000'))
