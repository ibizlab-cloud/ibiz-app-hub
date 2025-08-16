import { IApiTreeGridExState } from './i-api-tree-grid-ex.state';
import { IApiTreeNodeData } from './i-api-tree.state';

/**
 * @description 甘特图部件状态
 * @primary
 * @export
 * @interface IApiGanttState
 * @extends {IApiTreeGridExState}
 */
export interface IApiGanttState extends IApiTreeGridExState {
  /**
   * @description 甘特图样式
   * @type {IGanttStyle}
   * @default {}
   * @memberof IApiGanttState
   */
  ganttStyle: IApiGanttStyle;

  /**
   * @description 是否开启滑块拖拽
   * @type {boolean}
   * @default true
   * @memberof IApiGanttState
   */
  sliderDraggable: boolean;
}

/**
 * @description 甘特图样式
 * @export
 * @interface IApiGanttStyle
 */
export interface IApiGanttStyle {
  /**
   * @description 主题色
   * @type {string}
   * @memberof IApiGanttStyle
   */
  primaryColor?: string;

  /**
   * @description 文本色
   * @type {string}
   * @memberof IApiGanttStyle
   */
  textColor?: string;
}

/**
 * @description 甘特节点数据
 * @export
 * @interface IApiGanttNodeData
 * @extends {IApiTreeNodeData}
 */
export interface IApiGanttNodeData extends IApiTreeNodeData {
  /**
   * @description 开始时间
   * @type {string}
   * @memberof IApiGanttNodeData
   */
  _beginDataItemValue: string;

  /**
   * @description 结束时间
   * @type {string}
   * @memberof IApiGanttNodeData
   */
  _endDataItemValue: string;

  /**
   * @description 前置数据
   * @type {(string | number)}
   * @memberof IApiGanttNodeData
   */
  _prevDataItemValue: string | number;

  /**
   * @description 完成量数据
   * @type {(string | number)}
   * @memberof IApiGanttNodeData
   */
  _finishDataItemValue: string | number;

  /**
   * @description 总量数据项
   * @type {(string | number)}
   * @memberof IApiGanttNodeData
   */
  _totalDataItemValue: string | number;

  /**
   * @description 子数据
   * @type {(IApiGanttNodeData[] | undefined)}
   * @memberof IApiGanttNodeData
   */
  _children?: IApiGanttNodeData[] | undefined;

  /**
   * @description 父节点数据对象
   * @type {IApiGanttNodeData}
   * @memberof IApiGanttNodeData
   */
  _parent?: IApiGanttNodeData;
}
