import {
  ViewEngineBase,
  ViewController,
  IWizardViewState,
  IWizardViewEvent,
  IWizardPanelController,
} from '@ibiz-template/runtime';
import { IAppDEWizardView } from '@ibiz/model-core';

export class MobWizardViewEngine extends ViewEngineBase {
  /**
   * 视图控制器
   *
   * @protected
   * @type {ViewController<IAppDEWizardView, IWizardViewState, IWizardViewEvent>}
   * @memberof MobWizardViewEngine
   */
  protected declare view: ViewController<
    IAppDEWizardView,
    IWizardViewState,
    IWizardViewEvent
  >;

  /**
   * 数据视图（卡片）部件
   *
   * @readonly
   * @memberof MobWizardViewEngine
   */
  get wizardPanel(): IWizardPanelController {
    return this.view.getController('wizardpanel') as IWizardPanelController;
  }

  async onCreated(): Promise<void> {
    await super.onCreated();
    const { childNames } = this.view;
    childNames.push('wizardpanel');
  }

  /**
   * 视图mounted生命周期执行逻辑
   *
   * @memberof MobWizardViewEngine
   */
  async onMounted(): Promise<void> {
    await super.onMounted();
    if (!this.view.slotProps.wizardpanel) {
      this.view.slotProps.wizardpanel = {};
    }

    this.wizardPanel.initialize();

    this.wizardPanel.evt.on('onFinishSuccess', _event => {
      this.view.closeView({ ok: true, data: [] });
    });
  }
}
