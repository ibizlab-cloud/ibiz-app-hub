import { IApiKanbanGroupState, IApiKanbanState } from '../../../api';
import { IButtonContainerState } from '../../common';
import { IDataViewControlState } from './i-data-view-control.state';
import { IMDControlGroupState } from './i-md-control.state';

/**
 * @description 看板部件（kanban）部件状态接口
 * @export
 * @interface IKanbanState
 * @extends {IDataViewControlState}
 * @extends {IApiKanbanState}
 */
export interface IKanbanState extends IDataViewControlState, IApiKanbanState {
  /**
   * @description 分组数据
   * @type {IKanbanGroupState[]}
   * @memberof IKanbanState
   */
  groups: IKanbanGroupState[];

  /**
   * @description 泳道数据集合
   * @type {IKanbanSwimlane[]}
   * @memberof IKanbanState
   */
  swimlanes: IKanbanSwimlane[];
}

/**
 * @description 看板泳道数据
 * @export
 * @interface IKanbanSwimlane
 */
export interface IKanbanSwimlane {
  /**
   * @description 泳道标识
   * @type {string}
   * @memberof IKanbanSwimlane
   */
  key?: string;
  /**
   * @description 泳道标题
   * @type {string}
   * @memberof IKanbanSwimlane
   */
  caption: string;
  /**
   * @description 是否展开泳道
   * @type {boolean}
   * @memberof IKanbanSwimlane
   */
  isExpand: boolean;
  /**
   * @description 数量
   * @type {number}
   * @memberof IKanbanSwimlane
   */
  count: number;
}

/**
 * @description 看板部件分组数据
 * @export
 * @interface IKanbanGroupState
 * @extends {IMDControlGroupState}
 * @extends {IApiKanbanGroupState}
 */
export interface IKanbanGroupState
  extends IMDControlGroupState,
    IApiKanbanGroupState {
  /**
   * @description 分组是否展开
   * @type {boolean}
   * @memberof IKanbanGroupState
   */
  isExpand?: boolean;
  /**
   * @description 是否隐藏
   * @type {boolean}
   * @memberof IKanbanGroupState
   */
  hidden?: boolean;
  /**
   * @description 分组界面行为组状态
   * @type {IButtonContainerState}
   * @memberof IKanbanGroupState
   */
  groupActionGroupState?: IButtonContainerState;
}
