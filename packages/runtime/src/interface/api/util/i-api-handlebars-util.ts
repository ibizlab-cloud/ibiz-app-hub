import { IApiData } from '@ibiz-template/core';

/**
 * @description handlebars 渲染工具类
 * @export
 * @interface IApiHandlebarsUtil
 */
export interface IApiHandlebarsUtil {
  /**
   * @description 异步绘制模板，返回渲染后的字符串
   * @param {string} template
   * @param {IApiData} data
   * @returns {*}  {Promise<string>}
   * @memberof IApiHandlebarsUtil
   */
  render(template: string, data: IApiData): Promise<string>;

  /**
   * @description 同步绘制模板，返回渲染后的字符串
   * @param {string} template
   * @param {IApiData} data
   * @returns {*}  {string}
   * @memberof IApiHandlebarsUtil
   */
  syncRender(template: string, data: IApiData): string;
}
