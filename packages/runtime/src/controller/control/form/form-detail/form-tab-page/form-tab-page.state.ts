import { IApiFormTabPageState } from '../../../../../interface';
import { FormDetailState } from '../form-detail';

/**
 * @description 表单分页部件分页状态
 * @export
 * @class FormTabPageState
 * @extends {FormDetailState}
 * @implements {IApiFormTabPageState}
 */
export class FormTabPageState
  extends FormDetailState
  implements IApiFormTabPageState {}
