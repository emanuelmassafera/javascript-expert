import fs from 'fs/promises'
import { expect, describe, it, jest, beforeEach } from '@jest/globals'
import axios from 'axios'
import RickAndMortyBRL from '../../src/business/integrations/rick-and-morty-brl.js'
import Character from '../../src/entities/character.js'

describe('#RickAndMortyBRL', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('#getCharactersFromJSON should return a list of Character entity', async () => {
    const response = JSON.parse(await fs.readFile('./test/mocks/characters.json'))
    const expected = response.results.map(character => new Character(character))

    jest.spyOn(axios, 'get').mockResolvedValue({ data: response })

    const result = await RickAndMortyBRL.getCharactersFromJSON()
    expect(result).toStrictEqual(expected)
  })

  it('#getCharactersFromJSON should an empty list if the API returns nothing', async () => {
    const response = JSON.parse(await fs.readFile('./test/mocks/characters-empty.json'))
    const expected = response.results.map(character => new Character(character))

    jest.spyOn(axios, 'get').mockResolvedValue({ data: response })

    const result = await RickAndMortyBRL.getCharactersFromJSON()
    expect(result).toStrictEqual(expected)
  })
})
