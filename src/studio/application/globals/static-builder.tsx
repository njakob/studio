import * as React from 'react';

import { useCollector } from 'studio/collector';

import favicon from './favicon.png?static';

export function StaticBuilder() {
  const collector = useCollector();

  collector.addTag((
    <title>Pixel Toolchain - Studio</title>
  ));

  collector.addTag((
    <link
      rel="shortcut icon"
      type="image/png"
      href={favicon}
    />
  ));

  return null;
}
