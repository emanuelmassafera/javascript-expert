import { expect, describe, it, jest, beforeAll } from '@jest/globals'
import Payment from '../src/events/payment.js'
import PaymentSubject from '../src/subjects/payment-subject.js'
import Shipment from '../src/observers/shipment.js'
import Marketing from '../src/observers/marketing.js'

describe('Test Suite for Observable Pattern', () => {
  beforeAll(() => {
    jest.spyOn(
      console,
      console.log.name
    ).mockImplementation(() => { })
  })

  it('#PaymentSubject should notify subscribed observers', () => {
    const subject = new PaymentSubject()
    const observer = {
      update: jest.fn()
    }
    const data = 'JS Expert'
    const expected = data

    subject.subscribe(observer)
    subject.notify(data)
    expect(observer.update).toBeCalledWith(expected)
  })

  it('#PaymentSubject should not notify unsubscribed observers', () => {
    const subject = new PaymentSubject()
    const observer = {
      update: jest.fn()
    }
    const data = 'JS Expert'

    subject.subscribe(observer)
    subject.unsubscribe(observer)
    subject.notify(data)
    expect(observer.update).not.toHaveBeenCalled()
  })

  it('#PaymentSubject should notify subject after a credit card transaction', () => {
    const subject = new PaymentSubject()
    const payment = new Payment(subject)

    const paymentSubjectNotifierSpy = jest.spyOn(
      payment.paymentSubject,
      payment.paymentSubject.notify.name
    )

    const data = { userName: 'emanuel', id: Date.now() }
    payment.creditCard(data)

    expect(paymentSubjectNotifierSpy).toBeCalledWith(data)
  })

  it('#All should notify subscribers after a credit card payment', () => {
    const subject = new PaymentSubject()
    const shipment = new Shipment()
    const marketing = new Marketing()

    const shipmentSpy = jest.spyOn(
      shipment,
      shipment.update.name
    )
    const marketingSpy = jest.spyOn(
      marketing,
      marketing.update.name
    )

    subject.subscribe(shipment)
    subject.subscribe(marketing)

    const payment = new Payment(subject)
    const data = { userName: 'emanuel', id: Date.now() }
    payment.creditCard(data)

    expect(shipmentSpy).toHaveBeenCalledWith(data)
    expect(marketingSpy).toHaveBeenCalledWith(data)
  })
})
