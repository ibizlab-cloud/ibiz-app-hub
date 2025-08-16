import {
  INavViewMsg,
  ICalendarItemData,
  CalendarController,
} from '@ibiz-template/runtime';
import { ISysCalendar } from '@ibiz/model-core';
import { NavgationBaseProvider } from './navigation-base.provider';

/**
 * 日历导航适配器
 *
 * @export
 * @class CalendarNavigationProvider
 * @extends {NavgationBaseProvider}
 */
export class CalendarNavigationProvider extends NavgationBaseProvider {
  keyName = 'navId';

  declare controller: CalendarController;

  declare model: ISysCalendar;

  onNavDataByStack(): void {
    const { items } = this.controller.state;
    const navData =
      this.navStack
        .map(key => items.find(item => item.navId === key))
        .find(item => item !== undefined) || items[0];
    if (navData) {
      const date = new Date(navData.beginTime);
      this.controller.setSelectDate(date);
      this.controller.setNavData(navData);
    } else {
      this.navStack = [];
      this.controller.setSelectDate(new Date());
      this.navViewMsg.value = undefined;
    }
  }

  getNavViewMsg(item: ICalendarItemData): INavViewMsg {
    const { sysCalendarItems } = this.model;
    const itemModel = sysCalendarItems?.find(
      _item => _item.itemType === item.itemType,
    );
    if (itemModel) {
      const { context, params } = this.prepareParams(
        itemModel,
        item.deData ? item.deData : item,
        this.controller.context,
        this.controller.params,
      );
      return {
        params,
        context,
        key: item.navId,
        viewId: itemModel.navAppViewId,
      };
    }
    return {
      key: item.navId,
      context: this.controller.context,
      params: this.controller.params,
    };
  }
}
