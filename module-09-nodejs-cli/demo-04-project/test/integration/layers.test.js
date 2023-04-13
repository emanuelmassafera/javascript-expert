import { expect, describe, it, jest, beforeAll, afterAll, beforeEach } from '@jest/globals'
import { tmpdir } from 'os'
import fsPromises from 'fs/promises'
import { join } from 'path'
import { createLayersIfNotExists } from '../../src/createLayers.js'

async function getFolders({ mainPath, defaultMainFolder }) {
  return fsPromises.readdir(join(mainPath, defaultMainFolder))
}

describe('#Integration - Layers - Folders Structure', () => {
  const config = {
    defaultMainFolder: 'src',
    mainPath: '',
    // The system returns the items sorted
    layers: ['service', 'factory', 'repository'].sort()
  }

  beforeAll(async () => {
    config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'skeleton-'))
  })

  afterAll(async () => {
    await fsPromises.rm(config.mainPath, { recursive: true })
  })

  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  it('should create folders if they don\'t exist', async () => {
    const beforeRun = await fsPromises.readdir(config.mainPath)

    await createLayersIfNotExists(config)

    const afterRun = await getFolders(config)

    expect(beforeRun).not.toStrictEqual(afterRun)
    expect(afterRun).toEqual(config.layers)
  })

  it('should not create folders if they exist', async () => {
    const beforeRun = await getFolders(config)

    await createLayersIfNotExists(config)

    const afterRun = await getFolders(config)

    expect(afterRun).toEqual(beforeRun)
  })
})
