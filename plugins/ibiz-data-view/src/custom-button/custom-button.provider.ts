import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { IPanelItem } from '@ibiz/model-core';
import { CustomBtnController } from './custom-button.controller';

export class CustomBtnProvider implements IPanelItemProvider {
  component: string = 'CustomButton';

  async createController(
    panelItem: IPanelItem,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<CustomBtnController> {
    const c = new CustomBtnController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
