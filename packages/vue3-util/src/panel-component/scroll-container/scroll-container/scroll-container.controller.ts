import { IPanelContainer } from '@ibiz/model-core';
import {
  PanelItemController,
  ViewLayoutPanelController,
} from '@ibiz-template/runtime';

/**
 * @description 面板滚动容器控制器
 * @export
 * @class ScrollContainerController
 * @extends {PanelItemController<IPanelContainer>}
 */
export class ScrollContainerController extends PanelItemController<IPanelContainer> {
  /**
   * @description 视图布局面板部件控制器
   * @exposedoc
   * @export
   * @type {ViewLayoutPanelController}
   * @memberof ScrollContainerController
   */
  declare panel: ViewLayoutPanelController;

  protected async onInit(): Promise<void> {
    await super.onInit();
    // 滚动容器高宽默认占满
    this.state.layout.width = '100%';
    this.state.layout.height = '100%';
  }
}
