import { IApiPickupGridViewState } from '../../../api';
import { IGridViewState } from './i-grid-view.state';

/**
 * @description 实体选择表格视图（部件视图）UI状态
 * @export
 * @interface IPickupGridViewState
 * @extends {IGridViewState}
 * @extends {IApiPickupGridViewState}
 */
export interface IPickupGridViewState
  extends IGridViewState,
    IApiPickupGridViewState {
  /**
   * 是否单选
   *
   * @author zk
   * @date 2023-05-26 05:05:02
   * @type {boolean}
   * @memberof IPickupGridViewState
   */
  singleSelect: boolean;
}
