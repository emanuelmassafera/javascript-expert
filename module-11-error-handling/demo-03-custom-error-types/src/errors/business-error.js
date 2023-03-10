import BaseError from "./base/base-error.js"

export default class BusinessError extends BaseError {
  constructor(errorMessage) {
    super({
      message: errorMessage,
      name: 'BusinessError'
    })
  }
}
