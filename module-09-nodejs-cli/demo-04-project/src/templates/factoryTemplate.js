import Util from '../util.js'

const componentNameAnchor = '$$componentName'
const serviceNameAnchor = '$$serviceName'
const repositoryNameAnchor = '$$repositoryName'
const serviceDepNameAnchor = '$$serviceDepName'
const repositoryDepNameAnchor = '$$repositoryDepName'

const template =
  `import $$serviceName from '../service/$$serviceDepName.js'
import $$repositoryName from '../repository/$$repositoryDepName.js'

export default class $$componentNameFactory {
  static getInstance() {
    const repository = new $$repositoryName()
    const service = new $$serviceName({ repository })
    return service
  }
}`

export function factoryTemplate(componentName, serviceName, repositoryName) {
  return {
    fileName: `${componentName}Factory`,
    template: template
      .replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
      .replaceAll(serviceNameAnchor, Util.upperCaseFirstLetter(serviceName))
      .replaceAll(repositoryNameAnchor, Util.upperCaseFirstLetter(repositoryName))
      .replaceAll(serviceDepNameAnchor, Util.lowerCaseFirstLetter(serviceName))
      .replaceAll(repositoryDepNameAnchor, Util.lowerCaseFirstLetter(repositoryName))
  }
}
