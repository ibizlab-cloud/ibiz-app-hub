import { RawValueUtil } from '../../../src/utils/raw-value-util/raw-value-util';
import { describe, test, expect } from 'vitest';

describe('raw-value-util', () => {
    test('测试字符串是否由整数浮点数组成', () => {
        const rawValue = new RawValueUtil();

        // 测试输入空字符串
        expect(rawValue.isNumber('')).toBe(false);
        // 测试输入普通字符
        expect(rawValue.isNumber('test')).toBe(false);
        // 测试输入整数
        expect(rawValue.isNumber('1')).toBe(true);
        // 测试输入浮点数
        expect(rawValue.isNumber('1.0')).toBe(true);
        expect(rawValue.isNumber('0.1')).toBe(true);
        expect(rawValue.isNumber('0.100')).toBe(true);
        // 测试输入负数
        expect(rawValue.isNumber('-1')).toBe(true);
        expect(rawValue.isNumber('-1.0')).toBe(true);
        expect(rawValue.isNumber('-0.1')).toBe(true);
        expect(rawValue.isNumber('-0.100')).toBe(true);
    })

    test('测试转换直接值', () => {
        const rawValue = new RawValueUtil();

        // 测试输入普通字符串
        expect(rawValue.format('test')).toBe('test');
        // 测试输入undefined
        expect(rawValue.format(undefined)).toBe(undefined);
        // 测试输入boolean字符串
        expect(rawValue.format('true')).toBe(true);
        expect(rawValue.format('false')).toBe(false);
        // 测试输入空字符串
        expect(rawValue.format('')).toBe('');
        // 测试输入整数浮点数
        expect(rawValue.format('123')).toBe(123);
        expect(rawValue.format('123.000')).toBe(123);
        expect(rawValue.format('0.001')).toBe(0.001);
        // 测试输入负数
        expect(rawValue.format('-123')).toBe(-123);
        expect(rawValue.format('-123.000')).toBe(-123);
        expect(rawValue.format('-0.001')).toBe(-0.001);

    })
})