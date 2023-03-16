import ContextStrategy from "./base/context-strategy.js"
import PostgresStrategy from "./strategies/postgres-strategy.js"
import MongoStrategy from "./strategies/mongo-strategy.js"

const postgresConnectionString = "postgres://root:docker@localhost:5432/heroes"
const postgresContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString))
await postgresContext.connect()

const mongoConnectionString = "mongodb://root:docker@localhost:27017/heroes"
const mongoContext = new ContextStrategy(new MongoStrategy(mongoConnectionString))
await mongoContext.connect()

const data = [{
  name: 'emanuel',
  type: 'transaction'
}, {
  name: 'john',
  type: 'activityLog'
}]

const contextTypes = {
  transaction: postgresContext,
  activityLog: mongoContext
}

for (const { type, name } of data) {
  const context = contextTypes[type]
  await context.create({ name: name + Date.now() })

  console.log(type, context.dbStrategy.constructor.name)
  console.log(await context.read())
}
