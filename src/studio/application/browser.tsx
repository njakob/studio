import * as React from 'react';
import { hydrate } from 'react-dom';

import { Root } from './root';

const target = (() => {
  switch (__ENVIRONMENT__) {
    case 'browser': {
      return document.getElementById('root');
    }
    case 'browser-dev': {
      const element = document.createElement('div');
      element.id = 'root';
      document.body.appendChild(element);
      return element;
    }
    case 'static-builder':
      throw new Error(`Unexpected environment: ${__ENVIRONMENT__}`);
    default:
      return unreachable(__ENVIRONMENT__);
  }
})();

if (target === null) {
  throw new Error('Missing root element');
}

hydrate(<Root />, target);
