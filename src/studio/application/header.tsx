import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 64px;
  padding: 12px;
`;

const Title = styled.div`
  font-size: 2em;
  color: white;
`;

export function Header() {
  return (
    <Container>
      <Title>Studio</Title>
    </Container>
  );
}
