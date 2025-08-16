import { IApiMDViewCall } from './i-api-md-view.call';

/**
 * @description 实体列表视图能力
 * @export
 * @interface IApiListViewCall
 * @extends {IApiMDViewCall}
 */
export interface IApiListViewCall extends IApiMDViewCall {
  /**
   * @description 展开
   * @type {{
   *     args: { params: { srfcollapsetag?: string; srfgroup?: string } };
   *   }}
   * @memberof IApiListViewCall
   */
  Expand: {
    args: { params: { srfcollapsetag?: string; srfgroup?: string } };
  };
  /**
   * @description 折叠
   * @type {{
   *     args: { params: { srfcollapsetag?: string; srfgroup?: string } };
   *   }}
   * @memberof IApiListViewCall
   */
  Collapse: {
    args: { params: { srfcollapsetag?: string; srfgroup?: string } };
  };
  /**
   * @description 全部展开
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiListViewCall
   */
  ExpandAll: {
    args: undefined;
  };
  /**
   * @description 全部收缩
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiListViewCall
   */
  CollapseAll: {
    args: undefined;
  };
}
