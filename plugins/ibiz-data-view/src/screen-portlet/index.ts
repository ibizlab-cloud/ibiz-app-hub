import { registerPortletProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { ScreenPortlet } from './screen-portlet';
import { ScreenPortletProvider } from './screen-portlet.provider';

export const IBizScreenPortlet = withInstall(ScreenPortlet, function (v: App) {
  v.component(ScreenPortlet.name, ScreenPortlet);
  registerPortletProvider(
    'PORTLET_CUSTOM_SCREEN',
    () => new ScreenPortletProvider(),
  );
  registerPortletProvider('CUSTOM_SCREEN', () => new ScreenPortletProvider());
});
