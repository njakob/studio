import * as React from 'react';
import styled from 'styled-components';

import { isArrayOf, isNumber } from './typings';
import {
  Color,
  colorFromInt32,
} from './color';
import { usePersistedState } from './use-persisted-state';
import { ColorTile } from './color-tile';
import { ColorPanel } from './color-panel';
import { useClipboardColor } from './use-clipboard-color';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export function Palette() {
  const clipboardColor = useClipboardColor();

  const [colors, setColors] = usePersistedState<Color[]>('colors', [(input) => {
    if (input === null) {
      return [];
    }
    const output = JSON.parse(input) as unknown;
    if (!isArrayOf(output, isNumber)) {
      return [];
    }
    return output.map((value) => colorFromInt32(value));
  }, (input) => (
    JSON.stringify(input.map((color) => color.i32))
  )]);

  const [activeColor, setActiveColor] = React.useState(null as N<Color>);

  const handleChangeColor = (color: Color) => {
    setActiveColor(color);
  };

  return (
    <div>
      <Container>
        {colors.map((color) => (
          <ColorTile
            key={color.i32}
            color={color}
            isActive={activeColor ? color.i32 === activeColor.i32 : false}
            isClipboardActive={clipboardColor ? color.i32 === clipboardColor.i32 : false}
            onChangeColor={handleChangeColor}
          />
        ))}
      </Container>
      <ColorPanel color={activeColor} />
    </div>
  );
}