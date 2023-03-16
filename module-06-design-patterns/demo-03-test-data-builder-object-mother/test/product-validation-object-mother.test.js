const { expect } = require('chai')
const { describe, it } = require('mocha')
const { productValidator } = require('../src/index')
const ProductObjectMother = require('./model/product-object-mother')

describe('Test Object Mother', () => {
  it('shouldn\'t return error with valid product', () => {
    const product = ProductObjectMother.valid()
    const result = productValidator(product)

    const expected = {
      errors: [],
      result: true
    }

    expect(result).to.be.deep.equal(expected)
  })

  describe('Product Validation Rules', () => {
    it('should return an object error when creating a product with invalid id', () => {
      const product = ProductObjectMother.withInvalidId()
      const result = productValidator(product)

      const expected = {
        errors: [`id: invalid length, current [${product.id}] expected to be between 2 and 20`],
        result: false
      }

      expect(result).to.be.deep.equal(expected)
    })

    it('should return an object error when creating a product with invalid name', () => {
      const product = ProductObjectMother.withInvalidName()
      const result = productValidator(product)

      const expected = {
        errors: [`name: invalid value, current [${product.name}] expected to have only words`],
        result: false
      }

      expect(result).to.be.deep.equal(expected)
    })

    it('should return an object error when creating a product with invalid price', () => {
      const product = ProductObjectMother.withInvalidPrice()
      const result = productValidator(product)

      const expected = {
        errors: [`price: invalid value, current [${product.price}] expected to be between 1 and 1000`],
        result: false
      }

      expect(result).to.be.deep.equal(expected)
    })

    it('should return an object error when creating a product with invalid category', () => {
      const product = ProductObjectMother.withInvalidCategory()
      const result = productValidator(product)

      const expected = {
        errors: [`category: invalid value, current [${product.category}] expected to be either electronic or organic`],
        result: false
      }

      expect(result).to.be.deep.equal(expected)
    })
  })
})
