export function isString(input: unknown): input is string {
  return typeof input === 'string';
}

export function isNumber(input: unknown): input is number {
  return typeof input === 'number';
}

export function isFunction<T extends Function>(value: unknown): value is T {
  return typeof value === 'function';
}

type Is<T> = (value: unknown) => value is T;

export function isArrayOf<T>(isType: Is<T>) {
  return (input: unknown): input is T[] => {
    if (!Array.isArray(input)) {
      return false;
    }
    if (!input.every(isType)) {
      return false;
    }
    return true;
  };
}

export function isRecordOf<T>(input: unknown, isType: Is<T>): input is Record<string, T> {
  if (typeof input !== 'object') {
    return false;
  }
  if (input === null) {
    return false;
  }
  return Object.values(input).every(isType);
}
