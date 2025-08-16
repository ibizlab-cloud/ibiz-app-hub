import { IUIActionGroupDetail } from '@ibiz/model-core';
import { IApiGridColumnController } from './i-api-grid-column.controller';
import { IApiGridRowState } from '../../../state';
/**
 * @description 表格操作列控制器
 * @export
 * @interface IApiGridUAColumnController
 * @extends {IApiGridColumnController}
 */
export interface IApiGridUAColumnController extends IApiGridColumnController {
  /**
   * @description 触发界面行为
   * @param {IUIActionGroupDetail} detail 界面行为组成员项
   * @param {IApiGridRowState} row 行数据
   * @param {MouseEvent} event 事件对象
   * @returns {*}  {Promise<void>}
   * @memberof IApiGridUAColumnController
   */
  onActionClick(
    detail: IUIActionGroupDetail,
    row: IApiGridRowState,
    event: MouseEvent,
  ): Promise<void>;
}
