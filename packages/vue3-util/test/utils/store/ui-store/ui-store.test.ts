import { useUIStore } from '../../../../src/util/store/ui-store/ui-store';
import { describe, test, expect, beforeAll } from 'vitest';
import { setActivePinia, createPinia } from 'pinia'
describe('', () => {
    let store: any;
    beforeAll(() => {
        // 单元测试环境下，需要显式的激活pinia
        setActivePinia(createPinia())
        store = useUIStore()
    })

    test('测试zIndex', () => {
        const { zIndex } = store;
        zIndex.increment();
        zIndex.decrement();
        expect(zIndex.zIndex).toBe(500);
    })

    test('测试UIStore属性', () => {
        const { UIStore } = store;
        expect(UIStore.theme).toBe('light');
        UIStore.theme = 'dark';
        expect(UIStore.theme).toBe('dark');
        expect(UIStore.zIndex).toBe(500);
    })
})