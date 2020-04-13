import * as React from 'react';

import {
  colorFromInt24,
  colorFromInt32,
  colorFromHex,
} from './color';
import type { Color } from './color';
import { onClipboardUpdate } from './on-clipboard-update';

export function useClipboardColor() {
  const [clipboardColor, setClipboardColor] = React.useState(null as N<Color>);

  React.useEffect(() => {
    const updateClipboardState = () => {
      navigator.clipboard.readText().then((value) => {
        if (/0x[\da-f]{6}/i.test(value)) {
          setClipboardColor(colorFromInt24(Number.parseInt(value, 16)));
        } else if (/0x[\da-f]{8}/i.test(value)) {
          setClipboardColor(colorFromInt32(Number.parseInt(value, 16)));
        } else if (/#[\da-f]{6,8}/i.test(value)) {
          setClipboardColor(colorFromHex(value));
        } else if (/[\da-f]{6,8}/i.test(value)) {
          setClipboardColor(colorFromHex(`#${value}`));
        } else {
          setClipboardColor(null);
        }
      });
    };

    const handleUpdate = () => {
      updateClipboardState();
    };

    window.addEventListener('focus', handleUpdate);
    onClipboardUpdate.addCallback(handleUpdate);

    updateClipboardState();

    return () => {
      window.removeEventListener('focus', handleUpdate);
      onClipboardUpdate.removeCallback(handleUpdate);
    };
  }, []);

  return clipboardColor;
}
