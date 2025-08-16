import { ControlType, registerControlProvider } from '@ibiz-template/runtime';
import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { AppMenuListViewProvider } from './app-menu-list-view.provider';
import { AppMenuListViewControl } from './app-menu-list-view';

export const IBizAppMenuListViewControl = withInstall(
  AppMenuListViewControl,
  function (v: App) {
    v.component(AppMenuListViewControl.name, AppMenuListViewControl);
    registerControlProvider(
      `${ControlType.APP_MENU}_LISTVIEW`,
      () => new AppMenuListViewProvider(),
    );
  },
);

export default IBizAppMenuListViewControl;
