import { IApiData, IApiParams } from '@ibiz-template/core';

/**
 * @description 二维码工具
 * @export
 * @interface IApiQrcodeUtil
 */
export interface IApiQrcodeUtil {
  /**
   * @description 扫描二维码
   * @param {(IApiParams | undefined)} [options] 创建二维码参数配置
   * @returns {*}  {Promise<IApiData>}
   * @memberof IApiQrcodeUtil
   */
  scanQrcode(options?: IApiParams | undefined): Promise<IApiData>;

  /**
   * @description 创建二维码
   * @param {string} value 创建二维码需要的文本值
   * @param {(IApiParams | undefined)} [options] 创建二维码参数配置
   * @returns {*}  {IApiParams}
   * @memberof IApiQrcodeUtil
   */
  createQrcode(value: string, options?: IApiParams | undefined): IApiParams;
}
