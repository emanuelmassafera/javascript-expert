'use strict'

const { describe, it } = require('mocha')
const { expect } = require('chai')
const TextProcessorFluentAPI = require('./../src/text-processor-fluent-api')
const mock = require('./mock/valid')

describe('TextProcessorFluentAPI', () => {
  it('build', () => {
    const result = new TextProcessorFluentAPI(mock)
      .build()

    expect(result).to.be.deep.equal(mock)
  })

  it('extractPeopleData', () => {
    const result = new TextProcessorFluentAPI(mock)
      .extractPeopleData()
      .build()

    const expected = [
      [
        'Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ',
        'domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. '
      ].join('\n'),
      [
        'Arya Robbin, belga, casado, CPF 884.112.200-52, residente e ',
        'domiciliada a Av. paulista, 1400, bairro Consolação, São Paulo. '
      ].join('\n'),
      [
        'Júlia Menezes, brasileira, solteira, CPF 297.947.800-81, residente e ',
        'domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo. '
      ].join('\n'),
    ]

    expect(result).to.be.deep.equal(expected)
  })

  it('divideTextInColumns', () => {
    const content = [
      [
        'Arya Robbin, belga, casado, CPF 884.112.200-52, residente e ',
        'domiciliada a Av. paulista, 1400, bairro Consolação, São Paulo. '
      ].join('\n'),
    ]

    const result = new TextProcessorFluentAPI(content)
      .divideTextInColumns()
      .build()

    const expected = [
      [
        "Arya Robbin",
        " belga",
        " casado",
        " CPF 884.112.200-52",
        " residente e \ndomiciliada a Av. paulista",
        " 1400",
        " bairro Consolação",
        " São Paulo. "
      ]
    ]

    expect(result).to.be.deep.equal(expected)
  })

  it('removeEmptyCharacters', () => {
    const content = [
      [
        "Arya Robbin",
        " belga",
        " casado",
        " CPF 884.112.200-52",
        " residente e \ndomiciliada a Av. paulista",
        " 1400",
        " bairro Consolação",
        " São Paulo. "
      ]
    ]

    const result = new TextProcessorFluentAPI(content)
      .removeEmptyCharacters()
      .build()

    const expected = [
      [
        "Arya Robbin",
        "belga",
        "casado",
        "CPF 884.112.200-52",
        "residente e domiciliada a Av. paulista",
        "1400",
        "bairro Consolação",
        "São Paulo."
      ]
    ]

    expect(result).to.be.deep.equal(expected)
  })

  it('mapPerson', () => {
    const content = [
      [
        "Arya Robbin",
        "belga",
        "casado",
        "CPF 884.112.200-52",
        "residente e domiciliada a Av. paulista",
        "1400",
        "bairro Consolação",
        "São Paulo."
      ]
    ]

    const result = new TextProcessorFluentAPI(content)
      .mapPerson()
      .build()

    const expected = [
      {
        name: "Arya Robbin",
        nationality: "Belga",
        maritalStatus: "Casado",
        document: "88411220052",
        street: "Av. paulista",
        number: "1400",
        neighborhood: "Consolação",
        state: "São Paulo"
      }
    ]

    expect(result).to.be.deep.equal(expected)
  })
})
