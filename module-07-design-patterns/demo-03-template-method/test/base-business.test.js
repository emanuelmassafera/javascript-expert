import { expect, describe, it, jest, beforeEach } from '@jest/globals'
import BaseBusiness from '../src/business/base/base-business.js'
import { NotImplementedException } from '../src/utils/exceptions.js'

describe('#BaseBusiness', () => {
  beforeEach(() =>
    jest.resetAllMocks()
  )

  it('should throw an error when child class does not implement _validateRequiredFields method', () => {
    class ConcreteClass extends BaseBusiness { }
    const concreteClass = new ConcreteClass()
    const validationError = new NotImplementedException(concreteClass._validateRequiredFields.name)

    expect(() => concreteClass.create({})).toThrow(validationError)
  })

  it('should throw an error when _validateRequiredFields returns false', () => {
    const VALIDATION_DOES_NOT_SUCCEEDED = false
    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_DOES_NOT_SUCCEEDED)
    }
    const concreteClass = new ConcreteClass()
    const validationError = new Error('Invalid data!')

    expect(() => concreteClass.create({})).toThrow(validationError)
  })

  it('should throw an error when child class does not implement _create method', () => {
    const VALIDATION_SUCCEEDED = true
    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_SUCCEEDED)
    }
    const concreteClass = new ConcreteClass()
    const validationError = new NotImplementedException(concreteClass._create.name)

    expect(() => concreteClass.create({})).toThrow(validationError)
  })

  it('should call _create and _validateRequiredFields methods on create', () => {
    const VALIDATION_SUCCEEDED = true
    const CREATE_SUCCEEDED = true
    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_SUCCEEDED)
      _create = jest.fn().mockReturnValue(CREATE_SUCCEEDED)
    }
    const concreteClass = new ConcreteClass()

    const createFromBaseClass = jest.spyOn(
      BaseBusiness.prototype,
      BaseBusiness.prototype.create.name
    )
    const result = concreteClass.create({})

    expect(result).toBeTruthy()
    expect(createFromBaseClass).toHaveBeenCalled()
    expect(concreteClass._validateRequiredFields).toHaveBeenCalled()
    expect(concreteClass._create).toHaveBeenCalled()
  })
})
