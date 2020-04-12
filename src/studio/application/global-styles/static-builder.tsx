import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';

import { useCollector } from 'studio/collector';

import { InjectGlobalStyle } from './inject-global-style';

export function StaticBuilder() {
  const collector = useCollector();

  const sheet = new ServerStyleSheet();

  const styles = (() => {
    try {
      renderToString(sheet.collectStyles(<InjectGlobalStyle />));
      return sheet.instance.toString();
    } finally {
      sheet.seal();
    }
  })();

  // eslint-disable-next-line react/no-danger
  collector.addTag(<style dangerouslySetInnerHTML={{ __html: styles }} />);

  collector.addTag(<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet" />);

  return null;
}
