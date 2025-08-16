import { IAppView } from '@ibiz/model-core';
import { IViewController, IViewEvent, IViewState } from '../../../src/interface';
import { ViewStack } from '../../../src/utils/view-stack/view-stack';
import { describe, test, expect, vi } from 'vitest';

describe('viewstack', () => {

    test('ViewStack:测试添加视图事件触发', () => {
        const viewStack = new ViewStack();
        const addEvt = vi.fn();
        const changeEvt = vi.fn();
        // 监听add,change事件
        viewStack.evt.on('add', addEvt);
        viewStack.evt.on('change', changeEvt)

        const c = { id: '123456' } as IViewController<IAppView, IViewState, IViewEvent>;
        // 添加视图到视图堆栈
        viewStack.add(c.id, c);

        // 测试触发add,change事件
        expect(addEvt).toHaveBeenCalled()
        expect(changeEvt).toHaveBeenCalled()
     
    })

    test('ViewStack:测试删除视图事件触发', () => {
        const viewStack = new ViewStack();
        const removeEvt = vi.fn();
        const changeEvt = vi.fn();
        // 监听remove,change事件
        viewStack.evt.on('remove', removeEvt);
        viewStack.evt.on('change', changeEvt)

        const c = { id: '123456' } as IViewController<IAppView, IViewState, IViewEvent>;
        // 添加视图到视图堆栈
        viewStack.add(c.id, c);

        viewStack.remove(c.id);

        // 测试触发remove,change事件
        expect(removeEvt).toHaveBeenCalled()
        expect(changeEvt).toHaveBeenCalled()
     
    })

    test('ViewStack:测试激活视图事件触发', () => {
        const viewStack = new ViewStack();
        const activeEvt = vi.fn();
        const changeEvt = vi.fn();
        // 监听active,change事件
        viewStack.evt.on('active', activeEvt);
        viewStack.evt.on('change', changeEvt)

        const c = { id: '123456' } as IViewController<IAppView, IViewState, IViewEvent>;
        // 添加视图到视图堆栈
        viewStack.add(c.id, c);

        viewStack.active(c.id);

        // 测试触发active,change事件
        expect(activeEvt).toHaveBeenCalled()
        expect(changeEvt).toHaveBeenCalled()
     
    })


    test('ViewStack:测试未激活视图事件触发', () => {
        const viewStack = new ViewStack();
        const deactivateEvt = vi.fn();
        const changeEvt = vi.fn();
        // 监听deactivate,change事件
        viewStack.evt.on('deactivate', deactivateEvt);
        viewStack.evt.on('change', changeEvt)

        const c = { id: '123456' } as IViewController<IAppView, IViewState, IViewEvent>;
        // 添加视图到视图堆栈
        viewStack.add(c.id, c);

        viewStack.deactivate(c.id);

        // 测试触发deactivateEvt,change事件
        expect(deactivateEvt).toHaveBeenCalled()
        expect(changeEvt).toHaveBeenCalled()
     
    })


    test('ViewStack:测试获取已激活视图', () => {
        const viewStack = new ViewStack();
        const c = { id: '123456' } as IViewController<IAppView, IViewState, IViewEvent>;
        // 添加视图到视图堆栈
        viewStack.add(c.id, c);
        // 已激活视图为空数组
        expect(viewStack.getActives()).toEqual([]);
        // 激活已经添加视图
        Object.assign(c, { isActive: true })
        viewStack.active(c.id);
        // 已激活视图一个
        expect(viewStack.getActives()).toEqual([{ id: '123456', isActive: true }]);
        const c1 = { id: '654321' } as IViewController<IAppView, IViewState, IViewEvent>;
        // 添加额外视图
        viewStack.add(c1.id, c1);
        expect(viewStack.getActives()).toEqual([{ id: '123456', isActive: true }]);
        // 激活已经添加视图
        Object.assign(c1, { isActive: true })
        viewStack.active(c1.id);
        expect(viewStack.getActives()).toEqual([{ id: '123456', isActive: true }, { id: '654321', isActive: true }])
        // 依次删除视图
        viewStack.remove(c.id)
        expect(viewStack.getActives()).toEqual([{ id: '654321', isActive: true }]);
        viewStack.remove(c1.id);
        // 已激活视图为空数组
        expect(viewStack.getActives()).toEqual([]);
    })
})