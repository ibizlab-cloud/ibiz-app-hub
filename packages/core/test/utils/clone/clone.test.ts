import { describe, expect, it } from 'vitest';
import { clone } from '../../../src/utils/clone/clone';

describe('clone', () => {
  const set = new Set();
  const map = new Map();
  const obj = {
    a: null,
    b: undefined,
    c: 1,
    d: NaN,
    e: '',
    f: 'test',
    g: true,
    h: Symbol.for('test'),
    i: BigInt(1),
    j: {},
    k: [],
    l: set,
    m: map,
  };
  const arr = [
    null,
    undefined,
    1,
    NaN,
    '',
    'test',
    true,
    Symbol.for('test'),
    BigInt(1),
    {},
    [],
    set,
    map,
  ];
  const deepObj = { a: 'test', b: { c: 'test' } };
  it('clone', () => {
    expect(clone(null)).toBe(null);
    expect(clone(undefined)).toBe(undefined);
    expect(clone(-1)).toBe(-1);
    expect(clone(-1.2)).toBe(-1.2);
    expect(clone(0)).toBe(0);
    expect(clone(1)).toBe(1);
    expect(clone(1.2)).toBe(1.2);
    expect(clone(NaN)).toBe(NaN);
    expect(clone('')).toBe('');
    expect(clone('test')).toBe('test');
    expect(clone(true)).toBe(true);
    expect(clone(false)).toBe(false);
    expect(Symbol.for('test')).toBe(Symbol.for('test'));
    expect(BigInt(1)).toBe(BigInt(1));
    expect(clone({})).toEqual({});
    expect(clone([])).toEqual([]);
    expect(clone(set)).not.toBe(set);
    expect(clone(set)).toEqual(set);
    expect(clone(map)).not.toBe(map);
    expect(clone(map)).toEqual(map);
    expect(clone(obj)).not.toBe(obj);
    expect(clone(obj)).toEqual(obj);
    expect(clone(arr)).not.toBe(arr);
    expect(clone(arr)).toEqual(arr);
    expect(
      clone({
        a: 'test',
        clone: 'clone',
      }),
    ).toEqual({
      a: 'test',
      clone: 'clone',
    });
    expect(
      clone({
        a: 'test',
        clone: () => {
          return { b: 'test' };
        },
      }),
    ).toEqual({ b: 'test' });
    expect(clone(deepObj).b).not.toBe(deepObj.b);
    expect(clone(deepObj, { deep: false }).b).toBe(deepObj.b);
  });
});
