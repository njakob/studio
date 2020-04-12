import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex: 1 1;
  flex-direction: column;
  justify-content: center;
  padding: 12px 34px;
`;

export function View() {
  return (
    <Container />
  );
}
