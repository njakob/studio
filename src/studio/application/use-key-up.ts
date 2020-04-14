import * as React from 'react';

export function useKeyUp(key: string, callback: () => void, dependencyList: readonly unknown[]) {
  React.useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === key) {
        callback();
      }
    };
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, dependencyList);
}
