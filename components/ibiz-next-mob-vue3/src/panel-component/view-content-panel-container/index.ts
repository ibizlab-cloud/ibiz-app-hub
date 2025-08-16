import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { ViewContentPanelContainer } from './view-content-panel-container';
import { ViewContentPanelContainerProvider } from './view-content-panel-container.provider';

export const IBizViewContentPanelContainer = withInstall(
  ViewContentPanelContainer,
  function (v: App) {
    v.component(ViewContentPanelContainer.name!, ViewContentPanelContainer);
    registerPanelItemProvider(
      'CONTAINER_CONTENT',
      () => new ViewContentPanelContainerProvider(),
    );
  },
);

export default IBizViewContentPanelContainer;
