'use strict'

const safeRegex = require('safe-regex')

class InvalidRegexError extends Error {
  constructor(regex) {
    super(`The regex ${regex} is unsafe!`)
    this.name = 'InvalidRegexError'
  }
}

const evaluateRegex = (regex) => {
  const isSafe = safeRegex(regex)
  if (isSafe) return regex

  throw new InvalidRegexError(regex)
}

module.exports = { InvalidRegexError, evaluateRegex }
