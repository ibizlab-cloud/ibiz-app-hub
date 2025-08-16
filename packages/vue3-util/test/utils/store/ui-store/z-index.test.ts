import { useZIndexStore } from '../../../../src/util/store/ui-store/z-index';
import { describe, test, expect } from 'vitest';

describe('z-index', () => {
    test('测试获取层级', () => {
        const store = useZIndexStore();
        const zIndex = store.zIndex;
        expect(zIndex.value).toBe(500);
    })

    test('测试增加层级', () => {
        const store = useZIndexStore();
        const zIndex = store.increment();
        expect(zIndex).toBe(501);
    })

    test('测试减少层级', () => {
        const store = useZIndexStore();
        const zIndex = store.decrement();
        expect(zIndex).toBeUndefined();
    })
})