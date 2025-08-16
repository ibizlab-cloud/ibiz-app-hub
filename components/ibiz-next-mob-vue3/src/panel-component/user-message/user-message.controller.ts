/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PanelItemController } from '@ibiz-template/runtime';
import { IPanelField } from '@ibiz/model-core';

export class MobUserMessageController extends PanelItemController<IPanelField> {
  /**
   * 初始化
   *
   * @protected
   * @return {*}  {Promise<void>}
   * @memberof MobUserMessageController
   */
  protected async onInit(): Promise<void> {
    await super.onInit();
  }
}
