import * as React from 'react';

type Props = {
  readonly children: React.ReactNode;
};

/**
 * Wrapper component for static content which should not be hydrated client-side.
 */
export function Static({
  children,
}: Props) {
  switch (__ENVIRONMENT__) {
    case 'browser': {
      return (
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: '' }}
          suppressHydrationWarning
        />
      );
    }
    case 'browser-dev':
    case 'static-builder':
      return (
        <div>{children}</div>
      );
    default:
      return unreachable(__ENVIRONMENT__);
  }
}
