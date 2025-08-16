import { IApiData } from '@ibiz-template/core';

/**
 * @description 权限结果
 * @export
 * @interface IApiAuthResult
 */
export interface IApiAuthResult {
  /**
   * @description 是否成功
   * @type {boolean}
   * @memberof IApiAuthResult
   */
  ok: boolean;
  /**
   * @description 结果
   * @type {IApiData}
   * @memberof IApiAuthResult
   */
  result: IApiData;
}
