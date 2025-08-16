import { IApiContext, IApiData, IApiParams } from '@ibiz-template/core';
import { IApiViewCall } from './i-api-view.call';
import { IApiMDCtrlLoadParams, IApiMDCtrlRemoveParams } from '../controller';

/**
 * @description 多数据视图能力
 * @export
 * @interface IApiMDViewCall
 * @extends {IApiViewCall}
 */
export interface IApiMDViewCall extends IApiViewCall {
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
   * @memberof IApiMDViewCall
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
   * @memberof IApiMDViewCall
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
   * @memberof IApiMDViewCall
   */
  New: {
    args: {
      data: IApiData[];
      event?: MouseEvent;
      copyMode?: boolean;
    };
  };
  /**
   * @description 删除
   * @type {{
   *     args?: IApiMDCtrlRemoveParams;
   *   }}
   * @memberof IApiMDViewCall
   */
  Remove: {
    args?: IApiMDCtrlRemoveParams;
  };
  /**
   * @description 数据导入
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMDViewCall
   */
  Import: {
    args: undefined;
  };
  /**
   * @description 视图刷新
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMDViewCall
   */
  Refresh: {
    args: undefined;
  };
  /**
   * @description 数据导出
   * @type {{
   *     args: { event: MouseEvent };
   *   }}
   * @memberof IApiMDViewCall
   */
  ExportExcel: {
    args: { event: MouseEvent };
  };
  /**
   * @description 拷贝
   * @type {{
   *     args: { data: IApiData[]; event?: MouseEvent };
   *   }}
   * @memberof IApiMDViewCall
   */
  Copy: {
    args: { data: IApiData[]; event?: MouseEvent };
  };
  /**
   * @description 视图加载（特指初始化加载）
   * @type {{
   *     args: IApiMDCtrlLoadParams;
   *   }}
   * @memberof IApiMDViewCall
   */
  Load: {
    args: IApiMDCtrlLoadParams;
  };
  /**
   * @description 获取所有数据（多数据专用，获取全部数据）
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMDViewCall
   */
  GetAllData: {
    args: undefined;
  };
}
