#!/usr/bin/env node

import { config } from 'dotenv'
config()
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { createLayersIfNotExists } from './createLayers.js'
import { createFiles } from './createFiles.js'

const { argv: { componentName } } = yargs(hideBin(process.argv))
  .command('skeleton', 'Creates project skeleton', (builder) => {
    return builder
      .option('component-name', {
        alias: 'c',
        demandOption: true,
        describe: 'Component\'s name',
        type: 'array'
      })
      .example('skeleton --component-name product', 'Creates a project with a single domain')
      .example('skeleton -c product -c user', 'Creates a project with multiple domains')
  })
  .epilog('Copyright 2023 - Emanuel Massafera')

const env = process.env.NODE_ENV
const defaultMainFolder = env === 'dev' ? 'tmp' : 'src'
const layers = ['repository', 'service', 'factory'].sort()
const myConfig = {
  layers,
  defaultMainFolder,
  mainPath: '.'
}

await createLayersIfNotExists(myConfig)

const pendingPromises = []
for (const domain of componentName) {
  const result = createFiles({
    ...myConfig,
    componentName: domain
  })
  pendingPromises.push(result)
}
await Promise.all(pendingPromises)
