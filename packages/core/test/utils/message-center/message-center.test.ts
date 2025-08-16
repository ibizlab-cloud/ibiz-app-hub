import { IPortalMessage } from '../../../src/interface';
import { MessageCenter } from '../../../src/utils/message-center';
import { describe, expect, test, vi } from 'vitest'

describe('message-center', () => {
    test('测试类型为OBJECTCREATED时,事件从父往子触发', () => {
        const mc = new MessageCenter();
        const changeTest = vi.fn();
        const createTest = vi.fn();

        const commandTest = vi.fn();
        const mcTest = vi.fn();

        mc.command.change.on(changeTest);
        mc.command.create.on(createTest);
        mc.command.on(commandTest);
        mc.on(mcTest);

        const data1: IPortalMessage = {
            messageid: '',
            type: 'COMMAND',
            subtype: 'OBJECTCREATED'
        }

        mc.next(data1)

        expect(createTest).toHaveBeenCalled();
        expect(changeTest).toHaveBeenCalled();
        expect(commandTest).toHaveBeenCalled();
        expect(mcTest).toHaveBeenCalled();

    })

    test('测试类型为OBJECTCREATED时,事件从子往父触发', () => {
        const mc = new MessageCenter();
        const data = {
            test: 'data'
        }
        const changeTest = vi.fn();
        const createTest = vi.fn();

        const commandTest = vi.fn();
        const mcTest = vi.fn();

        mc.command.change.on(changeTest);
        mc.command.create.on(createTest);
        mc.command.on(commandTest);
        mc.on(mcTest);

        mc.command.send(data, 'OBJECTCREATED');

        expect(createTest).toHaveBeenCalled();
        expect(changeTest).toHaveBeenCalled();
        expect(commandTest).toHaveBeenCalled();
        expect(mcTest).toHaveBeenCalled();

    })

    test('测试类型为OBJECTUPDATED时,事件从父往子触发', () => {
        const mc = new MessageCenter();
        const changeTest = vi.fn();
        const updateTest = vi.fn();

        const commandTest = vi.fn();
        const mcTest = vi.fn();

        mc.command.change.on(changeTest);
        mc.command.update.on(updateTest);
        mc.command.on(commandTest);
        mc.on(mcTest);

        const data1: IPortalMessage = {
            messageid: '',
            type: 'COMMAND',
            subtype: 'OBJECTUPDATED'
        }

        mc.next(data1)

        expect(updateTest).toHaveBeenCalled();
        expect(changeTest).toHaveBeenCalled();
        expect(commandTest).toHaveBeenCalled();
        expect(mcTest).toHaveBeenCalled();
    })

    test('测试类型为OBJECTUPDATED时,事件从子往父触发', () => {
        const mc = new MessageCenter();
        const data = {
            test: 'data'
        }
        const changeTest = vi.fn();
        const updateTest = vi.fn();

        const commandTest = vi.fn();
        const mcTest = vi.fn();

        mc.command.change.on(changeTest);
        mc.command.update.on(updateTest);
        mc.command.on(commandTest);
        mc.on(mcTest);

        mc.command.send(data, 'OBJECTUPDATED');

        expect(updateTest).toHaveBeenCalled();
        expect(changeTest).toHaveBeenCalled();
        expect(commandTest).toHaveBeenCalled();
        expect(mcTest).toHaveBeenCalled();
    })

    test('测试类型为OBJECTREMOVED时,事件从父往子触发', () => {
        const mc = new MessageCenter();

        const removeTest = vi.fn();
        const updateTest = vi.fn();

        const commandTest = vi.fn();
        const mcTest = vi.fn();

        mc.command.change.on(removeTest);
        mc.command.remove.on(updateTest);
        mc.command.on(commandTest);
        mc.on(mcTest);

        const data1: IPortalMessage = {
            messageid: '',
            type: 'COMMAND',
            subtype: 'OBJECTREMOVED'
        }

        mc.next(data1)

        expect(updateTest).toHaveBeenCalled();
        expect(removeTest).toHaveBeenCalled();
        expect(commandTest).toHaveBeenCalled();
        expect(mcTest).toHaveBeenCalled();
    })

    test('测试类型为OBJECTREMOVED时,事件从子往父触发', () => {
        const mc = new MessageCenter();
        const data = {
            test: 'data'
        }
        const removeTest = vi.fn();
        const updateTest = vi.fn();

        const commandTest = vi.fn();
        const mcTest = vi.fn();

        mc.command.change.on(removeTest);
        mc.command.remove.on(updateTest);
        mc.command.on(commandTest);
        mc.on(mcTest);

        mc.command.send(data, 'OBJECTREMOVED');

        expect(updateTest).toHaveBeenCalled();
        expect(removeTest).toHaveBeenCalled();
        expect(commandTest).toHaveBeenCalled();
        expect(mcTest).toHaveBeenCalled();
    })

    test('测试类型为ASYNCACTION时,事件从父往子触发', () => {
        const mc = new MessageCenter();

        const asyncActionTest = vi.fn();

        const commandTest = vi.fn();
        const mcTest = vi.fn();

        mc.command.asyncAction.on(asyncActionTest);
        mc.command.on(commandTest);
        mc.on(mcTest);

        const data1: IPortalMessage = {
            messageid: '',
            type: 'COMMAND',
            subtype: 'ASYNCACTION'
        }

        mc.next(data1);

        expect(asyncActionTest).toHaveBeenCalled();
        expect(commandTest).toHaveBeenCalled();
        expect(mcTest).toHaveBeenCalled();
    })

    test('测试类型为ASYNCACTION时,事件从子往父触发', () => {
        const mc = new MessageCenter();
        const data = {
            test: 'data'
        }
        const asyncActionTest = vi.fn();

        const commandTest = vi.fn();
        const mcTest = vi.fn();

        mc.command.asyncAction.on(asyncActionTest);
        mc.command.on(commandTest);
        mc.on(mcTest);

        mc.command.send(data, 'ASYNCACTION');

        expect(asyncActionTest).toHaveBeenCalled();
        expect(commandTest).toHaveBeenCalled();
        expect(mcTest).toHaveBeenCalled();
    })

    test('测试类型为INTERNALMESSAGE时,事件从父往子触发', () => {
        const mc = new MessageCenter();

        const internalMessageTest = vi.fn();

        const commandTest = vi.fn();
        const mcTest = vi.fn();

        mc.command.internalMessage.on(internalMessageTest);
        mc.command.on(commandTest);
        mc.on(mcTest);

        const data1: IPortalMessage = {
            messageid: '',
            type: 'COMMAND',
            subtype: 'INTERNALMESSAGE'
        }

        mc.next(data1);

        expect(internalMessageTest).toHaveBeenCalled();
        expect(commandTest).toHaveBeenCalled();
        expect(mcTest).toHaveBeenCalled();
    })

    test('测试类型为INTERNALMESSAGE时,事件从子往父触发', () => {
        const mc = new MessageCenter();
        const data = {
            test: 'data'
        }
        const internalMessageTest = vi.fn();

        const commandTest = vi.fn();
        const mcTest = vi.fn();

        mc.command.internalMessage.on(internalMessageTest);
        mc.command.on(commandTest);
        mc.on(mcTest);

        mc.command.send(data, 'INTERNALMESSAGE');

        expect(internalMessageTest).toHaveBeenCalled();
        expect(commandTest).toHaveBeenCalled();
        expect(mcTest).toHaveBeenCalled();
    })

    test('测试类型为MARKOPENDATA时,事件从父往子触发', () => {
        const mc = new MessageCenter();

        const markOpenDataTest = vi.fn();

        const commandTest = vi.fn();
        const mcTest = vi.fn();

        mc.command.markOpenData.on(markOpenDataTest);
        mc.command.on(commandTest);
        mc.on(mcTest);

        const data1: IPortalMessage = {
            messageid: '',
            type: 'COMMAND',
            subtype: 'MARKOPENDATA'
        }

        mc.next(data1);

        expect(markOpenDataTest).toHaveBeenCalled();
        expect(commandTest).toHaveBeenCalled();
        expect(mcTest).toHaveBeenCalled();
    })

    test('测试类型为MARKOPENDATA时,事件从子往父触发', () => {
        const mc = new MessageCenter();
        const data = {
            test: 'data'
        }
        const markOpenDataTest = vi.fn();

        const commandTest = vi.fn();
        const mcTest = vi.fn();

        mc.command.markOpenData.on(markOpenDataTest);
        mc.command.on(commandTest);
        mc.on(mcTest);

        mc.command.send(data, 'MARKOPENDATA');

        expect(markOpenDataTest).toHaveBeenCalled();
        expect(commandTest).toHaveBeenCalled();
        expect(mcTest).toHaveBeenCalled();
    })
});

