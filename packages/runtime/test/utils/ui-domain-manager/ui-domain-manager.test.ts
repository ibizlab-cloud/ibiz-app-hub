import { UIDomainManager } from '../../../src/utils/ui-domain-manager/ui-domain-manager';
import { describe, test, expect } from 'vitest';

describe('ui-domain-manager', () => {
    test('UIDomainManager:测试创建域，并获取域', () => {
        const uiDomainManager = new UIDomainManager();
        const id = '123456';
        const domain = uiDomainManager.create(id);
        expect(uiDomainManager.get(id)).toBe(domain);
    })

    test('UIDomainManager:测试创建域，并删除域', () => {
        const uiDomainManager = new UIDomainManager();
        const id = '123456';
        const domain = uiDomainManager.create(id);
        expect(uiDomainManager.get(id)).toBe(domain);

        uiDomainManager.destroy(id);
        expect(()=>{uiDomainManager.get(id)}).toThrowError();
    })
})