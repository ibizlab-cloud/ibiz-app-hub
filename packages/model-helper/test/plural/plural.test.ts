import { plural, pluralLower } from '../../src/utils/plural/plural';
import { describe, test, expect } from 'vitest';

describe('plural', () => {
    test('单词转复数', () => {
        // 小写
        expect(plural('matrix')).toBe('matrices');
        expect(plural('vertex')).toBe('vertices');
        expect(plural('index')).toBe('indices');
        expect(plural('regex')).toBe('regices');
        expect(plural('hex')).toBe('hices');
        // 大写
        expect(plural('Matrix')).toBe('Matrices');
        expect(plural('Vertex')).toBe('Vertices');
        expect(plural('Index')).toBe('Indices');
        expect(plural('Regex')).toBe('Regices');
        expect(plural('Hex')).toBe('Hices');
    })

    test('单词先转复数再转小写', () => {
        // 小写
        expect(pluralLower('matrix')).toBe('matrices');
        expect(pluralLower('vertex')).toBe('vertices');
        expect(pluralLower('index')).toBe('indices');
        expect(pluralLower('regex')).toBe('regices');
        expect(pluralLower('hex')).toBe('hices');
        // 大写
        expect(pluralLower('Matrix')).toBe('matrices');
        expect(pluralLower('Vertex')).toBe('vertices');
        expect(pluralLower('Index')).toBe('indices');
        expect(pluralLower('Regex')).toBe('regices');
        expect(pluralLower('Hex')).toBe('hices');
    })
})