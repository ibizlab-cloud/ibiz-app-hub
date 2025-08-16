import { App } from 'vue';
import { ControlType, registerControlProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { AppMenuControl } from './app-menu';
import { AppMenuProvider } from './app-menu.provider';

export * from './app-menu.provider';

export const IBizAppMenuControl = withInstall(
  AppMenuControl,
  function (v: App) {
    v.component(AppMenuControl.name!, AppMenuControl);
    registerControlProvider(ControlType.APP_MENU, () => new AppMenuProvider());
  },
);

export default IBizAppMenuControl;
