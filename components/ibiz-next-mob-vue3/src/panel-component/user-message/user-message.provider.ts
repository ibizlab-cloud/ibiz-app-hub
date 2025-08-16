import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';

import { IPanelItem } from '@ibiz/model-core';
import { MobUserMessageController } from './user-message.controller';

export class MobUserMessageProvider implements IPanelItemProvider {
  component: string = 'MobUserMessage';

  async createController(
    panelItem: IPanelItem,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<MobUserMessageController> {
    const c = new MobUserMessageController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
