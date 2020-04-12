import * as React from 'react';

import { InjectGlobalStyle } from './inject-global-style';

export function BrowserDev() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap';
  document.body.appendChild(link);

  return <InjectGlobalStyle />;
}
