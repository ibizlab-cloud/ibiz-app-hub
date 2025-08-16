/**
 * 特殊的忽略值，当值为这些值时，才会被忽略
 *
 * @author chitanda
 * @date 2023-08-03 14:08:37
 * @export
 * @class specialIgnoredValues
 */
export class SpecialIgnoredValues {
  /**
   * 映射表
   *
   * @author chitanda
   * @date 2023-08-03 14:08:45
   * @protected
   * @type {Map<string, unknown>}
   */
  protected map: Map<string, unknown> = new Map();

  constructor() {
    this.map.set('basis', -1);
    this.map.set('grow', -1);
    this.map.set('shrink', -1);
    this.map.set('showCaptionBar', true);
    // 界面行为是否显示操作提示，默认值是 true ， false 的时候要输出
    this.map.set('showBusyIndicator', true);
    // 超时时间，0以上都识别
    this.map.set('timeout', -1);
    this.map.set('maskMode', -1);
    // 关闭模式，0也需识别
    this.map.set('removeMode', -1);
  }

  has(key: string): boolean {
    return this.map.has(key);
  }

  /**
   * 是否为特殊忽略值
   *
   * @author chitanda
   * @date 2023-08-03 14:08:14
   * @param {string} key
   * @param {unknown} val
   * @return {*}  {boolean}
   */
  is(key: string, val: unknown): boolean {
    const value = this.map.get(key);
    return value == val;
  }
}

// 忽略工具类
export const ignore = new SpecialIgnoredValues();
