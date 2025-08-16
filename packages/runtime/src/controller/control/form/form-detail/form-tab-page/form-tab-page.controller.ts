import { IDEFormTabPage } from '@ibiz/model-core';
import { FormDetailController } from '../form-detail';
import { FormTabPageState } from './form-tab-page.state';
import { FormTabPanelController } from '../form-tab-panel';
import { IApiFormTabPageController } from '../../../../../interface';

/**
 * 表单分页部件分页控制器
 *
 * @author lxm
 * @date 2022-09-04 15:09:52
 * @export
 * @class FormTabPageController
 * @extends {FormDetailController}
 */
export class FormTabPageController
  extends FormDetailController<IDEFormTabPage>
  implements IApiFormTabPageController
{
  declare state: FormTabPageState;

  protected createState(): FormTabPageState {
    return new FormTabPageState(this.parent?.state);
  }

  /**
   * @description 是否激活的分页
   * @readonly
   * @type {boolean}
   * @memberof FormTabPageController
   */
  get isActive(): boolean {
    return (
      (this.parent as FormTabPanelController).state.activeTab === this.model.id
    );
  }
}
