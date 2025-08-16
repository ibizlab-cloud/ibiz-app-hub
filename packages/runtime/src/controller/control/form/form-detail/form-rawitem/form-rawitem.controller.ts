import { IDEFormRawItem } from '@ibiz/model-core';
import { FormDetailController } from '../form-detail';
import { FormRawItemState } from './form-rawitem.state';
import { IApiFormRawItemController } from '../../../../../interface';

/**
 * @description 表单直接内容控制器
 * @export
 * @class FormRawItemController
 * @extends {FormDetailController<IDEFormRawItem>}
 * @implements {IApiFormRawItemController}
 */
export class FormRawItemController
  extends FormDetailController<IDEFormRawItem>
  implements IApiFormRawItemController
{
  declare state: FormRawItemState;

  protected createState(): FormRawItemState {
    return new FormRawItemState(this.parent?.state);
  }
}
