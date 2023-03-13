'use strict'

const TextProcessorFluentAPI = require('./text-processor-fluent-api')

class TextProcessorFacade {
  #textProcessorFluentAPI

  constructor(content) {
    this.#textProcessorFluentAPI = new TextProcessorFluentAPI(content)
  }

  getPeopleFromPDF() {
    return this.#textProcessorFluentAPI
      .extractPeopleData()
      .divideTextInColumns()
      .removeEmptyCharacters()
      .mapPerson()
      .build()
  }
}

module.exports = TextProcessorFacade
