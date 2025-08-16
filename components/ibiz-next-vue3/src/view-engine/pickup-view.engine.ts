import {
  ViewEngineBase,
  ViewController,
  IPickupViewPanelController,
  SysUIActionTag,
  IPickupViewState,
  IPickupViewEvent,
  IApiPickupViewCall,
} from '@ibiz-template/runtime';
import { IAppDEPickupView } from '@ibiz/model-core';

export class PickupViewEngine extends ViewEngineBase {
  /**
   * 视图控制器
   *
   * @protected
   * @type {ViewController<IAppDEPickupView, IPickupViewState, IPickupViewEvent>}
   * @memberof PickupViewEngine
   */
  protected declare view: ViewController<
    IAppDEPickupView,
    IPickupViewState,
    IPickupViewEvent
  >;

  /**
   * 选中数据
   *
   * @type {IData[]}
   * @memberof PickupViewEngine
   */
  selectData: IData[] = [];

  /**
   * 选择视图面板
   *
   * @readonly
   * @memberof PickupViewEngine
   */
  get pickupViewPanel(): IPickupViewPanelController {
    return this.view.getController(
      'pickupviewpanel',
    ) as IPickupViewPanelController;
  }

  /**
   * 视图created生命周期执行逻辑
   *
   * @return {*}  {Promise<void>}
   * @memberof PickupViewEngine
   */
  async onCreated(): Promise<void> {
    await super.onCreated();
    const { childNames } = this.view;
    childNames.push('pickupviewpanel');
  }

  /**
   * 视图mounted生命周期执行逻辑
   *
   * @return {*}  {Promise<void>}
   * @memberof PickupViewEngine
   */
  async onMounted(): Promise<void> {
    await super.onMounted();
    this.pickupViewPanel.state.singleSelect = true;
    this.pickupViewPanel.evt.on('onSelectionChange', event => {
      this.selectData = event.data;
    });
    this.pickupViewPanel.evt.on('onDataActive', event => {
      this.pickupViewPanelDataActive(event.data);
    });
  }

  /**
   *  选则面板激活数据
   *
   * @author zk
   * @date 2023-05-26 05:05:13
   * @param {*} data
   * @memberof PickupViewEngine
   */
  protected pickupViewPanelDataActive(data: IData[]): void {
    this.selectData = data;
    this.view.closeView({ ok: true, data: this.selectData });
  }

  async call(
    key: keyof IApiPickupViewCall,
    args: IData | undefined,
  ): Promise<IData | null | undefined> {
    if (key === SysUIActionTag.CANCEL) {
      this.cancel();
      return null;
    }
    if (key === SysUIActionTag.OK) {
      this.confirm();
      return null;
    }
    return super.call(key, args);
  }

  /**
   * 确认
   *
   * @memberof PickupViewEngine
   */
  confirm(): void {
    this.view.closeView({ ok: true, data: this.selectData });
  }

  /**
   * 取消
   *
   * @memberof PickupViewEngine
   */
  cancel(): void {
    this.view.closeView({ ok: false, data: [] });
  }
}
