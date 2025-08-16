import { App } from 'vue';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { ScreenPanelContainer } from './screen-panel-container';
import { ScreenPanelContainerProvider } from './screen-panel-container.provider';

export const IBizScreenPanelContainer = withInstall(
  ScreenPanelContainer,
  function (v: App) {
    v.component(ScreenPanelContainer.name, ScreenPanelContainer);
    registerPanelItemProvider(
      'CUSTOM_SCREEN_PANEL_CONTAINER',
      () => new ScreenPanelContainerProvider(),
    );
  },
);
