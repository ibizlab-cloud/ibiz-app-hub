import { EditorController } from '@ibiz-template/runtime';
import { ITextBox } from '@ibiz/model-core';
import { toNumber } from 'lodash-es';

/**
 * 输入框编辑器控制器
 *
 * @author lxm
 * @date 2022-08-24 20:08:25
 * @export
 * @class TextBoxEditorController
 * @extends {EditorController}
 */
export class TextBoxEditorController extends EditorController<ITextBox> {
  /**
   * 精度
   * @author lxm
   * @date 2023-09-26 10:22:47
   * @type {number}
   */
  precision?: number;

  protected async onInit(): Promise<void> {
    await super.onInit();
    this.precision = this.editorParams.precision
      ? toNumber(this.editorParams.precision)
      : this.model.precision;
  }
}
