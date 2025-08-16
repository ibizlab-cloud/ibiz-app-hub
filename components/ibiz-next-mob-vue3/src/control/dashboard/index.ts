import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { DashboardControl } from './dashboard';
import { DashboardProvider } from './dashboard.provider';
import {
  IBizContainerPortlet,
  IBizMenuPortlet,
  IBizListPortlet,
  IBizViewPortlet,
  PortletLayout,
} from './portlet';

export * from './dashboard.provider';
export * from './portlet';

export const IBizDashboardControl = withInstall(
  DashboardControl,
  function (v: App) {
    v.component(DashboardControl.name, DashboardControl);
    registerControlProvider(
      ControlType.DASHBOARD,
      () => new DashboardProvider(),
    );
    v.component(PortletLayout.name, PortletLayout);
    v.use(IBizContainerPortlet);
    v.use(IBizMenuPortlet);
    v.use(IBizListPortlet);
    v.use(IBizViewPortlet);
  },
);

export default IBizDashboardControl;
