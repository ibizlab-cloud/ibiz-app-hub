import dayjs from 'dayjs';

/**
 * 获取当前选中月份区间日期
 *
 * @author zk
 * @date 2023-12-21 05:12:44
 * @export
 * @param {Date} selectedDate
 * @return {*}  {IData}
 */
export function getCurSelectMonthDate(selectedDate: Date): IData {
  // 获取当前月份的第一天
  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1,
  );
  // 获取下个月的第一天，然后减去一天
  const lastDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    1,
  );
  return {
    srfstartdate: dayjs(firstDayOfMonth).format('YYYY-MM-DD HH:mm:ss'),
    srfenddate: dayjs(lastDayOfMonth).format('YYYY-MM-DD HH:mm:ss'),
  };
}

/**
 * 获取当前选中日区间日期
 *
 * @author zk
 * @date 2023-12-21 05:12:28
 * @export
 * @param {Date} selectedDate
 * @return {*}  {IData}
 */
export function getCurSelectDayDate(date: Date): IData {
  // 复制输入日期对象，以免修改原始对象
  const dayStart = new Date(date);

  // 设置时间为 00:00:00
  dayStart.setHours(0, 0, 0, 0);

  // 获取第二天开始时间
  const nextDayStart = new Date(date);
  nextDayStart.setDate(nextDayStart.getDate() + 1);
  nextDayStart.setHours(0, 0, 0, 0);

  return {
    srfstartdate: dayjs(dayStart).format('YYYY-MM-DD HH:mm:ss'),
    srfenddate: dayjs(nextDayStart).format('YYYY-MM-DD HH:mm:ss'),
  };
}
