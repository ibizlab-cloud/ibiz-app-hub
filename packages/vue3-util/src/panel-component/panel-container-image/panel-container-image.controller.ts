import { PanelItemController } from '@ibiz-template/runtime';
import { IPanelContainer } from '@ibiz/model-core';
import { PanelContainerImageState } from './panel-container-image.state';

/**
 * 面板图片容器控制器
 *
 * @export
 * @class PanelContainerImageController
 * @extends {PanelItemController}
 */
export class PanelContainerImageController extends PanelItemController<IPanelContainer> {
  /**
   * @description 状态
   * @exposedoc
   * @type {PanelContainerImageState}
   * @memberof PanelContainerImageController
   */
  declare state: PanelContainerImageState;

  protected createState(): PanelContainerImageState {
    return new PanelContainerImageState(this.parent?.state);
  }
}
