import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import IsoWeek from 'dayjs/plugin/isoWeek';
import localeData from 'dayjs/plugin/localeData';
import updateLocale from 'dayjs/plugin/updateLocale';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import weekday from 'dayjs/plugin/weekday';
import Variables from '@/constants/vars';
import './lang';

/** ********************************** */
/** *** 下面方法全部使用 dayjs 实现 **** */
/** ********************************** */

// 添加周数
dayjs.extend(weekOfYear);
dayjs.extend(IsoWeek);

// 添加自定义格式化
dayjs.extend(advancedFormat);

// 添加本地化
dayjs.extend(localeData);
dayjs.extend(updateLocale);
dayjs.extend(weekday);

export const day = dayjs;

let L = 'en';

export function setLocale(locale: string) {
  if (L === locale) return;

  L = locale;
  day.locale(locale);
}

/**
 * 更新本地化
 */
export function updateLocaleData() {
  dayjs.updateLocale(L, {
    weekStart: 1
  });
}

/**
 * 获取对应单位的毫秒数
 * @param unit
 * @param date 所在月的日期，用于计算月份的时间
 * @returns
 */
export function getMillisecondBy(unit: HeaderDateUnit | DateUnit, date?: Date | number) {
  if (unit === 'month') {
    return dayjs(date).daysInMonth() * Variables.time.millisecondOf.day;
  }

  return Variables.time.millisecondOf[unit];
}

/**
 * 根据传入的单位，获取内部支持的基本单位
 */
export function baseUnit(unit: HeaderDateUnit | DateUnit) {
  switch (unit) {
    case 'second':
      return 'second';
    case 'hour':
      return 'hour';
    case 'day':
    case 'week':
    case 'month':
    default:
      return 'day';
  }
}

/**
 * 检查给定的日期是否为非工作日（即不在weekdays数组中指定的日期）
 *
 * @param {Date | dayjs.Dayjs} currentDate - dayjs 日期对象
 * @param {Array<number>} weekdays - 包含需要显示的周几的数字的数组
 * @returns {number} - 非工作日的数量（如果当前日期是非工作日，则增加1）
 */
export function isWeekday(date: Date | dayjs.Dayjs, weekdays: Array<number>) {
  const curDate = dayjs(date);
  const currentDayOfWeek = curDate.day();
  return weekdays.includes(currentDayOfWeek);
}

// 计算从开始日期到结束日期之间不需要显示日期的总数量 通过 weekday 过滤
export function countNoWeekday(
  startDate: Date,
  endDate: Date,
  weekdays: number[],
) {
  let nonWorkdayCount = 0;
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  for (
    let currentDate = start;
    currentDate.isBefore(end) || currentDate.isSame(end, 'day');
    currentDate = currentDate.add(1, 'day')
  ) {
    if (!isWeekday(currentDate, weekdays)) {
      nonWorkdayCount += 1;
    }
  }

  return nonWorkdayCount;
}

/**
 * 计算单元格最小宽度
 */
export function calcMinLen(params: any): number {
  const { start, end, minLen, showWeekdays } = params;
  const val = countNoWeekday(start, end, showWeekdays);
  const num = minLen - val;
  return num;
}
