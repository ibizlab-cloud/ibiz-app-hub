import { UIDomain } from '../../../src/utils/ui-domain/ui-domain';
import { describe, test, expect } from 'vitest';

describe('ui-domain', () => {
    test('测试获取界面域id', () => {
        const id = '123456';
        const uiDomain = new UIDomain(id);
        expect(uiDomain.id).toBe(id);
    })

    test('测试设置DTO 子父关系映射及取出DTO 子父关系映射', () => {
        const id = '123456';
        const uiDomain = new UIDomain(id);

        const appDataEntityId = 'test1';
        const configs = [
            {
                actionRSMode: 1,
                codeName: "TEST",
                dataRSMode: 0,
                majorDECodeName: "TEST",
                majorDEName: "TEST",
                appId: '123456'
            }
        ];

        // 未设置时,查找返回空数组
        expect(uiDomain.getDERConfig(appDataEntityId)).toEqual([]);
        // 通过setDERConfig，设置DTO 子父关系映射
        uiDomain.setDERConfig(appDataEntityId, configs);
        // 设置完通过id查找，返回id对应的数组
        expect(uiDomain.getDERConfig(appDataEntityId)).toEqual([{
            actionRSMode: 1,
            codeName: "TEST",
            dataRSMode: 0,
            majorDECodeName: "TEST",
            majorDEName: "TEST",
            appId: '123456'
        }]);
    })

    test('测试设置DTO 父子关系映射及取出DTO 父子关系映射', () => {
        const id = '123456';
        const uiDomain = new UIDomain(id);

        const appDataEntityId = 'test1';
        const configs = [
            {
                actionRSMode: 1,
                codeName: "TEST",
                dataRSMode: 0,
                majorAppDataEntityId: '11111',
                majorDECodeName: "TEST",
                majorDEName: "TEST",
                appId: '123456'
            },
        ];

        // 通过setDERConfig，设置DTO 子父关系映射
        uiDomain.setDERConfig(appDataEntityId, configs);
        // 未设置DTO 父子关系映射,查询返回空数组
        expect(uiDomain.getDERConfigByMajor(configs[0].majorAppDataEntityId)).toEqual([]);
        // 通过calcParentRs,设置DTO 父子关系映射
        uiDomain.calcParentRs();
        // 设置DTO 父子关系映射,查询添加了minorAppDataEntityId属性对应数组
        expect(uiDomain.getDERConfigByMajor(configs[0].majorAppDataEntityId)).toEqual([
            {
                actionRSMode: 1,
                codeName: "TEST",
                dataRSMode: 0,
                majorAppDataEntityId: '11111',
                majorDECodeName: "TEST",
                majorDEName: "TEST",
                appId: '123456',
                minorAppDataEntityId: "test1",
            },
        ]);
    })

    test('测试界面域销毁', () => {
        const id = '123456';
        const uiDomain = new UIDomain(id);

        const appDataEntityId = 'test1';
        const configs = [
            {
                actionRSMode: 1,
                codeName: "TEST",
                dataRSMode: 0,
                majorAppDataEntityId: '11111',
                majorDECodeName: "TEST",
                majorDEName: "TEST",
                appId: '123456'
            }
        ];

        // 通过setDERConfig，设置DTO 子父关系映射
        uiDomain.setDERConfig(appDataEntityId, configs);
        // 设置完通过id查找，返回id对应的数组
        expect(uiDomain.getDERConfig(appDataEntityId)).toEqual([{
            actionRSMode: 1,
            codeName: "TEST",
            dataRSMode: 0,
            majorAppDataEntityId: '11111',
            majorDECodeName: "TEST",
            majorDEName: "TEST",
            appId: '123456'
        }]);
        // 清空当前域下的父子关系映射
        uiDomain.destroy();
        // 清空后通过id查找，返回空数组
        expect(uiDomain.getDERConfig(appDataEntityId)).toEqual([])
    })
})