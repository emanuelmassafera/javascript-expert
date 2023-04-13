import { expect, describe, it, jest, beforeEach } from '@jest/globals'
import fsPromises from 'fs/promises'
import fs from 'fs'
import { createLayersIfNotExists } from '../../src/createLayers.js'

describe('#Layers - Folders Structure', () => {
  const defaultLayers = ['service', 'repository', 'factory']

  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  it('should create folders if they don\'t exist', async () => {
    jest.spyOn(fsPromises, fsPromises.mkdir.name).mockResolvedValue()
    jest.spyOn(fs, fs.existsSync.name).mockReturnValue(false)

    await createLayersIfNotExists({ mainPath: '', layers: defaultLayers })

    expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length)
    expect(fsPromises.mkdir).toHaveBeenCalledTimes(defaultLayers.length)
  })

  it('should not create folders if they exist', async () => {
    jest.spyOn(fsPromises, fsPromises.mkdir.name).mockResolvedValue()
    jest.spyOn(fs, fs.existsSync.name).mockReturnValue(true)

    await createLayersIfNotExists({ mainPath: '', layers: defaultLayers })

    expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length)
    expect(fsPromises.mkdir).not.toHaveBeenCalled()
  })
})
