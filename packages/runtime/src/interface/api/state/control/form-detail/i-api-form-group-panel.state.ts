import { IApiButtonContainerState } from '../../common';
import { IApiFormDetailContainerState } from './i-api-form-detail-container.state';

/**
 * @description 表单分组状态
 * @export
 * @interface IApiFormGroupPanelState
 * @extends {IApiFormDetailContainerState}
 */
export interface IApiFormGroupPanelState extends IApiFormDetailContainerState {
  /**
   * @description 界面行为组状态
   * @type {(IApiButtonContainerState | null)}
   * @memberof IApiFormGroupPanelState
   */
  actionGroupState: IApiButtonContainerState | null;

  /**
   * @description 是否折叠
   * @type {boolean}
   * @memberof IApiFormGroupPanelState
   */
  collapse: boolean;
}
