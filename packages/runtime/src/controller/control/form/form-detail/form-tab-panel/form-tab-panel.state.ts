import { IApiFormTabPanelState } from '../../../../../interface';
import { FormDetailState } from '../form-detail';

/**
 * @description 表单分页部件状态
 * @export
 * @class FormTabPanelState
 * @extends {FormDetailState}
 * @implements {IApiFormTabPanelState}
 */
export class FormTabPanelState
  extends FormDetailState
  implements IApiFormTabPanelState
{
  /**
   * @description 当前激活的分页
   * @type {string}
   * @memberof FormTabPanelState
   */
  activeTab: string = '';
}
