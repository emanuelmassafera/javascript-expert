import TerminalController from './terminal-controller.js'
import database from './../database.json' assert {type: 'json'}
import Person from './person.js'
import { save } from './repository.js'

const DEFAULT_LANGUAGE = 'pt-BR'
const STOP_TERMINAL = ':q'

const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAULT_LANGUAGE)

async function mainLoop() {
  try {
    const answer = await terminalController.question()

    if (answer === STOP_TERMINAL) {
      terminalController.closeTerminal()
      console.log('Process finished!')
      return
    }

    const person = Person.generateInstanceFromString(answer)
    terminalController.updateTable(person.formatted(DEFAULT_LANGUAGE))
    await save(person)

    return mainLoop()
  } catch (error) {
    console.error('Error', error)
    return mainLoop()
  }
}

await mainLoop()
