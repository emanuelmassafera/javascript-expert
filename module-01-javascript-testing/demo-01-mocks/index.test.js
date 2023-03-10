const { deepStrictEqual, rejects } = require('node:assert')
const { error } = require('./src/constants')
const File = require('./src/file')
  ;

(async () => {
  {
    const filePath = './mocks/empty-file-invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJSON(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = './mocks/four-items-invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJSON(filePath)
    await rejects(result, rejection)
  }
  {
    Date.prototype.getFullYear = () => 2020
    const filePath = './mocks/three-items-valid.csv'
    const expected = [
      {
        "id": 123,
        "name": "John Doe",
        "role": "Node.js Developer",
        "birthDay": 1995
      },
      {
        "id": 213,
        "name": "Nick S. Herbert",
        "role": "Backend Engineer",
        "birthDay": 1940
      },
      {
        "id": 321,
        "name": "Lila P. Thompson",
        "role": "Software Developer",
        "birthDay": 1990
      }
    ]
    const result = await File.csvToJSON(filePath)
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
  }
})()
