import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { IPanelItem } from '@ibiz/model-core';
import { BIReportPanelContentController } from './bi-report-panel-content.controller';

export class BIReportPanelContentProvider implements IPanelItemProvider {
  component: string = 'BIReportPanelContent';

  async createController(
    panelItem: IPanelItem,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<PanelItemController> {
    const c = new BIReportPanelContentController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
