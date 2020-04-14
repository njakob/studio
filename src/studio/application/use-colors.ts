import { usePersistedState } from './use-persisted-state';
import { colorFromInt32 } from './color';
import type { Color } from './color';
import { isNumber, isArrayOf } from './typings';

export function useColors() {
  return usePersistedState<Color[]>('colors', [(input) => {
    if (input === null) {
      return [];
    }
    const output = JSON.parse(input) as unknown;
    if (!isArrayOf(output, isNumber)) {
      return [];
    }
    return output.map((value) => colorFromInt32(value));
  }, (input) => (
    JSON.stringify(input.map((color) => color.i32))
  )]);
}
