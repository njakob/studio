import * as React from 'react';
import styled from 'styled-components';

import {
  fontStyle,
} from './styles';

const Container = styled.div`
  height: 64px;
  padding: 12px;
`;

const Title = styled.div`
  ${fontStyle}
  font-size: 1em;
  color: white;
`;

export function Header() {
  return (
    <Container>
      <Title>Studio</Title>
    </Container>
  );
}
