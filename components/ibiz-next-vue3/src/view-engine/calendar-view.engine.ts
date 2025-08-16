import {
  ViewController,
  ICalendarViewEvent,
  ICalendarViewState,
  MDViewEngine,
  EventBase,
} from '@ibiz-template/runtime';
import { IAppDECalendarView } from '@ibiz/model-core';

export class CalendarViewEngine extends MDViewEngine {
  protected declare view: ViewController<
    IAppDECalendarView,
    ICalendarViewState,
    ICalendarViewEvent
  >;

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  protected async onXDataActive(event: EventBase): Promise<void> {
    // 日历视图 opendata 逻辑由部件执行
  }

  async onCreated(): Promise<void> {
    super.onCreated();
    const { model } = this.view;
    if (!this.view.slotProps.calendar) {
      this.view.slotProps.calendar = {};
    }
    this.view.slotProps.calendar.mdctrlActiveMode = model.mdctrlActiveMode!;
  }
}
