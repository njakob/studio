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
      const { InjectGlobalStyle } = staticRequire<typeof import('./inject-global-style')>('./inject-global-style');
      return <InjectGlobalStyle />;
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
