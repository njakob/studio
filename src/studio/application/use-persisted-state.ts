import * as React from 'react';

type Marshaler<T> = [(value: N<string>) => T, (value: T) => string];

export function usePersistedState<T>(key: string, [parse, stringify]: Marshaler<T>) {
  const storageKey = `studio.${key}`;

  const [value, setValue] = React.useState<T>(() => parse(localStorage.getItem(storageKey)));

  const setPersistedValue = React.useCallback((innerValue: T) => {
    setValue(innerValue);
    localStorage.setItem(storageKey, stringify(innerValue));
  }, []);

  return [value, setPersistedValue] as const;
}
