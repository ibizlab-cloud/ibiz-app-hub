import { IDEGantt } from '@ibiz/model-core';
import { IApiData } from '@ibiz-template/core';
import { IApiGanttNodeData, IApiGanttState, IApiGanttStyle } from '../../state';
import {
  IApiMDControlController,
  IApiMDCtrlLoadParams,
} from './i-api-md-control.controller';

/**
 * 甘特图
 * @description 基础的项目管理控件，通过横向时间轴展示任务的开始与结束时间、进度、依赖关系及资源分配，直观呈现项目整体计划与执行状态。
 * @primary
 * @ctrlparams {name:sliderdraggable,title:启用滑块拖拽,parameterType:boolean,defaultvalue:false,description:设置是否启用滑块拖拽，即是否允许拖拽任务项事件}
 * @ctrlparams {"name":"mustshowcolumns","title":"必须显示的列","parameterType":"string[] | null","defaultvalue":"null","description":"在配置甘特左侧表格列显示中，设置必须显示的列，避免将所有表格列隐藏"}
 * @ctrlparams {name:limitsize,title:最大限制数,parameterType:string,defaultvalue:'0',description:在配置甘特左侧表格列显示中，用于计算除必须显示的列之外，最多可显示的列数。其默认值为 '0'，代表不限制显示列数}
 * @ctrlparams {name:enablecustomized,title:允许设置,parameterType:boolean,defaultvalue:true,description:是否允许在甘特图左侧绘制表格列选择按钮，点击该按钮可配置需要显示的表格列}
 * @export
 * @interface IApiGanttController
 * @extends {IApiGridController<T, S>}
 * @template T
 * @template S
 */
export interface IApiGanttController<
  T extends IDEGantt = IDEGantt,
  S extends IApiGanttState = IApiGanttState,
> extends IApiMDControlController<T, S> {
  /**
   * @description 保存数据
   * @param {IApiGanttNodeData} data
   * @returns {*}  {Promise<void>}
   * @memberof IApiGanttController
   */
  save(data: IApiGanttNodeData): Promise<void>;

  /**
   * @description 保存甘特图所有数据
   * @returns {*}  {Promise<void>}
   * @memberof IApiGanttController
   */
  saveAll(): Promise<void>;

  /**
   * @description 切换甘特图的行编辑开启关闭状态
   * @memberof IApiGanttController
   */
  toggleRowEdit(): void;

  /**
   * @description 新建行
   * @param {IApiMDCtrlLoadParams} [args]
   * @returns {*}  {Promise<void>}
   * @memberof IApiGanttController
   */
  newRow(args?: IApiMDCtrlLoadParams): Promise<void>;

  /**
   * @description 切换折叠
   * @param {IApiData} [params]
   * @memberof IApiGanttController
   */
  changeCollapse(params?: IApiData): void;

  /**
   * @description 甘特图样式
   * @param {IApiGanttStyle} style
   * @memberof IApiGanttController
   */
  setGanttStyle(style: IApiGanttStyle): void;
}
