/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { ExtractPropTypes } from 'vue';
import type { Dayjs } from 'dayjs';
import { handleProps, definePropType, isObject } from '../util';
import type { IEvent, IUIEvent, IUILegend } from './common';

const calendarWeekProps = handleProps({
  showDetail: {
    type: Boolean,
    default: false,
  },
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
} as const);
type CalendarWeekProps = ExtractPropTypes<typeof calendarWeekProps>;
const calendarWeekEmits = {
  pick: (value: Dayjs) => isObject(value),
  eventClick: (value: IParams) => value,
  eventDblClick: (value: IParams) => value,
  eventContextmenu: (_value: IParams) => _value,
};
type CalendarWeekEmits = typeof calendarWeekEmits;

export { calendarWeekEmits, calendarWeekProps };

export type { CalendarWeekEmits, CalendarWeekProps };
