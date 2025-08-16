import { IApiPickupTreeViewState } from '../../../api';
import { ITreeViewState } from './i-tree-view.state';

/**
 * @description  实体选择树视图（部件视图）UI状态
 * @export
 * @interface IPickupTreeViewState
 * @extends {ITreeViewState}
 * @extends {IApiPickupTreeViewState}
 */
export interface IPickupTreeViewState
  extends ITreeViewState,
    IApiPickupTreeViewState {
  /**
   * 是否单选
   *
   * @author zk
   * @date 2023-07-03 10:07:12
   * @type {boolean}
   * @memberof IPickupTreeViewState
   */
  singleSelect: boolean;

  /**
   * 选中数据
   * @author lxm
   * @date 2024-02-07 05:53:39
   * @type {IData[]}
   */
  selectedData: IData[];

  /**
   * 在多选的情况下，树节点是否严格的遵循父子不互相关联
   *
   * @author zhanghengfeng
   * @date 2024-07-01 14:07:56
   * @type {boolean}
   */
  checkStrictly?: boolean;
}
