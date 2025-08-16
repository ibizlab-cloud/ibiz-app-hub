import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { registerPortletProvider } from '@ibiz-template/runtime';
import { ScreenPortletRealTime } from './screen-portlet-real-time';
import { ScreenPortletRealTimeProvider } from './screen-portlet-real-time.provider';

export const IBizScreenPortletRealTime = withInstall(
  ScreenPortletRealTime,
  function (v: App) {
    v.component(ScreenPortletRealTime.name, ScreenPortletRealTime);
    registerPortletProvider(
      'PORTLET_CUSTOM_SCREEN_PORTLET_REAL_TIME',
      () => new ScreenPortletRealTimeProvider(),
    );
  },
);
