import OrderBusiness from './business/order-business.js'
import Order from './entities/order.js'

const order = new Order({
  customerId: 1,
  amount: 200000,
  products: [{ description: 'Car' }]
})

const orderBusiness = new OrderBusiness()
console.log('orderCreated', orderBusiness.create(order))
