const { deepStrictEqual } = require('node:assert')
const obj = {}
const arr = []
const fn = () => { }

// Internally, object literals become explicit functions
deepStrictEqual(new Object().__proto__, {}.__proto__)

// __proto__ is the reference of the object that has the properties on it
deepStrictEqual(obj.__proto__, Object.prototype)
deepStrictEqual(arr.__proto__, Array.prototype)
deepStrictEqual(fn.__proto__, Function.prototype)

//  __proto__ of Object.prototype is null
deepStrictEqual(obj.__proto__.__proto__, null)

function Employee() { }
Employee.prototype.salary = () => "salary**"

function Supervisor() { }
// Inherits the instance of Employee
Supervisor.prototype = Object.create(Employee.prototype)
Supervisor.prototype.profitShare = () => "profitShare**"

function Manager() { }
// Inherits the instance of Supervisor
Manager.prototype = Object.create(Supervisor.prototype)
Manager.prototype.monthlyBonuses = () => 'monthlyBonuses**'

// If you don't call 'new', the first __proto__ will always be the Function instance, 
// without inheriting our classes. To access classes without new, you can access them directly via prototype
deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype)

// When called with 'new' the __proto__ receives the prototype
deepStrictEqual(Supervisor.prototype, new Manager().__proto__.__proto__)

const manager = new Manager()
deepStrictEqual(manager.__proto__, Manager.prototype)
deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype)
deepStrictEqual(manager.__proto__.__proto__.__proto__, Employee.prototype)
deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__, Object.prototype)
deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__.__proto__, null)

class T1 {
  ping() { return 'ping' }
}

class T2 extends T1 {
  pong() { return 'pong' }
}

class T3 extends T2 {
  shoot() { return 'shoot' }
}

const t3 = new T3()
deepStrictEqual(t3.__proto__, T3.prototype)
deepStrictEqual(t3.__proto__.__proto__, T2.prototype)
deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype)
deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__, Object.prototype)
deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__.__proto__, null)
