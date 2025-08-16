import { IApiData } from '@ibiz-template/core';
import { IApiGridViewCall } from './i-api-grid-view.call';

/**
 * @description 实体树表格视图能力
 * @export
 * @interface IApiTreeGridViewCall
 * @extends {IApiGridViewCall}
 */
export interface IApiTreeGridViewCall extends IApiGridViewCall {
  /**
   * @description 展开
   * @type {{
   *     args: { data?: IApiData[]; params?: { srfcollapsetag?: string } };
   *   }}
   * @memberof IApiTreeGridViewCall
   */
  Expand: {
    args: { data?: IApiData[]; params?: { srfcollapsetag?: string } };
  };
  /**
   * @description 折叠
   * @type {{
   *     args: { data?: IApiData[]; params?: { srfcollapsetag?: string } };
   *   }}
   * @memberof IApiTreeGridViewCall
   */
  Collapse: {
    args: { data?: IApiData[]; params?: { srfcollapsetag?: string } };
  };
  /**
   * @description 全部展开
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiTreeGridViewCall
   */
  ExpandAll: {
    args: undefined;
  };
  /**
   * @description 全部收缩
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiTreeGridViewCall
   */
  CollapseAll: {
    args: undefined;
  };
}
