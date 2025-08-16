import { verifyPanelGroupLogic } from '../../../src/utils/verify/panel-dynamic-logic';
import { describe, test, expect } from 'vitest';

describe('panel-dynamic-logic', () => {
    test('verifyDeRules:逻辑类型为GROUP时,校验属性值规则,验证逻辑与规则', () => {
        const logic = {
            logicType: 'GROUP',
            panelItemLogics: [
                {
                    logicType: 'SINGLE',
                    dstModelField: 'Name',
                    condOp: 'EQ',
                    value: 'Alice',
                },
                {
                    logicType: 'SINGLE',
                    dstModelField: 'Name',
                    condOp: 'EQ',
                    value: 'Alice',
                },
            ],
            groupOP: 'AND',
            notMode: false,
            appId: '123456'
        };
        const result = verifyPanelGroupLogic({
            name: 'Alice',
            age: 25,
            email: 'alice@example.com',
        }, logic);
        expect(result).toBe(true);
    });

    test('verifyDeRules:逻辑类型为GROUP时,校验属性值规则,验证逻辑与规则', () => {
        const logic = {
            logicType: 'GROUP',
            panelItemLogics: [
                {
                    logicType: 'SINGLE',
                    dstModelField: 'Name',
                    condOp: 'EQ',
                    value: 'Alice1',
                },
                {
                    logicType: 'SINGLE',
                    dstModelField: 'Name',
                    condOp: 'EQ',
                    value: 'Alice',
                },
            ],
            groupOP: 'AND',
            notMode: false,
            appId: '123456'
        };
        const result = verifyPanelGroupLogic({
            name: 'Alice',
            age: 25,
            email: 'alice@example.com',
        }, logic);
        expect(result).toBe(false);
    });

    test('verifyDeRules:逻辑类型为GROUP时,校验属性值规则,验证逻辑或规则', () => {
        const logic = {
            logicType: 'GROUP',
            panelItemLogics: [
                {
                    logicType: 'SINGLE',
                    dstModelField: 'Email',
                    condOp: 'EQ',
                    value: 'alice@example.com',
                },
                {
                    logicType: 'SINGLE',
                    dstModelField: 'Email',
                    condOp: 'EQ',
                    value: 'alice@example.com1',
                },
            ],
            groupOP: 'OR',
            notMode: false,
            appId: '123456'
        };

        const result = verifyPanelGroupLogic({
            name: 'Alice',
            age: 25,
            email: 'alice@example.com',
        }, logic);
        expect(result).toBe(true);
    });

    test('verifyDeRules:逻辑类型为GROUP时,校验属性值规则,验证逻辑或规则', () => {
        // 验证逻辑或
        const logic = {
            logicType: 'GROUP',
            panelItemLogics: [
                {
                    logicType: 'SINGLE',
                    dstModelField: 'Email',
                    condOp: 'EQ',
                    value: 'alice@example.com1',
                },
                {
                    logicType: 'SINGLE',
                    dstModelField: 'Email',
                    condOp: 'EQ',
                    value: 'alice@example.com1',
                },
            ],
            groupOP: 'OR',
            notMode: false,
            appId: '123456'
        };

        const result = verifyPanelGroupLogic({
            name: 'Alice',
            age: 25,
            email: 'alice@example.com',
        }, logic);
        expect(result).toBe(false);
    });

    test('verifyDeRules:逻辑类型为GROUP时,校验属性值规则,当逻辑组为空时,抛出错误', () => {
        const logic = {
            logicType: 'GROUP',
            appId: '123456',
            panelItemLogics: []
        }

        expect(() => { verifyPanelGroupLogic({}, logic) }).toThrowError();
    })

    test('verifyDeRules:逻辑类型即不是GROUP又不是SINGLE时,抛出错误', () => {
        const logic = {
            logicType: 'test',
            appId: '123456'
        }

        expect(() => { verifyPanelGroupLogic({}, logic) }).toThrowError('')
    })
})
