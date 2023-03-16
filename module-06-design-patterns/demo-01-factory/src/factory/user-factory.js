const UserRepository = require('../repository/user-repository')
const UserService = require('../service/user-service')
const Database = require('../utils/database')

class UserFactory {
  static async createInstance() {
    const db = new Database({ connectionString: 'mongodb://localhost' })
    const dbConnection = await db.connect()
    const userRepository = new UserRepository({ dbConnection })
    const userService = new UserService({ userRepository })

    return userService
  }
}

module.exports = UserFactory
