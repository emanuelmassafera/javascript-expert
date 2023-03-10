const { deepStrictEqual, ok } = require('node:assert')
const { describe, it } = require('mocha')
const request = require('supertest')
const app = require('./api')

describe('API Suite test', () => {
  describe('/contact', () => {
    it('should request the contact page and return HTTP Status 200', async () => {
      const response = await request(app)
        .get('/contact')
        .expect(200)
      deepStrictEqual(response.text, 'Contact us!')
    })
  })

  describe('/hello', () => {
    it('should request an inexistenent route /hello and redirect to default route', async () => {
      const response = await request(app)
        .get('/hello')
        .expect(200)
      deepStrictEqual(response.text, 'JS Expert!')
    })
  })

  describe('/login', () => {
    it('should login successfully on the login route and return HTTP Status 200', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'johndoe', password: '123' })
        .expect(200)
      deepStrictEqual(response.text, 'Logging has succeeded!')
    })

    it('should unauthorize a request when requesting it using wrong credentials and return HTTP Status 401', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'wrong', password: '321' })
        .expect(401)
      ok(response.unauthorized)
      deepStrictEqual(response.text, 'Logging has failed!')
    })
  })
})
