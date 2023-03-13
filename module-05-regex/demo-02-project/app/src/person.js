'use strict'

const { evaluateRegex } = require('./util')

class Person {
  constructor([
    name,
    nationality,
    maritalStatus,
    document,
    street,
    number,
    neighborhood,
    state
  ]) {
    const firstLetterRegex = evaluateRegex(/^(\w{1})([a-zA-Z]+$)/g)
    const formatFirstLetter = (text) => {
      return text.replace(firstLetterRegex, (fullMatch, group1, group2, index) => {
        return group1.toUpperCase().concat(group2.toLowerCase())
      })
    }

    this.name = name
    this.nationality = formatFirstLetter(nationality)
    this.maritalStatus = formatFirstLetter(maritalStatus)
    this.document = document.replace(evaluateRegex(/\D/g), '')
    this.street = street.match(evaluateRegex(/(?<=\sa\s).*$/)).join()
    this.number = number
    this.neighborhood = neighborhood.match(evaluateRegex(/(?<=\s).*$/)).join()
    this.state = state.replace(evaluateRegex(/\.$/), '')
  }
}

module.exports = Person
