import fsPromises from 'fs/promises'
import templates from './templates/index.js'
import Util from './util.js'

const defaultDependencies = (layer, componentName) => {
  const dependencies = {
    repository: [],
    service: [`${componentName}Repository`],
    factory: [`${componentName}Service`, `${componentName}Repository`]
  }

  return dependencies[layer].map(Util.lowerCaseFirstLetter)
}

async function executeWrites(pendingFilesToWrite) {
  return Promise.all(pendingFilesToWrite.map(
    ({ file, txtFile }) => fsPromises.writeFile(file, txtFile)
  ))
}

export async function createFiles({ mainPath, defaultMainFolder, layers, componentName }) {
  const keys = Object.keys(templates)

  const pendingFilesToWrite = []
  for (const layer of layers) {
    const chosenTemplate = keys.find(key => key.includes(layer))

    if (!chosenTemplate) {
      return {
        error: 'The chosen layer does not have a template'
      }
    }

    const template = templates[chosenTemplate]
    const targetFolder = `${mainPath}/${defaultMainFolder}/${layer}`
    const dependencies = defaultDependencies(layer, componentName)
    const { fileName, template: txtFile } = template(componentName, ...dependencies)
    const file = `${targetFolder}/${Util.lowerCaseFirstLetter(fileName)}.js`

    pendingFilesToWrite.push({ file, txtFile })
  }

  await executeWrites(pendingFilesToWrite)

  return { success: true }
}
