import * as React from 'react';
import { ThemeProvider } from 'styled-components';

import { GoogleAnalytics } from './google-analytics';
import { GlobalStyles } from './global-styles';
import { Globals } from './globals';
import { Header } from './header';
import { View } from './view';
import { Footer } from './footer';

const theme = {};

export function Root() {
  return (
    <ThemeProvider theme={theme}>
      <Globals />
      <GlobalStyles />
      <GoogleAnalytics />
      <Header />
      <View />
      <Footer />
    </ThemeProvider>
  );
}
