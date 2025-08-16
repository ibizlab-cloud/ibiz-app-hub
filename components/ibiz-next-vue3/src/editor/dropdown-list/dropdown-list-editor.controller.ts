import { CodeListEditorController } from '@ibiz-template/runtime';
import { IDropDownList } from '@ibiz/model-core';

/**
 * 下拉列表框编辑器控制器
 * @return {*}
 * @author: zhujiamin
 * @Date: 2022-08-25 10:57:58
 */
export class DropDownListEditorController extends CodeListEditorController<IDropDownList> {
  /**
   * 是否多选
   * @return {*}
   * @author: zhujiamin
   * @Date: 2022-08-25 14:33:14
   */
  public multiple = false;

  /**
   * 是否可选可填
   * @return {*}
   * @author: fangzhihao
   * @Date: 2024-03-12 14:33:14
   */
  public forceSelection = true;

  /**
   * 默认选中第一个
   *
   * @memberof CustomTagSelectController
   */
  public defaultFirstOption = false;

  /**
   * 预置项空白项名称
   *
   * @memberof DropDownListEditorController
   */
  public blankItemName = '';

  protected async onInit(): Promise<void> {
    super.onInit();
    if (
      this.model.editorType === 'MDROPDOWNLIST' ||
      this.model.editorType === 'MOBCHECKLIST'
    ) {
      this.multiple = true;
    }

    // 传递false就可选可填了，默认只能选择已有的选项
    if (this.editorParams?.forceSelection) {
      this.forceSelection = this.toBoolean(this.editorParams.forceSelection);
    }
    if (this.editorParams?.forceselection) {
      this.forceSelection = this.toBoolean(this.editorParams.forceselection);
    }

    if (this.editorParams?.defaultFirstOption) {
      this.defaultFirstOption = this.toBoolean(
        this.editorParams.defaultFirstOption,
      );
    }
    if (this.editorParams?.defaultfirstoption) {
      this.defaultFirstOption = this.toBoolean(
        this.editorParams.defaultfirstoption,
      );
    }

    if (this.editorParams?.blankItemName) {
      this.blankItemName = this.editorParams.blankItemName;
    }
    if (this.editorParams?.blankitemname) {
      this.blankItemName = this.editorParams.blankitemname;
    }
  }
}
