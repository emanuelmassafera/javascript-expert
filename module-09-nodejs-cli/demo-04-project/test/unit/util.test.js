import { expect, describe, it, jest, beforeEach } from '@jest/globals'
import Util from '../../src/util.js'

describe('#Util - Strings', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  describe('#upperCaseFirstLetter', () => {
    it('should transform the first letter in upperCase', () => {
      const data = 'hello'
      const expected = 'Hello'
      const result = Util.upperCaseFirstLetter(data)
      expect(result).toStrictEqual(expected)
    })

    it('should return empty while giving an empty string', () => {
      const data = ''
      const expected = ''
      const result = Util.upperCaseFirstLetter(data)
      expect(result).toStrictEqual(expected)
    })
  })

  describe('#lowerCaseFirstLetter', () => {
    it('should transform the first letter in lowerCase', () => {
      const data = 'Hello'
      const expected = 'hello'
      const result = Util.lowerCaseFirstLetter(data)
      expect(result).toStrictEqual(expected)
    })

    it('should return empty while giving an empty string', () => {
      const data = ''
      const expected = ''
      const result = Util.lowerCaseFirstLetter(data)
      expect(result).toStrictEqual(expected)
    })
  })
})
