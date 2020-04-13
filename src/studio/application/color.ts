/* eslint-disable no-bitwise */

function parseByte(value: string, fallback: number) {
  const byte = parseInt(value, 16);
  return Number.isNaN(byte) ? fallback : byte;
}

function stringifyByte(value: number): string {
  return value.toString(16).padStart(2, '0');
}

function brightness(r: number, g: number, b: number): number {
  return (((r * 299) + (g * 587) + (b * 114))) / 1000;
}

export class Color {
  readonly css: string;

  readonly i32: number;
  readonly i24: number;
  readonly brightness: number;

  readonly r: number;
  readonly g: number;
  readonly b: number;
  readonly a: number;

  constructor(r: number, g: number, b: number, a: number) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;

    this.i32 = (a << 24) + (r << 16) + (g << 8) + b;
    this.i24 = (r << 16) + (g << 8) + b;
    this.brightness = brightness(r, g, b);

    this.css = `#${stringifyByte(r)}${stringifyByte(g)}${stringifyByte(b)}${stringifyByte(a)}`;
  }

  toString() {
    return this.css;
  }
}

export function colorFromRGBA(r: number, g: number, b: number, a = 255) {
  return new Color(r, g, b, a);
}

export function colorFromInt32(value: number): Color {
  const a = (value >> 24) & 255;
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return new Color(r, g, b, a);
}

export function colorFromInt24(value: number): Color {
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return new Color(r, g, b, 255);
}

export function colorFromHex(value: string): Color {
  const r = parseByte(value.substr(1, 2), 255);
  const g = parseByte(value.substr(3, 2), 255);
  const b = parseByte(value.substr(5, 2), 255);
  const a = parseByte(value.substr(7, 2), 255);
  return new Color(r, g, b, a);
}
