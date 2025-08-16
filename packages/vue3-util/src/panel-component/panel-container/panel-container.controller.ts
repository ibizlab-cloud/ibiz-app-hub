import { PanelItemController } from '@ibiz-template/runtime';
import { IPanelContainer } from '@ibiz/model-core';
import { PanelContainerState } from './panel-container.state';

/**
 * 面板容器控制器
 *
 * @export
 * @class PanelContainerController
 * @extends {PanelItemController}
 */
export class PanelContainerController extends PanelItemController<IPanelContainer> {
  /**
   * @description 面板容器状态
   * @exposedoc
   * @type {PanelContainerState}
   * @memberof PanelContainerController
   */
  declare state: PanelContainerState;

  protected createState(): PanelContainerState {
    return new PanelContainerState(this.parent?.state);
  }
}
