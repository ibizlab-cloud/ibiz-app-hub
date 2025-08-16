import { IDEWizardForm, IDEWizardPanel } from '@ibiz/model-core';
import { IApiData } from '@ibiz-template/core';
import { IApiWizardPanelState } from '../../state';
import { IApiControlController } from './i-api-control.controller';

/**
 * 向导面板
 * @description 通过清晰的指引文字、进度提示和下一步按钮，引导用户按步骤完成复杂操作的交互式界面。
 * @primary
 * @export
 * @interface IApiWizardPanelController
 * @extends {IApiControlController<T, S>}
 * @template T
 * @template S
 */
export interface IApiWizardPanelController<
  T extends IDEWizardPanel = IDEWizardPanel,
  S extends IApiWizardPanelState = IApiWizardPanelState,
> extends IApiControlController<T, S> {
  /**
   * @description 当前激活向导表单
   * @type {(IDEWizardForm | undefined)}
   * @memberof IApiWizardPanelController
   */
  activeWizardForm: IDEWizardForm | undefined;

  /**
   * @description 获取向导面板数据
   * @returns {*}  {IApiData[]}
   * @memberof IApiWizardPanelController
   */
  getData(): IApiData[];
}
