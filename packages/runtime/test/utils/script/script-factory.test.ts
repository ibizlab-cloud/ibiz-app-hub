import { ScriptFactory } from '../../../src/utils/script/script-factory';
import { describe, test, expect } from 'vitest';

describe('script-factory', () => {
    test('创建脚本方法', () => {
        const result = ScriptFactory.createScriptFn(['a', 'b'], 'a + b', {
            singleRowReturn: true,
            isAsync: false,
        });
        // 通过创建脚本方法执行返回值为 3
        expect(result.exec({ a: 1, b: 2 })).toBe(3);
    })

    test('直接创建并执行脚本', () => {
        const result = ScriptFactory.execScriptFn({ a: 1, b: 2 }, 'a + b', {
            singleRowReturn: true,
            isAsync: false,
        });
        // 直接创建并执行脚本返回值为 3
        expect(result).toBe(3);
    })

    test('执行单行脚本', () => {
        const result = ScriptFactory.execSingleLine('a + b', { a: 1, b: 2 });
        // 执行单行脚本返回值为 3
        expect(result).toBe(3);
    })
})