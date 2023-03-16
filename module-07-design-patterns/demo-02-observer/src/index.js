import Payment from './events/payment.js'
import PaymentSubject from './subjects/payment-subject.js'
import Shipment from './observers/shipment.js'
import Marketing from './observers/marketing.js'

const subject = new PaymentSubject()

const shipment = new Shipment()
subject.subscribe(shipment)

const marketing = new Marketing()
subject.subscribe(marketing)

const payment = new Payment(subject)
payment.creditCard({ userName: 'emanuel', id: Date.now() })

subject.unsubscribe(marketing)
payment.creditCard({ userName: 'john', id: Date.now() })
