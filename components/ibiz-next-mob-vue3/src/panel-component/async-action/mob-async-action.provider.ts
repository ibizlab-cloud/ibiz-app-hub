import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';

import { IPanelItem } from '@ibiz/model-core';
import { MobAsyncActionController } from './mob-async-action.controller';

export class MobAsyncActionProvider implements IPanelItemProvider {
  component: string = 'MobAsyncAction';

  async createController(
    panelItem: IPanelItem,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<MobAsyncActionController> {
    const c = new MobAsyncActionController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
