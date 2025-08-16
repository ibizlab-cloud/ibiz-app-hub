import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { CalendarControl } from './calendar';
import { CalendarProvider } from './calendar.provider';

export * from './calendar.provider';

export const IBizCalendarControl = withInstall(
  CalendarControl,
  function (v: App) {
    v.component(CalendarControl.name, CalendarControl);
    registerControlProvider(ControlType.CALENDAR, () => new CalendarProvider());
  },
);

export default IBizCalendarControl;
