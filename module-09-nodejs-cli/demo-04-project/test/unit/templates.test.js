import { expect, describe, it, jest, beforeEach } from '@jest/globals'
import templates from '../../src/templates/index.js'
import { repositoryTemplateMock, serviceTemplateMock, factoryTemplateMock } from './mocks/index.js'

const {
  repositoryTemplate,
  serviceTemplate,
  factoryTemplate
} = templates

describe('#Codegen - 3-layers arch', () => {
  const componentName = 'product'
  const repositoryName = `${componentName}Repository`
  const serviceName = `${componentName}Service`
  const factoryName = `${componentName}Factory`

  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  it('should generate repository template', () => {
    const expected = {
      fileName: repositoryName,
      template: repositoryTemplateMock
    }
    const result = repositoryTemplate(componentName)
    expect(result).toStrictEqual(expected)
  })

  it('should generate service template', () => {
    const expected = {
      fileName: serviceName,
      template: serviceTemplateMock
    }
    const result = serviceTemplate(componentName, repositoryName)
    expect(result).toStrictEqual(expected)
  })

  it('should generate factory template', () => {
    const expected = {
      fileName: factoryName,
      template: factoryTemplateMock
    }
    const result = factoryTemplate(componentName, serviceName, repositoryName)
    expect(result).toStrictEqual(expected)
  })
})
