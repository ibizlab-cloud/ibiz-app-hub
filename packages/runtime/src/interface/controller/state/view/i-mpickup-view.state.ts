import { IApiMPickupViewState } from '../../../api';
import { IViewState } from './i-view.state';

/**
 * @description 实体数据多项选择视图UI状态
 * @export
 * @interface IMPickupViewState
 * @extends {IViewState}
 * @extends {IApiMPickupViewState}
 */
export interface IMPickupViewState extends IViewState, IApiMPickupViewState {
  /**
   * 选中数据
   *
   * @author zk
   * @date 2023-05-25 05:05:10
   * @type {IData[]}
   * @memberof IMPickupViewState
   */
  selectData: IData[];
}
