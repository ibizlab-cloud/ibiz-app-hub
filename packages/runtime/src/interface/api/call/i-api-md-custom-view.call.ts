import { IApiContext, IApiData, IApiParams } from '@ibiz-template/core';
import { IApiViewCall } from './i-api-view.call';

/**
 * @description 实体多数据自定义视图能力
 * @export
 * @interface IApiMDCustomViewCall
 * @extends {IApiViewCall}
 */
export interface IApiMDCustomViewCall extends IApiViewCall {
  /**
   * @description 视图刷新
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMDCustomViewCall
   */
  Refresh: {
    args: undefined;
  };
  /**
   * @description 打开编辑数据视图
   * @type {{
   *     args: {
   *       data: IApiData[];
   *       event?: MouseEvent;
   *       context?: IApiContext;
   *       params?: IApiParams;
   *     };
   *   }}
   * @memberof IApiMDCustomViewCall
   */
  Edit: {
    args: {
      data: IApiData[];
      event?: MouseEvent;
      context?: IApiContext;
      params?: IApiParams;
    };
  };
  /**
   * @description 查看
   * @type {{
   *     args: {
   *       data: IApiData[];
   *       event?: MouseEvent;
   *       context?: IApiContext;
   *       params?: IApiParams;
   *     };
   *   }}
   * @memberof IApiMDCustomViewCall
   */
  View: {
    args: {
      data: IApiData[];
      event?: MouseEvent;
      context?: IApiContext;
      params?: IApiParams;
    };
  };
  /**
   * @description 打开新建数据视图
   * @type {{
   *     args: {
   *       data: IApiData[];
   *       event?: MouseEvent;
   *       copyMode?: boolean;
   *     };
   *   }}
   * @memberof IApiMDCustomViewCall
   */
  New: {
    args: {
      data: IApiData[];
      event?: MouseEvent;
      copyMode?: boolean;
    };
  };
}
