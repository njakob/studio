import * as React from 'react';
import styled from 'styled-components';

import { fontStyle } from './styles';

const Container = styled.footer`
  ${fontStyle}
  display: flex;
  flex-direction: column;
  padding: 10px;
  color: #83869e;
`;

const Copyright = styled.div`
  align-self: flex-end;
`;

const TextLink = styled.a`
  color: inherit;
`;

export function Footer() {
  return (
    <Container>
      <Copyright>
        ©
        {' '}
        {new Date(__BUILD_INFO__.buildTime).getFullYear()}
        {' '}
        <TextLink href="https://github.com/njakob">Nicolas Jakob</TextLink>
        {' ‒ '}
        {__BUILD_INFO__.commitHash.slice(0, 9)}
      </Copyright>
    </Container>
  );
}
