import { describe, expect, it } from 'vitest';
import { BitMask } from '../../../src/utils/bit-mask/bit-mask';

describe('bit-mask', () => {
  it('BitMask.validate', () => {
    expect(BitMask.validate(-8)).toBe(false);
    expect(BitMask.validate(-4)).toBe(false);
    expect(BitMask.validate(-3)).toBe(false);
    expect(BitMask.validate(-2)).toBe(false);
    expect(BitMask.validate(-1)).toBe(false);
    expect(BitMask.validate(0)).toBe(false);
    expect(BitMask.validate(1)).toBe(true);
    expect(BitMask.validate(2)).toBe(true);
    expect(BitMask.validate(3)).toBe(false);
    expect(BitMask.validate(4)).toBe(true);
    expect(BitMask.validate(8)).toBe(true);
  });
  it('BitMask.setPermission', () => {
    expect(() => BitMask.setPermission(0, -2)).toThrowError();
    expect(() => BitMask.setPermission(0, -1)).toThrowError();
    expect(() => BitMask.setPermission(0, 0)).toThrowError();
    expect(BitMask.setPermission(0, 1)).toBe(1);
    expect(BitMask.setPermission(0, 2)).toBe(2);
    expect(() => BitMask.setPermission(0, 3)).toThrowError();
    expect(BitMask.setPermission(1, 4)).toBe(5);
    expect(BitMask.setPermission(5, 4)).toBe(5);
    expect(BitMask.setPermission(5, 8)).toBe(13);
    expect(BitMask.setPermission(9, 8)).toBe(9);
    expect(BitMask.setPermission(16, 8)).toBe(24);
    expect(() => BitMask.setPermission(4, 9)).toThrowError();
  });
  it('BitMask.removePermission', () => {
    expect(() => BitMask.removePermission(0, -2)).toThrowError();
    expect(() => BitMask.removePermission(0, -1)).toThrowError();
    expect(() => BitMask.removePermission(0, 0)).toThrowError();
    expect(BitMask.removePermission(0, 1)).toBe(0);
    expect(BitMask.removePermission(0, 2)).toBe(0);
    expect(() => BitMask.removePermission(0, 3)).toThrowError();
    expect(BitMask.removePermission(1, 4)).toBe(1);
    expect(BitMask.removePermission(4, 8)).toBe(4);
    expect(BitMask.removePermission(17, 16)).toBe(1);
    expect(BitMask.removePermission(9, 1)).toBe(8);
    expect(BitMask.removePermission(9, 8)).toBe(1);
    expect(BitMask.removePermission(16, 8)).toBe(16);
    expect(() => BitMask.removePermission(4, 9)).toThrowError();
  });
  it('BitMask.checkPermission', () => {
    expect(() => BitMask.checkPermission(0, -2)).toThrowError();
    expect(() => BitMask.checkPermission(0, -1)).toThrowError();
    expect(() => BitMask.checkPermission(0, 0)).toThrowError();
    expect(BitMask.checkPermission(0, 1)).toBe(false);
    expect(BitMask.checkPermission(0, 2)).toBe(false);
    expect(() => BitMask.checkPermission(0, 3)).toThrowError();
    expect(BitMask.checkPermission(5, 4)).toBe(true);
    expect(BitMask.checkPermission(9, 2)).toBe(false);
    expect(BitMask.checkPermission(17, 16)).toBe(true);
    expect(BitMask.checkPermission(9, 4)).toBe(false);
    expect(BitMask.checkPermission(9, 8)).toBe(true);
    expect(() => BitMask.checkPermission(4, 9)).toThrowError();
  });
});
