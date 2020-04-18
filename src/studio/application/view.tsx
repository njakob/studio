import * as React from 'react';
import styled from 'styled-components';

import { Palette } from './palette';

const Container = styled.div`
  display: flex;
  flex: 1 1;
  flex-direction: column;
  padding: 12px;
`;

export function View() {
  return (
    <Container>
      {(() => {
        switch (__ENVIRONMENT__) {
          case 'browser':
          case 'browser-dev':
            return (
              <Palette />
            );
          case 'static-builder':
            return null;
          default:
            return unreachable(__ENVIRONMENT__);
        }
      })()}
    </Container>
  );
}
