import * as React from 'react';
import styled from 'styled-components';

import logotype from './logotype.png';

const Container = styled.div`
  height: 56px;
  padding: 12px;
`;

const Logotype = styled.img`
  image-rendering: pixelated;
  height: 32px;
  width: auto;
`;

export function Header() {
  return (
    <Container>
      <Logotype src={logotype} alt="Studio" />
    </Container>
  );
}
