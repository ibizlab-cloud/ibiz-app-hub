import {
  getPortletProvider,
  IDashboardController,
  IPortletContainerController,
  IPortletController,
  IPortletProvider,
  ViewPortletController,
} from '@ibiz-template/runtime';
import { IDBPortletPart } from '@ibiz/model-core';
import { clone } from 'ramda';

/**
 * @description 大屏数据看板适配器
 * @export
 * @class ScreenDashboardProvider
 * @implements {IPortletProvider}
 */
export class ScreenPortletProvider implements IPortletProvider {
  component: string = 'ScreenPortlet';

  async createController(
    portletModel: IDBPortletPart,
    dashboard: IDashboardController,
    parent?: IPortletContainerController,
  ): Promise<IPortletController> {
    const model = clone(portletModel);
    const tempModel = Object.assign(model, { sysPFPluginId: '' });
    // 隐藏标题栏且配置图片时，显示图片并隐藏标题
    if (!tempModel.showTitleBar && tempModel.sysImage) {
      tempModel.showTitleBar = true;
      tempModel.title = '';
    }
    const provider = await getPortletProvider(tempModel);
    if (provider) {
      const c = await provider.createController(model, dashboard, parent);
      return c;
    }
    const c = new ViewPortletController(model, dashboard, parent);
    await c.init();
    return c;
  }
}
