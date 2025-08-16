import { describe, expect, beforeEach, afterEach, vi, test } from 'vitest';
import { isOverlap, isElementSame, debounceAndMerge, debounceAndAsyncMerge, mergeInLeft, mergeDefaultInLeft, compareArr, toNumberOrNil, isSvg, plus, updateKeyDefine, isBase64Image, calcOpenModeStyle } from '../../../src/utils/util/util';

describe('util', () => {
    //判断两个数组是否有相同的元素
    test('isOverlap:两个数组中有相同的元素', () => {
        const arr1 = [1, 2, 3];
        const arr2 = [3, 4, 5];
        expect(isOverlap(arr1, arr2)).toBe(true);
    });

    test('isOverlap:两个数组中没有相同的元素', () => {
        const arr1 = [1, 2, 3];
        const arr2 = [4, 5, 6];
        expect(isOverlap(arr1, arr2)).toBe(false);
    });

    test('isOverlap:两个数组，其中一个是空数组', () => {
        const arr1 = [];
        const arr2 = [1, 2, 3];
        expect(isOverlap(arr1, arr2)).toBe(false);
    });

    test('isOverlap:两个数组，都是空数组', () => {
        const arr1 = [];
        const arr2 = [];
        expect(isOverlap(arr1, arr2)).toBe(false);
    });

    //是否元素相同
    test('isElementSame:两个数组元素相同', () => {
        const arr1 = [1, 2, 3]
        const arr2 = [1, 2, 3]
        expect(isElementSame(arr1, arr2)).toBe(true);
    })

    test('isElementSame:两个数组元素不相同', () => {
        const arr1 = [1, 2, 4]
        const arr2 = [1, 2, 3]
        expect(isElementSame(arr1, arr2)).toBe(false);
    })

    test('isElementSame:两个数组元素里的属性相同,指定key', () => {
        const arr1 = [{ test1: 1, test2: 2, test3: 3 }, { test1: 2, test2: 2, test3: 3 }];
        const arr2 = [{ test1: 1, test2: 2, test3: 3 }, { test1: 2, test2: 2, test3: 3 }];
        expect(isElementSame(arr1, arr2, 'test1')).toBe(true);
    })

    test('isElementSame:两个数组元素里的属性不相同,指定key', () => {
        const arr1 = [{ test1: 1, test2: 2, test3: 3 }, { test1: 2, test2: 2, test3: 3 }];
        const arr2 = [{ test1: 1, test2: 2, test3: 3 }, { test1: 3, test2: 2, test3: 3 }];
        expect(isElementSame(arr1, arr2, 'test1')).toBe(false);
    })

    test('isElementSame:两个数组，都是空数组', () => {
        const arr1 = []
        const arr2 = []
        expect(isElementSame(arr1, arr2)).toBe(true);
    })

    // 把右侧的对象里非空的属性合并到左侧对象里
    test('mergeInLeft:右侧对象中有属性的值是null,undefined', () => {
        const obj1 = { a: 1, b: 2 };
        const obj2 = { c: null, d: false, e: undefined, f: 0, g: {} };
        mergeInLeft(obj1, obj2);
        expect(obj1).toEqual({ a: 1, b: 2, d: false, f: 0, g: {} })
    })

    test('mergeInLeft:右侧对象中有属性的值是null,undefined,且两个对象中有相同属性名', () => {
        const obj1 = { a: 1, b: 2 };
        const obj2 = { a: 2, b: 3, c: null, d: false, e: undefined, f: 0, g: {} };
        mergeInLeft(obj1, obj2);
        expect(obj1).toEqual({ a: 2, b: 3, d: false, f: 0, g: {} })
    })

    test('mergeInLeft:两个空对象合并', () => {
        const obj1 = {};
        const obj2 = {};
        mergeInLeft(obj1, obj2);
        expect(obj1).toEqual({})
    })

    // 把右侧的对象里非空的属性合并到左侧对象属性为空里
    test('mergeDefaultInLeft:右侧对象中有属性值是null,undefined', () => {
        const obj1 = { a: 1, b: 2 };
        const obj2 = { c: null, d: false, e: undefined, f: 0, g: {} };
        mergeDefaultInLeft(obj1, obj2);
        expect(obj1).toEqual({ a: 1, b: 2, d: false, f: 0, g: {} })
    })

    test('mergeDefaultInLeft:右侧对象中有属性的值是null,undefined,且两个对象中有相同属性名', () => {
        const obj1 = { a: 1, b: 2 };
        const obj2 = { a: 2, b: 3, c: null, d: false, e: undefined, f: 0, g: {} };
        mergeDefaultInLeft(obj1, obj2);
        expect(obj1).toEqual({ a: 1, b: 2, d: false, f: 0, g: {} })
    })

    test('mergeDefaultInLeft:两个空对象合并', () => {
        const obj1 = {};
        const obj2 = {};
        mergeDefaultInLeft(obj1, obj2);
        expect(obj1).toEqual({})
    })

    // 比较两个数组集合，找出相同和不同的元素
    // more: IData[]; arr1多的元素
    // less: IData[]; arr1少的元素
    // same: IData[]; 相同的元素

    // 针对数组中不是对象的使用场景
    test('compareArr:不指定key', () => {
        const arr1 = [1, 2, false, true, undefined, null];
        const arr2 = [1, false, undefined];
        expect(compareArr(arr1, arr2)).toEqual({
            more: [2, true, null],
            less: [],
            same: [1, false, undefined],
        })
    })

    // 针对的数组中是对象的使用场景
    test('compareArr:指定key', () => {
        const arr1 = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
        const arr2 = [{ id: 2, name: 'Jane' }, { id: 3, name: 'Bob' }];
        expect(compareArr(arr1, arr2, 'id')).toEqual({
            more: [{ id: 1, name: 'John' }],
            less: [{ id: 3, name: 'Bob' }],
            same: [{ id: 2, name: 'Jane' }, { id: 2, name: 'Jane' }],
        })
    })

    test('compareArr:两个数组，都是空数组', () => {
        const arr1 = [];
        const arr2 = [];
        expect(compareArr(arr1, arr2)).toEqual({
            more: [],
            less: [],
            same: [],
        })
    })

    // 转换为数字或undefined
    // 如果是undefined或null 返回undefined
    // 其他情况转成数字，能转成数字的返回数字，NaN的返回undefined
    test('toNumberOrNil:输入是数字', () => {
        expect(toNumberOrNil(5)).toBe(5);
    })

    test('toNumberOrNil:输入对象', () => {
        expect(toNumberOrNil([])).toBe(0);
        expect(toNumberOrNil({})).toBe(undefined);
    })

    test('toNumberOrNil:输入字符串', () => {
        expect(toNumberOrNil('')).toBe(0);
        expect(toNumberOrNil('5')).toBe(5);
        expect(toNumberOrNil('0x11')).toBe(17);
        expect(toNumberOrNil('0b11')).toBe(3);
        expect(toNumberOrNil('0o11')).toBe(9);
        expect(toNumberOrNil(-Infinity)).toBe(-Infinity)
        expect(toNumberOrNil('test')).toBe(undefined);
    })

    test('toNumberOrNil:输入是undefined或null', () => {
        expect(toNumberOrNil(undefined)).toBe(undefined);
        expect(toNumberOrNil(null)).toBe(undefined);
    })

    // 判断字符串是否是svg的格式
    test('isSvg:符合svg格式', () => {
        const svgString = '<svg xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="100" height="100" fill="red" /></svg>';
        expect(isSvg(svgString)).toBe(true)
    })

    test('isSvg:不符合svg格式', () => {
        const svgString = '<svg1 xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="100" height="100" fill="red" /></svg1>';
        expect(isSvg(svgString)).toBe(false)
    })

    // 处理浮点数相加
    test('plus:整数相加', () => {
        expect(plus(10, 10)).toBe(20);
        expect(plus(10, -10)).toBe(0);
    })

    test('plus:浮点数相加', () => {
        expect(plus(99.99, 99.999)).toBe(199.989);
        expect(plus(99.99, -99.999)).toBe(-0.009);
    })

    // 根据给定的属性名称集合，查看目标对象是否具有该属性，如果没有设置undefined的定义
    test('updateKeyDefine:目标对象没有给定的属性,没有的设置undefined', () => {
        const obj = { a: '' };
        updateKeyDefine(obj, ['b'])
        expect(obj).toEqual({
            a: '',
            b: undefined,
        })
    })

    test('updateKeyDefine:目标对象有给定的属性,已有的不变', () => {
        const obj = { a: '' };
        updateKeyDefine(obj, ['a', 'b'])
        expect(obj).toEqual({
            a: '',
            b: undefined,
        })
    })

    // 判断字符串是否为Base64图片格式
    test('isBase64Image:以"data:image/"开头符合Base64图片格式', () => {
        const testString = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAmklEQVQ4T2NkoBAwUqifYt4q8ogcCQ3NjY2BgYGBgZmBgY9oRk5Ojy8vLz8+PjQ2NjYGBgYGBhZmBggcCQ3NjY2BgYGhnb4FlDyECYAw6fQGp7QUhYGAQ0AC8Dtdu4AxsAAAAAElFTkSuQmCC';
        expect(isBase64Image(testString)).toBe(true);
    })

    test('isBase64Image:以"data:image/"开头但没有base64编码的字符串', () => {
        const testString = 'data:image/png;,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAmklEQVQ4T2NkoBAwUqifYt4q8ogcCQ3NjY2BgYGBgZmBgY9oRk5Ojy8vLz8+PjQ2NjYGBgYGBhZmBggcCQ3NjY2BgYGhnb4FlDyECYAw6fQGp7QUhYGAQ0AC8Dtdu4AxsAAAAAElFTkSuQmCC';
        expect(isBase64Image(testString)).toBe(false);
    })

    test('isBase64Image:不以"data:image/"开头的字符串', () => {
        const testString = 'https://example.com/image.png';
        expect(isBase64Image(testString)).toBe(false);
    })

    // 计算各种视图打开方式的样式
    test('calcOpenModeStyle:drawer', () => {
        expect(calcOpenModeStyle(-50, 'drawer')).toBe('');
        expect(calcOpenModeStyle(0, 'drawer')).toBe('0%');
        expect(calcOpenModeStyle(50, 'drawer')).toBe('50%');
        expect(calcOpenModeStyle(100, 'drawer')).toBe('100%');
        expect(calcOpenModeStyle(150, 'drawer')).toBe(150);
    })

    test('calcOpenModeStyle:modal', () => {
        expect(calcOpenModeStyle(-50, 'modal')).toBe('');
        expect(calcOpenModeStyle(0, 'modal')).toBe('0%');
        expect(calcOpenModeStyle(50, 'modal')).toBe('50%');
        expect(calcOpenModeStyle(100, 'modal')).toBe('100%');
        expect(calcOpenModeStyle(150, 'modal')).toBe('150px');
    })

    test('calcOpenModeStyle:popover', () => {
        expect(calcOpenModeStyle(-50, 'popover')).toBe('');
        expect(calcOpenModeStyle(0, 'popover')).toBe('0%');
        expect(calcOpenModeStyle(50, 'popover')).toBe('50%');
        expect(calcOpenModeStyle(100, 'popover')).toBe('100%');
        expect(calcOpenModeStyle(150, 'popover')).toBe('150px');
    })
})


