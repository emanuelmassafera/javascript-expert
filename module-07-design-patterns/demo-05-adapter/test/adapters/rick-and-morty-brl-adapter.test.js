import { expect, describe, it, jest, beforeEach } from '@jest/globals'
import RickAndMortyBRL from '../../src/business/integrations/rick-and-morty-brl.js'
import RickAndMortyBRLAdapter from '../../src/business/adapters/rick-and-morty-brl-adapter.js'

describe('#RickAndMortyBRLAdapter', () => {
  beforeEach(() =>
    jest.clearAllMocks()
  )

  it('#getCharacters should be an adapter for RickAndMortyBRL.getCharactersFromJSON', async () => {
    const brlIntegration = jest.spyOn(
      RickAndMortyBRL,
      RickAndMortyBRL.getCharactersFromJSON.name
    ).mockResolvedValue([])

    const result = await RickAndMortyBRLAdapter.getCharacters()

    expect(result).toEqual([])
    expect(brlIntegration).toHaveBeenCalled()
  })
})
