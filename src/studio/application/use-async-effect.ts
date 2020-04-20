import * as React from 'react';

type AsyncEffectCallback = () => Promise<void | (() => M<void>)>;

export function useAsyncEffect(effect: AsyncEffectCallback, dependencies: React.DependencyList) {
  React.useEffect(() => {
    effect().catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    });
  }, dependencies);
}
