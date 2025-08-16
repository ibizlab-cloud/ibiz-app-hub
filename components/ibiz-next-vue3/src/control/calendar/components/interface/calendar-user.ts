/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ExtractPropTypes } from 'vue';
import { ICalendarItemData } from '@ibiz-template/runtime';
import { Dayjs } from 'dayjs';
import { definePropType, handleProps } from '../util';

const calendarUserProps = handleProps({
  selectedDay: {
    type: definePropType<Dayjs>(Object),
    default: () => new Date(),
  },
  events: {
    type: Array<ICalendarItemData>,
    default: [],
  },
} as const);
type CalendarUserProps = ExtractPropTypes<typeof calendarUserProps>;
const calendarUserEmits = {
  eventClick: (value: IParams) => value,
  eventDblClick: (value: IParams) => value,
};
type CalendarUserEmits = typeof calendarUserEmits;

export { calendarUserEmits, calendarUserProps };

export type { CalendarUserEmits, CalendarUserProps };
