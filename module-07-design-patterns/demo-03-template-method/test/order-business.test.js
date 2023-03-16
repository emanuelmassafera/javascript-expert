import { expect, describe, it, jest, beforeEach } from '@jest/globals'
import OrderBusiness from '../src/business/order-business.js'
import Order from '../src/entities/order.js'

describe('Test Suite for Template Method', () => {
  beforeEach(() =>
    jest.resetAllMocks()
  )

  describe('#OrderBusiness', () => {
    it('execution OrderBusiness without Template Method', () => {
      const order = new Order({
        customerId: 1,
        amount: 100000,
        products: [{ description: 'Car' }]
      })
      const orderBusiness = new OrderBusiness()

      // It's necessary to remember the sequence and strictly follow the steps
      const isValid = orderBusiness._validateRequiredFields(order)
      expect(isValid).toBeTruthy()

      const result = orderBusiness._create(order)
      expect(result).toBeTruthy()
    })

    it('execution OrderBusiness with Template Method', () => {
      const order = new Order({
        customerId: 1,
        amount: 100000,
        products: [{ description: 'Car' }]
      })
      const orderBusiness = new OrderBusiness()

      const _validateRequiredFieldsSpy = jest.spyOn(
        orderBusiness,
        orderBusiness._validateRequiredFields.name
      )
      const _createSpy = jest.spyOn(
        orderBusiness,
        orderBusiness._create.name
      )

      // With Template Method, the sequence will always be executed
      const result = orderBusiness.create(order)
      expect(result).toBeTruthy()
      expect(_validateRequiredFieldsSpy).toHaveBeenCalled()
      expect(_createSpy).toHaveBeenCalled()
    })
  })
})
