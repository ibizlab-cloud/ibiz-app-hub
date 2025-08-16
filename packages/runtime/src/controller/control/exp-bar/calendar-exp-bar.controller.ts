import { RuntimeModelError } from '@ibiz-template/core';
import {
  ICalendarExpBar,
  ISysCalendar,
  ISysCalendarItem,
} from '@ibiz/model-core';
import {
  ICalendarExpBarState,
  ICalendarExpBarEvent,
  ICalendarExpBarController,
  ICalendarController,
  ICalendarItemData,
  INavViewMsg,
} from '../../../interface';
import { ExpBarControlController } from './exp-bar.controller';

/**
 * 树导航栏控制器
 *
 * @export
 * @class CalendarExpBarController
 * @extends {ExpBarControlController<ICalendarExpBar, ICalendarExpBarState, ICalendarExpBarEvent>}
 * @implements {ICalendarExpBarController}
 */
export class CalendarExpBarController
  extends ExpBarControlController<
    ICalendarExpBar,
    ICalendarExpBarState,
    ICalendarExpBarEvent
  >
  implements ICalendarExpBarController
{
  /**
   * 导航栏key名称 默认srfkey 多导航视图类 由子类重写
   *
   * @author zk
   * @date 2023-07-10 03:07:53
   * @memberof ExpBarControlController
   */
  navKeyName = 'navId';

  protected getCalendarItemModel(
    itemTypeName: string,
  ): ISysCalendarItem | undefined {
    const { sysCalendarItems } = this.XDataModel as ISysCalendar;
    if (!sysCalendarItems) {
      return undefined;
    }
    return sysCalendarItems.find(item => item.itemType === itemTypeName);
  }

  get xDataController(): ICalendarController {
    const controller = this.view.getController(this.model.xdataControlName!);
    if (!controller) {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t('runtime.controller.control.expBar.unableMore', {
          xdataControlName: this.model.xdataControlName,
        }),
      );
    }
    return controller as ICalendarController;
  }

  public navBySrfnav(): void {
    const selectItem: ICalendarItemData | undefined =
      this.xDataController?.state.items.find(
        item => item.navId === this.state.srfnav,
      );
    super.navBySrfnav();
    if (!selectItem) {
      return;
    }
    const date = new Date(selectItem.beginTime);
    this.xDataController.setSelectDate(date);
  }

  /**
   *  获取导航视图
   *
   * @author zk
   * @date 2023-06-29 03:06:41
   * @param {IDETabViewPanel} tabViewPanel
   * @return {*}  {Promise<INavViewMsg>}
   * @memberof TabExpPanelController
   */
  public getNavViewMsg(item: ICalendarItemData): INavViewMsg {
    const itemModel = this.getCalendarItemModel(item.itemType);
    if (itemModel) {
      const { context, params } = this.prepareParams(
        itemModel,
        item.deData ? item.deData : item,
        this.context,
        this.params,
      );
      context.currentSrfNav = item.navId;
      this.state.srfnav = item.navId;
      return {
        key: item.navId,
        context,
        params,
        viewId: itemModel.navAppViewId,
        isCache: this.isCache,
      };
    }
    return {
      key: item.navId,
      context: this.context,
      params: this.params,
      isCache: this.isCache,
    };
  }
}
