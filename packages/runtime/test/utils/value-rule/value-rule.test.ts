import { filterValueRules } from '../../../src/utils/value-rule/value-rule';
import { describe, test, expect } from 'vitest';

describe('value-rule', () => {
    test('filterValueRules: 过滤出deformItemName或degridEditItemName值为test,且checkMode值不为2的数组', () => {
        const data = [
            {
                deformItemName: 'test',
                checkMode: 1,
                appId: '123456'
            },
            {
                deformItemName: 'test',
                checkMode: 2,
                appId: '123456'
            },
            {
                deformItemName: 'test1',
                checkMode: 1,
                appId: '123456'
            },
            {
                deformItemName: 'test1',
                checkMode: 2,
                appId: '123456'
            },
            {
                degridEditItemName: 'test',
                checkMode: 1,
                appId: '123456'
            },
            {
                degridEditItemName: 'test',
                checkMode: 2,
                appId: '123456'
            },
            {
                degridEditItemName: 'test1',
                checkMode: 1,
                appId: '123456'
            },
            {
                degridEditItemName: 'test1',
                checkMode: 2,
                appId: '123456'
            },
        ];

        expect(filterValueRules(data, 'test')).toEqual([
            {
                deformItemName: 'test',
                checkMode: 1,
                appId: '123456'
            },
            {
                degridEditItemName: 'test',
                checkMode: 1,
                appId: '123456'
            }])
    })

    test('filterValueRules: 测试字符串不全等时,是否排除不全等的', () => {
        const data = [
            {
                deformItemName: 'test',
                checkMode: 1,
                appId: '123456'
            },
            {
                deformItemName: 'Test',
                checkMode: 1,
                appId: '123456'
            },
            {
                degridEditItemName: 'test',
                checkMode: 1,
                appId: '123456'
            },
            {
                degridEditItemName: 'Test',
                checkMode: 1,
                appId: '123456'
            },
        ];

        expect(filterValueRules(data, 'test')).toEqual([
            {
                deformItemName: 'test',
                checkMode: 1,
                appId: '123456'
            },
            {
                degridEditItemName: 'test',
                checkMode: 1,
                appId: '123456'
            }])
    })

    test('filterValueRules,没有符合条件的数据，返回空数组', () => {
        const data = [
            {
                deformItemName: 'test',
                checkMode: 2,
                appId: '123456'
            },
            {
                deformItemName: 'test1',
                checkMode: 1,
                appId: '123456'
            },
            {
                deformItemName: 'test1',
                checkMode: 2,
                appId: '123456'
            },
            {
                degridEditItemName: 'test',
                checkMode: 2,
                appId: '123456'
            },
            {
                degridEditItemName: 'test1',
                checkMode: 1,
                appId: '123456'
            },
            {
                degridEditItemName: 'test1',
                checkMode: 2,
                appId: '123456'
            },
        ];

        expect(filterValueRules(data, 'test')).toEqual([])
    })
})