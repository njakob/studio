import * as React from 'react';
import styled, { css } from 'styled-components';

import type { Color } from './color';
import { whiteColor, blackColor } from './styles';

const Container = styled.button<Readonly<{ isActive: boolean }>>`
  position: relative;
  height: 64px;
  width: 64px;
  border: 0;
  outline: none;
  cursor: pointer;

  ${({ isActive }) => isActive && css`
    border: 2px solid currentColor;
  `}
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

type Props = Readonly<{
  color: Color;
  isActive: boolean;
  onChangeColor: (color: Color) => void;
}>;

export function ColorTile({
  color,
  isActive,
  onChangeColor,
}: Props) {
  const handleClick = () => {
    onChangeColor(color);
  };

  const activeColor = color.brightness < 128 ? whiteColor : blackColor;

  return (
    <Container
      tabIndex={0}
      isActive={isActive}
      style={{ backgroundColor: String(color), color: String(activeColor) }}
      onClick={handleClick}
    >
      {isActive ? (
        <Indicator />
      ) : null}
    </Container>

  );
}
