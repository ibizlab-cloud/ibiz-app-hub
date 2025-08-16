import { EditorController } from '@ibiz-template/runtime';
import { IStepper } from '@ibiz/model-core';

/**
 * 步进器编辑器控制器
 *
 * @export
 * @class StepperEditorController
 * @extends {EditorController}
 */
export class StepperEditorController extends EditorController<IStepper> {
  /**
   * 占位
   * @return {*}
   * @author: zhujiamin
   * @Date: 2022-08-25 14:33:14
   */
  public placeHolder = ibiz.i18n.t('editor.stepper.pleaseEnter');
}
