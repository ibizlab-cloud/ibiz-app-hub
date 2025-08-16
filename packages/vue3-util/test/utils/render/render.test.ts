import { renderString } from '../../../src/util/render/render';
import { describe, test, expect } from 'vitest';

describe('render', () => {
    test('renderString', () => {
        expect(renderString(null)).toBe('');
        expect(renderString(undefined)).toBe('');
        expect(renderString('')).toBe('');
        expect(renderString('test')).toBe('test');
        expect(renderString(42)).toBe('42');
        expect(renderString(42.00)).toBe('42');
        expect(renderString(true)).toBe('true');
        expect(renderString(false)).toBe('false');
        expect(renderString([1, 2, 3])).toBe('[1,2,3]');
        expect(renderString({a:'1'})).toBe('{"a":"1"}');
        const sym = Symbol('description');
        expect(renderString(sym)).toBe('Symbol(description)');
    })
})
