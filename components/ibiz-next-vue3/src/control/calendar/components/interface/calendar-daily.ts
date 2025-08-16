/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { ExtractPropTypes } from 'vue';
import type { Dayjs } from 'dayjs';
import { handleProps, definePropType, isObject } from '../util';
import type { IEvent, IUIEvent, IUILegend } from './common';

const calendarDailyProps = handleProps({
  selectedDay: {
    type: definePropType<Dayjs>(Object),
  },
  events: {
    type: Array<IUIEvent>,
    default: [],
  },
  legends: {
    type: Array<IUILegend>,
    default: [],
  },
  multiple: {
    type: Boolean,
  },
  selectedData: {
    type: Object as unknown as IEvent,
  },
  showDetail: {
    type: Boolean,
    default: false,
  },
} as const);
type CalendarDailyProps = ExtractPropTypes<typeof calendarDailyProps>;
const calendarDailyEmits = {
  pick: (value: Dayjs) => isObject(value),
  eventClick: (value: IParams) => value,
  eventDblClick: (value: IParams) => value,
  eventContextmenu: (_value: IParams) => _value,
};
type CalendarDailyEmits = typeof calendarDailyEmits;

export { calendarDailyEmits, calendarDailyProps };

export type { CalendarDailyEmits, CalendarDailyProps };
