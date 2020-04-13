import * as React from 'react';
import styled from 'styled-components';

import type { Color } from './color';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Formats = styled.div`
  display: flex;
  flex-direction: column;
`;

const Format = styled.button`
  cursor: pointer;
  color: black;
  background: #cacce3;
  padding: 6px;
  border: 0;
  outline: 0;
`;

const Panel = styled.div`
  height: 128px;
  width: 128px;
`;

type Props = Readonly<{
  color: N<Color>;
}>;

export function ColorPanel({
  color,
}: Props) {
  const handleCopyFormat = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Container>
      <Panel style={{ backgroundColor: String(color) }} />
      <Formats>
        {color ? (
          <Format title="Copy RGB format" onClick={() => handleCopyFormat(`0x${color.i24.toString(16)}`)}>
            0x
            {color.i24.toString(16)}
          </Format>
        ) : null}
      </Formats>
    </Container>
  );
}
