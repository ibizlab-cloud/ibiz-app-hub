import { IApiPickupMDViewState } from '../../../api';
import { IMDViewState } from './i-md-view.state';

/**
 * @description 选择多数据视图UI状态
 * @export
 * @interface IPickupMDViewState
 * @extends {IMDViewState}
 * @extends {IApiPickupMDViewState}
 */
export interface IPickupMDViewState
  extends IMDViewState,
    IApiPickupMDViewState {
  /**
   * 是否单选
   *
   * @author zk
   * @date 2023-08-21 05:08:36
   * @type {boolean}
   * @memberof IPickupMDViewState
   */
  singleSelect: boolean;

  /**
   * 选择数据
   *
   * @author zk
   * @date 2023-11-13 05:11:46
   * @type {IData[]}
   * @memberof IPickupMDViewState
   */
  selectedData: IData[];
}
