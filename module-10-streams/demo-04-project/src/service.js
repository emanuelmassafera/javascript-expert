import { createReadStream, createWriteStream, statSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'

const pipelineAsync = promisify(pipeline)

import split from 'split2'
import StreamConcat from 'stream-concat'


export default class Service {
  #years
  #likes
  #lineChartData
  #outputFinal
  #technologiesInAnalysis
  #defaultInputFolder

  constructor({ years, likes, lineChartData, outputFinal, defaultInputFolder, technologiesInAnalysis: technologiesInAnalysis }) {
    this.#years = years
    this.#likes = likes
    this.#lineChartData = lineChartData
    this.#outputFinal = outputFinal
    this.#technologiesInAnalysis = technologiesInAnalysis
    this.#defaultInputFolder = defaultInputFolder
  }

  async prepareStreams(folder) {
    const files = (await readdir(folder))
    const filesSize = this.getFilesSize(files, folder)

    const streams = files.map(
      file => createReadStream(join(folder, file))
    )

    const stream = new StreamConcat(streams)
    return { stream, filesSize }
  }

  async runPipeline({ graphNotifier, progressNotifier }) {
    const result = await this.prepareStreams(this.#defaultInputFolder)
    return this.runProcess({
      ...result,
      graphNotifier,
      progressNotifier
    })
  }

  async runProcess({ stream, graphNotifier, progressNotifier, filesSize }) {
    return pipelineAsync
      (
        stream,
        this.handleProgressBar(filesSize, progressNotifier),
        split(JSON.parse),
        this.mapFunction.bind(this),
        this.aggregate(graphNotifier),
        createWriteStream(this.#outputFinal),
      )
  }

  handleProgressBar(filesSize, progressNotifier) {
    let processedAlready = 0

    async function* progressBar(source) {
      for await (const data of source) {
        processedAlready += data.length
        progressNotifier.emit('update', { processedAlready, filesSize })
        yield data
      }
    }
    return progressBar.bind(this)
  }

  async * mapFunction(source) {
    const likes = this.#likes

    for await (const data of source) {
      const tools = data.tools
      const item = this.mergeListIntoObject(
        {

          list: this.#technologiesInAnalysis,
          mapper: tech => ({
            [tech]: likes.includes(tools?.[tech]?.experience)
          })
        }
      )

      const finalItem = {
        ...item,
        year: data.year
      }

      yield finalItem
    }
  }

  aggregate(graphNotifier) {
    async function* feedGraph(source) {
      const yearsInContext = this.aggregateItemsPerYear(this.#years)

      for await (const data of source) {
        const year = data.year.toString()
        Reflect.deleteProperty(data, 'year')
        Reflect.ownKeys(data).forEach(key => (yearsInContext[year][key] += data[key]))
      }

      graphNotifier.emit('update', yearsInContext)

      yield JSON.stringify(yearsInContext)
    }

    return feedGraph.bind(this)

  }

  aggregateItemsPerYear(years) {
    const initialValues = this.mergeListIntoObject(
      {
        list: this.#technologiesInAnalysis,
        mapper: item => ({ [item]: 0 })
      }
    )

    const mapItemsPerYear = year => ({
      [year]: {
        ...initialValues,

        get total() {
          return Reflect.ownKeys(this)
            .filter(key => key !== 'total')
            .map(key => this[key])
            .reduce((prev, next) => prev + next, 0)
        }
      }
    })

    return this.mergeListIntoObject({
      list: years,
      mapper: mapItemsPerYear
    })
  }

  mergeListIntoObject({ list, mapper }) {
    return list.map(mapper)
      .reduce((prev, next) => ({ ...prev, ...next }), {})
  }

  getFilesSize(files, folder) {
    return files
      .map(file => statSync(join(folder, file)).size)
      .reduce((prev, next) => prev + next, 0)
  }

  onLineChartUpdate(item) {
    Reflect.ownKeys(item)
      .map(year => {
        const indexYear = this.#years.indexOf(year.toString())

        const { total, ...yearContext } = item[year]

        Reflect.ownKeys(yearContext)
          .map(lib => this.#lineChartData[lib].y[indexYear] = yearContext[lib])
      })

    return Object.values(this.#lineChartData)
  }
}
