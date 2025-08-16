import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { ScreenDashboard } from './screen-dashboard';
import { ScreenDashboardProvider } from './screen-dashboard.provider';

export const IBizScreenDashboard = withInstall(
  ScreenDashboard,
  function (v: App) {
    v.component(ScreenDashboard.name, ScreenDashboard);
    registerControlProvider(
      `${ControlType.DASHBOARD}_SCREEN`,
      () => new ScreenDashboardProvider(),
    );
  },
);
