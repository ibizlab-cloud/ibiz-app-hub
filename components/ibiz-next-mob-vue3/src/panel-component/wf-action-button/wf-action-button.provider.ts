import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { IPanelItem } from '@ibiz/model-core';
import { WFActionButtonController } from './wf-action-button.controller';

/**
 * 面板按钮适配器
 *
 * @export
 * @class PanelButtonProvider
 * @implements {IPanelItemProvider}
 */
export class WFActionButtonProvider implements IPanelItemProvider {
  component: string = 'IBizWFActionButton';

  async createController(
    panelItem: IPanelItem,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<WFActionButtonController> {
    const c = new WFActionButtonController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
