import { writeFile, readFile } from 'node:fs/promises'

export const save = async (data) => {
  const databasePath = new URL('../database.json', import.meta.url)

  const currentData = JSON.parse((await readFile(databasePath, 'utf8')))
  currentData.push(data)

  await writeFile(databasePath, JSON.stringify(currentData))
}
