import { IApiData } from '@ibiz-template/core';
import { IApiMDControlState } from './i-api-md-control.state';

/**
 * @description 多编辑视图面板部件状态接口
 * @primary
 * @export
 * @interface IMEditViewPanelState
 * @extends {IApiMDControlState}
 */
export interface IApiMEditViewPanelState extends IApiMDControlState {
  /**
   * @description 编辑视图面板部件UI数据集合
   * @type {IApiPanelUiItem[]}
   * @default []
   * @memberof IApiMEditViewPanelState
   */
  panelUiItems: IApiPanelUiItem[];

  /**
   * @description 当前激活分页（上分页时启用）
   * @type {string}
   * @default ''
   * @memberof IMEditViewPanelState
   */
  activeTab: string;
}

/**
 * @description 面板UI项接口
 * @export
 * @interface IApiPanelUiItem
 */
export interface IApiPanelUiItem {
  /**
   * @description 唯一主键
   * @type {string}
   * @memberof IApiPanelUiItem
   */
  id: string;

  /**
   * @description 视图上下文
   * @type {IApiData}
   * @memberof IApiPanelUiItem
   */
  context: IApiData;

  /**
   * @description  视图参数
   * @type {IApiData}
   * @memberof IApiPanelUiItem
   */
  params: IApiData;

  /**
   * @description 该项数据
   * @type {IApiData}
   * @memberof IApiPanelUiItem
   */
  data: IApiData;

  /**
   * @description 主信息
   * @type {string}
   * @memberof IApiPanelUiItem
   */
  srfmajortext: string;
}
