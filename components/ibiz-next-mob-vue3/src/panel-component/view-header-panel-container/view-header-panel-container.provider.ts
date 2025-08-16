import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { IPanelContainer } from '@ibiz/model-core';
import { PanelContainerController } from '@ibiz-template/vue3-util';

/**
 * 视图内容区适配器
 *
 * @author chitanda
 * @date 2023-06-16 11:06:38
 * @export
 * @class ViewHeaderPanelContainerProvider
 * @implements {IPanelItemProvider}
 */
export class ViewHeaderPanelContainerProvider implements IPanelItemProvider {
  component: string = 'IBizViewHeaderPanelContainer';

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
