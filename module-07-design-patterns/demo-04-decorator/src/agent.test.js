import { expect, describe, it, jest, beforeEach } from '@jest/globals'
import { Server } from 'node:http'
import { InjectHttpInterceptor } from './agent.js'

const originalHttp = jest.createMockFromModule('http')

describe('HTTP Interceptor Agent', () => {
  const eventName = 'request'
  const request = null

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should not change headers', () => {
    const response = {
      setHeader: jest.fn().mockReturnThis()
    }

    const serverInstance = new originalHttp.Server()
    serverInstance.emit(eventName, request, response)

    expect(response.setHeader).not.toHaveBeenCalled()
  })

  it('should activate header interceptor', () => {
    InjectHttpInterceptor()
    const response = {
      setHeader: jest.fn().mockReturnThis()
    }

    const serverInstance = new Server()
    serverInstance.emit(eventName, request, response)

    expect(response.setHeader).toHaveBeenCalledWith('X-Instrumented-By', 'Emanuel')
  })
})
