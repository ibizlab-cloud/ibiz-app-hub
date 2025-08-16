import { PanelItemController } from '@ibiz-template/runtime';
import { IPanelRawItem } from '@ibiz/model-core';

export class CustomBtnController extends PanelItemController<IPanelRawItem> {
  /**
   * 父容器数据对象数据
   * @author lxm
   * @date 2023-07-15 01:33:58
   * @readonly
   * @type {IData}
   */
  get data(): IData {
    return this.dataParent.data!;
  }

  /**
   * 初始化
   *
   * @author lxm
   * @date 2022-08-24 20:08:42
   * @protected
   * @returns {*}  {Promise<void>}
   */
  protected async onInit(): Promise<void> {
    await super.onInit();
  }
}
