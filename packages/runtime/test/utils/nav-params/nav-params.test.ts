import { convertObjectToNavParams, convertNavData, convertNavDataByArray, formatMultiData } from '../../../src/utils/nav-params/nav-params';
import { describe, test, expect } from 'vitest';

describe('nav-params', () => {
    test('convertObjectToNavParams: 测试未输入导航参数', () => {
        const inputData = {};
        const expectedOutput = [];

        expect(convertObjectToNavParams(inputData)).toEqual(expectedOutput);
    });

    test('convertObjectToNavParams: 测试输入正常参数', () => {
        const inputData = {
            param1: 'value1',
            param2: '%value2%',
        };

        const expectedOutput = [
            { key: 'param1', rawValue: true, value: 'value1' },
            { key: 'param2', rawValue: false, value: 'value2' },
        ];
        expect(convertObjectToNavParams(inputData)).toEqual(expectedOutput);
    });

    test('convertObjectToNavParams: 测试输入正常参数(键值大写值)', () => {
        const inputData = {
            Param1: 'value1',
            param2: '%value2%',
        };

        const expectedOutput = [
            { key: 'param1', rawValue: true, value: 'value1' },
            { key: 'param2', rawValue: false, value: 'value2' },
        ];
        expect(convertObjectToNavParams(inputData)).toEqual(expectedOutput);
    });

    test('convertObjectToNavParams: 测试输入正常参数(值是falsy值)', () => {
        const inputData = {
            param1: null,
            param2: undefined,
        };

        const expectedOutput = [
            { key: 'param1', rawValue: true, value: null },
            { key: 'param2', rawValue: true, value: undefined },
        ];
        expect(convertObjectToNavParams(inputData)).toEqual(expectedOutput);
    });

    test('convertNavData: 测试导航参数是数组时', () => {
        const naviDatas = [
            { key: 'param1', rawValue: false, value: 'Hello, ${name}', appId: '123456' },
            { key: 'param2', rawValue: true, value: 'Age: ${age}', appId: '123456' },
        ];

        const origins = [
            { name: 'Alice', age: 30 },
            { name: 'Bob', age: 25 },
        ];

        const expectedOutput = {
            param1: 'Hello, Alice',
            param2: 'Age: ${age}',
        }
        expect(convertNavData(naviDatas, ...origins)).toEqual(expectedOutput);
    })

    test('convertNavData: 测试导航参数是对象时', () => {
        const navParams = { param1: 'name', param2: '%age%' }

        const origins = [
            { name: 'Alice', age: 30 },
            { name: 'Bob', age: 25 },
        ];

        const expectedOutput = {
            param1: 'name',
            param2: 30
        }

        expect(convertNavData(navParams, ...origins)).toEqual(expectedOutput);
    })

    test('convertNavData: 测试导航参数是undefined,返回{}', () => {
        const navParams = undefined;

        const origins = [
            { name: 'Alice', age: 30 },
            { name: 'Bob', age: 25 },
        ];
        expect(convertNavData(navParams, ...origins)).toEqual({});
    })

    test('convertNavData: 测试导航参数是null,返回{}', () => {
        const navParams = null;

        const origins = [
            { name: 'Alice', age: 30 },
            { name: 'Bob', age: 25 },
        ];
        expect(convertNavData(navParams, ...origins)).toEqual({});
    })

    test('convertNavDataByArray: 测试是否正确替换${xxx}格式字符串', () => {
        const naviDatas = [
            { key: 'param1', rawValue: false, value: 'Hello, ${name}', appId: '123456' },
            { key: 'param2', rawValue: false, value: 'Age: ${age}', appId: '123456' },
        ];

        const origins = [
            { name: 'Alice', age: 30 },
            { name: 'Bob', age: 25 },
        ];

        const expectedOutput = {
            param1: 'Hello, Alice',
            param2: 'Age: 30',
        };

        expect(convertNavDataByArray(naviDatas, ...origins)).toEqual(expectedOutput);
    });

    test('convertNavDataByArray: 测试是否正确替换${xxx}格式字符串,未匹配时返回原来的', () => {
        const naviDatas = [
            { key: 'param1', rawValue: true, value: 'Raw value', appId: '123456' },
            { key: 'param2', rawValue: false, value: '${nonexistent}', appId: '123456' },
        ];

        const origins = [{ key: 'value' }];

        const expectedOutput = {
            param1: 'Raw value',
            param2: '${nonexistent}',
        };

        expect(convertNavDataByArray(naviDatas, ...origins)).toEqual(expectedOutput);
    });

    test('convertNavDataByArray: 测试输入空数组', () => {
        const naviDatas = [];
        const origins = [];

        const expectedOutput = {};

        expect(convertNavDataByArray(naviDatas, ...origins)).toEqual(expectedOutput);
    });

    test('formatMultiData: 测试将多条数据转换为单条数据', () => {
        const navParams = [
            { key: 'param1', rawValue: false, value: 'name' },
            { key: 'param2', rawValue: false, value: 'age' },
        ];

        const dataArr = [
            { name: 'Alice', age: 30 },
            { name: 'Bob', age: 25 },
        ];

        const expectedOutput = {
            name: 'Alice;Bob',
            age: '30;25',
        };

        expect(formatMultiData(navParams, dataArr)).toEqual(expectedOutput);
    });

    test('formatMultiData: 测试将多条数据转换为单条数据', () => {
        const navParams = [{ key: 'param1', rawValue: false, value: 'name' }];
        const dataArr = [
            { name: 'Alice', age: 30 },
            { name: 'Bob', age: 25 },
        ];

        const expectedOutput = {
            name: 'Alice;Bob',
        };

        expect(formatMultiData(navParams, dataArr)).toEqual(expectedOutput);
    });

    test('formatMultiData: 测试导航测试为对象时,先转换成数组格式的导航参数', () => {
        const navParams = {
            param1: 'name',
            param2: '%age%',
        };
        const dataArr = [
            { name: 'Alice', age: 30 },
            { name: 'Bob', age: 25 },
        ];

        const expectedOutput = {
            age: '30;25',
        };

        expect(formatMultiData(navParams, dataArr)).toEqual(expectedOutput);
    });

    test('formatMultiData: 测试输入导航参数为null时,返回{}', () => {
        const navParams = null;
        const dataArr = [
            { name: 'Alice', age: 30 },
            { name: 'Bob', age: 25 },
        ];

        const expectedOutput = {};

        expect(formatMultiData(navParams, dataArr)).toEqual(expectedOutput);
    });

    test('formatMultiData: 测试输入导航参数为undefined时,返回{}', () => {
        const navParams = undefined;
        const dataArr = [
            { name: 'Alice', age: 30 },
            { name: 'Bob', age: 25 },
        ];

        const expectedOutput = {};

        expect(formatMultiData(navParams, dataArr)).toEqual(expectedOutput);
    });
})