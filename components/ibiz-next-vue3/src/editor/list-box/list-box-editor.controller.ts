import { CodeListEditorController } from '@ibiz-template/runtime';
import { IAppCodeList, IListBox } from '@ibiz/model-core';

/**
 * 列表框编辑器控制器
 * @return {*}
 * @author: zhujiamin
 * @Date: 2022-08-25 10:57:58
 */
export class ListBoxEditorController extends CodeListEditorController<IListBox> {
  /**
   * 代码表模型
   * @return {*}
   * @author: zhujiamin
   * @Date: 2023-05-24 10:55:50
   */
  codeList: IAppCodeList | undefined = undefined;

  protected async onInit(): Promise<void> {
    super.onInit();
    if (this.model.appCodeListId) {
      const app = await ibiz.hub.getApp(this.context.srfappid);
      this.codeList = app.codeList.getCodeList(this.model.appCodeListId);
    }
  }
}
