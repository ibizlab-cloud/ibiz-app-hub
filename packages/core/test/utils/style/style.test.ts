import { describe, test, expect, vi } from 'vitest'
import { setRemoteStyle } from '../../../src/utils/style/remote-style'

describe('style', () => {
    test('成功添加style', async () => {
        (globalThis as any).ibiz = {
            net: {
                get: vi.fn().mockResolvedValue({ data: 'body { background-color: red; }' }),
            },
            log: { debug: vi.fn() },
        };

        const url = 'https://example.com/style.css';
        await setRemoteStyle(url);

        expect((globalThis as any).ibiz.net.get).toHaveBeenCalledWith(url);
        expect((globalThis as any).ibiz.log.debug).not.toHaveBeenCalledWith();
        expect(Array.from(document.head.children).reverse().find(item => item.tagName === 'STYLE')?.getAttribute('title')).toBe('app-style-css');
        expect(Array.from(document.head.children).reverse().find(item => item.tagName === 'STYLE')?.innerHTML).toBe('body { background-color: red; }');
    });

    test('未成功添加style', async () => {
        (globalThis as any).ibiz = {
            net: {
                get: vi.fn().mockRejectedValue(new Error('Failed to fetch')),
            },
            log: { debug: vi.fn() },
        };

        const url = 'https://example.com/style.css';
        await setRemoteStyle(url);

        expect((globalThis as any).ibiz.net.get).toHaveBeenCalledWith(url);
        expect((globalThis as any).ibiz.log.debug).toHaveBeenCalledWith('加载远程样式表失败', url);
    });
});