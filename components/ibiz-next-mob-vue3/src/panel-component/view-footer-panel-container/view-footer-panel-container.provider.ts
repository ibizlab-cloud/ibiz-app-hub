import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { IPanelContainer } from '@ibiz/model-core';
import { PanelContainerController } from '@ibiz-template/vue3-util';

/**
 * 视图底部适配器
 *
 * @author chitanda
 * @date 2023-06-16 11:06:38
 * @export
 * @class ViewFooterPanelContainerProvider
 * @implements {IPanelItemProvider}
 */
export class ViewFooterPanelContainerProvider implements IPanelItemProvider {
  component: string = 'IBizViewFooterPanelContainer';

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
