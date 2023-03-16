const rewiremock = require('rewiremock/node')
const { deepStrictEqual } = require('node:assert')

const dbData = [{ name: 'John' }, { name: 'Emanuel' }]
class MockDatabase {
  connect = async () => this
  find = async (query) => dbData
}

rewiremock(() => require('../src/utils/database')).with(MockDatabase)

  ; (async () => {
    {
      const expected = [{ name: 'JOHN' }, { name: 'EMANUEL' }]
      rewiremock.enable()
      const UserFactory = require('../src/factory/user-factory')

      const userFactory = await UserFactory.createInstance()
      const result = await userFactory.find()
      deepStrictEqual(result, expected)

      rewiremock.disable()
    }
    {
      const expected = [{ name: 'EMANUEL' }]
      const UserFactory = require('../src/factory/user-factory')

      const userFactory = await UserFactory.createInstance()
      const result = await userFactory.find()
      deepStrictEqual(result, expected)
    }
  })()
