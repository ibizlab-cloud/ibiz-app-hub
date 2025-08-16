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
   * 占位
   * @return {*}
   * @author: zhujiamin
   * @Date: 2022-08-25 14:33:14
   */
  public placeHolder = '请选择';

  /**
   * 是否多选
   * @return {*}
   * @author: zhujiamin
   * @Date: 2022-08-25 14:33:14
   */
  public multiple = false;

  protected async onInit(): Promise<void> {
    super.onInit();
  }
}
