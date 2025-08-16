import { IApiPickupDataViewState } from '../../../api';
import { IDataViewState } from './i-data-view.state';

/**
 * @description 实体选择数据视图（部件视图）UI状态
 * @export
 * @interface IPickupDataViewState
 * @extends {IDataViewState}
 * @extends {IApiPickupDataViewState}
 */
export interface IPickupDataViewState
  extends IDataViewState,
    IApiPickupDataViewState {
  /**
   * 是否单选
   *
   * @author zk
   * @date 2023-05-26 05:05:02
   * @type {boolean}
   * @memberof IPickupDataViewState
   */
  singleSelect: boolean;
}
