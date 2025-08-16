import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { IPanelItem } from '@ibiz/model-core';
import { PanelVideoPlayerController } from './panel-video-player.controller';

/**
 * 流程跟踪组件适配器
 *
 * @export
 * @class WFStepTraceProvider
 * @implements {IPanelItemProvider}
 */
export class PanelVideoPlayerProvider implements IPanelItemProvider {
  component: string = 'IBizPanelVideoPlayer';

  async createController(
    panelItem: IPanelItem,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<PanelVideoPlayerController> {
    const c = new PanelVideoPlayerController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
