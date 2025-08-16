import { IApiData } from '@ibiz-template/core';

/**
 * @description 全屏工具类
 * @export
 * @interface IApiFullscreenUtil
 */
export interface IApiFullscreenUtil {
  /**
   * @description 指定元素全屏
   * @param {HTMLDivElement} div
   * @param {IApiData} [data]
   * @memberof IApiFullscreenUtil
   */
  openElementFullscreen(div: HTMLDivElement, data?: IApiData): void;

  /**
   * @description 退出全屏
   * @memberof IApiFullscreenUtil
   */
  closeElementFullscreen(): void;
}
