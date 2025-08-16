import { mergeAppMenu } from '../../src/utils/merge-model/merge-app-menu';
import { describe, test, expect } from 'vitest';

describe('merge-model', () => {
    test('主菜单项不为空时子菜单项不为空时', () => {
        const mainMenu = {
            appMenuItems: [
                { id: '1', name: 'Menu 1', appId: '123456' },
                { id: '2', name: 'Menu 2', appId: '123456' }
            ],
            appId: '123456'
        };

        const subAppRefs = [
            {
                appMenuModel: {
                    appMenuItems: [
                        { id: '2', name: 'Updated Menu 2', appId: '654321' },
                        { id: '3', name: 'New Menu 3', appId: '654321' }
                    ],
                    appId: '654321'
                },
                appId: '654321'
            }
        ];

        mergeAppMenu(mainMenu, subAppRefs);

        expect(mainMenu.appMenuItems).toEqual([
            { id: '1', name: 'Menu 1', appId: '123456' },
            { id: '2', name: 'Updated Menu 2', appId: '654321' },
            { id: '3', name: 'New Menu 3', appId: '654321' }
        ]);
    });

    test('主菜单项不为空时子菜单项为空时', () => {
        const mainMenu = {
            appMenuItems: [
                { id: '1', name: 'Menu 1', appId: '123456' },
                { id: '2', name: 'Menu 2', appId: '123456' }
            ],
            appId: '123456'
        };

        const subAppRefs = [
            {
                appMenuModel: {
                    appMenuItems: [],
                    appId: '654321'
                },
                appId: '654321'
            }
        ];

        mergeAppMenu(mainMenu, subAppRefs);

        expect(mainMenu.appMenuItems).toEqual([
            { id: '1', name: 'Menu 1', appId: '123456' },
            { id: '2', name: 'Menu 2', appId: '123456' },
        ]);
    });

    test('主菜单项为空时子菜单项不为空时', () => {
        const mainMenu = { appId: '123456' };
        const subAppRefs = [
            {
                appMenuModel: {
                    appMenuItems: [
                        { id: '1', name: 'Menu 1', appId: '123456' },
                        { id: '2', name: 'Menu 2', appId: '123456' }
                    ],
                    appId: '123456'
                },
                appId: '123456'
            }
        ];

        mergeAppMenu(mainMenu, subAppRefs);

        expect(mainMenu).toEqual({
            appMenuItems: [
                { id: '1', name: 'Menu 1', appId: '123456' },
                { id: '2', name: 'Menu 2', appId: '123456' }
            ],
            appId: '123456'
        });
    });

    test('主菜单项为空时子菜单项为空时', () => {
        const mainMenu = { appId: '123456' };
        const subAppRefs = [];

        mergeAppMenu(mainMenu, subAppRefs);

        expect(mainMenu).toEqual({ appId: '123456' });
    });
})