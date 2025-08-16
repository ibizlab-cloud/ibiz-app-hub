import { IApiContext, IApiData, IApiParams } from '@ibiz-template/core';

/**
 * @description 数据能力方法的通用入参
 * @export
 * @interface IApiDataAbilityParams
 */
export interface IApiDataAbilityParams {
  /**
   * @description 当前这次操作附加的上下文参数
   * @type {IApiContext}
   * @memberof IApiDataAbilityParams
   */
  context?: IApiContext;

  /**
   * @description 当前这次操作附加的视图参数
   * @type {IApiParams}
   * @memberof IApiDataAbilityParams
   */
  viewParam?: IApiParams;

  /**
   * @description 执行能力使用的数据集合,没有则使用数据部件自身的数据或选中数据
   * @type {(IApiData[] | IApiData)}
   * @memberof IApiDataAbilityParams
   */
  data?: IApiData[] | IApiData;

  /**
   * @description 是否静默执行，不出loading效果，不弹成功提示
   * @type {boolean}
   * @memberof IApiDataAbilityParams
   */
  silent?: boolean;
}
