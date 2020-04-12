import * as React from 'react';

import { useCollector } from 'studio/collector';

export function StaticBuilder() {
  const collector = useCollector();
  collector.addTag((
    <title>Pixel Toolchain - Studio</title>
  ));
  return null;
}
