'use strict'

const { describe, it } = require('mocha')
const { expect } = require('chai')
const { InvalidRegexError, evaluateRegex } = require('./../src/util')

describe('Utils', () => {
  describe('evaluateRegex', () => {
    it('should throw an error using an unsafe regex', () => {
      const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/

      expect(() => evaluateRegex(unsafeRegex))
        .to.throw(InvalidRegexError, `The regex ${unsafeRegex} is unsafe!`)
    })

    it('should not throw an error using a safe regex', () => {
      const safeRegex = /^([a-z])$/

      expect(() => evaluateRegex(safeRegex)).to.not.throw()
      expect(evaluateRegex(safeRegex)).to.be.ok
    })
  })
})
