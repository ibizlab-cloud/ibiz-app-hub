import { testCond, compare, compareNumber, contains, strContain } from '../../../src/utils/verify/verify';
import { describe, test, expect } from 'vitest';

describe('verify', () => {
    test('strContain:第一个值包含第二个值', () => {
        const result = strContain('hello world', 'lo');
        expect(result).toBe(true);
    });

    test('strContain:第一个值不包含第二个值', () => {
        const result = strContain('hello world', 'foo');
        expect(result).toBe(false);
    });

    test('strContain:测试第一个值,第二个值为空时', () => {
        const result1 = strContain('', 'hello');
        const result2 = strContain('hello', '');
        const result3 = strContain('', '');
        expect(result1).toBe(false);
        expect(result2).toBe(false);
        expect(result3).toBe(false);
    });

    test('strContain:以第二个值开头 第一个值包含第二个值', () => {
        const result = strContain('hello world', 'hello', 'start');
        expect(result).toBe(true);
    });

    test('strContain:以第二个值开头 第一个值不包含第二个值', () => {
        const result = strContain('hello world', 'hello1', 'start');
        expect(result).toBe(false);
    });

    test('strContain:以第二个值结尾 第一个值包含第二个值', () => {
        const result = strContain('hello world', 'world', 'end');
        expect(result).toBe(true);
    });

    test('strContain:以第二个值结尾 第一个值不包含第二个值', () => {
        const result = strContain('hello world', '1world', 'end');
        expect(result).toBe(false);
    });


    test('contains:测试第一个值在第二个值的范围内', () => {
        const result = contains('apple', 'banana,apple,orange');
        expect(result).toBe(true);
    });

    test('contains:测试第一个值不在第二个值的范围内', () => {
        const result = contains('pear', 'banana,apple,orange');
        expect(result).toBe(false);
    });

    test('contains:第二个值传入空字符串,抛出错误', () => {
        expect(() => {
            contains('apple', '');
        }).toThrowError('范围比较的条件值不存或者不是字符串');
    });

    test('contains:第二个值传入非字符串,抛出错误', () => {
        expect(() => {
            contains('apple', 123);
        }).toThrowError('范围比较的条件值不存或者不是字符串');
    });

    test('contains:测试第一个值传入空字符串,第一个值不在第二个值中', () => {
        const result = contains('', 'banana,apple,orange');
        expect(result).toBe(false);
    });

    test('compareNumber:测试第一个值大于第二个值', () => {
        const result = compareNumber(10, 5);
        expect(result).toBe(1);
    });

    test('compareNumber:测试第一个值小于第二个值,', () => {
        const result = compareNumber(5, 10);
        expect(result).toBe(-1);
    });

    test('compareNumber:测试第一个值等于第二个值', () => {
        const result = compareNumber(5, 5);
        expect(result).toBe(0);
    });

    test('compareNumber:测试输入值全为NaN', () => {
        const result = compareNumber(NaN, NaN);
        expect(result).toBe(0);
    });

    test('compareNumber:测试输入值有一个为NaN', () => {
        const result1 = compareNumber(NaN, 0);
        const result2 = compareNumber(0, NaN);
        expect(result1).toBe(0);
        expect(result2).toBe(0);
    });

    test('compare:比较数字或数字字符串大小', () => {
        const result1 = compare(5, 10);
        expect(result1).toBe(-1);

        const result2 = compare('15', 10);
        expect(result2).toBe(1);
    });

    test('compare:比较日期大小', () => {
        const result1 = compare('2024-01-01', '2024-01-15');
        expect(result1).toBe(-1);

        const result2 = compare('2024-01-20', new Date('2024-01-15'));
        expect(result2).toBe(1);
    });

    test('compare:比较无意义字符串大小', () => {
        expect(() => {
            compare('apple', 'banana');
        }).toThrowError('apple 和 banana 无法比较大小');
    });

    test('testCond:测试值包含在给定的范围中', () => {
        const result = testCond('apple', 'IN', 'banana,apple,orange');
        expect(result).toBe(true)
    })

    test('testCond:测试值不包含在给定的范围中', () => {
        const result = testCond('apple', 'NOTIN', 'banana,apple,orange');
        expect(result).toBe(false)
    })

    test('testCond:测试值相等操作,忽略类型', () => {
        const result = testCond('test', 'EQ', 'test');
        expect(result).toBe(true)
    })

    test('testCond:测试值不等操作,忽略类型', () => {
        const result = testCond('test', 'NOTEQ', 'test');
        expect(result).toBe(false)
    })

    test('testCond:测试值小于操作', () => {
        const result = testCond('5', 'LT', 10);
        expect(result).toBe(true)
    })

    test('testCond:测试值小于等于操作', () => {
        const result = testCond('10', 'LTANDEQ', 10);
        expect(result).toBe(true)
    })

    test('testCond:测试值大于操作', () => {
        const result = testCond('11', 'GT', 10);
        expect(result).toBe(true)
    })

    test('testCond:测试值大于等于操作', () => {
        const result = testCond('10', 'GTANDEQ', 10);
        expect(result).toBe(true)
    })

    test('testCond:测试值是否不为空', () => {
        const result = testCond('10', 'ISNULL', undefined);
        expect(result).toBe(false)
    })

    test('testCond:测试值是否为空', () => {
        const result = testCond('10', 'ISNOTNULL', undefined);
        expect(result).toBe(true)
    })

    test('testCond:测试是否是null', () => {
        const result = testCond(undefined, 'TESTNULL', undefined);
        expect(result).toBe(true)
    })

    test('testCond:测试值是否是undefined', () => {
        const result = testCond(null, 'TESTNULL', undefined);
        expect(result).toBe(true)
    })

    test('testCond:测试文本包含', () => {
        const result = testCond('hello world', 'LIKE', 'lo');
        expect(result).toBe(true)
    })

    test('testCond:测试文本左包含', () => {
        const result = testCond('hello world', 'LEFTLIKE', 'hello');
        expect(result).toBe(true)
    })

    test('testCond:测试文本右包含', () => {
        const result = testCond('hello world', 'RIGHTLIKE', 'world');
        expect(result).toBe(true)
    })

    test('testCond:传入未支持值操作', () => {
        expect(() => {
            testCond('test', 'test', 'test');
        }).toThrowError('值操作：test，暂未支持')
    })
});