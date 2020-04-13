export function isString(input: unknown): input is string {
  return typeof input === 'string';
}

export function isNumber(input: unknown): input is number {
  return typeof input === 'number';
}

export function isFunction<T extends Function>(value: unknown): value is T {
  return typeof value === 'function';
}

export function isArrayOf<T>(input: unknown, predicate: (input: T) => input is T): input is T[] {
  return Array.isArray(input) && input.every((value) => predicate(value));
}
