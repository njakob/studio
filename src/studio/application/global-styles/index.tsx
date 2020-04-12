import * as React from 'react';

/**
 * Inject normalized styles.
 */
export function GlobalStyles() {
  switch (__ENVIRONMENT__) {
    case 'browser': {
      return null;
    }
    case 'browser-dev': {
      const { BrowserDev } = staticRequire<typeof import('./browser-dev')>('./browser-dev');
      return <BrowserDev />;
    }
    case 'static-builder': {
      const { StaticBuilder } = staticRequire<typeof import('./static-builder')>('./static-builder');
      return <StaticBuilder />;
    }
    case 'static-builder-dev': {
      return null;
    }
    default:
      return unreachable(__ENVIRONMENT__);
  }
}
