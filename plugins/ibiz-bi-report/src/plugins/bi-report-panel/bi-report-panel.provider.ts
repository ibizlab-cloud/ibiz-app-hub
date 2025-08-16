import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { IPanelItem } from '@ibiz/model-core';
import { BIReportPanelController } from './bi-report-panel.controller';

export class BIReportPanelProvider implements IPanelItemProvider {
  component: string = 'BIReportPanel';

  async createController(
    panelItem: IPanelItem,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<PanelItemController> {
    const c = new BIReportPanelController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
