export default class EventBus extends EventTarget {

  #debug = false;

  constructor(debug = false) {
    super();
    this.#debug = debug;
  }

  log(message, type, listener) {
    if (!this.#debug) return;

    const typeMessage = type ? `eventType: ${type}` : '';
    const listenerMessage = listener ? `eventListener: ${listener}` : '';
    console.log(`${message}, ${typeMessage}, ${listenerMessage}`);
  }

  on(eventType, eventListener) {
    this.addEventListener(eventType, eventListener);
    this.log('Added event', eventType, eventListener);
  }

  once(eventType, eventListener) {
    this.addEventListener(eventType, eventListener, { once: true });
    this.log('Added event (once)', eventType, eventListener);
  }

  off(eventType, eventListener) {
    this.removeEventListener(eventType, eventListener);
    this.log('Removed event', eventType, eventListener);
  }

  emit(eventType, eventData, shouldBubble = true) {
    const event = new CustomEvent(eventType, { bubbles: shouldBubble, detail: eventData });
    this.dispatchEvent(event);
    this.log('Emitted event', eventType, '');
  }
}