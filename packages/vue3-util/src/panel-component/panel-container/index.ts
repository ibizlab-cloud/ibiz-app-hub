import { App } from 'vue';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '../../util';
import { PanelContainer } from './panel-container';
import { PanelContainerProvider } from './panel-container.provider';
import { PanelContainerState } from './panel-container.state';
import { PanelContainerController } from './panel-container.controller';

export { PanelContainerState, PanelContainerController };

export const IBizPanelContainer = withInstall(
  PanelContainer,
  function (v: App) {
    v.component(PanelContainer.name!, PanelContainer);
    registerPanelItemProvider('CONTAINER', () => new PanelContainerProvider());
    registerPanelItemProvider(
      'CONTAINER_DEFAULT',
      () => new PanelContainerProvider(),
    );
    // registerPanelItemProvider(
    //   'CONTAINER_CONTAINER_GRID',
    //   () => new PanelContainerProvider(),
    // );
  },
);

export default IBizPanelContainer;
