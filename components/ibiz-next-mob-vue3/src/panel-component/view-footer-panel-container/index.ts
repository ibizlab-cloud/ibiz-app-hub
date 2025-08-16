import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { ViewFooterPanelContainer } from './view-footer-panel-container';
import { ViewFooterPanelContainerProvider } from './view-footer-panel-container.provider';

export const IBizViewFooterPanelContainer = withInstall(
  ViewFooterPanelContainer,
  function (v: App) {
    v.component(ViewFooterPanelContainer.name, ViewFooterPanelContainer);
    registerPanelItemProvider(
      'CONTAINER_FOOTER',
      () => new ViewFooterPanelContainerProvider(),
    );
  },
);

export default IBizViewFooterPanelContainer;
