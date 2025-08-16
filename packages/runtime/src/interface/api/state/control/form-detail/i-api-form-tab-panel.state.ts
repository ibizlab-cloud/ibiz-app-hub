import { IApiFormDetailState } from './i-api-form-detail.state';
/**
 * @description 表单分页部件状态
 * @export
 * @interface IApiFormTabPanelState
 * @extends {IApiFormDetailState}
 */
export interface IApiFormTabPanelState extends IApiFormDetailState {
  /**
   * @description 当前激活的分页
   * @type {string}
   * @memberof IApiFormTabPanelState
   */
  activeTab: string;
}
