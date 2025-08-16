import { handleAllSettled } from '../../../src/utils/promise/promise';
import { describe, test, expect } from 'vitest';

describe('promise', () => {
    test('测试返回值，有异常时通过全局异常处理弹出提示', async () => {
        const promises = [
            Promise.resolve(1),
            Promise.reject(new Error('Error 1')),
            Promise.resolve(3),
        ];

        try {
            const result = await handleAllSettled(promises, false);
            // 返回正确的结果
            expect(result).toEqual([1, 3]);
        } catch (error) {
            // 无异常
            expect(error).toBeUndefined();
        }
    });

    test('测试返回值，有异常时抛出错误(单个异常)', async () => {
        const promises = [
            Promise.resolve(1),
            Promise.reject(new Error('Error 1')),
            Promise.resolve(3),
        ];

        try {
            const result = await handleAllSettled(promises, true);
            expect(result).toEqual([1, 3]);
        } catch (error) {
            // 异常个数为一个时
            expect(error.message).toBe('Error 1');
        }
    });

    test('测试返回值，有异常时抛出错误(多个异常)', async () => {
        const promises = [
            Promise.resolve(1),
            Promise.reject(new Error('Error 1')),
            Promise.reject(new Error('Error 2')),
            Promise.resolve(3),
        ];

        try {
            const result = await handleAllSettled(promises, true);
            expect(result).toEqual([1, 3]);
        } catch (error) {
            // 异常个数大于1个
            expect(error.length).toBe(2);
            expect(error[0].message).toBe("Error 1");
            expect(error[1].message).toBe("Error 2");
        }
    });
});