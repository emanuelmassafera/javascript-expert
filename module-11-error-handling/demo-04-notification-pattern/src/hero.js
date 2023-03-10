import NotificationContext from "./notification-context.js"

export default class HeroEntity extends NotificationContext {
  constructor({ name, age }) {
    super()

    this.name = name
    this.age = age
  }

  isValid() {
    if (this.age <= 17) {
      this.addNotification('Age must be higher than 17')
    }

    if (this.name.length <= 4) {
      this.addNotification('Name length must be higher than 4')
    }

    return !this.hasNotifications()
  }
}
