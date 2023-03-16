const UserFactory = require('./factory/user-factory')

  ; (async () => {
    const userFactory = await UserFactory.createInstance()
    const result = await userFactory.find()

    console.log(result)
  })()
