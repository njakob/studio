import * as React from 'react';
import { ThemeProvider } from 'styled-components';

import { App } from './app';

const theme = {};

export function Root() {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
}
