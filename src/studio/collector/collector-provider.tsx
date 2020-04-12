import * as React from 'react';

import { CollectorContext } from './collector-context';
import { Collector } from './collector';

type Props = {
  readonly children: React.ReactNode;
  readonly collector: Collector;
};

export function CollectorProvider({
  children,
  collector,
}: Props) {
  return (
    <CollectorContext.Provider value={collector}>
      {children}
    </CollectorContext.Provider>
  );
}
