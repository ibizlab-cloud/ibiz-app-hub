/* eslint-disable no-useless-constructor */
import { IAppPortlet, IDBPortletPart } from '@ibiz/model-core';
import {
  IDashboardController,
  IPortletContainerController,
  PortletPartController,
} from '@ibiz-template/runtime';

export class ScreenPortletController extends PortletPartController<IDBPortletPart> {
  /**
   * @description 控件参数
   * @type {IData}
   * @memberof ScreenPortletController
   */
  controlParam: IData = {};

  /**
   * @description 边框样式
   * @type {string}
   * @memberof ScreenPortletController
   */
  borderStyle: string = '';

  /**
   * @description 边框模式
   * @type {('full' | 'body')}
   * @memberof ScreenPortletController
   */
  borderMode: 'full' | 'body' = 'body';

  /**
   * @description 图标类型
   * @type {('full' | 'icon')}
   * @memberof ScreenPortletController
   */
  iconType: 'full' | 'icon' = 'full';

  // 所有应用门户
  public appPortlets: IAppPortlet[] = [];

  /**
   * @description 内容区背景图
   * @type {string}
   * @memberof ScreenPortletController
   */
  public bodyBgUrl: string = '';

  /**
   * 重写
   * @param {T} model
   * @param {IDashboardController} dashboard
   * @param {IPortletContainerController} [parent]
   * @memberof ScreenPortletController
   */
  constructor(
    model: IDBPortletPart,
    dashboard: IDashboardController,
    parent?: IPortletContainerController,
  ) {
    super(model, dashboard, parent);
    this.initControlParams();
  }

  /**
   * @description 初始化控件参数
   * @memberof ScreenPortletController
   */
  public initControlParams() {
    const app = ibiz.hub.getApp(this.context.srfappid);
    this.appPortlets = app.model.appPortlets || [];
    const porltlet = this.appPortlets.find(
      x => x.codeName === this.model.codeName,
    );
    if (porltlet && porltlet.portletParams) {
      this.controlParam = porltlet.portletParams as IData;
      if (porltlet.portletParams?.BORDERSTYLE) {
        this.borderStyle = porltlet.portletParams?.BORDERSTYLE;
      }
      if (porltlet.portletParams?.BORDERMODE) {
        this.borderMode = porltlet.portletParams?.BORDERMODE;
      }
      if (porltlet.portletParams?.ICONTYPE) {
        this.iconType = porltlet.portletParams?.ICONTYPE;
      }
      if (this.controlParam.BODYBGURL) {
        this.bodyBgUrl = this.controlParam.BODYBGURL;
      }
    }
  }
}
