import {
  IDRTabController,
  IEditView3Event,
  IEditView3State,
  ViewController,
} from '@ibiz-template/runtime';
import { IAppDEEditView } from '@ibiz/model-core';
import { MobEditViewEngine } from './mob-edit-view.engine';

/**
 * 编辑视图3（分页关系）
 *
 * @export
 * @class EditView3Engine
 * @extends {EditViewEngine}
 */
export class MobEditView3Engine extends MobEditViewEngine {
  protected declare view: ViewController<
    IAppDEEditView,
    IEditView3State,
    IEditView3Event
  >;

  async onCreated(): Promise<void> {
    await super.onCreated();
    const { childNames } = this.view;
    childNames.push('drtab');
  }

  /**
   * 数据分页栏
   *
   * @readonly
   * @memberof EditView3Engine
   */
  get drtab(): IDRTabController {
    return this.view.getController('drtab') as IDRTabController;
  }
}
