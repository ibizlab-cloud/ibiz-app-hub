/**
 * 计算日期合理性
 * 输入要符合yyyy/m/d的规则，同时还要符合正常的月份以及天数 *
 *
 * @export
 */
export function validateDate(dateStr: string): boolean {
  const dateRegex = /^\d{4}\/\d{1,2}\/\d{1,2}$/;
  if (!dateRegex.test(dateStr)) {
    return false;
  }

  const [year, month, day] = dateStr.split('/').map(Number);

  if (month < 1 || month > 12) {
    return false;
  }

  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  let daysInMonth;
  if (month === 2) {
    daysInMonth = isLeapYear ? 29 : 28;
  } else if ([4, 6, 9, 11].includes(month)) {
    daysInMonth = 30;
  } else {
    daysInMonth = 31;
  }

  return day >= 1 && day <= daysInMonth;
}

/**
 * 年份范围限制
 *
 * @export
 * @param {number} [range=10]
 */
export function validateRange(dateStr: string, range: number = 10): boolean {
  // 年份范围限制
  const date = new Date(dateStr);
  const year = date.getFullYear();

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const minYear = currentYear - range;
  const maxYear = currentYear + range;
  if (year < minYear || year > maxYear) {
    return false;
  }
  return true;
}

/**
 * 校验数据是否符合预期
 *
 * @export
 */
export function validateResults(items: string[], range: number = 10): boolean {
  const result = items.every((item: string) => {
    if (!item) {
      return false;
    }
    // 校验日期是否合理
    const isReasonable = validateDate(item);
    // 校验日期是否指定超出范围
    const isOverLimit = validateRange(item, range);
    if (!isReasonable || !isOverLimit) {
      return false;
    }
    return true;
  });
  return result;
}
