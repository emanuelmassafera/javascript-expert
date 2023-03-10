class User {
  constructor({ id, name, role, age }) {
    this.id = parseInt(id)
    this.name = name
    this.role = role
    this.birthDay = new Date().getFullYear() - age
  }
}

module.exports = User
