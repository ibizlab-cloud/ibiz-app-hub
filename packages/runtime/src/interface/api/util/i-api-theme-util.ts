/**
 * @description 主题工具
 * @export
 * @interface IApiThemeUtil
 */
export interface IApiThemeUtil {
  /**
   * @description 设置主题
   * @param {string} tag 主题标识
   * @memberof IApiThemeUtil
   */
  setTheme(tag: string): void;

  /**
   * @description 获取当前主题标识
   * @returns {*}  {string}
   * @memberof IApiThemeUtil
   */
  getTheme(): string;

  /**
   * @description 打开自定义主题配置面板
   * @memberof IApiThemeUtil
   */
  customTheme(): void;
}
