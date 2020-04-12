/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/html-has-lang */

import * as React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

import { CollectorProvider } from 'studio/collector';
import { Root } from 'studio/application/root';

import { Collector } from 'studio/collector/collector';
import { EntrypointAssets } from './static-renderer-plugin';

export async function renderContent(assets: EntrypointAssets) {
  const sheet = new ServerStyleSheet();

  const collector = new Collector();

  const node = (
    <CollectorProvider collector={collector}>
      <StyleSheetManager sheet={sheet.instance}>
        <Root />
      </StyleSheetManager>
    </CollectorProvider>
  );

  const [content, style] = (() => {
    try {
      const innerContent = renderToString(node);
      const innerStyle = sheet.getStyleElement();
      return [innerContent, innerStyle] as const;
    } finally {
      sheet.seal();
    }
  })();

  return `<!DOCTYPE html>${
    renderToStaticMarkup((
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width" />
          {collector.tags.map((tag) => tag)}
          {style}
        </head>
        <body>
          <div
            id="root"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: content }}
          />
          {assets.scripts.map((script) => (
            <script src={script} />
          ))}
        </body>
      </html>
    ))}`;
}
