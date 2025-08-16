/**
 * 生成随机字符串
 *
 * @export
 * @return {*}  {string}
 */
function S4(): string {
  // eslint-disable-next-line no-bitwise
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

/**
 * 创建UUID
 *
 * @author chitanda
 * @date 2023-10-13 16:10:17
 * @export
 * @return {*}  {string}
 */
export function createUUID(): string {
  return `${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
}

const SvgPattern = /<svg\b[^>]*>[\s\S]*?<\/svg>/;

/**
 * 判断字符串是否是svg的格式
 *
 * @author tony001
 * @date 2025-03-12 17:03:40
 * @export
 * @param {string} str
 * @return {*}  {boolean}
 */
export function isSvg(str: string): boolean {
  return SvgPattern.test(str);
}

export class TextUtil {
  /**
   * input元素，用于存储拷贝的文本
   *
   * @author zhanghengfeng
   * @date 2023-08-31 20:08:06
   * @private
   * @type {(HTMLInputElement | null)}
   */
  static inputElement: HTMLInputElement | null = null;

  /**
   * 拷贝文本
   *
   * @author zhanghengfeng
   * @date 2023-08-31 11:08:51
   * @param {string} value
   * @return {*}  {boolean}
   */
  static copy(value: string): boolean {
    if (!this.inputElement) {
      this.inputElement = document.createElement('input');
      this.inputElement.style.position = 'absolute';
      this.inputElement.style.left = '-9999px';
      document.body.appendChild(this.inputElement);
    }
    this.inputElement.value = value;
    this.inputElement.select();
    return document.execCommand('copy');
  }
}
