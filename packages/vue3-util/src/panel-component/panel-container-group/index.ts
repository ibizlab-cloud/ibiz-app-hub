import { App } from 'vue';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { PanelContainerGroupState } from './panel-container-group.state';
import { PanelContainerGroupProvider } from './panel-container-group.provider';
import { PanelContainerGroupController } from './panel-container-group.controller';
import { PanelContainerGroup } from './panel-container-group';
import { withInstall } from '../../util';

export { PanelContainerGroupState, PanelContainerGroupController };

export const IBizPanelContainerGroup = withInstall(
  PanelContainerGroup,
  function (v: App) {
    v.component(PanelContainerGroup.name!, PanelContainerGroup);
    registerPanelItemProvider(
      'CONTAINER_CONTAINER_GROUP',
      () => new PanelContainerGroupProvider(),
    );
  },
);

export default IBizPanelContainerGroup;
