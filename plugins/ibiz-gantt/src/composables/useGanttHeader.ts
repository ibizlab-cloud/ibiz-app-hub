import { isNaN } from 'lodash';
import Variables from '@/constants/vars';
import { XDate } from '@/models/param/date';
import { useStore } from '@/store';
import { day, calcMinLen } from '@/utils/date';
import useGanttWidth from './useGanttWidth';
import useTableWidth from './useTableWidth';

export default () => {
  const store = useStore();
  const { tableWidth } = useTableWidth();
  const { getGanttUnitColumnWidth } = useGanttWidth();

  /**
   * 获取甘特图时间范围（根据单位计算）
   * 月：偏移量 1年
   * 周: 偏移量 1年
   * 天：偏移量 0.5年
   * 时：偏移量 1周
   * 默认偏移量 1年
   */
  function getGanttDateRange() {
    const currentDate = new Date().getTime();
    const dayMilliseconds = Variables.time.millisecondOf.day;
    const weekMilliseconds = Variables.time.millisecondOf.week;
    let offset: number;
    switch (store.$styleBox.unit) {
      case 'day':
        offset = (dayMilliseconds * 365) / 2;
        break;
      case 'hour':
        offset = weekMilliseconds;
        break;
      default:
        offset = dayMilliseconds * 365;
        break;
    }
    const _start = new XDate(day(currentDate - offset).toDate());
    const _end = new XDate(day(currentDate + offset).toDate());
    let { start, end } = store.$data;
    if (
      !start ||
      isNaN(start.date.getTime()) ||
      start.compareTo(_start) === 'l'
    ) {
      start = _start;
    }
    if (!end || isNaN(end.date.getTime()) || end.compareTo(_end) === 'r') {
      end = _end;
    }
    return { start, end };
  }

  // 设置甘特日期头
  function setGanttHeaders() {
    let startDate: XDate | undefined;
    let endDate: XDate | undefined;
    // 显示的列数
    let minLen: number = 0;
    if (store.$param.dateRange) {
      const { start, end } = store.$param.dateRange;
      startDate = new XDate(day(start).add(1, 'day').toDate());
      endDate = new XDate(end);
      minLen = day(end).diff(start, 'day') + 1;
    } else {
      const { start, end } = getGanttDateRange();
      startDate = start;
      endDate = end;
      // 使用 window 的宽度减去 table 的宽度，就是最小需要的列数，再加一个阈值即可
      minLen = Math.ceil(
        (window.innerWidth - tableWidth.value) /
          getGanttUnitColumnWidth(new Date()) +
          5,
      );
    }
    // 减去不显示天数
    if (store.$param.showWeekdays && store.$param.showWeekdays.length > 0) {
      minLen = calcMinLen({
        start: startDate,
        end: endDate,
        minLen,
        showWeekdays: store.$param.showWeekdays,
      });
    }
    store.ganttHeader.setDate(
      minLen,
      startDate,
      endDate,
      store.$styleBox.unit,
      store.$param.showWeekdays,
    );
  }

  return {
    setGanttHeaders,
    ganttHeader: store.ganttHeader,
  };
};
