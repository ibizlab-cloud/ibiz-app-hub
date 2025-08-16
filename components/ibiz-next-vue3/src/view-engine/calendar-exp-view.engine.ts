import {
  ViewController,
  ViewEngineBase,
  ICalendarExpBarController,
  ICalendarExpViewEvent,
  ICalendarExpViewState,
} from '@ibiz-template/runtime';
import { IAppDECalendarExplorerView } from '@ibiz/model-core';

export class CalendarExpViewEngine extends ViewEngineBase {
  /**
   * 日历导航视图控制器
   *
   * @protected
   * @type {ViewController<
   *     IAppDECalendarExplorerView,
   *     ICalendarExpViewState,
   *     ICalendarExpViewEvent
   *   >}
   * @memberof CalendarExpViewEngine
   */
  protected declare view: ViewController<
    IAppDECalendarExplorerView,
    ICalendarExpViewState,
    ICalendarExpViewEvent
  >;

  /**
   * 树导航栏
   *
   * @readonly
   * @memberof CalendarExpViewEngine
   */
  get calendarExpBar(): ICalendarExpBarController {
    return this.view.getController(
      'calendarexpbar',
    ) as ICalendarExpBarController;
  }

  async onCreated(): Promise<void> {
    await super.onCreated();
    const { childNames } = this.view;
    childNames.push('calendarexpbar');
    if (!this.view.slotProps.calendarexpbar) {
      this.view.slotProps.calendarexpbar = {};
    }
    this.view.slotProps.calendarexpbar.srfnav = this.view.state.srfnav;
  }

  async onMounted(): Promise<void> {
    await super.onMounted();
    const { model } = this.view;
    // 默认加载
    if (!this.view.state.noLoadDefault && model.loadDefault) {
      this.calendarExpBar.load();
    }
  }
}
