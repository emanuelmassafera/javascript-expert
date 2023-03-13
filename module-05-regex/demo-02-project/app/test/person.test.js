'use strict'

const { describe, it } = require('mocha')
const { expect } = require('chai')
const Person = require('./../src/person')

describe('Person', () => {
  it('should generate a person from properties list', () => {
    const content = [
      "Arya Robbin",
      "belga",
      "casado",
      "CPF 884.112.200-52",
      "residente e domiciliada a Av. paulista",
      "1400",
      "bairro Consolação",
      "São Paulo."
    ]

    const result = new Person(content)

    const expected = {
      name: 'Arya Robbin',
      nationality: 'Belga',
      maritalStatus: 'Casado',
      document: '88411220052',
      street: 'Av. paulista',
      number: '1400',
      neighborhood: 'Consolação',
      state: 'São Paulo'
    }

    expect(result).to.be.deep.equal(expected)
  })
})