// 防抖并合并每次的参数,最后一次才会执行
describe('util', () => {
    let mockFunc;
    let mergeFunc;

    beforeEach(() => {
        vi.useFakeTimers()
        mockFunc = vi.fn();
        mergeFunc = vi.fn((oldParams, newParams) => [...oldParams, ...newParams]);
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    test('debounceAndMerge:连续调用函数', async () => {
        const debouncedFunc = debounceAndMerge(mockFunc, mergeFunc, 100);
        // 第一次调用，不应立即执行
        debouncedFunc(1);
        expect(mockFunc).not.toBeCalled();

        // 第二次调用，应该合并参数并执行
        debouncedFunc(2);
        expect(mockFunc).not.toBeCalled(); // 还没有到延迟时间

        // 推进时间，超过延迟时间
        vi.advanceTimersByTime(150);
        expect(mockFunc).toHaveBeenCalledTimes(1);
        expect(mockFunc).toHaveBeenCalledWith(1, 2);

        //等待时间内再次调用
        debouncedFunc(3);
        vi.advanceTimersByTime(100);
        expect(mockFunc).toHaveBeenCalledTimes(2);
        expect(mockFunc).toHaveBeenCalledWith(3);
    });
})

// 防抖并合并每次的参数，最后一次才会执行,绑定方法为异步方法，给每次调用返回最终执行那次的结果
describe('util', () => {
    let asyncFunc;
    let mergeFunc;

    beforeEach(() => {
        vi.useFakeTimers()
        asyncFunc = vi.fn(async (...args) => {
            // 模拟异步函数的返回值
            return args.map(arg => arg + 1);
        });
        mergeFunc = vi.fn((oldParams, newParams) => [...oldParams, ...newParams]);
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    test('debounceAndAsyncMerge:连续调用函数', async () => {
        const debouncedFunc = debounceAndAsyncMerge(asyncFunc, mergeFunc, 100);

        // 第一次调用，不应立即执行
        const promise1 = debouncedFunc(1);
        expect(asyncFunc).not.toBeCalled();

        // 第二次调用，在延迟时间内，不应执行
        debouncedFunc(2);
        expect(asyncFunc).not.toBeCalled();

        // 延迟时间内再次调用，应该立即执行
        vi.advanceTimersByTime(150);
        debouncedFunc(3);
        vi.advanceTimersByTime(100);
        expect(asyncFunc).toHaveBeenCalledTimes(2);
        expect(asyncFunc).toHaveBeenCalledWith(3);

        // 验证返回的 Promise 值是否正确
        await expect(promise1).resolves.toEqual([2, 3]);
    });
})

