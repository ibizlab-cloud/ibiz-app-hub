import { routerCallback } from '../../../src/util/router-callback/router-callback';
import { describe, test, expect } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router'

describe('router-callback', () => {
    test('测试打开视图,关闭视图', () => {
        const router = createRouter({
            history: createWebHistory(),
            routes: [],
        })
        const path = '/'
        // 打开视图
        const dismiss = routerCallback.open(router, path);
        setTimeout(() => {
            const modalData = { message: 'Modal closed successfully', ok: true };
            // 执行关闭视图
            routerCallback.close(path, modalData);
            expect(dismiss).resolves.toEqual(modalData);
        }, 200)
    })

    test('测试打开视图,超过一分钟后关闭视图报错', () => {
        const router = createRouter({
            history: createWebHistory(),
            routes: [],
        })
        const path = '/'
        // 打开视图
        const dismiss = routerCallback.open(router, path);
        setTimeout(() => {
            const modalData = { message: 'Modal closed successfully', ok: true };
            // 执行关闭视图 报错
            expect(() => { routerCallback.close(path, modalData) }).toThrowError();
            expect(dismiss).resolves.toThrowError();
        }, 11 * 1000)
    })


    test('测试打开视图,激活回调后超过一分钟关闭视图', () => {
        const router = createRouter({
            history: createWebHistory(),
            routes: [],
        })
        const path = '/'
        // 打开视图
        const dismiss = routerCallback.open(router, path);
        // 激活回调
        routerCallback.active(path);
        setTimeout(() => {
            const modalData = { message: 'Modal closed successfully', ok: true };
            // 执行关闭视图
            routerCallback.close(path, modalData);
            expect(dismiss).resolves.toEqual(modalData);
        }, 11 * 1000)
    })
})