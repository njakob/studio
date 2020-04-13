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
      <Palette />
    </Container>
  );
}
