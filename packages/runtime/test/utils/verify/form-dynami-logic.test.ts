import { verifyFormGroupLogic } from '../../../src/utils/verify/form-dynamic-logic';
import { describe, test, expect } from 'vitest';

describe('form-dynamic-logic', () => {
    test('verifyFormGroupLogic:逻辑类型为GROUP时,校验属性值规则,验证逻辑与规则', () => {
        const logic = {
            logicType: 'GROUP',
            defdlogics: [
                {
                    logicType: 'SINGLE',
                    defdname: 'Name',
                    condOP: 'EQ',
                    value: 'Alice',
                },
                {
                    logicType: 'SINGLE',
                    defdname: 'Age',
                    condOP: 'GT',
                    value: 18,
                },
            ],
            groupOP: 'AND',
            notMode: false,
            appId: '123456'
        };
        const result = verifyFormGroupLogic({
            name: 'Alice',
            age: 25,
            email: 'alice@example.com',
        }, logic);
        expect(result).toBe(true);
    });

    test('verifyFormGroupLogic:逻辑类型为GROUP时,校验属性值规则,验证逻辑与规则', () => {
        const logic = {
            logicType: 'GROUP',
            defdlogics: [
                {
                    logicType: 'SINGLE',
                    defdname: 'Name',
                    condOP: 'EQ',
                    value: 'Alice1',
                },
                {
                    logicType: 'SINGLE',
                    defdname: 'Age',
                    condOP: 'GT',
                    value: 18,
                },
            ],
            groupOP: 'AND',
            notMode: false,
            appId: '123456'
        };
        const result = verifyFormGroupLogic({
            name: 'Alice',
            age: 25,
            email: 'alice@example.com',
        }, logic);
        expect(result).toBe(false);
    });

    test('verifyFormGroupLogic:逻辑类型为GROUP时,校验属性值规则,验证逻辑或规则', () => {
        const logic = {
            logicType: 'GROUP',
            defdlogics: [
                {
                    logicType: 'SINGLE',
                    defdname: 'Name',
                    condOP: 'LIKE',
                    value: '',
                },
                {
                    logicType: 'SINGLE',
                    defdname: 'Email',
                    condOP: 'EQ',
                    value: 'alice@example.com',
                },
            ],
            groupOP: 'OR',
            notMode: false,
            appId: '123456'
        };

        const result = verifyFormGroupLogic({
            name: 'Alice',
            age: 25,
            email: 'alice@example.com',
        }, logic);
        expect(result).toBe(true);
    });

    test('verifyFormGroupLogic:逻辑类型为GROUP时,校验属性值规则,验证逻辑或规则', () => {
        // 验证逻辑或
        const logic = {
            logicType: 'GROUP',
            defdlogics: [
                {
                    logicType: 'SINGLE',
                    defdname: 'Name',
                    condOP: 'EQ',
                    value: 'Bob',
                },
                {
                    logicType: 'SINGLE',
                    defdname: 'Email',
                    condOP: 'EQ',
                    value: 'bob@example.com',
                },
            ],
            groupOP: 'OR',
            notMode: false,
            appId: '123456'
        };

        const result = verifyFormGroupLogic({
            name: 'Alice',
            age: 25,
            email: 'alice@example.com',
        }, logic);
        expect(result).toBe(false);
    });

    test('verifyFormGroupLogic:逻辑类型为GROUP时,校验属性值规则,当逻辑组为空时,抛出错误', () => {
        const logic = {
            logicType: 'GROUP',
            appId: '123456',
            panelItemLogics: []
        }

        expect(() => { verifyFormGroupLogic({}, logic) }).toThrowError();
    })

    test('verifyFormGroupLogic:逻辑类型即不是GROUP又不是SINGLE时,抛出错误', () => {
        const logic = {
            logicType: 'test',
            appId: '123456'
        }

        expect(() => { verifyFormGroupLogic({}, logic) }).toThrowError('')
    })
})
