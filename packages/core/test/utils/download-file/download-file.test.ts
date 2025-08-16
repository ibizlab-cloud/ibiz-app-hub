import { describe, expect, it } from 'vitest';
import {
  calcMimeByFileName,
  isImage,
} from '../../../src/utils/download-file/download-file';

describe('download-file', () => {
  it('calcMimeByFileName', () => {
    expect(calcMimeByFileName('a.jpg')).toBe('image/jpeg');
    expect(calcMimeByFileName('a.b.jpg')).toBe('image/jpeg');
    expect(calcMimeByFileName('jpg')).toBe('');
    expect(calcMimeByFileName('c.txt')).toBe('text/plain');
  });
  it('isImage', () => {
    expect(isImage('a.jpg')).toBe(true);
    expect(isImage('a.b.jpg')).toBe(true);
    expect(isImage('jpg')).toBe(false);
    expect(isImage('c.txt')).toBe(false);
  });
});
