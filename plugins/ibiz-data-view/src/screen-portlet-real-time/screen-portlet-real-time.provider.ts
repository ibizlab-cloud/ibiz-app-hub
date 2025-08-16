import { IDBToolbarPortlet } from '@ibiz/model-core';
import {
  IDashboardController,
  IPortletContainerController,
  IPortletProvider,
} from '@ibiz-template/runtime';
import { ScreenPortletRealTimeController } from './screen-portlet-real-time.controller';

/**
 * @description 实时时间
 * @export
 * @class DigitalFlopProvider
 * @implements {IEditorProvider}
 */
export class ScreenPortletRealTimeProvider implements IPortletProvider {
  component: string = 'ScreenPortletRealTime';

  async createController(
    portletModel: IDBToolbarPortlet,
    dashboard: IDashboardController,
    parent?: IPortletContainerController,
  ): Promise<ScreenPortletRealTimeController> {
    const c = new ScreenPortletRealTimeController(
      portletModel,
      dashboard,
      parent,
    );
    await c.init();
    return c;
  }
}
