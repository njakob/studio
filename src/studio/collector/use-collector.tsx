import * as React from 'react';

import { CollectorContext } from './collector-context';

export function useCollector() {
  const collector = React.useContext(CollectorContext);
  if (collector === null) {
    throw new Error('useCollector: Missing context');
  }
  return collector;
}
