import * as React from 'react';
import styled from 'styled-components';

import { Static } from './static';

const Container = styled.footer`
  padding: 10px;
  color: #83869e;
`;

const TextLink = styled.a`
  color: inherit;
`;

export function Footer() {
  return (
    <Static>
      <Container>
        ©
        {' '}
        {new Date(__BUILD_INFO__.buildTime).getFullYear()}
        {' '}
        <TextLink href="https://github.com/njakob">Nicolas Jakob</TextLink>
        {' ‒ '}
        {__BUILD_INFO__.commitHash.slice(0, 9)}
      </Container>
    </Static>
  );
}
