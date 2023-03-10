import mocha from 'mocha'
const { describe, it } = mocha
import chai from 'chai'
const { expect } = chai
import Person from '../src/person.js'

describe('Person', () => {
  it('should return a person instance from a string', () => {
    const person = Person.generateInstanceFromString(
      '1 Car,Truck 2000 2020-01-01 2020-02-01'
    )
    const expected = {
      from: '2020-01-01',
      to: '2020-02-01',
      vehicles: ['Car', 'Truck'],
      kmTraveled: '2000',
      id: '1'
    }

    expect(person).to.be.deep.equal(expected)
  })

  it('should format values', () => {
    const person = new Person({
      from: '2020-01-01',
      to: '2020-02-01',
      vehicles: ['Car', 'Truck'],
      kmTraveled: '2000',
      id: '1'
    })
    const result = person.formatted('pt-BR')
    const expected = {
      from: '01 de janeiro de 2020',
      to: '01 de fevereiro de 2020',
      vehicles: 'Car e Truck',
      kmTraveled: '2.000 km',
      id: 1
    }

    expect(result).to.be.deep.equal(expected)
  })
})
