import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { IPanelItem } from '@ibiz/model-core';
import { WFStepTraceController } from './wf-step-trace.controller';

/**
 * 流程跟踪组件适配器
 *
 * @export
 * @class WFStepTraceProvider
 * @implements {IPanelItemProvider}
 */
export class WFStepTraceProvider implements IPanelItemProvider {
  component: string = 'IBizWFStepTrace';

  async createController(
    panelItem: IPanelItem,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<WFStepTraceController> {
    const c = new WFStepTraceController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
