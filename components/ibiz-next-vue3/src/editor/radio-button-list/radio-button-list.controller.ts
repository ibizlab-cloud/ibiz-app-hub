import { CodeListEditorController } from '@ibiz-template/runtime';
import { IRadioButtonList } from '@ibiz/model-core';

/**
 * 单选项列表编辑器控制器
 * @return {*}
 * @author: zhujiamin
 * @Date: 2022-08-25 10:57:58
 */
export class RadioButtonListEditorController extends CodeListEditorController<IRadioButtonList> {
  /**
   * 单选一行展示几个
   * @author fangZhiHao
   * @date 2024-07-17 10:07:40
   * @type {(number | undefined)}
   */
  rowNumber: number | undefined = undefined;

  protected async onInit(): Promise<void> {
    super.onInit();
    if (this.editorParams?.rowNumber) {
      this.rowNumber = Number(this.editorParams.rowNumber);
    }
    if (this.editorParams?.rownumber) {
      this.rowNumber = Number(this.editorParams.rownumber);
    }
  }
}
