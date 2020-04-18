import * as React from 'react';
import styled from 'styled-components';

import type { Color } from './color';
import { onClipboardUpdate } from './on-clipboard-update';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px 0;
`;

const Formats = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 6px;
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
  border: 2px solid black;
`;

type Props = Readonly<{
  color: N<Color>;
}>;

export function ColorPanel({
  color,
}: Props) {
  const handleCopyFormat = (text: string) => {
    navigator.clipboard.writeText(text);
    onClipboardUpdate.trigger();
  };

  return (
    <Container>
      <Panel style={{ backgroundColor: String(color) }} />
      <Formats>
        {color ? (
          <>
            <Format title="Copy RGB format" onClick={() => handleCopyFormat(`0x${color.i24.toString(16)}`)}>
              0x
              {color.i24.toString(16)}
            </Format>
            <Format title="Copy HTML RGB format" onClick={() => handleCopyFormat(`#${color.i24.toString(16)}`)}>
              #
              {color.i24.toString(16)}
            </Format>
          </>
        ) : null}
      </Formats>
    </Container>
  );
}
