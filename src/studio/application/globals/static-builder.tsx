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

  collector.addTag((
    <meta
      httpEquiv="origin-trial"
      content="AtpoOE0HjzRMdT2V4pTHoLLX9N1M2Btvu+W/9VkGZPT4IbxsvYALDQN6ltZ6MO4fp7ouUlgwBvquCg4+O/PI1AcAAABceyJvcmlnaW4iOiJodHRwczovL3N0dWRpby5uamFrb2IuY29tOjQ0MyIsImZlYXR1cmUiOiJOYXRpdmVGaWxlU3lzdGVtMiIsImV4cGlyeSI6MTU5MTAwODIyMn0="
    />
  ));

  return null;
}
