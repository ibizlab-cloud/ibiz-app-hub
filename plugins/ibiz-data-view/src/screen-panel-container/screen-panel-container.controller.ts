import { PanelItemController } from '@ibiz-template/runtime';
import { IPanelContainer } from '@ibiz/model-core';

/**
 * 大屏面板容器控制器
 *
 * @export
 * @class ScreenPanelContainerController
 * @extends {PanelItemController}
 */
export class ScreenPanelContainerController extends PanelItemController<IPanelContainer> {
  /**
   * @description 边框样式
   * @type {string}
   * @memberof ScreenPanelContainerController
   */
  borderStyle: string = '';

  protected async onInit(): Promise<void> {
    await super.onInit();
    this.borderStyle = 'CustomDecoration5';
  }
}
