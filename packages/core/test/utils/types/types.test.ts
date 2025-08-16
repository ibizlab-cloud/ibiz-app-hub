import { OmitObject, PartialWithObject, StrKeyOf, Constructor } from '../../../src/utils/types/types';
import { describe, expect, expectTypeOf, test } from 'vitest'

describe('types', () => {
    test('测试合并类型,T和U的并集,其中U里面的属性都变成可选', () => {
        type Input1 = { a: number, b: string; c: boolean };
        type Input2 = { b: boolean, d: object };

        type ExpectedOutput1 = { a: number; b?: boolean; c: boolean; d?: object };

        type Result1 = PartialWithObject<Input1, Input2>;

        expectTypeOf<Result1>().toMatchTypeOf<ExpectedOutput1>();
    });

    test('测试合并类型,从T里面排除U里相同的属性后剩下的属性组成的类型', () => {
        type Input1 = { a: number, b: string; c: boolean; d: object };
        type Input2 = { b: boolean, d: object };

        type ExpectedOutput1 = { a: number; c: boolean; };

        type Result1 = OmitObject<Input1, Input2>;

        expectTypeOf<Result1>().toMatchTypeOf<ExpectedOutput1>();
    })

    test('从T里面只获取索引类型为string的键', () => {
        type Input1 = { a: number, b: string; c: boolean; d: object };

        type ExpectedOutput1 = "b";

        type Result1 = StrKeyOf<Input1>;

        expectTypeOf<Result1>().toMatchTypeOf<ExpectedOutput1>();
    })

    test('构造函数接口,声明一个返回对象是T的构造函数,不传则返回类型是any', () => {
        class ExampleClass {
            value: number;
            constructor(value: number) {
                this.value = value;
            }
        }

        function createInstance<T extends object = any>(ctor: Constructor<T>, ...args: any[]): T {
            return new ctor(...args);
        }

        const newInstance = createInstance(ExampleClass, 123);
        expect(newInstance).toBeInstanceOf(ExampleClass);
    });
});