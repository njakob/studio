import * as React from 'react';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles } from './global-styles';
import { Globals } from './globals';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { View } from './view';
import { Footer } from './footer';

const theme = {};

export function Root() {
  return (
    <ThemeProvider theme={theme}>
      <Globals />
      <GlobalStyles />
      <Header />
      <div>
        <Sidebar />
        <View />
      </div>
      <Footer />
    </ThemeProvider>
  );
}
