type Callback<T extends readonly unknown[]> = (...values: T) => void;

/**
 * Multi-cast handler. This can be used to decouple objects the same way
 * as the event-bus pattern.
 */
export class Handler<T extends readonly unknown[]> {
  private readonly callbacks = new Set<Callback<T>>();

  public addCallback(callback: Callback<T>) {
    this.callbacks.add(callback);
  }

  public removeCallback(callback: Callback<T>) {
    this.callbacks.delete(callback);
  }

  public trigger(...values: T) {
    for (const callback of this.callbacks) {
      callback(...values);
    }
  }
}
