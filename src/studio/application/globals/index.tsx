import * as React from 'react';

export function Globals() {
  switch (__ENVIRONMENT__) {
    case 'static-builder': {
      const { StaticBuilder } = staticRequire<typeof import('./static-builder')>('./static-builder');
      return <StaticBuilder />;
    }
    case 'browser':
    case 'browser-dev':
    case 'static-builder-dev':
      return null;
    default:
      return unreachable(__ENVIRONMENT__);
  }
}
