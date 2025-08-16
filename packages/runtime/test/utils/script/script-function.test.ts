import { ScriptFunction } from '../../../src/utils/script/script-function';
import { describe, test, expect } from 'vitest';

describe('script-function', () => {
    test('测试执行脚本返回正确值', () => {
        const scriptCode = 'return a + b;';
        const argKeys = ['a', 'b'];
        const options = { singleRowReturn: false, isAsync: false };
        const scriptFn = new ScriptFunction(argKeys, scriptCode, options);

        const params = { a: 1, b: 2 };
        const result = scriptFn.exec(params);
        // 执行脚本返回值为 3
        expect(result).toBe(3);
    });

    test('测试设置singleRowReturn值,执行脚本返回正确值', () => {
        const scriptCode = 'a + b';
        const argKeys = ['a', 'b'];
        const options = { singleRowReturn: true, isAsync: false };
        const scriptFn = new ScriptFunction(argKeys, scriptCode, options);

        const params = { a: 1, b: 2 };
        const result = scriptFn.exec(params);
        // 执行脚本返回值为 3
        expect(result).toBe(3);
    })

    test('测试设置isAsync值,执行异步脚本返回值', () => {
        const scriptCode = 'await function (){ return a+ b }()';
        const argKeys = ['a', 'b'];
        const options = { singleRowReturn: true, isAsync: true };

        const scriptFn = new ScriptFunction(argKeys, scriptCode, options);
        const result = scriptFn.exec({ a: 1, b: 2 });
        // 执行异步脚本返回值为 3
        expect(result).resolves.toBe(3);
    })

    test('测试执行脚本时exec传入参数优先级高', () => {
        const scriptCode = 'return a + b';
        const argKeys = [];
        const options = { singleRowReturn: false, isAsync: false, presetParams: { a: 1, b: 2 } };

        const scriptFn = new ScriptFunction(argKeys, scriptCode, options);
        const result = scriptFn.exec({ a: 3, b: 4 });
        // 执行脚本返回值为 7
        expect(result).toBe(7);
    })

    test('测试脚本返回预置的参数', () => {
        const scriptCode = 'return document';
        const argKeys = [];
        const options = { singleRowReturn: false, isAsync: false };

        const scriptFn = new ScriptFunction(argKeys, scriptCode, options);
        const result = scriptFn.exec({});
        // 脚本返回的预制参数与实际值一致
        expect(result).toEqual(document);
    })

    test('测试脚本返回预置的参数', () => {
        const scriptCode = 'return env';
        const argKeys = [];
        const options = { singleRowReturn: false, isAsync: false };

        const scriptFn = new ScriptFunction(argKeys, scriptCode, options);
        const result = scriptFn.exec({});
        // 脚本返回的预制参数与实际值一致
        expect(result).toEqual(ibiz.env);
    })

    test('测试脚本返回预置的参数', () => {
        const scriptCode = 'return app';
        const argKeys = [];
        const options = { singleRowReturn: false, isAsync: false };

        const scriptFn = new ScriptFunction(argKeys, scriptCode, options);
        const result = scriptFn.exec({});
        // 脚本返回的预制参数与实际值一致
        expect(result).toEqual((ibiz as any).hub.controller);
    })

    test('测试脚本返回类名为test的元素', () => {
        const scriptCode = 'return selector(className)';
        const argKeys = ['className'];
        const options = { singleRowReturn: false, isAsync: false, presetParams: { className: 'test' } };

        const scriptFn = new ScriptFunction(argKeys, scriptCode, options);
        // 执行脚本查找元素
        const result = scriptFn.exec({});

        const div = document.createElement('div')
        div.classList.add('test');
        document.body.appendChild(div);

        const divTest = document.getElementsByClassName('test');
        // 执行脚本返回的元素与直接查找的元素一样
        expect(result).toEqual(divTest);
    })
})