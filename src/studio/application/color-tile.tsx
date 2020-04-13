import * as React from 'react';
import styled from 'styled-components';

import type { Color } from './color';
import { whiteColor, blackColor } from './styles';

const Container = styled.button<Readonly<{ isActive: boolean }>>`
  position: relative;
  cursor: pointer;
  height: 65px;
  width: 65px;
  outline: none;
  border: 2px solid black;
  margin: -1px;
`;

const Indicator = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  border: solid 6px;
  border-left-color: currentColor;
  border-top-color: currentColor;
  border-bottom-color: transparent;
  border-right-color: transparent;
`;

const ClipboardIndicator = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  border: solid 6px;
  border-left-color: transparent;
  border-top-color: transparent;
  border-bottom-color: currentColor;
  border-right-color: currentColor;
`;

type Props = Readonly<{
  color: Color;
  title?: string;
  isActive?: boolean;
  isClipboardActive?: boolean;
  onClick: (color: Color) => void;
}>;

export function ColorTile({
  color,
  title,
  isActive = false,
  isClipboardActive = false,
  onClick,
}: Props) {
  const handleClick = () => {
    onClick(color);
  };

  const activeColor = color.brightness < 128 ? whiteColor : blackColor;

  return (
    <Container
      tabIndex={0}
      title={title}
      isActive={isActive}
      style={{ backgroundColor: String(color), color: String(activeColor) }}
      onClick={handleClick}
    >
      {isActive ? (
        <Indicator title="Selected color" />
      ) : null}
      {isClipboardActive ? (
        <ClipboardIndicator title="Color from the clipboard" />
      ) : null}
    </Container>

  );
}
