import { EditorController } from '@ibiz-template/runtime';
import { ISlider } from '@ibiz/model-core';

export class PercentPondController extends EditorController<ISlider> {
  /**
   * 总数属性
   *
   * @type {string}
   * @memberof PercentPondController
   */
  public totalField: string = '';

  /**
   * 初始化
   *
   * @protected
   * @return {*}  {Promise<void>}
   * @memberof PercentPondController
   */
  protected async onInit(): Promise<void> {
    super.onInit();
    if (this.editorParams && this.editorParams.TOTALFIELD) {
      this.totalField = this.editorParams.TOTALFIELD.toLowerCase();
    }
  }
}
