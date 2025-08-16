import { IApiMDControlState } from './i-api-md-control.state';
import { IButtonContainerState } from '../../../controller';

/**
 * @description 列表部件状态接口
 * @primary
 * @export
 * @interface IApiListState
 * @extends {IApiMDControlState}
 */
export interface IApiListState extends IApiMDControlState {
  /**
   * @description 是否显示分页栏
   * @type {boolean}
   * @default true
   * @memberof IApiListState
   */
  enablePagingBar?: boolean;

  /**
   * @description 展开key集合，该状态仅PC端使用。
   * @type {string[]}
   * @default []
   * @memberof IApiListState
   */
  expandedKeys: string[];

  /**
   * @description 列表操作项状态集合
   * @type {{ [p: string]: IButtonContainerState }}
   * @memberof IKanbanState
   */
  uaState: { [p: string]: IButtonContainerState };
}
