import { RouteListener } from '../../../src/util/route/route-listener';
import { describe, test, expect, vi } from 'vitest';
import { nextTick, reactive } from 'vue';

describe('RouteListener', () => {
    test('should execute callback once on next route change', async () => {
        const mockCallback = vi.fn();
        const mockCallback1 = vi.fn();
        const route: any = { path: '/home' };
        const routeData = reactive(route);
        const waitTime = 500;

        const routeListener = new RouteListener(routeData, waitTime);
        routeListener.nextChange(mockCallback);
        routeListener.nextChange(mockCallback1);

        // 改变path
        routeData.path = '/about';
        await nextTick();
        // 回调函数被执行一次
        expect(mockCallback).toHaveBeenCalledTimes(1);
        expect(mockCallback1).toHaveBeenCalledTimes(1);
    });

});
