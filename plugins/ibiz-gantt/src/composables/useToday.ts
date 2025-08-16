import { computed } from 'vue';
import { XDate } from '@/models/param/date';
import useGanttHeader from './useGanttHeader';
import useGanttWidth from './useGanttWidth';
import useStyle from './useStyle';

export default () => {
  const { ganttHeader } = useGanttHeader();
  const { ganttColumnWidth, currentMillisecond, headerShowUnit } =
    useGanttWidth();
  const { $styleBox } = useStyle();

  const generateToday = computed(() => {
    const today = new XDate();
    today.startOf('day');
    return today;
  });

  const todayLeft = computed(() => {
    const start = ganttHeader.start?.clone();
    start?.startOf(headerShowUnit.value);
    return (
      (generateToday.value.intervalTo(start) / currentMillisecond.value) *
      ganttColumnWidth.value
    );
  });

  function isInArea(date: XDate) {
    if (ganttHeader.dates.length === 0) return false;

    const sd = ganttHeader.start;
    const ed = ganttHeader.end;

    return sd?.compareTo(date) === 'l' && ed?.compareTo(date) === 'r';
  }

  // 判断传入的时间是否包含在大的时间范围内
  // 该方法基于isInArea方法增强，主要适配今天就属于开始时间及结束时间的情况
  function isInDateRange(date: XDate) {
    if (ganttHeader.dates.length === 0) return false;

    const sd = ganttHeader.start;
    const ed = ganttHeader.end;
    return (
      (sd?.compareTo(date) === 'l' && ed?.compareTo(date) === 'r') ||
      sd?.isSame(date, 'day') ||
      ed?.isSame(date, 'day')
    );
  }

  const showToday = computed(() => {
    return $styleBox.showToday && isInDateRange(generateToday.value);
  });

  return {
    todayLeft,
    showToday,
    generateToday,
    isInArea,
    isInDateRange,
  };
};
