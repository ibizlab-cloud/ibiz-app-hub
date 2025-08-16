import { IUIActionGroupDetail } from '@ibiz/model-core';
import { IApiParams } from '@ibiz-template/core';
import { IApiFormDetailContainerController } from './i-api-form-detail-container.controller';
import { IApiFormGroupPanelState } from '../../../state';

/**
 * @description 表单分组控制器
 * @export
 * @interface IApiFormGroupPanelController
 * @extends {IApiFormDetailContainerController}
 */
export interface IApiFormGroupPanelController
  extends IApiFormDetailContainerController {
  /**
   * @description 表单分组状态
   * @type {IApiFormGroupPanelState}
   * @memberof IApiFormGroupPanelController
   */
  state: IApiFormGroupPanelState;
  /**
   * @description 触发界面行为
   * @param {IUIActionGroupDetail} detail
   * @param {MouseEvent} event
   * @param {IApiParams} [args]
   * @returns {*}  {Promise<void>}
   * @memberof IApiFormGroupPanelController
   */
  onActionClick(
    detail: IUIActionGroupDetail,
    event: MouseEvent,
    args?: IApiParams,
  ): Promise<void>;
}
