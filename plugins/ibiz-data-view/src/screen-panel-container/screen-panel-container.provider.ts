import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { IPanelContainer } from '@ibiz/model-core';
import { ScreenPanelContainerController } from './screen-panel-container.controller';

/**
 * 面板容器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class ScreenPanelContainerProvider
 * @implements {EditorProvider}
 */
export class ScreenPanelContainerProvider implements IPanelItemProvider {
  component: string = 'ScreenPanelContainer';

  async createController(
    panelItem: IPanelContainer,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<PanelItemController> {
    const c = new ScreenPanelContainerController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
