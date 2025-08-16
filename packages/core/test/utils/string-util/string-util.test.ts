import { StringUtil } from '../../../src/utils/string-util/string-util'
import { describe, expect, test } from 'vitest'

describe('string-util', () => {
    test('匹配正确的context变量格式', () => {
        const validString = '${context.variableName}';
        const invalidString1 = '${context.123invalid}';
        const invalidString2 = '${invalid.context.variable}';

        expect(validString.match(StringUtil.contextReg)).toBeTruthy();
        expect(invalidString1.match(StringUtil.contextReg)).toBeNull();
        expect(invalidString2.match(StringUtil.contextReg)).toBeNull();
    });

    test('匹配正确的data变量格式', () => {
        const validString = '${data.variableName}';
        const invalidString1 = '${data.123invalid}';
        const invalidString2 = '${invalid.data.variable}';

        expect(validString.match(StringUtil.dataReg)).toBeTruthy();
        expect(invalidString1.match(StringUtil.dataReg)).toBeNull();
        expect(invalidString2.match(StringUtil.dataReg)).toBeNull();
    });

    test('填充字符串中的数据,替换context变量和data变量', () => {
        const str = '姓名:${context.name},年龄:${data.age}';
        const context = { name: '张三', age: 10 };
        const data = { name: '李四', age: 25 };

        const result = StringUtil.fill(str, context, data);

        expect(result).toBe('姓名:张三,年龄:25');
    });

    test('如果context变量和data变量不存在,则保留原始字符串', () => {
        const str = '姓名:${context.name},年龄:${data.age}';
        const context = {};
        const data = { name: '李四', age: 25 };

        const result = StringUtil.fill(str, context, data);

        expect(result).toBe('姓名:${context.name},年龄:25');
    });

    test('如果context变量和data变量值为falsey值,替换为空字符串', () => {
        const str = '姓名:${context.name},年龄:${data.age}';
        const context = { name: null, age: 10 };
        const data = { name: '李四', age: undefined };

        const result = StringUtil.fill(str, context, data);

        expect(result).toBe('姓名:,年龄:');
    });

    test('如果需要替换的字符串为空，则返回空字符串', () => {
        const str = '';
        const context = { name: '张三' };
        const data = { age: 25 };

        const result = StringUtil.fill(str, context, data);

        expect(result).toBe('');
    });
})