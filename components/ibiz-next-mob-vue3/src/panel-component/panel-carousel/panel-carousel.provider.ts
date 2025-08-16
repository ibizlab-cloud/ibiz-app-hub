import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { IPanelItem } from '@ibiz/model-core';
import { PanelCarouselController } from './panel-carousel.controller';

/**
 * 流程跟踪组件适配器
 *
 * @export
 * @class WFStepTraceProvider
 * @implements {IPanelItemProvider}
 */
export class PanelCarouselProvider implements IPanelItemProvider {
  component: string = 'IBizPanelCarousel';

  async createController(
    panelItem: IPanelItem,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<PanelCarouselController> {
    const c = new PanelCarouselController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
