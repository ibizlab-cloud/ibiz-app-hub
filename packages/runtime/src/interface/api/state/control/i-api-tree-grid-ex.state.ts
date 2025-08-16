import { IApiTreeNodeData, IApiTreeState } from './i-api-tree.state';
import { IApiButtonContainerState } from '../common';

/**
 * @description 树表格(增强)部件状态
 * @primary
 * @export
 * @interface IApiTreeGridExState
 * @extends {IApiTreeState}
 */
export interface IApiTreeGridExState extends IApiTreeState {
  /**
   * @description 开启表格行编辑
   * @type {boolean}
   * @default true
   * @memberof IApiTreeGridExState
   */
  rowEditOpen: boolean;
}

export interface IApiTreeGridExRowState {
  /**
   * @description 行数据（一般是树节点的数据）
   * @type {IApiTreeNodeData}
   * @memberof IApiTreeGridExRowState
   */
  data: IApiTreeNodeData;

  /**
   * @description 可能是以下两种类型状态,操作列按钮状态（p是操作列的标识）,属性列的内置界面行为组状态(p是属性列的标识)
   * @type {{ [p: string]: IApiButtonContainerState }}
   * @memberof IApiTreeGridExRowState
   */
  columnActionsStates: { [p: string]: IApiButtonContainerState };

  /**
   * @description 是否显示行编辑
   * @type {boolean}
   * @memberof IApiTreeGridExRowState
   */
  showRowEdit: boolean;
}
