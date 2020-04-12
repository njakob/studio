import * as React from 'react';

import { GlobalStyles } from './global-styles';
import { Globals } from './globals';
import { Hero } from './hero';
import { Footer } from './footer';

export function App() {
  return (
    <>
      <Globals />
      <GlobalStyles />
      <Hero />
      <Footer />
    </>
  );
}
