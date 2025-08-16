import { ThemeUtil } from "../../../src/utils/theme-util/theme-util";
import { describe, test, expect, vi } from "vitest";

describe('theme-util', () => {
    test('测试加载主题插件',  async () => {
        (globalThis as any).ibiz = {
            plugin: {
                loadPlugin: vi.fn().mockResolvedValue({}),
            },
        };

        const themeUtil = new ThemeUtil();
        const themeData = {
            name: "主题演示",
            themeParams: {
                "theme-package-path": "@ibiz-template-plugin/demo-theme@0.0.1"
            },
            themeTag: "demo",
            appId: '123456'
        }

        await themeUtil.loadTheme(themeData)

        // head标签下添加demo主题style
        expect(Array.from(document.head.children).reverse().find(item => item.tagName === 'STYLE')?.getAttribute('id')).toBe('demo');
        expect(Array.from(document.head.children).reverse().find(item => item.tagName === 'STYLE')?.innerHTML).toBe(':root.demo{}');

        // html标签theme替换为demo,class中添加demo
        expect(document.getElementsByTagName('html')[0].getAttribute('theme')).toBe('demo');
        expect(Array.from(document.getElementsByTagName('html')[0].classList).find(item => item === 'demo')).toBe('demo')
    })

    test('测试设置主题，对比主题设置是否正确', () => {
        const themeUtil = new ThemeUtil();
        //设置dark主题
        themeUtil.setTheme('dark');
        expect(themeUtil.getTheme()).toBe('dark');

        //设置light主题
        themeUtil.setTheme('light');
        expect(themeUtil.getTheme()).toBe('light');
    });

})