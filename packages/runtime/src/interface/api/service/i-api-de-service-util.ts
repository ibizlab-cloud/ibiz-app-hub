import {
  IApiContext,
  IApiData,
  IApiParams,
  IHttpResponse,
} from '@ibiz-template/core';
import { IApiAppDEService } from './i-api-app-de.service';
/**
 * @description 实体服务构造工具接口
 * @export
 * @interface IApiDEServiceUtil
 */
export interface IApiDEServiceUtil {
  /**
   * @description 根据实体标识获取实体服务
   * @param {IApiContext} context 上下文对象
   * @param {string} id 实体标识，通常是应用标识.实体标识，如：checkinweb.shift
   * @returns {*}  {Promise<IApiAppDEService>}
   * @memberof IApiDEServiceUtil
   */
  getService(context: IApiContext, id: string): Promise<IApiAppDEService>;

  /**
   * @description 重置服务, 删除指定域下的所有服务缓存
   * @param {IApiContext} context
   * @memberof IApiDEServiceUtil
   */
  reset(context: IApiContext): void;

  /**
   * @description 执行服务方法
   * @param {string} appDataEntityId 实体标识，通常是应用标识.实体标识，如：checkinweb.shift
   * @param {string} methodName 方法名
   * @param {IApiContext} context 上下文对象
   * @param {(IApiData | IApiData[] | undefined)} [params] 数据
   * @param {(IApiParams | undefined)} [params2] 视图参数
   * @param {IApiData} [header]
   * @returns {*}  {Promise<IHttpResponse<IApiData>>}
   * @memberof IApiDEServiceUtil
   */
  exec(
    appDataEntityId: string,
    methodName: string,
    context: IApiContext,
    params?: IApiData | IApiData[] | undefined,
    params2?: IApiParams | undefined,
    header?: IApiData,
  ): Promise<IHttpResponse<IApiData>>;
}
