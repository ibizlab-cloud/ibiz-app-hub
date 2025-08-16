import {
  ViewController,
  ICalendarViewEvent,
  ICalendarViewState,
  MDViewEngine,
} from '@ibiz-template/runtime';
import { IAppDECalendarView } from '@ibiz/model-core';

export class MobCalendarViewEngine extends MDViewEngine {
  protected declare view: ViewController<
    IAppDECalendarView,
    ICalendarViewState,
    ICalendarViewEvent
  >;
}
