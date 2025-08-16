import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { ViewHeaderPanelContainer } from './view-header-panel-container';
import { ViewHeaderPanelContainerProvider } from './view-header-panel-container.provider';

export const IBizViewHeaderPanelContainer = withInstall(
  ViewHeaderPanelContainer,
  function (v: App) {
    v.component(ViewHeaderPanelContainer.name, ViewHeaderPanelContainer);
    registerPanelItemProvider(
      'CONTAINER_HEADER',
      () => new ViewHeaderPanelContainerProvider(),
    );
  },
);

export default IBizViewHeaderPanelContainer;
