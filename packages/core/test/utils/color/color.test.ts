import { describe, expect, it } from 'vitest';
import { colorBlend } from '../../../src/utils/color/color';

describe('color', () => {
  it('colorBlend', () => {
    expect(colorBlend('#000', '#000')).toBe('#000000ff');
    expect(colorBlend('#000', '#000', 0.5, 'rgb')).toBe('rgb(0 0 0 / 1)');
    expect(colorBlend('#000', '#fff')).toBe('#808080ff');
    expect(colorBlend('#000', '#fff', 0.5, 'rgb')).toBe('rgb(128 128 128 / 1)');
    expect(colorBlend('rgba(0 0 0 / 1)', 'rgba(0 0 0 / 1)')).toBe('#000000ff');
    expect(colorBlend('rgba(0 0 0 / 1)', 'rgba(0 0 0 / 1)', 0.5, 'rgb')).toBe(
      'rgb(0 0 0 / 1)',
    );
    expect(colorBlend('rgba(0 0 0 / 1)', 'rgba(255 255 255 / 1)')).toBe(
      '#808080ff',
    );
    expect(
      colorBlend('rgba(0 0 0 / 1)', 'rgba(255 255 255 / 1)', 0.5, 'rgb'),
    ).toBe('rgb(128 128 128 / 1)');
    expect(colorBlend('rgba(0 0 0 / 1)', 'rgba(0 255 255 / 1)')).toBe(
      '#008080ff',
    );
    expect(
      colorBlend('rgba(0 0 0 / 1)', 'rgba(0 255 255 / 1)', 0.5, 'rgb'),
    ).toBe('rgb(0 128 128 / 1)');
    expect(colorBlend('rgba(0 0 0 / 0.1)', 'rgba(0 255 255 / 0.05)')).toBe(
      '#0080800d',
    );
    expect(
      colorBlend('rgba(0 0 0 / 0.1)', 'rgba(0 255 255 / 0.05)', 0.5, 'rgb'),
    ).toBe('rgb(0 128 128 / 0.05)');
  });
});
