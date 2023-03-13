'use strict'

const { readFile } = require('node:fs/promises')
const { join } = require('node:path')
const pdf = require('pdf-parse')
const TextProcessorFacade = require('./text-processor-facade')

  ; (async () => {
    const dataBuffer = await readFile(join(__dirname, './../../docs/contract.pdf'))
    const data = await pdf(dataBuffer)

    const instance = new TextProcessorFacade(data.text)
    const people = instance.getPeopleFromPDF()
    console.log(people)
  })()
