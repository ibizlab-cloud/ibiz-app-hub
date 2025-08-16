import { awaitTimeout, CountLatch } from '../../../src/utils/sync'
import { describe, expect, test } from 'vitest'

describe('sync', () => {
    // 设置延迟wait毫米后执行fun方法，返回fun的返回值
    test('延时100ms', async () => {
        const start = Date.now();
        await awaitTimeout(100);
        const end = Date.now();
        expect(end - start).toBeGreaterThanOrEqual(100);
    });

    test('延时100ms,返回函数返回值', async () => {
        const result = await awaitTimeout(100, () => 'Hello, World!');
        expect(result).toBe('Hello, World!');
    });

    test('延时100ms,传入参数，返回函数返回值', async () => {
        const result = await awaitTimeout(100, (name: string) => `Hello, ${name}!`, ['John']);
        expect(result).toBe('Hello, John!');
    });

    test('计数插销工具类测试', async () => {
        const countLatch = new CountLatch();
        expect(countLatch.count).toBe(0)
        countLatch.lock();
        countLatch.lock();
        expect(countLatch.count).toBe(2);
        const asyncOperation = countLatch.await();
        countLatch.unlock();
        expect(countLatch.count).toBe(1);
        countLatch.unlock();
        expect(countLatch.count).toBe(0);
        expect(asyncOperation).resolves.toBe(undefined);
    });
})
