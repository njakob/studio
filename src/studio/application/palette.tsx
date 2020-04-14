import * as React from 'react';
import styled from 'styled-components';

import type { Color } from './color';
import { ColorTile } from './color-tile';
import { ColorPanel } from './color-panel';
import { useClipboardColor } from './use-clipboard-color';
import { useKeyUp } from './use-key-up';
import { useColors } from './use-colors';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1px;
`;

export function Palette() {
  const clipboardColor = useClipboardColor();
  const [colors, setColors] = useColors();

  const [activeColor, setActiveColor] = React.useState(null as N<Color>);

  const handleColorTileClick = (color: Color) => {
    setActiveColor(color);
  };

  const handleAddClipboardClick = (color: Color) => {
    setColors([
      ...colors,
      color,
    ]);
  };

  useKeyUp('Delete', () => {
    if (activeColor === null) {
      return;
    }
    setActiveColor(null);
    setColors(colors.filter((color) => color.i32 !== activeColor.i32));
  }, [activeColor]);

  return (
    <div>
      <Container>
        {colors.map((color) => (
          <ColorTile
            key={color.i32}
            color={color}
            isActive={activeColor ? color.i32 === activeColor.i32 : false}
            isClipboardActive={clipboardColor ? color.i32 === clipboardColor.i32 : false}
            onClick={handleColorTileClick}
          />
        ))}
        {clipboardColor && !colors.some((color) => color.i32 === clipboardColor.i32) ? (
          <ColorTile
            color={clipboardColor}
            title="Add to the palette"
            onClick={handleAddClipboardClick}
          />
        ) : null}
      </Container>
      <ColorPanel color={activeColor} />
    </div>
  );
}
