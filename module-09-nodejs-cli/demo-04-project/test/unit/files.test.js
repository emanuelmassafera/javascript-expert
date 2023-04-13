import { expect, describe, it, jest, beforeEach } from '@jest/globals'
import fsPromises from 'fs/promises'
import { createFiles } from '../../src/createFiles.js'
import templates from '../../src/templates/index.js'

describe('#Layers - Files Structure', () => {
  const defaultLayers = ['service', 'repository', 'factory']
  const config = {
    mainPath: './',
    defaultMainFolder: 'src',
    layers: defaultLayers,
    componentName: 'product'
  }
  const repositoryLayer = `${config.componentName}Repository`
  const serviceLayer = `${config.componentName}Service`

  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  it('should not create file structure on inexistent templates', async () => {
    const myConfig = {
      ...config,
      layers: ['inexistent']
    }
    const expected = { error: 'The chosen layer does not have a template' }
    const result = await createFiles(myConfig)
    expect(result).toStrictEqual(expected)
  })

  it('should not add dependencies to repository', async () => {
    jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue()
    jest.spyOn(templates, templates.repositoryTemplate.name).mockReturnValue({ fileName: '', template: '' })

    const myConfig = {
      ...config,
      layers: ['repository']
    }
    const expected = { success: true }
    const result = await createFiles(myConfig)
    expect(result).toStrictEqual(expected)
    expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length)
    expect(templates.repositoryTemplate).toHaveBeenCalledWith(myConfig.componentName)
  })

  it('should add repository dependency to service', async () => {
    jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue()
    jest.spyOn(templates, templates.serviceTemplate.name).mockReturnValue({ fileName: '', template: '' })

    const myConfig = {
      ...config,
      layers: ['service', 'repository']
    }
    const expected = { success: true }
    const result = await createFiles(myConfig)
    expect(result).toStrictEqual(expected)
    expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length)
    expect(templates.serviceTemplate).toHaveBeenCalledWith(myConfig.componentName, repositoryLayer)
  })

  it('should add repository and service dependencies to factory', async () => {
    jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue()
    jest.spyOn(templates, templates.factoryTemplate.name).mockReturnValue({ fileName: '', template: '' })

    const myConfig = {
      ...config,
    }
    const expected = { success: true }
    const result = await createFiles(myConfig)
    expect(result).toStrictEqual(expected)
    expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length)
    expect(templates.factoryTemplate).toHaveBeenCalledWith(myConfig.componentName, serviceLayer, repositoryLayer)
  })
})
