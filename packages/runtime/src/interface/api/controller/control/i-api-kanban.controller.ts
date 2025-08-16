import { IDEKanban } from '@ibiz/model-core';
import { IApiData } from '@ibiz-template/core';
import { IApiKanbanState } from '../../state';
import { IApiDataViewControlController } from './i-api-data-view-control.controller';

/**
 * 看板
 * @description 采用可视化看板（Kanban）模式，通过可拖拽卡片和折叠卡片分组实现业务数据的多维度管理与状态流转，支持实时数据反馈和响应式布局。
 * @primary
 * @export
 * @interface IApiKanbanController
 * @extends {IApiDataViewControlController<T, S>}
 * @ctrlparams {"name":"draggablemode","title":"拖拽模式","defaultvalue": "3","parameterType":"0 | 1 | 2 | 3","description":"该参数控制看板的拖拽能力，可选值为：0：无拖拽， 1：仅同分组，2：仅同泳道，3：全部","effectPlatform":"web"}
 * @ctrlparams {"name":"lanedescription","title":"泳道描述","defaultvalue": "","parameterType":"string","description":"该参数用于显示泳道的描述信息，默认为实体逻辑名称","effectPlatform":"web"}
 * @template T
 * @template S
 */
export interface IApiKanbanController<
  T extends IDEKanban = IDEKanban,
  S extends IApiKanbanState = IApiKanbanState,
> extends IApiDataViewControlController<T, S> {
  /**
   * @description 全屏
   * @param {IApiData} container
   * @returns {*}  {boolean}
   * @memberof IApiKanbanController
   */
  onFullScreen(container: IApiData): boolean;
}
