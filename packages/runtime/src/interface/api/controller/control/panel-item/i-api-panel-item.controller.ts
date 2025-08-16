import { IPanelItem } from '@ibiz/model-core';
import { IApiData } from '@ibiz-template/core';
import { IApiPanelController } from '../i-api-panel.controller';
import { IApiPanelItemContainerController } from './i-api-panel-item-container.controller';
import { IApiPanelItemState } from '../../../state';
/**
 * @description 面板成员
 * @primary
 * @export
 * @interface IApiPanelItemController
 */
export interface IApiPanelItemController {
  /**
   * @description 成员模型
   * @type {IPanelItem}
   * @memberof IApiPanelItemController
   */
  model: IPanelItem;

  /**
   * @description 面板控制器
   * @type {IApiPanelController}
   * @memberof IApiPanelItemController
   */
  panel: IApiPanelController;

  /**
   * @description 父容器控制器(除了根成员都存在)
   * @type {IApiPanelItemContainerController}
   * @memberof IApiPanelItemController
   */
  parent?: IApiPanelItemContainerController;

  /**
   * @description 成员状态
   * @type {IApiPanelItemState}
   * @memberof IApiPanelItemController
   */
  state: IApiPanelItemState;

  /**
   * @description 数据对象
   * @type {IApiData}
   * @memberof IApiPanelItemController
   */
  data: IApiData;
}
