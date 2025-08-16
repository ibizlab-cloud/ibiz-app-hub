import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { IPanelContainer } from '@ibiz/model-core';
import { PanelContainerController } from '../panel-container/panel-container.controller';

/**
 * 面板图片容器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class PanelContainerTabsProvider
 * @implements {EditorProvider}
 */
export class PanelContainerTabsProvider implements IPanelItemProvider {
  component: string = 'IBizPanelContainerTabs';

  async createController(
    panelItem: IPanelContainer,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<PanelItemController> {
    const c = new PanelContainerController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
