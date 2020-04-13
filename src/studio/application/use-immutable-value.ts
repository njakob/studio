import { useRef } from 'react';

import { isFunction } from './typings';

const Sentinel = {};

/**
 * `useImmutableValue` returns an immutable value which can be initialized through
 * the `value` parameter.
 * @see https://github.com/facebook/react/issues/14490
 */
export function useImmutableValue<T>(value: (() => T) | T) {
  const ref = useRef<T | typeof Sentinel>(Sentinel);
  if (ref.current === Sentinel) {
    ref.current = isFunction<() => T>(value) ? value() : value;
  }
  return ref.current as T;
}
