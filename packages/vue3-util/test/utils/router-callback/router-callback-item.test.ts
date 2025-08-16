import { RouterCallbackItem } from '../../../src/util/router-callback/router-callback-item';
import { describe, test, expect, beforeEach, vi } from 'vitest';

describe('router-callback-item', () => {
    test('测试构造函数', () => {
        const from = 'from';
        const to = 'to';
        const routerCallbackItem = new RouterCallbackItem(from, to);
        // 传入值是否相等
        expect(routerCallbackItem.from).toBe(from);
        expect(routerCallbackItem.to).toBe(to);
    });


    test('测试等待视图关闭和关闭视图', () => {
        const from = 'from';
        const to = 'to';
        const routerCallbackItem = new RouterCallbackItem(from, to);

        // 等待视图关闭，并处理返回的数据
        routerCallbackItem.onWillDismiss();
        setTimeout(() => {
            const modalData = { message: 'Modal closed successfully', ok: true };
            // 执行视图关闭
            expect(routerCallbackItem.close(modalData)).toEqual(modalData);
        }, 200);
    })

    test('测试激活回调', () => {
        const from = 'from';
        const to = 'to';
        const routerCallbackItem = new RouterCallbackItem(from, to);

        expect(routerCallbackItem.isActivated).toBe(false);
        routerCallbackItem.active();
        expect(routerCallbackItem.isActivated).toBe(true);
    })

    test('测试销毁回调', () => {
        const from = 'from';
        const to = 'to';
        const routerCallbackItem = new RouterCallbackItem(from, to);

        // 等待视图关闭，并处理返回的数据
        routerCallbackItem.onWillDismiss();

        setTimeout(() => {
            const modalData = { ok: false };
            // 执行视图销毁
            expect(routerCallbackItem.destroy()).toEqual(modalData);
        }, 200);
    })
})