import { IApiData, IApiParams } from '@ibiz-template/core';

/**
 * @description 关闭视图返回数据接口
 * @export
 * @interface IApiModalData
 */
export interface IApiModalData {
  /**
   * @description 关闭视图是否操作成功
   * @type {boolean}
   * @memberof IApiModalData
   */
  ok: boolean;
  /**
   * @description 返回的数据
   * @type {IApiData[]}
   * @memberof IApiModalData
   */
  data?: IApiData[];
  /**
   * @description 额外参数
   * @type {IApiParams}
   * @memberof IApiModalData
   */
  params?: IApiParams;
}
