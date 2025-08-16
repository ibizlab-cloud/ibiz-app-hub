import { recursiveIterate, findRecursiveChild } from '../../../src/utils/recursive/find-recursive-child'
import { describe, test, expect } from 'vitest'

describe('recursive', () => {
    test('递归将全部数组中全部name值合并到数组中', () => {
        const parent = {
            name: 'parent',
            children: [
                {
                    name: 'child1',
                    children: [{ name: 'grandchild1' }, { name: 'grandchild2' }],
                },
                { name: 'child2', children: [{ name: 'grandchild3' }] },
            ],
        };

        const result: string[] = [];

        recursiveIterate(parent, item => {
            result.push(item.name);
        });

        expect(result).toEqual(['child1', 'grandchild1', 'grandchild2', 'child2', 'grandchild3']);
    });

    test('递归将数组中所有name值开头为grand,不获取默认children数组', () => {
        const parent = {
            name: 'parent',
            children: [
                {
                    name: 'child1',
                    children: [{ name: 'grandchild1' }, { name: 'grandchild2' }],
                },
                { name: 'child2', children: [{ name: 'grandchild3' }] },
            ],
            newChildren: [
                {
                    name: 'newChil1',
                    newChildren: [{ name: 'grandnewChil1' }, { name: 'grandnewChil2' }],
                },
                { name: 'newChil2', newChildren: [{ name: 'grandnewChil3' }] },
            ],
        };

        const result: string[] = [];

        recursiveIterate(parent, item => {
            if (item.name.startsWith('grand')) {
                result.push(item.name);
            }
        }, { childrenFields: ['newChildren'] });

        expect(result).toEqual(['grandnewChil1', 'grandnewChil2', 'grandnewChil3']);
    });


    test('正确默认查找name为child1的子元素', () => {
        const parent = {
            name: 'parent',
            children: [
                {
                    name: 'child1',
                    children: [{ name: 'grandchild1' }, { name: 'grandchild2' }],
                },
                { name: 'child2', children: [{ name: 'grandchild3' }] },
            ],
        };

        const result = findRecursiveChild(parent, 'child1');

        expect(result).toEqual({ name: 'child1', children: [{ name: 'grandchild1' }, { name: 'grandchild2' }] });
    });

    test('默认查找name为child3的子元素,数组中没有name为child3的子元素,返回undefined', () => {
        const parent = {
            name: 'parent',
            children: [
                {
                    name: 'child1',
                    children: [{ name: 'grandchild1' }, { name: 'grandchild2' }],
                },
                { name: 'child2', children: [{ name: 'grandchild3' }] },
            ],
        };

        const result = findRecursiveChild(parent, 'child3');

        expect(result).toBeUndefined();
    });

    test('传入额外参数修改默认查找规则,查找id为11且name为newChild1的子元素', () => {
        const parent = {
            name: 'parent',
            children: [
                {
                    id: '1',
                    name: 'child1',
                    children: [{ id: '11', name: 'newChild1' }, { id: '12', name: 'grandchild2' }],
                },
                { id: '2', name: 'child2', children: [{ id: '21', name: 'grandchild3' }] },
            ],
        };

        const result = findRecursiveChild(
            parent,
            '11',
            {
                compareField: 'id',
                compareCallback: (child, key, compareField) => {
                    return child[compareField] === key && child.name === 'newChild1';
                }
            }
        );

        expect(result).toEqual({ id: '11', name: 'newChild1' });
    });
});
