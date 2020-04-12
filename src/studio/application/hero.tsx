import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex: 1 1;
  flex-direction: column;
  justify-content: center;
  padding: 12px 34px;
`;

const Title = styled.h1`
  color: white;
  margin: 0;
  font-size: 72px;
  padding: 6px 0;
`;

export function Hero() {
  return (
    <Container>
      <Title>Studio</Title>
    </Container>
  );
}
