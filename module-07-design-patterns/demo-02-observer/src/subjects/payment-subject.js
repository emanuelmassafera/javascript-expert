export default class PaymentSubject {
  #observers = new Set()

  notify(data) {
    // the observer is responsible to manage its errors/exceptions
    // should not be use await on notify method, it should only emit events
    this.#observers.forEach(observer => observer.update(data))
  }

  subscribe(observable) {
    this.#observers.add(observable)

  }

  unsubscribe(observable) {
    this.#observers.delete(observable)
  }
}
